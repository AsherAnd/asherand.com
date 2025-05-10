package main

import (
	"context"
	"crypto/tls"
	"flag"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"time"

	"github.com/asherand/asherand.com/internal/db"
	"github.com/asherand/asherand.com/internal/middlewares"
	"github.com/asherand/asherand.com/internal/models"
	"github.com/asherand/asherand.com/internal/router"
	"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func NewServer(logger *slog.Logger, authConfig *middlewares.AuthConfig, blogModel *models.BlogModel, experienceModel *models.ExperienceModel, footerModel *models.FooterModel, projectModel *models.ProjectModel) http.Handler {
	mux := http.NewServeMux()
	router.AddRoutes(mux, authConfig, logger, blogModel, experienceModel, footerModel, projectModel)

	var handler http.Handler = mux
	handler = middlewares.CORSMiddleware(handler)
	return handler
}

func init() {
	err := godotenv.Load("../../.env")
	if err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
		os.Exit(1)
	}
}

func run(ctx context.Context) error {
	ctx, cancel := signal.NotifyContext(ctx, os.Interrupt)
	defer cancel()

	addr := flag.String("addr", "8080", "HTTP network address")
	flag.Parse()

	logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		AddSource: true,
	}))

	authConfig := &middlewares.AuthConfig{
		APIKey:        os.Getenv("APIKEY"),
		AllowedDomain: "", ///// Make website
		APIKeyHeader:  "X-API-Key",
		RefererHeader: "Referer",
	}

	cfg := mysql.Config{
		User:      os.Getenv("USER"),
		Passwd:    os.Getenv("PASS"),
		Net:       "tcp",
		Addr:      ":3306", // replace with env port
		DBName:    os.Getenv("DATABASE"),
		ParseTime: true,
	}

	db, err := db.NewMYSQLConn(cfg)
	if err != nil {
		return err
	}
	defer db.Close()

	tlsConfig := &tls.Config{
		CurvePreferences: []tls.CurveID{tls.X25519, tls.CurveP256},
	}

	blogModel := &models.BlogModel{DB: db}
	experienceModel := &models.ExperienceModel{DB: db}
	footerModel := &models.FooterModel{DB: db}
	projectModel := &models.ProjectModel{DB: db}

	srv := NewServer(logger, authConfig, blogModel, experienceModel, footerModel, projectModel)
	httpServer := &http.Server{
		Addr:      net.JoinHostPort("", *addr),
		Handler:   srv,
		ErrorLog:  slog.NewLogLogger(logger.Handler(), slog.LevelError),
		TLSConfig: tlsConfig,
	}
	go func() {
		logger.Info("starting server", slog.String("addr", httpServer.Addr))
		if err := httpServer.ListenAndServeTLS(os.Getenv("TLSCERT"), os.Getenv("TLSKEY")); err != nil && err != http.ErrServerClosed {
			fmt.Fprintf(os.Stderr, "error listening and serving: %s\n", err)
		}
	}()
	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		<-ctx.Done()
		shutdownCtx := context.Background()
		shutdownCtx, cancel := context.WithTimeout(shutdownCtx, 10*time.Second)
		defer cancel()
		if err := httpServer.Shutdown(shutdownCtx); err != nil {
			fmt.Fprintf(os.Stderr, "error shutting down http server: %s\n", err)
		}
	}()
	wg.Wait()
	return nil
}

func main() {
	ctx := context.Background()

	if err := run(ctx); err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
		os.Exit(1)
	}
}
