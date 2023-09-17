package senting

import (
	"encoding/json"
	"log"
	"net/http"
	"stajprojesi/goCodes/files"
	"stajprojesi/goCodes/globals"
	"stajprojesi/goCodes/sessions"
)

func Post(w http.ResponseWriter, r *http.Request) {
	cerezvarmi, err := r.Cookie("id")

	if err == nil {
		if err == nil {

			name, err := sessions.CookieControlName(cerezvarmi.Value)
			if err == nil {

				if err != nil {
					panic("tehikeli hta çerez adı yok")
				}

				var userData globals.S_Message_Json

				err2 := json.NewDecoder(r.Body).Decode(&userData)
				if err2 != nil {

					http.Error(w, "JSON veri analiz hatası", http.StatusBadRequest)
					return
				}

				log.Println(userData.Message)
			}

			var data globals.M_InAndOutgoingJison
			data.Data = files.InAndOutgoingGetMongo("mongodb://localhost:27017", "outgoing", name)

			// yanıt için json oluştur
			jsonData, err := json.Marshal(data)
			if err != nil {
				http.Error(w, "JSON oluşturma hatası", http.StatusInternalServerError)
				return
			}

			// yanıt döndür
			w.Header().Set("Content-Type", "application/json")
			w.Write(jsonData)
		}

	}

}
