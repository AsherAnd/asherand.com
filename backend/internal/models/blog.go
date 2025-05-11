package models

import (
	"database/sql"
	"errors"
	"time"
)

type Blog struct {
	ID            int           `json:"id"`
	Title         string        `json:"title"`
	Slug          string        `json:"slug"`
	BlogImage     string        `json:"blog_image"`
	Content       string        `json:"content"`
	Publication   time.Time     `json:"publication_date"`
	Categories    []Category    `json:"categories"`
	Subcategories []Subcategory `json:"subcategories"`
}

type BlogModel struct {
	DB *sql.DB
}

func (m *BlogModel) GetAll(categoryName string, limit, offset int) ([]Blog, error) {
	args := []interface{}{categoryName, categoryName, categoryName, categoryName}
	stmt := `
		WITH paginated_blog_posts AS (
		SELECT DISTINCT b.id, b.publication_date
		FROM blog_posts b
		JOIN blog_categories bc ON bc.blog_post_id = b.id
		JOIN categories c ON c.id = bc.category_id
		WHERE 
			(? = 'All') OR 
			(? = 'Misc.' AND c.category_name NOT IN ('3D', 'Art', 'Code')) OR 
			(c.category_name = ?) OR 
			(? = '')
		ORDER BY b.publication_date DESC
	`

	if limit > 0 {
		stmt += "LIMIT ? OFFSET ?"
		args = append(args, limit, offset)
	}

	stmt += `)
	SELECT 
		b.id, b.title, b.slug, b.blog_image,
		b.content, b.publication_date,
		c.id AS category_id, c.category_name,
		s.id AS subcategory_id, s.subcategory_name
	FROM paginated_blog_posts pb
	JOIN blog_posts b ON b.id = pb.id
	JOIN blog_categories bc ON bc.blog_post_id = b.id
	JOIN categories c ON c.id = bc.category_id
	JOIN blog_subcategories bs ON bs.blog_post_id = b.id
	JOIN subcategories s ON s.id = bs.subcategory_id
	ORDER BY b.publication_date DESC;
	`

	rows, err := m.DB.Query(stmt, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	blogMap := make(map[int]*Blog)
	orderedIDs := []int{}

	for rows.Next() {
		var blog Blog
		var category Category
		var subcategory Subcategory

		err := rows.Scan(
			&blog.ID,
			&blog.Title,
			&blog.Slug,
			&blog.BlogImage,
			&blog.Content,
			&blog.Publication,
			&category.ID,
			&category.Name,
			&subcategory.ID,
			&subcategory.Name,
		)
		if err != nil {
			return nil, err
		}
		if _, exists := blogMap[blog.ID]; !exists {
			blogMap[blog.ID] = &Blog{
				ID:            blog.ID,
				Title:         blog.Title,
				Slug:          blog.Slug,
				BlogImage:     blog.BlogImage,
				Content:       blog.Content,
				Publication:   blog.Publication,
				Categories:    []Category{},
				Subcategories: []Subcategory{},
			}
			orderedIDs = append(orderedIDs, blog.ID)
		}

		//Avoid duplicates
		b := blogMap[blog.ID]
		if !containsCategory(b.Categories, category.ID) {
			b.Categories = append(b.Categories, category)
		}
		if !containsSubcategory(b.Subcategories, subcategory.ID) {
			b.Subcategories = append(b.Subcategories, subcategory)
		}
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	var blogs []Blog
	for _, id := range orderedIDs {
		blogs = append(blogs, *blogMap[id])
	}
	return blogs, nil
}

func (m *BlogModel) Get(slug string) (Blog, error) {
	stmt := `SELECT * FROM blog_posts WHERE slug = ?;`

	row := m.DB.QueryRow(stmt, slug)

	var blog Blog

	err := row.Scan(
		&blog.ID,
		&blog.Title,
		&blog.Slug,
		&blog.BlogImage,
		&blog.Content,
		&blog.Publication,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return Blog{}, ErrNoRecord
		} else {
			return Blog{}, err
		}
	}

	return blog, nil
}
