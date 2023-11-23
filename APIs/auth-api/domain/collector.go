package domain

type (
	CollectorRepository interface {
		Register(username string, password string) error
		Login(username string) (Collector, error)
	}
	Collector struct {
		Username string `json:"username" bson:"_id"`
		Password string `json:"password" bson:"password"` // The zone id
	}
)
