package routes

import (
	//"github.com/Adrephos/auth-api/handlers"
	"github.com/Adrephos/auth-api/infrastructure/routing"
	"github.com/gofiber/fiber/v2"
)

func CollectorEndpoints(app *fiber.App, routeHandler *routing.RouteHandler) {
	route := app.Group("collectors")

	route.Post("/register", routeHandler.CollectorRegister)
	route.Post("/login", routeHandler.CollectorLogin)
	route.Post("/logout", routeHandler.Logout)
}
