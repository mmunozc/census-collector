package infrastructure

import (
	"context"
	"errors"

	"github.com/Adrephos/auth-api/domain"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoCollectorRepository struct {
	Client *mongo.Client
}

func (repo *MongoCollectorRepository) Register(username string, password string) error {
	collector := domain.Collector {
		Username: username,
		Password: password,
	}

	_, error := repo.Client.Database("auth").Collection("collectors").InsertOne(context.Background(), collector)
	if error != nil {
		return error
	}

	return nil
}

func (repo *MongoCollectorRepository) Login(username string) (domain.Collector, error) {
	var collector domain.Collector
	err := repo.Client.Database("auth").Collection("collectors").FindOne(context.Background(), bson.M{"_id": username}).Decode(&collector)

	if err != nil {
		return collector, err
	}

	if collector.Username != username {
		return collector, errors.New("Collector not found")
	}

	return collector, nil
}

func NewCollectorRepo(client *mongo.Client) *MongoCollectorRepository {
	return &MongoCollectorRepository{
		Client: client,
	}
}
