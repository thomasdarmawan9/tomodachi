package model

import (
	"context"
	"encoding/json"
	"os"
	"path/filepath"
	"time"

	"gorm.io/gorm"
)

type FlashcardTemplate struct {
	Prompt string      `json:"prompt"`
	Answer string      `json:"answer"`
	Level  TrackKey    `json:"level"`
	Type   FlashcardType `json:"type"`
}

// LoadFlashcardSeeds loads flashcard templates from JSON.
func LoadFlashcardSeeds(path string) ([]FlashcardTemplate, error) {
	if path == "" {
		return nil, nil
	}
	dataPath := path
	if _, err := os.Stat(dataPath); os.IsNotExist(err) && !filepath.IsAbs(path) {
		dataPath = filepath.Join("data", filepath.Base(path))
	}
	raw, err := os.ReadFile(dataPath)
	if err != nil {
		return nil, err
	}
	var items []FlashcardTemplate
	if err := json.Unmarshal(raw, &items); err != nil {
		return nil, err
	}
	return items, nil
}

// CreateFlashcardsForUser seeds flashcards for a user from templates.
func CreateFlashcardsForUser(ctx context.Context, db *gorm.DB, userID string, templates []FlashcardTemplate) error {
	if len(templates) == 0 {
		return nil
	}
	now := time.Now().UnixMilli()
	var cards []Flashcard
	for _, t := range templates {
		cards = append(cards, Flashcard{
			UserID:       userID,
			Prompt:       t.Prompt,
			Answer:       t.Answer,
			Level:        t.Level,
			Type:         t.Type,
			Ease:         2.5,
			IntervalDays: 1,
			Due:          now,
		})
	}
	return db.WithContext(ctx).Create(&cards).Error
}
