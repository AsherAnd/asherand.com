package models

import (
	"database/sql"
	"errors"
)

type Footer struct {
	ID   int    `json:"id"`
	Text string `json:"text"`
	Link string `json:"link"`
}

type FooterModel struct {
	DB *sql.DB
}

func (m *FooterModel) GetAll() ([]Footer, error) {
	stmt := `SELECT * FROM footers;`

	rows, err := m.DB.Query(stmt)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var footers []Footer

	for rows.Next() {
		var footer Footer

		err := rows.Scan(
			&footer.ID,
			&footer.Text,
			&footer.Link,
		)
		if err != nil {
			return nil, err
		}
		footers = append(footers, footer)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return footers, nil
}

func (m *FooterModel) GetRandom() (Footer, error) {
	stmt := `SELECT * FROM footers ORDER BY RAND() LIMIT 1;`

	row := m.DB.QueryRow(stmt)

	var footer Footer

	err := row.Scan(
		&footer.ID,
		&footer.Text,
		&footer.Link,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return Footer{}, ErrNoRecord
		} else {
			return Footer{}, err
		}
	}

	return footer, nil
}
