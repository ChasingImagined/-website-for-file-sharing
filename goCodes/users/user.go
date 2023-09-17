package users

import (
	"encoding/json"
	"fmt"
	"net/http"
	"stajprojesi/goCodes/globals"
)

func Post(w http.ResponseWriter, r *http.Request) {
	// JSON verisini oluşturuyoruz.
	var message globals.S_Message_Json

	err := json.NewDecoder(r.Body).Decode(&message)
	if err != nil {
		http.Error(w, "JSON veri analiz hatası", http.StatusBadRequest)
		return
	}

	var cerzadi = "id"
	cerzvarmi, errCerez := r.Cookie(cerzadi)

	var message2 globals.S_Message_str

	if errCerez == nil {

		message2.Message = "Yeni içerik "

		fmt.Println("cerez: ", cerzvarmi.Value)

	} else {
		fmt.Println(" çerez bulunamadı")

	}

	// Başarılı bir yanıt döndür

	jsonData, err := json.Marshal(message2)
	if err != nil {
		http.Error(w, "JSON oluşturma hatası", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)
}
