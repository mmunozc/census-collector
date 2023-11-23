package infrastructure

import (
	"context"
	"errors"

	"github.com/Adrephos/auth-api/domain"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type MongoDwellingRepository struct {
	Client *mongo.Client
}

func (repo *MongoDwellingRepository) Register(CFN string, ECN string) error {
	dwelling := domain.Dwelling {
		CFN: CFN,
		ECN: ECN,
	}

	_, error := repo.Client.Database("auth").Collection("dwellings").InsertOne(context.Background(), dwelling)
	if error != nil {
		return error
	}

	return nil
}

func (repo *MongoDwellingRepository) Login(CFN string) (domain.Dwelling, error) {
	var dwelling domain.Dwelling
	err := repo.Client.Database("auth").Collection("dwellings").FindOne(context.Background(), bson.M{"_id": CFN}).Decode(&dwelling)

	if err != nil {
		return dwelling, err
	}

	if dwelling.CFN != CFN {
		return dwelling, errors.New("Dwelling not found")
	}

	return dwelling, nil
}

func NewDwellingRepo(client *mongo.Client) *MongoDwellingRepository {
	return &MongoDwellingRepository{
		Client: client,
	}
}
