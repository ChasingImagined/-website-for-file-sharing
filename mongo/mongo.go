package mongo

import (
	"context"
	"fmt"
	"log"
	"stajprojesi/goCodes/globals"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func UsernameGetMongo(mongoLink string, veritabanı string, koleksiyon string) {

	clientOptions := options.Client().ApplyURI(mongoLink)
	client, err := mongo.Connect(context.Background(), clientOptions)
	defer client.Disconnect(context.Background())
	if err != nil {
		log.Fatal(err)

	} else {

		var result map[string]interface{}
		collection := client.Database(veritabanı).Collection(koleksiyon)

		// Sorgulanacak belgenin kriterleri
		filter := bson.M{"ID": "332261001"}

		// Belgeyi bulmak için FindOne

		err = collection.FindOne(context.Background(), filter).Decode(&result)
		if err == mongo.ErrNoDocuments {
			log.Println("Belge bulunamadı.")

			// Yeni belge oluşturma
			var result2 = make(map[string]interface{})
			var maps = make(map[string]string)
			maps["mustafa"] = "123"
			result2["ID"] = "332261001"
			result2["user"] = maps

			// Belgeyi koleksiyona eklemek için InsertOne
			_, err := collection.InsertOne(context.Background(), result2)

			if err != nil {
				log.Fatal(err)
			}

		} else if err != nil {
			log.Println("Find error:", err)
			return
		} else {
			log.Println("Belge bulundu:", result)

			globals.Mu_M_UsernamePsworld.Lock()
			defer globals.Mu_M_UsernamePsworld.Unlock()

			// "user" alanını map[string]interface{} türünden al
			userMap, ok := result["user"].(map[string]interface{})
			if !ok {
				log.Println("Kullanıcı bilgisi tip uyumsuz.")
				return
			}

			// "user" alanındaki verileri map[string]string türüne dönüştür
			maps := make(map[string]string)
			for key, value := range userMap {
				if stringValue, ok := value.(string); ok {
					maps[key] = stringValue
				} else {
					log.Printf("Kullanıcı bilgisi tip uyumsuz, anahtar: %s\n", key)
					return
				}
			}

			globals.M_UsernamePsworld = maps
		}

	}

}

func UsernameSetMongo(mongoLink string, veritabanı string, koleksiyon string) {
	clientOptions := options.Client().ApplyURI(mongoLink)
	client, err := mongo.Connect(context.Background(), clientOptions)
	defer client.Disconnect(context.Background())
	if err != nil {
		log.Fatal(err)
		return
	}

	globals.Mu_M_UsernamePsworld.Lock()
	defer globals.Mu_M_UsernamePsworld.Unlock()

	// Veritabanı ve koleksiyon seçimi
	db := client.Database(veritabanı)
	collection := db.Collection(koleksiyon)

	// Güncellenecek kişi filitre
	filter := bson.M{"ID": "332261001"}

	// Güncellenecek veri
	fmt.Println("map", globals.M_UsernamePsworld)
	update := bson.M{"$set": bson.M{"user": globals.M_UsernamePsworld}}

	// Güncelleme işlemi
	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
		return
	}
}
