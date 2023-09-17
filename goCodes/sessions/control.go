package sessions

import (
	"fmt"
	"net/http"
	"stajprojesi/goCodes/globals"
)

func SessionControl(cookie string) {

	// Dizenin son 10 karakterini hariç alalım
	username := cookie[:len(cookie)-10]

	globals.Mu_M_UsersSessionCokie.Lock() // mutex kilitle
	value, ok := globals.M_UsersSessionCokie[username]
	globals.Mu_M_UsersSessionCokie.Unlock() // kilit aç

	if ok {

		fmt.Printf("'%s' anahtarı var ve değeri: %s\n", username, value)
		if cookie == value {
			fmt.Println("dogru")
		} else {
			fmt.Println("yanlış")
		}

	} else {
		fmt.Printf("'%s' anahtarı bulunamadı.\n", value)
	}

}

func UserPasswoldControl(w http.ResponseWriter, r *http.Request, username string, password string) bool {

	globals.Mu_M_UsersSessionCokie.Lock() // mutex kilitle
	userPassword, ok := globals.M_UsernamePsworld[username]
	globals.Mu_M_UsersSessionCokie.Unlock() // kilit aç

	if ok {

		if password == userPassword {
			return true
		}

	}

	return false
}
