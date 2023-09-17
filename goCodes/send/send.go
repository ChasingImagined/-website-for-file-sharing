package send

import (
	"encoding/json"
	"fmt"
	"net/http"
	"stajprojesi/goCodes/files"
	"stajprojesi/goCodes/globals"
	"stajprojesi/goCodes/sessions"
	"strings"
	"time"
)

func Post(w http.ResponseWriter, r *http.Request) {

	cerezvarmi, err := r.Cookie("id")
	contentType := r.Header.Get("Content-Type")

	if err == nil {

		name, err := sessions.CookieControlName(cerezvarmi.Value)
		if err == nil {

			// İstekin Content-Type başlığını kontrol ediyoruz

			if contentType == "application/json" {

				jsons(w, r, name)

			} else if strings.HasPrefix(contentType, "multipart/form-data") {

				files.FileDownload(w, r, name)

			} else if contentType == "text/plain" {
				// Düz metin işlemleri
			} else {
				http.Error(w, "Kabul edilemez http başlığı: "+contentType, http.StatusBadRequest)
				return
			}

		}
	} else {
		errToLogin(w, r)
	}

}

func errToLogin(w http.ResponseWriter, r *http.Request) {

	// Başarılı bir yanıt döndür

	var mesage globals.S_Message_Json
	mesage.Message = "veri alınamadı"
	mesage.Url = globals.Str_LoginUrl

	jsonData, err := json.Marshal(mesage)
	if err != nil {
		http.Error(w, "JSON oluşturma hatası", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)

}

func jsons(w http.ResponseWriter, r *http.Request, name string) {

	// JSON verisini oluştur.

	var data Data

	err := json.NewDecoder(r.Body).Decode(&data)

	if err != nil {
		http.Error(w, "JSON veri analiz hatası", http.StatusBadRequest)
		return
	} else {
		now := time.Now()
		year, month, day := now.Date()
		hour, minute, second := now.Clock()

		formattedTime := fmt.Sprintf("%02d:%02d:%02d %02d-%02d-%d", hour, minute, second, month, day, year)

		var dataMeta = make(map[string]string)
		dataMeta["name"] = data.RecipientName
		dataMeta["mesage"] = data.Message
		dataMeta["filename"] = data.FileName
		dataMeta["fileSize"] = data.FileSize
		dataMeta["time"] = formattedTime
		files.InAndOutgoingAddMongo("mongodb://localhost:27017", "outgoing", name, dataMeta)

		var dataMeta2 = make(map[string]string)
		dataMeta2["filename"] = data.FileName
		dataMeta2["name"] = name
		dataMeta2["message"] = data.Message
		dataMeta2["filename"] = data.FileName
		dataMeta2["fileSize"] = data.FileSize
		dataMeta2["time"] = formattedTime
		files.InAndOutgoingAddMongo("mongodb://localhost:27017", "ingoing", data.RecipientName, dataMeta2)

	}

	// Başarılı bir yanıt döndür

	var mesage globals.S_Message_Json
	mesage.Message = "veri alındı"

	jsonData, err := json.Marshal(mesage)
	if err != nil {
		http.Error(w, "JSON oluşturma hatası", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)
}
