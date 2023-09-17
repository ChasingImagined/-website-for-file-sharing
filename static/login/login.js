var translations = Getlangue();


function setingLangue(){

var h_login = document.getElementById('h_login');
h_login.textContent= translations.h_login;

var label_username = document.getElementById("label-username");
label_username.textContent = translations.label_userName;

var label_password = document.getElementById("label_password");
label_password.textContent = translations.label_paswold;

var hint_username = document.getElementById('username');
hint_username.placeholder = translations.label_userName_hint;
var hint_paswold = document.getElementById('password');
hint_paswold.placeholder = translations.label_userName_hint;

var button_login = document.getElementById('button_login');
button_login.textContent = translations.button_login;

var button_register = document.getElementById('button_register');
button_register.textContent = translations.button_register;

}

setingLangue();


function login() {
    // Kullanıcı adı ve parola alanlarından değerleri al
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // JSON verisini oluştur
    var data = {
        "username": username,
        "password": password
    };

    // XMLHttpRequest nesnesini oluştur
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/login-post"; // Sunucunun adresi

    // Sunucuya isteği aç
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // İsteği gönder
    xhr.send(JSON.stringify(data));

    // Sunucudan yanıt gelince
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            // Sunucudan gelen yanıtı işle
            console.log(response);
            if ( response.message =='sorun yok'){
                window.location.href = "http://localhost:8080/send"
            }else{
                alert(translations.alert_login)
            }
        }
    };
}