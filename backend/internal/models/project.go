package models

import (
	"database/sql"
	"time"
)

type Project struct {
	ID             int            `json:"id"`
	ProjectName    string         `json:"project_name"`
	ProjectUrl     sql.NullString `json:"project_url"`
	ProjectImage   string         `json:"project_image"`
	CompletionDate time.Time      `json:"completion_date"`
	BlogSlug       sql.NullString `json:"blog_slug"`
	Categories     []Category     `json:"categories"`
	Subcategories  []Subcategory  `json:"subcategories"`
}

type ProjectModel struct {
	DB *sql.DB
}

func (m *ProjectModel) GetAll(categoryName string, limit, offset int) ([]Project, error) {
	args := []interface{}{categoryName, categoryName, categoryName, categoryName}
	stmt := `
	WITH paginated_projects AS (
		SELECT DISTINCT p.id, p.completion_date
		FROM projects p
		JOIN project_categories pc ON pc.project_id = p.id
		JOIN categories c ON c.id = pc.category_id
		WHERE 
			(? = 'All') OR 
			(? = 'Misc.' AND c.category_name NOT IN ('3D', 'Art', 'Code')) OR 
			(c.category_name = ?) OR 
			(? = '')
		ORDER BY p.completion_date DESC
	`

	if limit > 0 {
		stmt += "LIMIT ? OFFSET ?"
		args = append(args, limit, offset)
	}

	stmt += `)
	SELECT 
		p.id, p.project_name, p.project_url, p.project_image,
		p.completion_date, p.blog_slug,
		c.id AS category_id, c.category_name,
		s.id AS subcategory_id, s.subcategory_name
	FROM paginated_projects pp
	JOIN projects p ON p.id = pp.id
	JOIN project_categories pc ON pc.project_id = p.id
	JOIN categories c ON c.id = pc.category_id
	JOIN project_subcategories ps ON ps.project_id = p.id
	JOIN subcategories s ON s.id = ps.subcategory_id
	ORDER BY p.completion_date DESC;
	`

	rows, err := m.DB.Query(stmt, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	projectMap := make(map[int]*Project)
	orderedIDs := []int{}

	for rows.Next() {
		var project Project
		var category Category
		var subcategory Subcategory

		err := rows.Scan(
			&project.ID,
			&project.ProjectName,
			&project.ProjectUrl,
			&project.ProjectImage,
			&project.CompletionDate,
			&project.BlogSlug,
			&category.ID,
			&category.Name,
			&subcategory.ID,
			&subcategory.Name,
		)
		if err != nil {
			return nil, err
		}

		if _, exists := projectMap[project.ID]; !exists {
			projectMap[project.ID] = &Project{
				ID:             project.ID,
				ProjectName:    project.ProjectName,
				ProjectUrl:     project.ProjectUrl,
				ProjectImage:   project.ProjectImage,
				CompletionDate: project.CompletionDate,
				BlogSlug:       project.BlogSlug,
				Categories:     []Category{},
				Subcategories:  []Subcategory{},
			}
			orderedIDs = append(orderedIDs, project.ID)
		}

		//Avoid duplicates
		p := projectMap[project.ID]
		if !containsCategory(p.Categories, category.ID) {
			p.Categories = append(p.Categories, category)
		}
		if !containsSubcategory(p.Subcategories, subcategory.ID) {
			p.Subcategories = append(p.Subcategories, subcategory)
		}
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	var projects []Project
	for _, id := range orderedIDs {
		projects = append(projects, *projectMap[id])
	}

	return projects, nil
}
