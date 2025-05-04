package middlewares

import (
	"crypto/subtle"
	"log/slog"
	"net/http"
	"strings"

	"github.com/asherand/asherand.com/internal/utils"
)

type AuthConfig struct {
	APIKey        string
	AllowedDomain string
	APIKeyHeader  string
	RefererHeader string
}

func AuthMiddleWare(config AuthConfig, logger *slog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			apiKey := r.Header.Get(config.APIKeyHeader)

			if !isValidAPIKey(apiKey, config.APIKey) {
				logger.Info("Invalid API key", slog.String("addr", r.RemoteAddr))
				utils.ClientError(http.StatusUnauthorized)
				return
			}

			referer := r.Header.Get(config.RefererHeader)

			if !isAllowedDomain(referer, config.AllowedDomain) {
				logger.Info("Request from unauthorized domain", slog.String("referer", referer))
				utils.ClientError(http.StatusForbidden)
				return
			}

			next.ServeHTTP(w, r)

		})
	}
}

func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-API-Key")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func isValidAPIKey(providedKey, expectedKey string) bool {
	if providedKey == "" || expectedKey == "" {
		return false
	}

	// Use crypto/subtle for secure comparison to prevent timing attacks
	return subtle.ConstantTimeCompare([]byte(providedKey), []byte(expectedKey)) == 1
}

func isAllowedDomain(referer, allowedDomain string) bool {
	if allowedDomain == "" {
		// If no allowed domain is configured, allow all
		return true
	}

	if referer == "" {
		return false
	}

	return strings.Contains(referer, allowedDomain)
}
