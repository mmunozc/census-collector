package persistance

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client
var ctx = context.Background()

// Function to intialize the CouchDB client
func init() {
	var err error
	mongoURI := os.Getenv("DATABASE_URL")
	clientOptions := options.Client().ApplyURI(mongoURI)
	Client, err = mongo.Connect(ctx, clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	err = Client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	Client.Database("auth").Collection("dwellings")
	Client.Database("auth").Collection("collectors")
}
