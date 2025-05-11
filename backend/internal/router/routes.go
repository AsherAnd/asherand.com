package router

import (
	"log/slog"
	"net/http"

	"github.com/asherand/asherand.com/internal/handlers"
	"github.com/asherand/asherand.com/internal/middlewares"
	"github.com/asherand/asherand.com/internal/models"
)

func AddRoutes(
	mux *http.ServeMux,
	authConfig *middlewares.AuthConfig,
	logger *slog.Logger,
	blogModel *models.BlogModel,
	experienceModel *models.ExperienceModel,
	footerModel *models.FooterModel,
	projectModel *models.ProjectModel,
) {
	middleware := middlewares.AuthMiddleware(authConfig, logger)
	fileServer := http.FileServer(http.Dir("../../content/"))

	mux.Handle("GET /v2/{$}", middleware(handlers.Home()))
	mux.Handle("GET /v2/blog/{$}", middleware(handlers.BlogGet(logger, blogModel)))
	mux.Handle("GET /v2/blog/{slug}", middleware(handlers.BlogGetSlug(logger, blogModel)))
	mux.Handle("GET /v2/experience/{$}", middleware(handlers.ExperienceGet(logger, experienceModel)))
	mux.Handle("GET /v2/experience/{id}", middleware(handlers.ExperienceGetID(logger, experienceModel)))
	mux.Handle("GET /v2/footer/{$}", middleware(handlers.FooterGetRandom(logger, footerModel)))
	mux.Handle("GET /v2/footers/{$}", middleware(handlers.FooterGet(logger, footerModel)))
	mux.Handle("GET /v2/projects/{$}", middleware(handlers.ProjectsGet(logger, projectModel)))
	mux.Handle("GET /v2/content/", http.StripPrefix("/v2/content", fileServer))
}
