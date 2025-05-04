package models

import (
	"database/sql"
	"time"
)

type Project struct {
	ID              int            `json:"id"`
	ProjectName     string         `json:"project_name"`
	ProjectUrl      sql.NullString `json:"project_url"`
	ProjectImage    string         `json:"project_image"`
	CompletiontDate time.Time      `json:"completion_date"`
	BlogSlug        sql.NullString `json:"blog_slug"`
}

type ProjectModel struct {
	DB *sql.DB
}

func (m *ProjectModel) GetAll() ([]Project, error) {
	stmt := `SELECT * FROM projects;`

	rows, err := m.DB.Query(stmt)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var projects []Project

	for rows.Next() {
		var project Project

		err := rows.Scan(
			&project.ID,
			&project.ProjectName,
			&project.ProjectUrl,
			&project.ProjectImage,
			&project.CompletiontDate,
			&project.BlogSlug,
		)
		if err != nil {
			return nil, err
		}
		projects = append(projects, project)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return projects, nil
}

func (m *ProjectModel) Latest() ([]Project, error) {
	return nil, nil
}
