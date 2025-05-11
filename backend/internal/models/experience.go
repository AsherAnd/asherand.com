package models

import (
	"database/sql"
	"errors"
	"time"
)

type Experience struct {
	ID           int       `json:"id"`
	EmployerName string    `json:"employer_name"`
	Title        string    `json:"title"`
	StartDate    time.Time `json:"start_date"`
	EndDate      time.Time `json:"end_date"`
	Description  string    `json:"description"`
	Image        string    `json:"image"`
}

type ExperienceModel struct {
	DB *sql.DB
}

func (m *ExperienceModel) GetAll() ([]Experience, error) {
	stmt := `SELECT experience.id, employers.employer_name, experience.title, experience.start_date,
    experience.end_date, experience.description, experience.image FROM experience INNER JOIN
    employers ON experience.employer_id = employers.id ORDER BY end_date DESC;`

	rows, err := m.DB.Query(stmt)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var experiences []Experience

	for rows.Next() {
		var experience Experience

		err := rows.Scan(
			&experience.ID,
			&experience.EmployerName,
			&experience.Title,
			&experience.StartDate,
			&experience.EndDate,
			&experience.Description,
			&experience.Image,
		)
		if err != nil {
			return nil, err
		}
		experiences = append(experiences, experience)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return experiences, nil
}

func (m *ExperienceModel) Get(id int) (Experience, error) {
	stmt := `SELECT experience.id, employers.employer_name, experience.title, experience.start_date,
    experience.end_date, experience.description, experience.image FROM experience INNER JOIN
    employers ON experience.employer_id = employers.id WHERE experience.id = ?;`

	row := m.DB.QueryRow(stmt, id)

	var experience Experience

	err := row.Scan(
		&experience.ID,
		&experience.EmployerName,
		&experience.Title,
		&experience.StartDate,
		&experience.EndDate,
		&experience.Description,
		&experience.Image,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return Experience{}, ErrNoRecord
		} else {
			return Experience{}, err
		}
	}

	return experience, nil
}
