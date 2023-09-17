package cross

import "net/http"

func AddCorsHeaders(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// CORS başlıklarını ekleyerek diğer originlere erişime izin ver
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == "OPTIONS" {
			// CORS önişlem (preflight) isteğine yanıt ver
			return
		}

		h.ServeHTTP(w, r)
	}
}
