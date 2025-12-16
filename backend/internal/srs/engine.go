package srs

import (
	"math"
	"time"

	"github.com/thomasdarmawan/tomodachi/backend/internal/model"
)

type Engine struct{}

func NewEngine() *Engine { return &Engine{} }

func (e *Engine) Apply(card model.Flashcard, quality model.GradeQuality) model.Flashcard {
	qualityScore := 1
	if quality == model.QualityEasy {
		qualityScore = 2
	} else if quality == model.QualityAgain {
		qualityScore = 0
	}

	baseEaseDelta := float64(qualityScore-1) * 0.15
	nextEase := math.Max(1.3, card.Ease+baseEaseDelta)
	nextInterval := 1
	if quality != model.QualityAgain {
		nextInterval = int(math.Max(1, math.Round(float64(card.IntervalDays)*(nextEase+extraEase(quality)))))
	}
	nextDue := time.Now().Add(time.Duration(nextInterval) * 24 * time.Hour).UnixMilli()

	card.Ease = math.Round(nextEase*100) / 100
	card.IntervalDays = nextInterval
	card.Due = nextDue
	return card
}

func extraEase(quality model.GradeQuality) float64 {
	if quality == model.QualityEasy {
		return 0.15
	}
	return 0
}

func GainedXP(quality model.GradeQuality) int {
	switch quality {
	case model.QualityEasy:
		return 12
	case model.QualityGood:
		return 8
	default:
		return 4
	}
}
