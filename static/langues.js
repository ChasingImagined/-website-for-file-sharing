function Getlangue() {
    // Yeni bir Map oluşturma
    // Anahtar-değer çiftleri ile Map oluşturma
    var M_Langue = new Map([
        ['tr', 'Türkçe'],
        ['en', 'English'],
        ['fr', 'Français'],
        ['es', 'Español'],
        ['de', 'Deutsch'],
        ['zh', '中国人'],
        ['ja', '日本語'],
        ['ko', '한국인'],
        ['ru', 'Русский']
    ]);


    const userLanguage = navigator.language.split('-')[0]; // Dil kodunu almak için '-' karakterine göre böldük.
    if (localStorage.getItem('langue') != null) {
        lang = localStorage.getItem('langue');
        console.log("kaıytlı dil ", lang);
    } else if (M_Langue.has(userLanguage)) {

        lang = localStorage.setItem("Langue", userLanguage)
        console.log("tarayıcı dili", lang);
    } else {
        lang = 'en'
        console.log("defuld dil", lang);
    }


    return StartLangue();
}
var lang = 'en'
var objectLangue = {
    //login

    "h_login": "Giriş Yap",
    "label_userName_hint": "Kulanıcı Aınızı giriniz",
    "label_paswold_hint": "Parolanızı giriniz ",
    "alert_login": "Kulanıcı adı yada parola hatalı",

    "button_register": "Kayıt ol",

    //register
    "label_userName": "KulanıcıAd: ",    //login and register
    "label_paswold": "Parola: ",         //login and register
    "button_login": "Giriş Yap",         //login and register
    "label_paswold2": "Parola Tekrar: ",
    "alert_register_pasworld": "Parolalalar uyuşmuyor",
    "alert_register_userName": "Bu kulanıcı adı daha önceden alınmış",


    //Send

    "button_outgoing": "Giden",//coming and outgoing
    "button_İngoing": "Gelen",//senting and send
    "labael_recipientName": "Alıcı Adı: ",
    "label_textInput": "Metin girişi: ",
    "label_fileLoad": "Dosya Yükle: ",
    "button_submint": "Gönder",
    "alert_file": "Dosya boyutu 150 MB'dan büyük olamaz: ",
    //senting
    "button_mesage send": "Mesaj gönder", // senting an coming
    "h_senting": "Giden Gönderiler",
    "label_recipientName": "alıcı Adı: ",

    //coming 

    "h_coming": "Gelen Gönderiler",
    "btton_download": "İndir"


};



function StartLangue() {
    console.log("seçili", lang)
    if (lang == 'tr') {
        console.log("türkçe seçili", lang)
        Object.assign(objectLangue, tr);

    } else if (lang == 'fr') {
        objectLangue = fr;
    } else if (lang == 'de') {
        objectLangue = de;
    } else if (lang == 'es') {
        objectLangue = es;
    } else if (lang == 'zh') {
        objectLangue = zh;
    } else if (lang == 'ja') {
        objectLangue = ja;
    } else if (lang == 'ko') {
        objectLangue = ko;
    } else if (lang == 'ru') {
        objectLangue = ru;
    } else {
        objectLangue = en;
    }
    return objectLangue;
}



function SetLangue(langue) {
    localStorage.setItem('langue', langue)

}







//türkçe

var tr = {
    //login

    "h_login": "Giriş Yap",
    "label_userName_hint": "Kulanıcı Aınızı giriniz",
    "label_paswold_hint": "Parolanızı giriniz ",
    "alert_login": "Kulanıcı adı yada parola hatalı",

    "button_register": "Kayıt ol",

    //register
    "label_userName": "KulanıcıAd: ",    //login and register
    "label_paswold": "Parola: ",         //login and register
    "button_login": "Giriş Yap",         //login and register
    "label_paswold2": "Parola Tekrar: ",
    "alert_register_pasworld": "Parolalalar uyuşmuyor",
    "alert_register_userName": "Bu kulanıcı adı daha önceden alınmış",


    //Send

    "button_outgoing": "Giden",//coming and outgoing
    "button_ingoing": "Gelen",//senting and send
    "labael_recipientName": "Alıcı Adı: ",
    "label_textInput": "Metin girişi: ",
    "label_fileLoad": "Dosya Yükle: ",
    "button_submint": "Gönder",
    "alert_file": "Dosya boyutu 150 MB'dan büyük olamaz: ",
    //senting
    "button_mesage send": "Mesaj gönder", // senting an coming
    "h_senting": "Giden Gönderiler",
    "label_recipientName": "alıcı Adı: ",

    //coming 

    "h_coming": "Gelen Gönderiler",
    "btton_download": "İndir"


};

//ingilizce

var en = {
    //login
    "h_login": "Log In",
    "label_userName_hint": "Enter Your Username",
    "label_paswold_hint": "Enter Your Password",
    "alert_login": "Incorrect username or password",
    "button_register": "Register",

    //register
    "label_userName": "Username: ",    //login and register
    "label_paswold": "Password: ",     //login and register
    "button_login": "Log In",          //login and register
    "label_paswold2": "Confirm Password: ",
    "alert_register_pasworld": "Passwords do not match",
    "alert_register_userName": "This username is already taken",

    //Send
    "button_outgoing": "Outgoing",    //coming and outgoing
    "button_ingoing": "Incoming",     //senting and send
    "labael_recipientName": "Recipient Name: ",
    "label_textInput": "Text Input: ",
    "label_fileLoad": "Load File: ",
    "button_submint": "Submit",
    "alert_file": "File size cannot exceed 150 MB: ",

    //senting
    "button_mesage send": "Send Message",   // senting an coming
    "h_senting": "Outgoing Messages",
    "label_recipientName": "Recipient Name: ",

    //coming
    "h_coming": "Incoming Messages",
    "btton_download": "Download"
};




//fıransızca
var fr = {
    //login
    "h_login": "Se Connecter",
    "label_userName_hint": "Entrez votre nom d'utilisateur",
    "label_paswold_hint": "Entrez votre mot de passe",
    "alert_login": "Nom d'utilisateur ou mot de passe incorrect",
    "button_register": "S'inscrire",

    //register
    "label_userName": "Nom d'utilisateur : ",    //login and register
    "label_paswold": "Mot de passe : ",           //login and register
    "button_login": "Se Connecter",                //login and register
    "label_paswold2": "Confirmez le mot de passe : ",
    "alert_register_pasworld": "Les mots de passe ne correspondent pas",
    "alert_register_userName": "Ce nom d'utilisateur est déjà pris",

    //Send
    "button_outgoing": "Sortant",       //coming and outgoing
    "button_ingoing": "Entrant",        //senting and send
    "labael_recipientName": "Nom du destinataire : ",
    "label_textInput": "Saisie de texte : ",
    "label_fileLoad": "Charger un fichier : ",
    "button_submint": "Envoyer",
    "alert_file": "La taille du fichier ne peut pas dépasser 150 Mo : ",

    //senting
    "button_mesage send": "Envoyer un message",   // senting an coming
    "h_senting": "Messages sortants",
    "label_recipientName": "Nom du destinataire : ",

    //coming
    "h_coming": "Messages entrants",
    "btton_download": "Télécharger"
};




// ispanyolca
var es = {
    //login
    "h_login": "Iniciar Sesión",
    "label_userName_hint": "Ingrese su nombre de usuario",
    "label_paswold_hint": "Ingrese su contraseña",
    "alert_login": "Nombre de usuario o contraseña incorrecta",
    "button_register": "Registrarse",

    //register
    "label_userName": "Nombre de Usuario: ",    //login and register
    "label_paswold": "Contraseña: ",             //login and register
    "button_login": "Iniciar Sesión",            //login and register
    "label_paswold2": "Confirmar Contraseña: ",
    "alert_register_pasworld": "Las contraseñas no coinciden",
    "alert_register_userName": "Este nombre de usuario ya está en uso",

    //Send
    "button_outgoing": "Saliente",    //coming and outgoing
    "button_ingoing": "Entrante",     //senting and send
    "labael_recipientName": "Nombre del Destinatario: ",
    "label_textInput": "Entrada de Texto: ",
    "label_fileLoad": "Cargar Archivo: ",
    "button_submint": "Enviar",
    "alert_file": "El tamaño del archivo no puede exceder los 150 MB: ",

    //senting
    "button_mesage send": "Enviar Mensaje",   // senting an coming
    "h_senting": "Mensajes Salientes",
    "label_recipientName": "Nombre del Destinatario: ",

    //coming
    "h_coming": "Mensajes Entrantes",
    "btton_download": "Descargar"
};



//almanca
var de = {
    //login
    "h_login": "Einloggen",
    "label_userName_hint": "Geben Sie Ihren Benutzernamen ein",
    "label_paswold_hint": "Geben Sie Ihr Passwort ein",
    "alert_login": "Benutzername oder Passwort falsch",
    "button_register": "Registrieren",

    //register
    "label_userName": "Benutzername: ",    //login and register
    "label_paswold": "Passwort: ",         //login and register
    "button_login": "Einloggen",           //login and register
    "label_paswold2": "Passwort bestätigen: ",
    "alert_register_pasworld": "Passwörter stimmen nicht überein",
    "alert_register_userName": "Dieser Benutzername ist bereits vergeben",

    //Send
    "button_outgoing": "Ausgehend",    //coming and outgoing
    "button_ingoing": "Eingehend",     //senting and send
    "labael_recipientName": "Empfängername: ",
    "label_textInput": "Texteingabe: ",
    "label_fileLoad": "Datei laden: ",
    "button_submint": "Senden",
    "alert_file": "Die Dateigröße darf 150 MB nicht überschreiten: ",

    //senting
    "button_mesage send": "Nachricht senden",   // senting an coming
    "h_senting": "Ausgehende Nachrichten",
    "label_recipientName": "Empfängername: ",

    //coming
    "h_coming": "Eingehende Nachrichten",
    "btton_download": "Herunterladen"
};


// çince
var zh = {
    //login
    "h_login": "登录",
    "label_userName_hint": "请输入您的用户名",
    "label_paswold_hint": "请输入您的密码",
    "alert_login": "用户名或密码错误",
    "button_register": "注册",

    //register
    "label_userName": "用户名：",    //login and register
    "label_paswold": "密码：",       //login and register
    "button_login": "登录",          //login and register
    "label_paswold2": "确认密码：",
    "alert_register_pasworld": "密码不一致",
    "alert_register_userName": "此用户名已被使用",

    //Send
    "button_outgoing": "发件",    //coming and outgoing
    "button_ingoing": "收件",     //senting and send
    "labael_recipientName": "收件人姓名：",
    "label_textInput": "文本输入：",
    "label_fileLoad": "加载文件：",
    "button_submint": "发送",
    "alert_file": "文件大小不能超过150 MB: ",

    //senting
    "button_mesage send": "发送消息",   // senting an coming
    "h_senting": "已发消息",
    "label_recipientName": "收件人姓名：",

    //coming
    "h_coming": "收到消息",
    "btton_download": "下载"
};


// japonca
var ja = {
    //login
    "h_login": "ログイン",
    "label_userName_hint": "ユーザー名を入力してください",
    "label_paswold_hint": "パスワードを入力してください",
    "alert_login": "ユーザー名またはパスワードが間違っています",
    "button_register": "登録",

    //register
    
    "label_userName": "ユーザー名：",    //login and register
    "label_paswold": "パスワード：",     //login and register
    "button_login": "ログイン",          //login and register
    "label_paswold2": "パスワードを確認：",
    "alert_register_pasworld": "パスワードが一致しません",
    "alert_register_userName": "このユーザー名はすでに使用されています",

    //Send
    "button_outgoing": "送信中",    //coming and outgoing
    "button_ingoing": "受信中",     //senting and send
    "labael_recipientName": "受信者名：",
    "label_textInput": "テキスト入力：",
    "label_fileLoad": "ファイルを読み込む：",
    "button_submint": "送信",
    "alert_file": "ファイルサイズは150 MBを超えることはできません: ",

    //senting
    "button_mesage send": "メッセージを送信",   // senting an coming
    "h_senting": "送信済みメッセージ",
    "label_recipientName": "受信者名：",

    //coming
    "h_coming": "受信済みメッセージ",
    "btton_download": "ダウンロード"
};



// korece
var ko = {
    //login
    "h_login": "로그인",
    "label_userName_hint": "사용자 이름을 입력하세요",
    "label_paswold_hint": "비밀번호를 입력하세요",
    "alert_login": "사용자 이름 또는 비밀번호가 잘못되었습니다",
    "button_register": "등록",

    //register
    "label_userName": "사용자 이름: ",    //login and register
    "label_paswold": "비밀번호: ",         //login and register
    "button_login": "로그인",              //login and register
    "label_paswold2": "비밀번호 확인: ",
    "alert_register_pasworld": "비밀번호가 일치하지 않습니다",
    "alert_register_userName": "이 사용자 이름은 이미 사용 중입니다",

    //Send
    "button_outgoing": "나가는 것",    //coming and outgoing
    "button_ingoing": "들어오는 것",    //senting and send
    "labael_recipientName": "받는 사람 이름: ",
    "label_textInput": "텍스트 입력: ",
    "label_fileLoad": "파일 불러오기: ",
    "button_submint": "보내기",
    "alert_file": "파일 크기는 150 MB를 초과할 수 없습니다: ",

    //senting
    "button_mesage send": "메시지 보내기",   // senting an coming
    "h_senting": "나가는 메시지",
    "label_recipientName": "받는 사람 이름: ",

    //coming
    "h_coming": "들어오는 메시지",
    "btton_download": "다운로드"
};




//rusça
var ru = {
    //login
    "h_login": "Войти",
    "label_userName_hint": "Введите имя пользователя",
    "label_paswold_hint": "Введите пароль",
    "alert_login": "Неверное имя пользователя или пароль",
    "button_register": "Зарегистрироваться",

    //register
    "label_userName": "Имя пользователя: ",    //login and register
    "label_paswold": "Пароль: ",               //login and register
    "button_login": "Войти",                   //login and register
    "label_paswold2": "Подтвердите пароль: ",
    "alert_register_pasworld": "Пароли не совпадают",
    "alert_register_userName": "Это имя пользователя уже занято",

    //Send
    "button_outgoing": "Исходящие",    //coming and outgoing
    "button_ingoing": "Входящие",      //senting and send
    "labael_recipientName": "Имя получателя: ",
    "label_textInput": "Текстовый ввод: ",
    "label_fileLoad": "Загрузить файл: ",
    "button_submint": "Отправить",
    "alert_file": "Размер файла не может превышать 150 МБ: ",

    //senting
    "button_mesage send": "Отправить сообщение",   // senting an coming
    "h_senting": "Отправленные сообщения",
    "label_recipientName": "Имя получателя: ",

    //coming
    "h_coming": "Входящие сообщения",
    "btton_download": "Скачать"
};




