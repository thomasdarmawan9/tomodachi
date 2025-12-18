package practice

import (
	"encoding/json"
	"math/rand"
	"strconv"
	"time"

	"gorm.io/datatypes"

	"github.com/thomasdarmawan/tomodachi/backend/internal/model"
)

func ModeToTrack(mode string) model.TrackKey {
	switch mode {
	case "beginner":
		return model.TrackBeginner
	case "n5", "kanji":
		return model.TrackN5
	case "placement":
		return ""
	default:
		return model.TrackBeginner
	}
}

func ModeToQuestionType(mode string) model.QuestionType {
	if mode == "kanji" {
		return model.QKanji
	}
	return ""
}

func PickRandom[T any](items []T, count int) []T {
	return PickRandomWithRand(items, count, rand.New(rand.NewSource(time.Now().UnixNano())))
}

// PickRandomWithRand picks count items using provided random source for deterministic selection.
func PickRandomWithRand[T any](items []T, count int, r *rand.Rand) []T {
	if len(items) <= count {
		return items
	}
	res := make([]T, 0, count)
	perm := r.Perm(len(items))
	for i := 0; i < count; i++ {
		res = append(res, items[perm[i]])
	}
	return res
}

type Kosakata struct {
	Kata string `json:"kata"`
	Baca string `json:"baca"`
	Arti string `json:"arti"`
}

func parseKosakata(entry model.KanjiEntry) []Kosakata {
	var kos []Kosakata
	_ = json.Unmarshal(entry.Kosakata, &kos)
	return kos
}

// KanjiCorrectAnswer deterministically picks the first valid baca+arti pair or falls back to generic meaning.
func KanjiCorrectAnswer(entry model.KanjiEntry) string {
	kos := parseKosakata(entry)
	for _, kv := range kos {
		if kv.Baca != "" && kv.Arti != "" {
			return kv.Baca + " · " + kv.Arti
		}
	}
	if entry.ArtiUmum != "" {
		return entry.Kanji + " · " + entry.ArtiUmum
	}
	return entry.Kanji
}

// BuildKanjiQuestions creates multiple-choice kanji questions from kanji_entries table using a deterministic seed.
func BuildKanjiQuestions(entries []model.KanjiEntry, count int, seed int64) []model.Question {
	choicePool := make([]string, 0)

	for _, entry := range entries {
		for _, kv := range parseKosakata(entry) {
			if kv.Baca != "" && kv.Arti != "" {
				choicePool = append(choicePool, kv.Baca+" · "+kv.Arti)
			}
		}
	}

	res := make([]model.Question, 0, count)
	if len(entries) == 0 {
		return res
	}

	r := rand.New(rand.NewSource(seed))
	r.Shuffle(len(entries), func(i, j int) { entries[i], entries[j] = entries[j], entries[i] })

	selected := entries
	if len(entries) > count {
		selected = entries[:count]
	}

	for idx, entry := range selected {
		correct := KanjiCorrectAnswer(entry)

		distractors := make([]string, 0, 3)
		seen := map[string]struct{}{
			correct: {},
		}

		shuffledChoices := make([]string, len(choicePool))
		copy(shuffledChoices, choicePool)
		r.Shuffle(len(shuffledChoices), func(i, j int) {
			shuffledChoices[i], shuffledChoices[j] = shuffledChoices[j], shuffledChoices[i]
		})

		for _, c := range shuffledChoices {
			if _, ok := seen[c]; ok {
				continue
			}
			distractors = append(distractors, c)
			seen[c] = struct{}{}
			if len(distractors) == 3 {
				break
			}
		}

		choices := append([]string{correct}, distractors...)
		r.Shuffle(len(choices), func(i, j int) { choices[i], choices[j] = choices[j], choices[i] })

		choicesJSON, _ := json.Marshal(choices)

		res = append(res, model.Question{
			ID:      entry.ID + "-q" + strconv.Itoa(idx),
			Track:   model.TrackN5,
			Prompt:  entry.Kanji,
			Choices: datatypes.JSON(choicesJSON),
			Answer:  correct,
			Type:    model.QKanji,
		})
	}

	return res
}
