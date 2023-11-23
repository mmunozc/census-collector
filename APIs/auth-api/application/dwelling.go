package application

import (
	"github.com/Adrephos/auth-api/domain"
)

type DwellingApp struct {
	DwellingRepositoryRepo domain.DwellingRepository
}

func (app *DwellingApp) Register(CFN string, ECN string) error {
	err := app.DwellingRepositoryRepo.Register(CFN, ECN)

	return err
}

func (app *DwellingApp) Login(CFN string) (domain.Dwelling, error) {
	dwelling, err := app.DwellingRepositoryRepo.Login(CFN)

	return dwelling, err
}

func NewDwellingApp(dwellingRepository domain.DwellingRepository) *DwellingApp {
	return &DwellingApp{
		DwellingRepositoryRepo: dwellingRepository,
	}
}
