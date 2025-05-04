package models

import (
	"database/sql"
	"errors"
	"time"
)

type Blog struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Slug        string    `json:"slug"`
	BlogImage   string    `json:"blog_image"`
	Content     string    `json:"content"`
	Publication time.Time `json:"publication_date"`
}

type BlogModel struct {
	DB *sql.DB
}

func (m *BlogModel) GetAll() ([]Blog, error) {
	stmt := `SELECT * FROM blog_posts ORDER BY publication_date DESC;`

	rows, err := m.DB.Query(stmt)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var blogs []Blog

	for rows.Next() {
		var blog Blog

		err := rows.Scan(
			&blog.ID,
			&blog.Title,
			&blog.Slug,
			&blog.BlogImage,
			&blog.Content,
			&blog.Publication,
		)
		if err != nil {
			return nil, err
		}
		blogs = append(blogs, blog)
	}

	if err = rows.Err(); err != nil {
		return nil, err
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
