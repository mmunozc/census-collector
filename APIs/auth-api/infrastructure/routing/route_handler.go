package routing

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/Adrephos/auth-api/application"
	"github.com/Adrephos/auth-api/auth"
	"github.com/Adrephos/auth-api/domain"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

type RouteHandler struct {
	dwellingApp  *application.DwellingApp
	collectorApp *application.CollectorApp
}

func contextToDwelling(c *fiber.Ctx) (*domain.Dwelling, error) {
	var dwelling *domain.Dwelling
	err := json.Unmarshal(c.Body(), &dwelling)

	if err != nil {
		return nil, err
	} else if dwelling.ECN == "" || dwelling.CFN == "" {
		return nil, fmt.Errorf("Missing cfn or ecn")
	}

	return dwelling, nil
}

func contextToCollector(c *fiber.Ctx) (*domain.Collector, error) {
	var collector *domain.Collector
	err := json.Unmarshal(c.Body(), &collector)

	if err != nil {
		return nil, err
	} else if collector.Password == "" || collector.Username == "" {
		return nil, fmt.Errorf("Missing username or password")
	}

	return collector, nil
}

func hashAndSalt(pwd []byte) string {
	hash, error := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if error != nil {
		panic(error)
	}

	return string(hash)
}

func (h *RouteHandler) DwellingRegister(c *fiber.Ctx) error {
	dwelling, err := contextToDwelling(c)

	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": err.Error(),
		})
	}

	dwelling.ECN = hashAndSalt([]byte(dwelling.ECN))

	err = h.dwellingApp.Register(dwelling.CFN, dwelling.ECN)
	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": err.Error(),
		})
	}

	return c.Status(200).JSON(dwelling)
}

func (h *RouteHandler) DwellingLogin(c *fiber.Ctx) error {
	reqDwelling, err := contextToDwelling(c)

	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": err.Error(),
		})
	}

	dwelling, err := h.dwellingApp.Login(reqDwelling.CFN)
	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": "Dwelling not found",
		})
	}

	err = bcrypt.CompareHashAndPassword([]byte(dwelling.ECN), []byte(reqDwelling.ECN))
	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": "Incorrect password",
		})
	}

	accessToken, err := auth.GenerateAccessToken(dwelling.CFN, "cfn")
	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": err.Error(),
		})
	}
	refreshToken, err := auth.GenerateRefreshToken(dwelling.CFN, "cfn")
	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": err.Error(),
		})
	}

	return c.Status(200).JSON(map[string]string{
		"accessToken":  accessToken,
		"refreshToken": refreshToken,
	})
}

func (h *RouteHandler) CollectorRegister(c *fiber.Ctx) error {
	collector, err := contextToCollector(c)

	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": err.Error(),
		})
	}

	collector.Password = hashAndSalt([]byte(collector.Password))

	err = h.collectorApp.Register(collector.Username, collector.Password)
	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": err.Error(),
		})
	}

	return c.Status(200).JSON(collector)
}

func (h *RouteHandler) CollectorLogin(c *fiber.Ctx) error {
	reqCollector, err := contextToCollector(c)

	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": err.Error(),
		})
	}

	collector, err := h.collectorApp.Login(reqCollector.Username)
	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": "Collector not found",
		})
	}

	err = bcrypt.CompareHashAndPassword([]byte(collector.Password), []byte(reqCollector.Password))
	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": "Incorrect password",
		})
	}

	accessToken, err := auth.GenerateAccessToken(collector.Password, "password")
	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": err.Error(),
		})
	}
	refreshToken, err := auth.GenerateRefreshToken(collector.Password, "password")
	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": err.Error(),
		})
	}

	return c.Status(200).JSON(map[string]string{
		"accessToken":  accessToken,
		"refreshToken": refreshToken,
	})
}

func (h *RouteHandler) RefreshToken(ty string) func(*fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		// Map to unmarshal JSON body
		var token map[string]string
		err := json.Unmarshal(c.Body(), &token)

		if err != nil {
			return c.Status(404).JSON(map[string]string{
				"error": err.Error(),
			})
		}

		_, found := auth.RefreshCache.Get(token["token"])
		if !found {
			return c.Status(404).JSON(map[string]string{
				"error": "Invalid refresh token",
			})
		} else {
			auth.RefreshCache.Delete(token["token"])
		}

		claims, err := auth.ParseToken(token["token"])
		if err != nil {
			return c.Status(404).JSON(map[string]string{
				"error": err.Error(),
			})
		}

		accessToken, err := auth.GenerateAccessToken(claims[ty].(string), ty)
		if err != nil {
			return c.Status(404).JSON(map[string]string{
				"error": err.Error(),
			})
		}
		refreshToken, err := auth.GenerateRefreshToken(claims[ty].(string), ty)
		if err != nil {
			return c.Status(404).JSON(map[string]string{
				"error": err.Error(),
			})
		}

		return c.Status(200).JSON(map[string]string{
			"accessToken":  accessToken,
			"refreshToken": refreshToken,
		})
	}
}

func (h *RouteHandler) Logout(c *fiber.Ctx) error {
	// Map to unmarshal JSON body
	var token map[string]string
	err := json.Unmarshal(c.Body(), &token)

	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": err.Error(),
		})
	}

	_, found := auth.RefreshCache.Get(token["token"])
	if !found {
		return c.Status(404).JSON(map[string]string{
			"error": "Invalid refresh token",
		})
	} else {
		auth.RefreshCache.Delete(token["token"])
		return c.Status(200).JSON(map[string]string{
			"message": "Logged out",
		})
	}

}

func (h *RouteHandler) VerifyToken(c *fiber.Ctx) error {
	headers := c.GetReqHeaders()
	token := strings.Split(headers["Authorization"][0], " ")[1]

	valid, err := auth.VerifyToken(token)
	if err != nil {
		return c.Status(404).JSON(map[string]string{
			"error": err.Error(),
		})
	} else if !valid {
		return c.Status(404).JSON(map[string]string{
			"error": "Invalid token",
		})
	}

	return c.Status(200).JSON(map[string]string{
		"message": "Valid token",
	})
}

func NewRouteHandler(dwellingApp *application.DwellingApp, collectorApp *application.CollectorApp) *RouteHandler {
	return &RouteHandler{
		dwellingApp:  dwellingApp,
		collectorApp: collectorApp,
	}
}
