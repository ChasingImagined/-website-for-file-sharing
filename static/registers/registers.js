var translations = Getlangue();

function setingLangue() {

    var h_registers = document.getElementById('h_registers');
    h_registers.textContent = translations.button_register;

    var label_userName = document.getElementById('label-userName');
    label_userName.textContent = translations.label_userName;

var input_userName = document.getElementById('username');
    input_userName.placeholder = translations.label_userName_hint;

var label_paswold= document.getElementById('label-paswold');
    label_paswold.textContent = translations.label_paswold;

var input_paswold = document.getElementById('password');
    input_paswold.placeholder = translations.label_paswold_hint;


var label_paswold2= document.getElementById('label-paswold2');
    label_paswold2.textContent = translations.label_paswold2;

var input_paswold2 = document.getElementById('password2');
    input_paswold2.placeholder = translations.label_paswold_hint;
 
var button_submint = document.getElementById('button-submint');
button_submint.textContent = translations.button_register;

var button_login = document.getElementById('button_login');
button_login.textContent = translations.button_login;

}
setingLangue();



function login() {
    // Kullanıcı adı ve parola alanlarından değerleri al
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;

    if (password == password2) {


        // JSON verisini oluştur
        var data = {
            "username": username,
            "password": password
        };

        // XMLHttpRequest nesnesini oluştur
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:8080/registers-post"; // Sunucunun adresi

        // Sunucuya isteği aç
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        // İsteği gönder
        xhr.send(JSON.stringify(data));

        // Sunucudan yanıt gelince
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);

                window.location.href = "http://localhost:8080/login"
            }
        };




    } else {
        alert(translations.alert_register_pasworld)
    }


}