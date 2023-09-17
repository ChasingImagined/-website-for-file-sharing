package globals

type S_UserLogin_json struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type S_Message_Json struct {
	Message string `json:"message"`
	Url     string `json:"url"`
}

type S_Message_str struct {
	Message string
}

type FilesMeta struct {
	Names    string `json:"names"`
	Meesage  string `json:"message"`
	FileName string `json:"fileName"`
	FileSize string `json:"fileSize"`
	Times    string `json:"time"`
}

type FileingoingMeta struct {
	FilePath string `json:"fileName"`
}

type IncomingAndOutgoingFilesMeta struct {
	FolderPath string `json:"filePath"`
}

type M_InAndOutgoingJison struct {
	Data []map[string]string `json:"data"`
}
