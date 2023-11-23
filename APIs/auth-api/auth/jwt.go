package auth

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/patrickmn/go-cache"
)

// Cache for storing refresh tokens
var RefreshCache = cache.New(20*time.Minute, 30*time.Minute)

func GenerateAccessToken(id string, ty string) (string, error) {
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		ty:          id,
		"exp": time.Now().Add(15 * time.Minute).Unix(),
	})

	token, err := claims.SignedString([]byte(os.Getenv("ACCESS_SECRET")))
	if err != nil {
		return "", err
	}

	return token, err
}

func GenerateRefreshToken(id string, ty string) (string, error) {
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		ty:          id,
		"exp": time.Now().Add(20 * time.Minute).Unix(),
	})

	token, err := claims.SignedString([]byte(os.Getenv("REFRESH_SECRET")))
	if err != nil {
		return "", err
	}
	// Store the refresh token in the cache
	RefreshCache.Set(token, nil, cache.DefaultExpiration)

	return token, err
}

func ParseToken(token string) (jwt.MapClaims, error) {
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("REFRESH_SECRET")), nil
	})

	return claims, err
}

func VerifyToken(tokenStr string) (bool, error) {
	claims := jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("ACCESS_SECRET")), nil
	})


	if err != nil {
		return false, err
	} else if !token.Valid {
		return false, fmt.Errorf("invalid token")
	}

	return true, nil
}
