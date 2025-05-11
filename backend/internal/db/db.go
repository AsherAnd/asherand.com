package db

import (
	"database/sql"

	"github.com/go-sql-driver/mysql"
)

func NewMYSQLConn(cfg mysql.Config) (*sql.DB, error) {
	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		db.Close()
		return nil, err
	}

	return db, err
}
