package send

type Data struct {
	Message       string `json:"message"`
	FileName      string `json:"fileName"`
	RecipientName string `json:"recipientName"`
	Times         string `json:"time"`
	FileSize      string `json:"fileSize"`
}
