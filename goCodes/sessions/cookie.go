package sessions

import (
	"math/rand"
	"net/http"
	"stajprojesi/goCodes/globals"
	"strconv"
)

type Errsutruct struct {
	Message string
}

func (e Errsutruct) Error() string {
	return e.Message
}

func CookieControlName(cooke string) (string, error) {

	username := cooke[:len(cooke)-10]

	globals.Mu_M_UsersSessionCokie.Lock() // mutex kilitle
	key, ok := globals.M_UsersSessionCokie[username]
	globals.Mu_M_UsersSessionCokie.Unlock() // kilit aç

	if ok {

		if cooke == key {
			return username, nil
		}
	}

	return "", Errsutruct{Message: "kulanıcı bulunamdı"}
}

func CookieUpdate(cookie string, username string) {
	globals.Mu_M_UsersSessionCokie.Lock() //kilitle

	globals.M_UsersSessionCokie[username] = cookie

	globals.Mu_M_UsersSessionCokie.Unlock() //kilitaç

}

func CookieCreate(w http.ResponseWriter, r *http.Request, username string) string {

	return username + randomNumberString(10)

}

func randomNumberString(howMany int) string {
	var randomNumber string
	for i := 0; i < howMany; i++ {

		randomNumber += strconv.Itoa(rand.Intn(9))

	}

	return randomNumber
}
