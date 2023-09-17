var translations = Getlangue();
function setingLangue(){

var h_coming = document.getElementById('h_coming');
h_coming.textContent = translations.h_coming;


var button_senting= document.getElementById('button_senting');
button_senting.textContent = translations.button_ingoing;


var button_message= document.getElementById('button_mesage');
button_message.textContent = translations["button_mesage send"];



}


setingLangue()



function cilick(id) {
    console.log(id); // İstemci tarafında ilgili öğenin kimliğini (id) görüntüle

    var filename = "";

    var file = document.getElementById(id + 'file');
    if (file) {
        filename = file.textContent; // İlgili dosya adını al
    }

    // JSON verisini oluştur
    var data = {
        "id": id,
        "name": document.getElementById(id + 'name').textContent,
        "filename": filename
    };

    // XMLHttpRequest nesnesini oluştur
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/upload-post"; // Sunucunun adresi

    // Sunucuya isteği aç 
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Sunucudan gelen dosyayı doğrudan indir
    xhr.responseType = "blob";  // Yanıtı bir Blob olarak bekliyoruz

    // İsteği gönder
    xhr.send(JSON.stringify(data));

    // Sunucudan yanıt geldiğinde
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // İstek tamamlandı mı?
            if (xhr.status === 200) { // Yanıt başarılı mı?

                // Dosya türünü al
                var contentType = xhr.getResponseHeader('Content-Type');
                
                // Dosya adını al
                var contentDisposition = xhr.getResponseHeader('Content-Disposition');
                var filename = contentDisposition.split(';')[1].trim().split('=')[1];

                // Dosyayı indir veya görüntüle
                var blob = xhr.response;  // Yanıt blob olarak geldi
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click(); // Yeni bir tıklama olayı tetikler
                window.URL.revokeObjectURL(url); // URL'yi serbest bırak
                document.body.removeChild(a); // Öğeyi kaldır
            } else {
                // Sunucudan hata yanıtı geldiğinde yapılacaklar
                console.error('Sunucudan hata yanıtı:', xhr.status, xhr.statusText);
            }
        }
    };
}


MessagePost();




function MessagePost() {

    var message = "mesaj"
    // JSON verisini oluştur
    var data = {
        "message": message,
        "url": "naaber"

    };

    // XMLHttpRequest nesnesini oluştur
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/coming-post"; // Sunucunun adresini

    // Sunucuya isteği aç 
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // İsteği gönder
    xhr.send(JSON.stringify(data));

    // Sunucudan yanıt gelince
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                var response = JSON.parse(xhr.responseText);
                run(response);
                console.log(response);
            } catch (e) {
                console.error("JSON parse hatası:", e);
            }
        }
    };



}

function run(response) {

    if (response["data"] != null) {



        // p.textContent = response.data[0]["filename"];

        const mainBox = document.getElementById("main-box");
        const firstChild = mainBox.firstChild;
        //   mainBox.insertBefore(p, firstChild); // Yeni elemanı en alta ekler



        const reversedArray = response["data"].reverse();
        reversedArray.forEach(element => {

            const div = document.createElement('div');
            div.classList.add('outgoing');


            var h1 = document.createElement('h1');
            h1.id = element["_id"] + 'name'
            h1.textContent = element["name"]
            div.appendChild(h1);

            var fileDiv = document.createElement('div');
            fileDiv.classList.add('file');

            var img = document.createElement('img');






            var infoDiv = document.createElement('div');
            infoDiv.classList.add('info');

            var zaman = document.createElement('p');
                zaman.textContent = element["time"];
                infoDiv.appendChild(zaman);

            if (element["filename"] != "") {
                // Metnin uzunluğunu bul
                let metinUzunlugu = element["filename"].length;

                // Son 3 harfi al

                let son3harf = element["filename"].substring(metinUzunlugu - 3, metinUzunlugu);
                let uzanti = ["exe", "jpg", "png", "zip", "pdf", "doc",]
                if (uzanti.includes(son3harf)) {


                    img.src = 'static/icons/' + son3harf + '.png';
                    fileDiv.appendChild(img);

                } else {

                    img.src = 'static/icons/doc.png';
                    fileDiv.appendChild(img);
                }

                var dosyaAdi = document.createElement('p');
                dosyaAdi.id = element["_id"] + 'file'
                dosyaAdi.textContent = element["filename"];
                infoDiv.appendChild(dosyaAdi);

                var dosyaBoyut = document.createElement('p');
                dosyaBoyut.textContent = element["fileSize"];
                infoDiv.appendChild(dosyaBoyut);

                /*const dosyaBoyutuPara = document.createElement('p');
                dosyaBoyutuPara.textContent = 'dosya boyut ' + 50;
                infoDiv.appendChild(dosyaBoyutuPara);*/

                var button = document.createElement('button');
                button.textContent = translations.btton_download;
                button.id = element["_id"];
                button.onclick = function () {
                    cilick(element["_id"]);
                };


                infoDiv.appendChild(button);
            }



            fileDiv.appendChild(infoDiv);
            div.appendChild(fileDiv);

            const p = document.createElement('p');
            p.textContent = element["message"];
            div.appendChild(p);



            mainBox.insertBefore(div, firstChild); // Yeni elemanı en alta ekler

        });





        // Yeni içerik ekledikten sonra kaydırma çubuğunu güncelle

        mainBox.scrollTop = mainBox.scrollHeight;



    }



}

