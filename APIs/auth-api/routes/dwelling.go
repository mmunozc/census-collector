package routes

import (
	//"github.com/Adrephos/auth-api/handlers"
	"github.com/Adrephos/auth-api/infrastructure/routing"
	"github.com/gofiber/fiber/v2"
)

func DwellingEndpoints(app *fiber.App, routeHandler *routing.RouteHandler) {
	route := app.Group("dwellings")

	route.Post("/register", routeHandler.DwellingRegister)
	route.Post("/login", routeHandler.DwellingLogin)
	route.Post("/logout", routeHandler.Logout)
}
