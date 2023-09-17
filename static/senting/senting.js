var translations = Getlangue();



function setingLang(){
var button_coming =  document.getElementById('button-coming');
button_coming.textContent = translations.h_coming;

var button_mesage =  document.getElementById('button-message');
button_mesage.textContent = translations["button_mesage send"];

var h_outgoing = document.getElementById('h_outgoing');
h_outgoing.textContent = translations.h_senting;

}


setingLang();





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
    var url = "http://localhost:8080/senting-post"; // Sunucunun adresini

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
            run(response);





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


            const h1 = document.createElement('h1');
            h1.textContent = translations.labael_recipientName + element["name"]
            div.appendChild(h1);

            const fileDiv = document.createElement('div');
            fileDiv.classList.add('file');

            const img = document.createElement('img');

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('info');
            fileDiv.appendChild(infoDiv);
            div.appendChild(fileDiv);


            const zaman = document.createElement('p');
            zaman.textContent = element["time"];
            infoDiv.appendChild(zaman);

            if (element["filename"] != "") {


                if (element["filename"] && element["filename"].length > 0) {
                    const metinUzunlugu = element["filename"].length;
                    const son3harf = element["filename"].substring(metinUzunlugu - 3, metinUzunlugu);
                    const uzanti = ["exe", "jpg", "png", "zip", "pdf", "doc"];

                    if (uzanti.includes(son3harf)) {
                        img.src = 'static/icons/' + son3harf + '.png';
                        fileDiv.appendChild(img);
                    } else {
                        img.src = 'static/icons/doc.png';
                        fileDiv.appendChild(img);
                    }
                } else {
                    img.src = 'static/icons/doc.png';
                    fileDiv.appendChild(img);
                }


               

                

                const dosyaAdi = document.createElement('p');
                dosyaAdi.textContent = element["filename"];
                infoDiv.appendChild(dosyaAdi);

                const dosyaboyut = document.createElement('p');
                dosyaboyut.textContent = element["fileSize"];
                infoDiv.appendChild(dosyaboyut);

            }

            /*const dosyaBoyutuPara = document.createElement('p');
            dosyaBoyutuPara.textContent = 'dosya boyut ' + 50;
            infoDiv.appendChild(dosyaBoyutuPara);*/
            /*
              const button = document.createElement('button');
              button.textContent = 'indir';
              button.onclick = MessagePost;
              infoDiv.appendChild(button);,
            */

            

            const p = document.createElement('p');
            p.textContent = element["mesage"];
            div.appendChild(p);



            mainBox.insertBefore(div, firstChild); // Yeni elemanı en alta ekler

        });





        // Yeni içerik ekledikten sonra kaydırma çubuğunu güncelle

        mainBox.scrollTop = mainBox.scrollHeight;




    }



}

