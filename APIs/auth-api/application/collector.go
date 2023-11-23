package application

import (
	"github.com/Adrephos/auth-api/domain"
)

type CollectorApp struct {
	CollectorRepositoryRepo domain.CollectorRepository
}

func (app *CollectorApp) Register(username string, password string) error {
	err := app.CollectorRepositoryRepo.Register(username, password)

	return err
}

func (app *CollectorApp) Login(username string) (domain.Collector, error) {
	collector, err := app.CollectorRepositoryRepo.Login(username)

	return collector, err
}

func NewCollectorApp(collectorRepository domain.CollectorRepository) *CollectorApp {
	return &CollectorApp{
		CollectorRepositoryRepo: collectorRepository,
	}
}
