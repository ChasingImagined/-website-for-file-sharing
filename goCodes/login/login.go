package login

import (
	"encoding/json"
	"fmt"
	"net/http"
	"stajprojesi/goCodes/globals"
	"stajprojesi/goCodes/sessions"
	"time"
)

func Post(w http.ResponseWriter, r *http.Request) {
	// yanıt  ve mesaj için Struct oluştur
	var message globals.S_Message_Json
	var userData globals.S_UserLogin_json

	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		http.Error(w, "JSON veri analiz hatası", http.StatusBadRequest)
		return
	}

	// Kullanıcı adı ve parolayı konsola yaz

	if sessions.UserPasswoldControl(w, r, userData.Username, userData.Password) {
		fmt.Println("Kullanıcı Adı:", userData.Username)
		fmt.Println("Parola:", userData.Password)

		cokieValue := sessions.CookieCreate(w, r, userData.Username)
		// Cevap olarak bir çerez gönder
		expiration := time.Now().Add(1 * time.Minute) //  çerez 1dk sonra süresi dolacak
		cookie := http.Cookie{
			Name:     "id",
			Value:    cokieValue,
			Expires:  expiration,
			HttpOnly: true,
			Path:     "/",
		}

		// map cookie degeri ekle
		sessions.CookieUpdate(cokieValue, userData.Username)

		http.SetCookie(w, &cookie)
		fmt.Println("çerez oluşturuldu ve gönderilildi")

		message.Message = "sorun yok"

	} else {

		message.Message = "kulanıcı adı veya parola yanlış"
	}

	// yanıt için json oluştur
	jsonData, err := json.Marshal(message)
	if err != nil {
		http.Error(w, "JSON oluşturma hatası", http.StatusInternalServerError)
		return
	}

	// yanıt döndür
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)
}
