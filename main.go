package main

import (
	"io"
	"net/http"
	"os"
	"stajprojesi/goCodes/coming"
	"stajprojesi/goCodes/cross"
	"stajprojesi/goCodes/files"
	"stajprojesi/goCodes/home"
	"stajprojesi/goCodes/login"
	"stajprojesi/goCodes/registers"
	"stajprojesi/goCodes/send"
	"stajprojesi/goCodes/senting"
	"stajprojesi/goCodes/users"
	"stajprojesi/mongo"
)

func main() {

	mongo.UsernameGetMongo("mongodb://localhost:27017", "userNameAndPasworld", "user")

	go http.HandleFunc("/", IndexHandler)

	http.HandleFunc("/favicon.ico", HandleFavicon)

	go http.HandleFunc("/home-post", home.Post)
	go http.HandleFunc("/login-post", login.Post)
	go http.HandleFunc("/registers-post", registers.Post)
	go http.HandleFunc("/user-post", users.Post)
	go http.HandleFunc("/send-post", send.Post)
	go http.HandleFunc("/senting-post", senting.Post)
	go http.HandleFunc("/coming-post", coming.Post)
	go http.HandleFunc("/upload-post", files.Post)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.ListenAndServe(":8080", cross.AddCorsHeaders(http.DefaultServeMux))

}

func IndexHandler(w http.ResponseWriter, r *http.Request) {

	urltring := "static/" + r.URL.Path + "/" + r.URL.Path + ".html"

	file, err := os.Open(urltring)
	if err != nil {
		http.Error(w, r.URL.Path+".html bulunamadı: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer file.Close()

	w.Header().Set("Content-Type", "text/html")
	io.Copy(w, file)

}

func HandleFavicon(w http.ResponseWriter, r *http.Request) {
	// Favicon.ico dosyasını sunucudan döndür
	http.ServeFile(w, r, "static/icons/doc.png")
}
