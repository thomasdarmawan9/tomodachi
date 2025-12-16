package auth

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"github.com/thomasdarmawan/tomodachi/backend/internal/config"
	"github.com/thomasdarmawan/tomodachi/backend/internal/model"
)

type Service struct {
	cfg config.Config
	flashcardSeeds []model.FlashcardTemplate
}

func NewService(cfg config.Config) *Service {
	templates, _ := model.LoadFlashcardSeeds(cfg.SeedFlashcardPath)
	return &Service{cfg: cfg, flashcardSeeds: templates}
}

type claims struct {
	UserID string `json:"uid"`
	jwt.RegisteredClaims
}

func (s *Service) SignUp(ctx context.Context, db *gorm.DB, email, password, name string) (*model.User, string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, "", err
	}

	user := model.User{
		Email:    email,
		Password: string(hash),
	}
	profile := model.Profile{
		Name:    name,
		Track:   model.TrackBeginner,
		Focuses: []string{"reading", "listening"},
	}

	err = db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&user).Error; err != nil {
			return err
		}
		profile.UserID = user.ID
		if err := tx.Create(&profile).Error; err != nil {
			return err
		}
		if len(s.flashcardSeeds) > 0 {
			if err := model.CreateFlashcardsForUser(ctx, tx, user.ID, s.flashcardSeeds); err != nil {
				return err
			}
		}
		return nil
	})
	if err != nil {
		return nil, "", err
	}

	token, err := s.issueToken(user.ID)
	if err != nil {
		return nil, "", err
	}
	return &user, token, nil
}

func (s *Service) Login(ctx context.Context, db *gorm.DB, email, password string) (*model.User, string, error) {
	var user model.User
	if err := db.WithContext(ctx).First(&user, "email = ?", email).Error; err != nil {
		return nil, "", err
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, "", errors.New("invalid credentials")
	}
	token, err := s.issueToken(user.ID)
	if err != nil {
		return nil, "", err
	}
	return &user, token, nil
}

func (s *Service) issueToken(userID string) (string, error) {
	now := time.Now()
	claims := claims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(now.Add(s.cfg.TokenTTL)),
			IssuedAt:  jwt.NewNumericDate(now),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.cfg.JWTSecret))
}

func (s *Service) parseToken(tokenStr string) (*claims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(s.cfg.JWTSecret), nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(*claims); ok && token.Valid {
		return claims, nil
	}
	return nil, errors.New("invalid token")
}

// Middleware

func (s *Service) AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			return
		}
		token := authHeader
		if len(authHeader) > 7 && authHeader[:7] == "Bearer " {
			token = authHeader[7:]
		}
		claims, err := s.parseToken(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			return
		}
		c.Set("userID", claims.UserID)
		c.Next()
	}
}

func MustUser(c *gin.Context) *model.User {
	userID, ok := c.Get("userID")
	if !ok {
		return nil
	}
	return &model.User{ID: userID.(string)}
}
