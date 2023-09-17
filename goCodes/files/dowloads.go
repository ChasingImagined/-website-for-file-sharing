package files

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

func FileDownload(w http.ResponseWriter, r *http.Request, username string) {

	err := r.ParseMultipartForm(2 * 1024 * 1024) // Max 2 MB bellek kullan
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	folderPath := "user" // Dosyaların depolanacağı klasör adı

	err = os.MkdirAll(folderPath, os.ModePerm)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for _, fileHeaders := range r.MultipartForm.File {
		for _, fileHeader := range fileHeaders {
			file, err := fileHeader.Open()
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			if fileHeader.Size > 150*1024*1024 {
				errMsg := fmt.Sprintf("Dosya boyutu 150 MB'dan büyük olamaz: %s", fileHeader.Filename)
				http.Error(w, errMsg, http.StatusBadRequest)
				continue // Bu dosyayı atla ve bir sonraki dosyaya geç
			}

			newFolderPath := filepath.Join(folderPath, username, filepath.Base(fileHeader.Filename))
			dosyaYolu := filepath.Join(newFolderPath, fileHeader.Filename)

			FileListUpdater(dosyaYolu, true) // map key deposuna elaman ekle

			err = os.MkdirAll(newFolderPath, os.ModePerm) // newFolderPath klasörünü oluştur
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			f, err := os.OpenFile(dosyaYolu, os.O_WRONLY|os.O_CREATE, 0666)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			_, err = io.Copy(f, file)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				f.Close()
				return
			}

			f.Close()

			FileListUpdater(dosyaYolu, false) // map key deposuna elaman çıkar
			fmt.Fprintf(w, "Dosya yükleme tamamlandı: %s\n", fileHeader.Filename)
		}
	}

}
