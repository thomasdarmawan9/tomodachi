package model

import (
	"encoding/json"
	"os"
	"path/filepath"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// SeedDemo populates minimal content matching the frontend sample questions and tracks.
func SeedDemo(db *gorm.DB) error {
	// Skip when data already present to reduce startup overhead.
	var count int64
	if err := db.Model(&Track{}).Count(&count).Error; err == nil && count > 0 {
		return nil
	}

	tracks := []Track{
		{ID: TrackBeginner, Title: "Beginner Kana", Description: "Hiragana Katakana dasar"},
		{ID: TrackN5, Title: "N5 Dasar", Description: "Vocab, grammar, kanji"},
	}
	for _, t := range tracks {
		db.FirstOrCreate(&t, Track{ID: t.ID})
	}

	unit := Unit{TrackID: TrackBeginner, Title: "Hiragana Inti", Status: UnitInProgress}
	db.FirstOrCreate(&unit, Unit{TrackID: unit.TrackID, Title: unit.Title})

	lessons := []Lesson{
		{
			UnitID:           unit.ID,
			Title:            "A I U E O",
			Summary:          "Pengenalan bunyi vokal inti dengan audio dasar.",
			Level:            TrackBeginner,
			SkillTags:        []string{string(SkillReading), string(SkillListening)},
			EstimatedMinutes: 8,
			AudioHint:        "あ い う え お",
		},
		{
			UnitID:           unit.ID,
			Title:            "KA KI KU KE KO",
			Summary:          "Latihan konsonan K-line dengan audio.",
			Level:            TrackBeginner,
			SkillTags:        []string{string(SkillListening), string(SkillReading)},
			EstimatedMinutes: 8,
			AudioHint:        "か き く け こ",
		},
		{
			UnitID:           unit.ID,
			Title:            "SA SHI SU SE SO",
			Summary:          "Konsonan S-line dengan variasi shi.",
			Level:            TrackBeginner,
			SkillTags:        []string{string(SkillListening), string(SkillReading)},
			EstimatedMinutes: 8,
			AudioHint:        "さ し す せ そ",
		},
		{
			UnitID:           unit.ID,
			Title:            "TA CHI TSU TE TO",
			Summary:          "Konsonan T-line dengan chi/tsu.",
			Level:            TrackBeginner,
			SkillTags:        []string{string(SkillListening), string(SkillReading)},
			EstimatedMinutes: 8,
			AudioHint:        "た ち つ て と",
		},
		{
			UnitID:           unit.ID,
			Title:            "NA NI NU NE NO",
			Summary:          "Konsonan N-line.",
			Level:            TrackBeginner,
			SkillTags:        []string{string(SkillListening), string(SkillReading)},
			EstimatedMinutes: 8,
			AudioHint:        "な に ぬ ね の",
		},
		{
			UnitID:           unit.ID,
			Title:            "HA HI FU HE HO",
			Summary:          "Konsonan H-line (fu khusus).",
			Level:            TrackBeginner,
			SkillTags:        []string{string(SkillListening), string(SkillReading)},
			EstimatedMinutes: 8,
			AudioHint:        "は ひ ふ へ ほ",
		},
		{
			UnitID:           unit.ID,
			Title:            "MA MI MU ME MO",
			Summary:          "Konsonan M-line.",
			Level:            TrackBeginner,
			SkillTags:        []string{string(SkillListening), string(SkillReading)},
			EstimatedMinutes: 8,
			AudioHint:        "ま み む め も",
		},
		{
			UnitID:           unit.ID,
			Title:            "YA YU YO + N",
			Summary:          "Semi-vokal Y-line dan ん.",
			Level:            TrackBeginner,
			SkillTags:        []string{string(SkillListening), string(SkillReading)},
			EstimatedMinutes: 8,
			AudioHint:        "や ゆ よ ん",
		},
		{
			UnitID:           unit.ID,
			Title:            "RA RI RU RE RO",
			Summary:          "Konsonan R-line.",
			Level:            TrackBeginner,
			SkillTags:        []string{string(SkillListening), string(SkillReading)},
			EstimatedMinutes: 8,
			AudioHint:        "ら り る れ ろ",
		},
		{
			UnitID:           unit.ID,
			Title:            "WA WO + Kombo",
			Summary:          "WA/WO dan kombo kecil ya/yu/yo.",
			Level:            TrackBeginner,
			SkillTags:        []string{string(SkillListening), string(SkillReading)},
			EstimatedMinutes: 10,
			AudioHint:        "わ を きゃ きゅ きょ",
		},
	}

	for _, lesson := range lessons {
		db.FirstOrCreate(&lesson, Lesson{UnitID: unit.ID, Title: lesson.Title})
	}

	questions := []Question{
		{Track: TrackBeginner, Prompt: "Matching: pilih romaji yang sesuai untuk kana あ", Type: QMatching, Answer: "a", Choices: mustJSON([]string{"a", "i", "u", "o"})},
		{Track: TrackBeginner, Prompt: "Matching: kana mana untuk bunyi 'ko'?", Type: QMatching, Answer: "こ", Choices: mustJSON([]string{"こ", "か", "け", "く"})},
		{Track: TrackBeginner, Prompt: "Typing: pilih kana untuk romaji 'su'", Type: QTyping, Answer: "す", Choices: mustJSON([]string{"す", "そ", "し", "せ"})},
		{Track: TrackN5, Prompt: "Reading: これは りんご です の arti?", Type: QReading, Answer: "Ini apel", Choices: mustJSON([]string{"Ini apel", "Itu apel", "Ini jeruk", "Ini pir"})},
		{Track: TrackN5, Prompt: "Ordering: susun kalimat 'Saya adalah mahasiswa'.", Type: QOrdering, Answer: "わたし は がくせい です", Choices: mustJSON([]string{"わたし は がくせい です", "です わたし は がくせい", "がくせい です わたし は", "は わたし がくせい です"})},
	}
	for _, q := range questions {
		db.FirstOrCreate(&q, Question{Prompt: q.Prompt, Track: q.Track})
	}

	kosakata, _ := json.Marshal([]map[string]string{
		{"kata": "人", "baca": "ひと", "arti": "orang"},
	})
	kanji := KanjiEntry{Kanji: "人", ArtiUmum: "Orang", Kosakata: kosakata}
	db.FirstOrCreate(&kanji, KanjiEntry{Kanji: kanji.Kanji})

	return nil
}

// SeedKanjiFromFile loads kanji entries from a JSON file (same shape as frontend data) and upserts them.
func SeedKanjiFromFile(db *gorm.DB, path string) error {
	if path == "" {
		return nil
	}
	dataPath := path
	if _, err := os.Stat(dataPath); os.IsNotExist(err) && !filepath.IsAbs(path) {
		// fallback: if running from backend/ directory already, drop leading "backend/"
		dataPath = filepath.Join("data", filepath.Base(path))
	}

	raw, err := os.ReadFile(dataPath)
	if err != nil {
		return err
	}
	var entries []struct {
		Kanji    string `json:"kanji"`
		ArtiUmum string `json:"arti_umum"`
		Kosakata []struct {
			Kata string `json:"kata"`
			Baca string `json:"baca"`
			Arti string `json:"arti"`
		} `json:"kosakata"`
	}
	if err := json.Unmarshal(raw, &entries); err != nil {
		return err
	}

	if len(entries) == 0 {
		return nil
	}

	// Short-circuit if everything already exists.
	var existing []string
	kanjiKeys := make([]string, 0, len(entries))
	for _, e := range entries {
		kanjiKeys = append(kanjiKeys, e.Kanji)
	}
	if err := db.Model(&KanjiEntry{}).Where("kanji IN ?", kanjiKeys).Pluck("kanji", &existing).Error; err != nil {
		return err
	}
	existingSet := make(map[string]struct{}, len(existing))
	for _, k := range existing {
		existingSet[k] = struct{}{}
	}

	for _, e := range entries {
		if _, ok := existingSet[e.Kanji]; ok {
			continue
		}
		kb, _ := json.Marshal(e.Kosakata)
		rec := KanjiEntry{
			Kanji:    e.Kanji,
			ArtiUmum: e.ArtiUmum,
			Kosakata: kb,
		}
		if err := db.Clauses(clause.OnConflict{DoNothing: true}).Create(&rec).Error; err != nil {
			return err
		}
	}
	return nil
}

// SeedQuestionsFromFile loads question bank from JSON and upserts them.
func SeedQuestionsFromFile(db *gorm.DB, path string) error {
	if path == "" {
		return nil
	}
	dataPath := path
	if _, err := os.Stat(dataPath); os.IsNotExist(err) && !filepath.IsAbs(path) {
		dataPath = filepath.Join("data", filepath.Base(path))
	}

	raw, err := os.ReadFile(dataPath)
	if err != nil {
		return err
	}
	var questions []struct {
		Track   TrackKey `json:"track"`
		Prompt  string   `json:"prompt"`
		Type    string   `json:"type"`
		Answer  string   `json:"answer"`
		Choices []string `json:"choices"`
	}
	if err := json.Unmarshal(raw, &questions); err != nil {
		return err
	}

	if len(questions) == 0 {
		return nil
	}

	prompts := make([]string, 0, len(questions))
	for _, q := range questions {
		prompts = append(prompts, q.Prompt)
	}
	var existing []string
	if err := db.Model(&Question{}).Where("prompt IN ?", prompts).Pluck("prompt", &existing).Error; err != nil {
		return err
	}
	existingSet := make(map[string]struct{}, len(existing))
	for _, p := range existing {
		existingSet[p] = struct{}{}
	}

	for _, q := range questions {
		if _, ok := existingSet[q.Prompt]; ok {
			continue
		}
		track := q.Track
		if track == "" {
			track = TrackBeginner
		}
		rec := Question{
			Track:   track,
			Prompt:  q.Prompt,
			Type:    QuestionType(q.Type),
			Answer:  q.Answer,
			Choices: mustJSON(q.Choices),
		}
		if err := db.Create(&rec).Error; err != nil {
			return err
		}
	}
	return nil
}

func mustJSON(v any) []byte {
	b, _ := json.Marshal(v)
	return b
}
