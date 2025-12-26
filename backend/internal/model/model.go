package model

import (
	"time"

	"github.com/lib/pq"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type TrackKey string

const (
	TrackBeginner TrackKey = "beginner"
	TrackN5       TrackKey = "n5"
)

type SkillKey string

const (
	SkillListening SkillKey = "listening"
	SkillReading   SkillKey = "reading"
	SkillWriting   SkillKey = "writing"
	SkillSpeaking  SkillKey = "speaking"
)

type User struct {
	ID        string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Email     string         `gorm:"uniqueIndex;not null" json:"email"`
	Password  string         `json:"-"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type Profile struct {
	ID                 string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID             string         `gorm:"uniqueIndex" json:"userId"`
	User               *User          `json:"user,omitempty"`
	Name               string         `json:"name"`
	Track              TrackKey       `json:"track"`
	TargetMinutes      int            `json:"targetMinutes"`
	Focuses            pq.StringArray `gorm:"type:text[]" json:"focuses"`
	StreakDays         int            `json:"streakDays"`
	XP                 int            `json:"xp"`
	Age                int            `json:"age"`
	Country            string         `json:"country"`
	Gender             string         `json:"gender"`
	ReviewedToday      int            `json:"reviewedToday"`
	ReviewedTodayDate  time.Time      `json:"reviewedTodayDate"`
	OnboardingComplete bool           `json:"onboardingComplete"`
	CreatedAt          time.Time      `json:"createdAt"`
	UpdatedAt          time.Time      `json:"updatedAt"`
	DeletedAt          gorm.DeletedAt `gorm:"index" json:"-"`
}

type Track struct {
	ID          TrackKey       `gorm:"primaryKey" json:"id"`
	Title       string         `json:"title"`
	Description string         `json:"description"`
	Units       []Unit         `json:"units,omitempty"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

type UnitStatus string

const (
	UnitNotStarted UnitStatus = "not_started"
	UnitInProgress UnitStatus = "in_progress"
	UnitCompleted  UnitStatus = "completed"
)

type Unit struct {
	ID        string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	TrackID   TrackKey       `json:"trackId"`
	Track     *Track         `json:"track,omitempty"`
	Title     string         `json:"title"`
	Status    UnitStatus     `json:"status"`
	Lessons   []Lesson       `json:"lessons,omitempty"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type Lesson struct {
	ID               string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UnitID           string         `json:"unitId"`
	Title            string         `json:"title"`
	Summary          string         `json:"summary"`
	Level            TrackKey       `json:"level"`
	SkillTags        pq.StringArray `gorm:"type:text[]" json:"skillTags"`
	EstimatedMinutes int            `json:"estimatedMinutes"`
	AudioHint        string         `json:"audioHint"`
	CreatedAt        time.Time      `json:"createdAt"`
	UpdatedAt        time.Time      `json:"updatedAt"`
	DeletedAt        gorm.DeletedAt `gorm:"index" json:"-"`
}

type UserUnit struct {
	ID        string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID    string         `gorm:"index" json:"userId"`
	UnitID    string         `gorm:"index" json:"unitId"`
	Status    UnitStatus     `json:"status"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type QuestionType string

const (
	QMatching  QuestionType = "matching"
	QTyping    QuestionType = "typing"
	QOrdering  QuestionType = "ordering"
	QReading   QuestionType = "reading"
	QListening QuestionType = "listening"
	QKanji     QuestionType = "kanji"
)

type Question struct {
	ID        string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Track     TrackKey       `gorm:"index" json:"track"`
	Prompt    string         `json:"prompt"`
	Choices   datatypes.JSON `json:"choices"`
	Answer    string         `json:"answer"`
	Type      QuestionType   `json:"type"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type KanjiEntry struct {
	ID        string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Kanji     string         `gorm:"uniqueIndex" json:"kanji"`
	ArtiUmum  string         `json:"artiUmum"`
	Kosakata  datatypes.JSON `json:"kosakata"` // [{kata,baca,arti}]
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type FlashcardType string

const (
	FlashKana  FlashcardType = "kana"
	FlashVocab FlashcardType = "vocab"
	FlashKanji FlashcardType = "kanji"
)

type Flashcard struct {
	ID           string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID       string         `gorm:"index" json:"userId"`
	Prompt       string         `json:"prompt"`
	Answer       string         `json:"answer"`
	Level        TrackKey       `json:"level"`
	Type         FlashcardType  `json:"type"`
	Ease         float64        `json:"ease"`
	IntervalDays int            `json:"intervalDays"`
	Due          int64          `json:"due"`
	CreatedAt    time.Time      `json:"createdAt"`
	UpdatedAt    time.Time      `json:"updatedAt"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}

type GradeQuality string

const (
	QualityAgain GradeQuality = "again"
	QualityGood  GradeQuality = "good"
	QualityEasy  GradeQuality = "easy"
)

type ReviewLog struct {
	ID        string       `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID    string       `gorm:"index" json:"userId"`
	CardID    string       `gorm:"index" json:"cardId"`
	Quality   GradeQuality `json:"quality"`
	PrevDue   int64        `json:"prevDue"`
	NextDue   int64        `json:"nextDue"`
	CreatedAt time.Time    `json:"createdAt"`
}

type PracticeAttempt struct {
	ID        string    `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID    string    `gorm:"index" json:"userId"`
	Track     TrackKey  `json:"track"`
	Mode      string    `json:"mode"`
	Score     int       `json:"score"`
	Total     int       `json:"total"`
	Passed    bool      `json:"passed"`
	CreatedAt time.Time `json:"createdAt"`
}

type PracticeAnswer struct {
	ID              string       `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	AttemptID       string       `gorm:"index" json:"attemptId"`
	QuestionID      string       `json:"questionId"`
	PromptSnapshot  string       `json:"promptSnapshot"`
	Type            QuestionType `json:"type"`
	Selected        string       `json:"selected"`
	Correct         string       `json:"correct"`
	IsCorrect       bool         `json:"isCorrect"`
	QuestionOrdinal int          `json:"questionOrdinal"`
	CreatedAt       time.Time    `json:"createdAt"`
}
