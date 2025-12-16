package config

import (
	"fmt"
	"log"
	"os"
	"time"
)

type Config struct {
	Port              string
	DBDSN             string
	JWTSecret         string
	TokenTTL          time.Duration
	Migrate           bool
	SeedDemo          bool
	SeedKanjiPath     string
	SeedHiraganaPath  string
	SeedKatakanaPath  string
	SeedPlacementPath string
	SeedFlashcardPath string
}

func Load() Config {
	dbURL := getEnv("DATABASE_URL", "")
	if dbURL == "" {
		host := os.Getenv("DATABASE_HOST")
		user := os.Getenv("DATABASE_USER")
		password := os.Getenv("DATABASE_PASSWORD")
		name := os.Getenv("DATABASE_NAME")
		port := getEnv("DATABASE_PORT", "5432")
		sslmode := getEnv("DATABASE_SSLMODE", "require")

		if host != "" && user != "" && name != "" {
			dbURL = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
				host, user, password, name, port, sslmode)
		} else {
			dbURL = "postgres://postgres:123456@localhost:5432/tomodachi?sslmode=disable"
		}
	}

	kanjiDefault := defaultExistingPath(
		"data/kanji_n5.json",         // when running with workdir=backend (deploy rootDir)
		"backend/data/kanji_n5.json", // when running from repo root locally
	)
	hiraDefault := defaultExistingPath(
		"data/hiragana_questions.json",
		"backend/data/hiragana_questions.json",
	)
	kataDefault := defaultExistingPath(
		"data/katakana_questions.json",
		"backend/data/katakana_questions.json",
	)
	placementDefault := defaultExistingPath(
		"data/placement_beginner_questions.json",
		"backend/data/placement_beginner_questions.json",
	)
	flashcardDefault := defaultExistingPath(
		"data/flashcards_seed.json",
		"backend/data/flashcards_seed.json",
	)

	cfg := Config{
		Port:              getEnv("PORT", "8080"),
		DBDSN:             dbURL,
		JWTSecret:         getEnv("JWT_SECRET", "dev-secret-change-me"),
		TokenTTL:          getEnvDuration("TOKEN_TTL", 24*time.Hour),
		Migrate:           getEnv("AUTO_MIGRATE", "true") == "true",
		SeedDemo:          getEnv("SEED_DEMO", "true") == "true",
		SeedKanjiPath:     getEnv("SEED_KANJI_PATH", kanjiDefault),
		SeedHiraganaPath:  getEnv("SEED_HIRAGANA_PATH", hiraDefault),
		SeedKatakanaPath:  getEnv("SEED_KATAKANA_PATH", kataDefault),
		SeedPlacementPath: getEnv("SEED_PLACEMENT_PATH", placementDefault),
		SeedFlashcardPath: getEnv("SEED_FLASHCARD_PATH", flashcardDefault),
	}

	return cfg
}

func getEnv(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}

func getEnvDuration(key string, def time.Duration) time.Duration {
	if v := os.Getenv(key); v != "" {
		d, err := time.ParseDuration(v)
		if err != nil {
			log.Printf("invalid duration for %s: %v", key, err)
			return def
		}
		return d
	}
	return def
}

func defaultExistingPath(paths ...string) string {
	for _, p := range paths {
		if _, err := os.Stat(p); err == nil {
			return p
		}
	}
	if len(paths) == 0 {
		return ""
	}
	// Fallback to last option even if it does not exist so callers still get a usable value.
	return paths[len(paths)-1]
}
