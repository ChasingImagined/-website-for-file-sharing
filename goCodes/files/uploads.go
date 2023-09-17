package files

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
)

func Post(w http.ResponseWriter, r *http.Request) {
	// JSON verisindeki alanları temsil eden bir struct tanımlanır
	type data struct {
		Id       string `json:"id"`
		Name     string `json:"name"`
		Filename string `json:"filename"`
	}

	var message data

	// Gelen JSON verisini 'message' struct'ına çözümler
	err := json.NewDecoder(r.Body).Decode(&message)
	if err != nil {
		http.Error(w, "JSON veri analiz hatası", http.StatusBadRequest)
		return
	}

	// Gönderilecek dosyanın yolu oluşturulur
	filePath := filepath.Join("user", message.Name, message.Filename, message.Filename)
	log.Println(filePath)

	// Dosya açılır
	file, err := os.Open(filePath)
	if err != nil {
		http.Error(w, "Dosya bulunamadı", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	// Dosyanın boyutunu al
	fileInfo, err := file.Stat()
	if err != nil {
		http.Error(w, "Dosya boyutu alınamadı", http.StatusInternalServerError)
		return
	}
	fileSize := fileInfo.Size()

	// Dosyanın içeriğini yanıt olarak göndermek üzere yanıt başlıkları ayarlanır
	w.Header().Set("Content-Disposition", "attachment; filename="+message.Filename)
	w.Header().Set("Content-Type", http.DetectContentType(nil))
	w.Header().Set("Content-Length", strconv.FormatInt(fileSize, 10))

	// Dosyanın içeriği yanıt gövdesine kopyalanır
	_, err = io.Copy(w, file)
	if err != nil {
		http.Error(w, "Dosya gönderilemedi", http.StatusInternalServerError)
		return
	}
}
