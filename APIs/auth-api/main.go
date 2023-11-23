package main

import (
	"fmt"
	"os"

	"github.com/Adrephos/auth-api/application"
	"github.com/Adrephos/auth-api/infrastructure"
	"github.com/Adrephos/auth-api/infrastructure/persistance"
	"github.com/Adrephos/auth-api/infrastructure/routing"
	"github.com/Adrephos/auth-api/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	mongoClient := persistance.Client

	dwellingRepo := infrastructure.NewDwellingRepo(mongoClient)
	collectorRepo := infrastructure.NewCollectorRepo(mongoClient)

	dwellingApp := application.NewDwellingApp(dwellingRepo)
	collectorApp := application.NewCollectorApp(collectorRepo)

	routeHandler := routing.NewRouteHandler(dwellingApp, collectorApp)

	app := fiber.New()

	port := os.Getenv("AUTH_PORT")

	app.Use(logger.New())

	routes.DwellingEndpoints(app, routeHandler)
	routes.CollectorEndpoints(app, routeHandler)
	routes.JWTEndpoints(app, routeHandler)

	app.Listen(fmt.Sprintf(":%s", port))
}
