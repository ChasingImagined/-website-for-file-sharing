package registers

import (
	"encoding/json"
	"log"
	"net/http"
	"stajprojesi/goCodes/globals"
	"stajprojesi/mongo"
)

func Post(w http.ResponseWriter, r *http.Request) {

	type data struct {
		Username string `json:"username"`
		Pasworld string `json:"password"`
	}

	var userData data

	err2 := json.NewDecoder(r.Body).Decode(&userData)
	if err2 != nil {

		http.Error(w, "JSON veri analiz hatası", http.StatusBadRequest)
		log.Println("json analiz hatası")
		return
	}

	if _, ok := globals.M_UsernamePsworld[userData.Username]; !ok {

		globals.Mu_M_UsernamePsworld.Lock()
		globals.M_UsernamePsworld[userData.Username] = userData.Pasworld
		globals.Mu_M_UsernamePsworld.Unlock()

		log.Println(" naber : ", globals.M_UsernamePsworld)
		mongo.UsernameSetMongo("mongodb://localhost:27017", "userNameAndPasworld", "user")

		w.WriteHeader(http.StatusOK) // 200 (OK) durum kodunu ayarla

		var response globals.S_Message_Json

		response.Message = "başarılı"
		response.Url = "http://localhost:8080/home"
		// JSON verisini oluştur ve yaz
		jsonData, err := json.Marshal(response)
		if err != nil {
			http.Error(w, "JSON oluşturma hatası", http.StatusInternalServerError)
			return
		}
		w.Write(jsonData)

	} else {
		http.Error(w, " bu kulanıcı adı  daha önceden alınmış", http.StatusBadRequest)
		log.Println("bu kulanıcı adı  daha önceden alınmış")
	}

}
