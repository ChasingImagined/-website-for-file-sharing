var translations = Getlangue();

function setingLang(){




    
    var recipientName = document.getElementById("label-recipient-name");
    recipientName.textContent  = translations.labael_recipientName
    var messageLabel = document.getElementById('label-message');
    messageLabel.textContent = translations.label_textInput;
    var labelFile = document.getElementById('label-file');
    labelFile.textContent= translations.label_fileLoad;

    var button_submint = document.getElementById('button-submint');
    button_submint.value = translations.button_submint;
    
    var button_ingoing = document.getElementById('button-ingoing');
    button_ingoing.textContent = translations.button_ingoing;

    var button_outgoing = document.getElementById('button-outgoing');
    button_outgoing.textContent = translations.button_outgoing;
    
    

}
setingLang();





function start() {
   
    //bilgileri al
    var recipientName = document.getElementById("recipient-name").value;
    var message = document.getElementById("message-txt").value;
    var fileName = checkFileSelected();
    //json oluşturma ve gönderme fonksiyon
    MetaDataPost(recipientName, message, fileName);
}

function checkFileSelected() {
    var fileInput = document.getElementById("file");
    if (fileInput.files.length > 0) {
        return fileInput.files[0].name;
    } else {
        return "";
    }
}

function getFileSize() {
    var fileInput = document.getElementById("file");
    var files = fileInput.files;

   
    var filesizes = 0
    var filetotalsize =0;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        filetotalsize = file.size
        if (file.size > 150 * 1024 * 1024) {
            alert(translations.alert_file);// dosayboyut uyarısı
            return "err";
        }
        filesizes += file.size
    }
    return (filesizes/1024*1024)

}

function formatFileSize(size) {
    if (size < 1024) {
        return size + " bytes";
    } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + " KB";
    } else {
        return (size / (1024 * 1024)).toFixed(2) + " MB";
    }
}

function MetaDataPost(recipientName, message, fileName) {
    if (getFileSize() != "err"){
        var size = formatFileSize(getFileSize());
        var data = {
            "message": message,
            "fileName": fileName,
            "recipientName": recipientName,
            "fileSize": size
        };
    }else{
        alert(translations.alert_file);// dosya boyutu 150 bden büyük olamaz uyarısı
        return ;
    }
   

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/send-post";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.url == "") {
                    console.log(response);
                } else {
                    window.location.href = response.url;
                }


                filePost();
            } else {
                console.log("Hata oluştu:", xhr.status, xhr.statusText);
            }
        }
    };
}

// dosya göndernme fonksiyonu
function filePost() {
    var fileInput = document.getElementById("file");
    var files = fileInput.files;

    var formData = new FormData();
    // birdenfazla dosya varsa tek tek al ve boyutlarını kontrol et 
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file.size > 150 * 1024 * 1024) {
            alert(translations.alert_file + file.name);//dosya boyutu 150 bden büyük olamaz uyarısı
            return;
        }

        formData.append("dosyalar[]", file);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/send-post", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            window.location.href = "http://localhost:8080/send";
        } else {
            console.log("Hata oluştu:", xhr.status, xhr.statusText);
        }
    };
    // progesbar yüzde 
    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            var percentComplete = (event.loaded / event.total) * 100;
            document.getElementById("progressBar").value = percentComplete;
        }
    };

    xhr.send(formData);
}
