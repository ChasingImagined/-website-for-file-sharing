function MessagePost() {

  var message = "mesaj"
  // JSON verisini oluştur
  var data = {
    "message": message,

  };

  // XMLHttpRequest nesnesini oluştur
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:8080/home-post"; // Sunucunun adresini buraya yazın

  // Sunucuya isteği açın
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  // İsteği gönderin
  xhr.send(JSON.stringify(data));

  // Sunucudan yanıt gelince
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      // Sunucudan gelen yanıtı işleyin
      console.log(response);
    }
  };
}