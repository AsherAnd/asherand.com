package router

import (
	"log/slog"
	"net/http"

	"github.com/asherand/asherand.com/internal/handlers"
	"github.com/asherand/asherand.com/internal/models"
)

func AddRoutes(
	mux *http.ServeMux,
	logger *slog.Logger,
	blogModel *models.BlogModel,
	experienceModel *models.ExperienceModel,
	footerModel *models.FooterModel,
	projectModel *models.ProjectModel,
) {
	fileServer := http.FileServer(http.Dir("../../content/"))
	mux.Handle("GET /v2/{$}", handlers.Home())
	mux.Handle("GET /v2/blog/{$}", handlers.BlogGet(logger, blogModel))
	mux.Handle("GET /v2/blog/{slug}", handlers.BlogGetSlug(logger, blogModel))
	mux.Handle("GET /v2/experience/{$}", handlers.ExperienceGet(logger, experienceModel))
	mux.Handle("GET /v2/experience/{id}", handlers.ExperienceGetID(logger, experienceModel))
	mux.Handle("GET /v2/footer/{$}", handlers.FooterGetRandom(logger, footerModel))
	mux.Handle("GET /v2/footers/{$}", handlers.FooterGet(logger, footerModel))
	mux.Handle("GET /v2/projects/{$}", handlers.ProjectsGet(logger, projectModel))
	mux.Handle("GET /v2/content/", http.StripPrefix("/v2/content", fileServer))
}
