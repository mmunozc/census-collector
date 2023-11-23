package domain

type (
	DwellingRepository interface {
		Register(CFN string, ECN string) error
		Login(CFN string) (Dwelling, error)
	}
	Dwelling struct {
		CFN string `json:"cfn" bson:"_id"` // cfn is the primary key
		ECN string `json:"ecn" bson:"ecn"`// ecn is the form id
	}
)
