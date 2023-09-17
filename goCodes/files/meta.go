package files

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func InAndOutgoingAddMongo(mongoURL string, dataBase string, collection string, data map[string]string) {

	// MongoDB istemcisini başlatma
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(mongoURL))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	// Veritabanı ve koleksiyon seçimi
	db := client.Database(dataBase)
	coll := db.Collection(collection)

	// Map veri yapısını MongoDB'ye ekleme
	_, err = coll.InsertOne(context.Background(), data)
	if err != nil {
		log.Fatal(err)
	}

}

func InAndOutgoingGetMongo(mongoURL string, dataBase string, collection string) []map[string]string {
	// MongoDB istemcisini başlatma
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(mongoURL))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	// Veritabanı ve koleksiyon seçimi
	db := client.Database(dataBase)
	coll := db.Collection(collection)

	// Boş bir filtre ile tüm verileri almak
	filter := bson.M{}

	// Tüm kayıtları MongoDB'den getirme
	var results []map[string]string
	cur, err := coll.Find(context.Background(), filter)
	if err != nil {
		log.Fatal("kayıt bulunamadı ", err)
	}
	defer cur.Close(context.Background())

	// Sonuçları bir slice içine almak
	err = cur.All(context.Background(), &results)
	if err != nil {
		log.Fatal(err)
	}

	// Sonuçlar
	for _, result := range results {
		fmt.Println("işem htası ", result)
	}
	return results
}
