package handlers

import (
	"errors"
	"log/slog"
	"net/http"
	"strconv"

	"github.com/asherand/asherand.com/internal/models"
	"github.com/asherand/asherand.com/internal/utils"
)

func Home() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Welcome to my API!"))
	}
}

func BlogGet(logger *slog.Logger, blogModel *models.BlogModel) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		blogPosts, err := blogModel.GetAll()
		if err != nil {
			if errors.Is(err, models.ErrNoRecord) {
				http.NotFound(w, r)
			} else {
				utils.ServerError(logger, err)
			}
			return
		}
		utils.WriteJSON(w, http.StatusOK, blogPosts)

	}
}

func BlogGetSlug(logger *slog.Logger, blogModel *models.BlogModel) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		slug := r.PathValue("slug")

		blogPost, err := blogModel.Get(slug)
		if err != nil {
			if errors.Is(err, models.ErrNoRecord) {
				http.NotFound(w, r)
			} else {
				utils.ServerError(logger, err)
			}
			return
		}

		utils.WriteJSON(w, http.StatusOK, blogPost)
	}
}

func ExperienceGet(logger *slog.Logger, experienceModel *models.ExperienceModel) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		experiences, err := experienceModel.GetAll()
		if err != nil {
			if errors.Is(err, models.ErrNoRecord) {
				http.NotFound(w, r)
			} else {
				utils.ServerError(logger, err)
			}
			return
		}
		utils.WriteJSON(w, http.StatusOK, experiences)

	}
}

func ExperienceGetID(logger *slog.Logger, experienceModel *models.ExperienceModel) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil || id < 1 {
			http.NotFound(w, r)
			return
		}

		experience, err := experienceModel.Get(id)
		if err != nil {
			if errors.Is(err, models.ErrNoRecord) {
				http.NotFound(w, r)
			} else {
				utils.ServerError(logger, err)
			}
			return
		}

		utils.WriteJSON(w, http.StatusOK, experience)
	}
}

func FooterGet(logger *slog.Logger, footerModel *models.FooterModel) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		footers, err := footerModel.GetAll()
		if err != nil {
			if errors.Is(err, models.ErrNoRecord) {
				http.NotFound(w, r)
			} else {
				utils.ServerError(logger, err)
			}
			return
		}
		utils.WriteJSON(w, http.StatusOK, footers)
	}
}

func FooterGetRandom(logger *slog.Logger, footerModel *models.FooterModel) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		footer, err := footerModel.GetRandom()
		if err != nil {
			if errors.Is(err, models.ErrNoRecord) {
				http.NotFound(w, r)
			} else {
				utils.ServerError(logger, err)
			}
			return
		}
		utils.WriteJSON(w, http.StatusOK, footer)
	}
}

func ProjectsGet(logger *slog.Logger, projectModel *models.ProjectModel) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		projects, err := projectModel.GetAll()
		if err != nil {
			if errors.Is(err, models.ErrNoRecord) {
				http.NotFound(w, r)
			} else {
				utils.ServerError(logger, err)
			}
			return
		}
		utils.WriteJSON(w, http.StatusOK, projects)
	}
}
