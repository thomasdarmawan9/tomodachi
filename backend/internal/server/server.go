package server

import (
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"github.com/thomasdarmawan/tomodachi/backend/internal/auth"
	"github.com/thomasdarmawan/tomodachi/backend/internal/handler"
)

type Server struct {
	engine *gin.Engine
	db     *gorm.DB
}

func New(db *gorm.DB, authSvc *auth.Service) *Server {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}))

	h := handler.New(db, authSvc)

	r.GET("/healthz", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	v1 := r.Group("/api/v1")

	v1.POST("/auth/signup", h.SignUp)
	v1.POST("/auth/login", h.Login)
	v1.POST("/auth/logout", authSvc.AuthMiddleware(), h.Logout)
	v1.GET("/auth/me", authSvc.AuthMiddleware(), h.Me)

	v1.GET("/profile", authSvc.AuthMiddleware(), h.GetProfile)
	v1.PUT("/profile", authSvc.AuthMiddleware(), h.UpdateProfile)
	v1.POST("/profile/complete-onboarding", authSvc.AuthMiddleware(), h.CompleteOnboarding)
	v1.POST("/profile/track", authSvc.AuthMiddleware(), h.SwitchTrack)

	v1.GET("/tracks", h.ListTracks)
	v1.GET("/tracks/:id/units", authSvc.AuthMiddleware(), h.ListUnits)
	v1.GET("/tracks/:id/next-unit", authSvc.AuthMiddleware(), h.NextUnit)
	v1.POST("/units/:id/status", authSvc.AuthMiddleware(), h.UpdateUnitStatus)

	v1.GET("/practice/questions", authSvc.AuthMiddleware(), h.GetQuestions)
	v1.GET("/practice/history", authSvc.AuthMiddleware(), h.PracticeHistory)
	v1.GET("/placement/questions", authSvc.AuthMiddleware(), h.PlacementQuestions)
	v1.POST("/practice/submit", authSvc.AuthMiddleware(), h.SubmitPractice)

	v1.GET("/srs/due", authSvc.AuthMiddleware(), h.GetDueFlashcards)
	v1.POST("/srs/:id/grade", authSvc.AuthMiddleware(), h.GradeCard)
	v1.GET("/srs/stats", authSvc.AuthMiddleware(), h.SrsStats)
	v1.POST("/srs/custom", authSvc.AuthMiddleware(), h.CreateCustomFlashcard)

	v1.GET("/dashboard/summary", authSvc.AuthMiddleware(), h.DashboardSummary)

	return &Server{engine: r, db: db}
}

func (s *Server) Run(addr string) {
	if err := s.engine.Run(addr); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
