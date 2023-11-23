package routes

import (
	//"github.com/Adrephos/auth-api/handlers"
	"github.com/Adrephos/auth-api/infrastructure/routing"
	"github.com/gofiber/fiber/v2"
)

func JWTEndpoints(app *fiber.App, routeHandler *routing.RouteHandler) {
	app.Post("dwellings/refreshToken", routeHandler.RefreshToken("cfn"))
	app.Post("collectors/refreshToken", routeHandler.RefreshToken("password"))
	app.Post("validate/", routeHandler.VerifyToken)
}
