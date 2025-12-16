package main

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/thomasdarmawan/tomodachi/backend/internal/auth"
	"github.com/thomasdarmawan/tomodachi/backend/internal/config"
	"github.com/thomasdarmawan/tomodachi/backend/internal/model"
	"github.com/thomasdarmawan/tomodachi/backend/internal/server"
)

func main() {
	cfg := config.Load()

	db, err := gorm.Open(postgres.Open(cfg.DBDSN), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Warn),
	})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	if cfg.Migrate {
		if err := migrate(db); err != nil {
			log.Fatalf("migration failed: %v", err)
		}
		if cfg.SeedDemo {
			if err := model.SeedDemo(db); err != nil {
				log.Printf("warn: seed failed: %v", err)
			}
		}
		if cfg.SeedHiraganaPath != "" {
			if err := model.SeedQuestionsFromFile(db, cfg.SeedHiraganaPath); err != nil {
				log.Printf("warn: hiragana seed failed: %v", err)
			}
		}
		if cfg.SeedKatakanaPath != "" {
			if err := model.SeedQuestionsFromFile(db, cfg.SeedKatakanaPath); err != nil {
				log.Printf("warn: katakana seed failed: %v", err)
			}
		}
		if cfg.SeedPlacementPath != "" {
			if err := model.SeedQuestionsFromFile(db, cfg.SeedPlacementPath); err != nil {
				log.Printf("warn: placement seed failed: %v", err)
			}
		}
		if cfg.SeedKanjiPath != "" {
			if err := model.SeedKanjiFromFile(db, cfg.SeedKanjiPath); err != nil {
				log.Printf("warn: kanji seed failed: %v", err)
			}
		}
	}

	authSvc := auth.NewService(cfg)
	srv := server.New(db, authSvc)
	srv.Run(":" + cfg.Port)
}

func migrate(db *gorm.DB) error {
	return db.AutoMigrate(
		&model.User{},
		&model.Profile{},
		&model.Track{},
		&model.Unit{},
		&model.Lesson{},
		&model.UserUnit{},
		&model.Question{},
		&model.KanjiEntry{},
		&model.Flashcard{},
		&model.ReviewLog{},
		&model.PracticeAttempt{},
		&model.PracticeAnswer{},
	)
}
