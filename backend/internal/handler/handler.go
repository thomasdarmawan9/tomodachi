package handler

import (
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
	"gorm.io/gorm"

	"github.com/thomasdarmawan/tomodachi/backend/internal/auth"
	"github.com/thomasdarmawan/tomodachi/backend/internal/model"
	"github.com/thomasdarmawan/tomodachi/backend/internal/practice"
	"github.com/thomasdarmawan/tomodachi/backend/internal/srs"
)

type Handler struct {
	db        *gorm.DB
	authSvc   *auth.Service
	srsEngine *srs.Engine
}

func New(db *gorm.DB, authSvc *auth.Service) *Handler {
	return &Handler{
		db:        db,
		authSvc:   authSvc,
		srsEngine: srs.NewEngine(),
	}
}

// Auth

type signupRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	Name     string `json:"name" binding:"required"`
}

func (h *Handler) SignUp(c *gin.Context) {
	var req signupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, token, err := h.authSvc.SignUp(c.Request.Context(), h.db, req.Email, req.Password, req.Name)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"token": token, "user": user})
}

type loginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

func (h *Handler) Login(c *gin.Context) {
	var req loginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, token, err := h.authSvc.Login(c.Request.Context(), h.db, req.Email, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token, "user": user})
}

func (h *Handler) Logout(c *gin.Context) {
	// Stateless JWT: client just drops the token
	c.Status(http.StatusNoContent)
}

func (h *Handler) Me(c *gin.Context) {
	user := auth.MustUser(c)
	var profile model.Profile
	if err := h.db.WithContext(c.Request.Context()).
		Preload("User").
		First(&profile, "user_id = ?", user.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "profile not found"})
		return
	}
	if profile.Focuses == nil {
		profile.Focuses = pq.StringArray{}
	}
	c.JSON(http.StatusOK, profile)
}

// Profile

type updateProfileRequest struct {
	Name          *string         `json:"name"`
	Track         *model.TrackKey `json:"track"`
	TargetMinutes *int            `json:"targetMinutes"`
	Focuses       *[]string       `json:"focuses"`
}

func (h *Handler) GetProfile(c *gin.Context) {
	user := auth.MustUser(c)
	var profile model.Profile
	if err := h.db.WithContext(c.Request.Context()).
		First(&profile, "user_id = ?", user.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "profile not found"})
		return
	}
	if profile.Focuses == nil {
		profile.Focuses = pq.StringArray{}
	}
	c.JSON(http.StatusOK, profile)
}

func (h *Handler) UpdateProfile(c *gin.Context) {
	user := auth.MustUser(c)
	var req updateProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var profile model.Profile
	if err := h.db.WithContext(c.Request.Context()).
		First(&profile, "user_id = ?", user.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "profile not found"})
		return
	}

	if req.Name != nil {
		profile.Name = strings.TrimSpace(*req.Name)
	}
	if req.Track != nil {
		profile.Track = *req.Track
	}
	if req.TargetMinutes != nil {
		profile.TargetMinutes = *req.TargetMinutes
	}
	if req.Focuses != nil {
		profile.Focuses = *req.Focuses
	}

	if err := h.db.WithContext(c.Request.Context()).Save(&profile).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update profile"})
		return
	}

	c.JSON(http.StatusOK, profile)
}

func (h *Handler) CompleteOnboarding(c *gin.Context) {
	user := auth.MustUser(c)
	if err := h.db.WithContext(c.Request.Context()).
		Model(&model.Profile{}).
		Where("user_id = ?", user.ID).
		Update("onboarding_complete", true).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update onboarding"})
		return
	}
	c.Status(http.StatusNoContent)
}

func (h *Handler) SwitchTrack(c *gin.Context) {
	user := auth.MustUser(c)
	var payload struct {
		Track model.TrackKey `json:"track" binding:"required"`
	}
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.db.WithContext(c.Request.Context()).
		Model(&model.Profile{}).
		Where("user_id = ?", user.ID).
		Update("track", payload.Track).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to switch track"})
		return
	}
	c.Status(http.StatusNoContent)
}

// Tracks & units

func (h *Handler) ListTracks(c *gin.Context) {
	var tracks []model.Track
	if err := h.db.WithContext(c.Request.Context()).Find(&tracks).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch tracks"})
		return
	}
	c.JSON(http.StatusOK, tracks)
}

func (h *Handler) ListUnits(c *gin.Context) {
	trackID := c.Param("id")
	var units []model.Unit
	if err := h.db.WithContext(c.Request.Context()).
		Where("track_id = ?", trackID).
		Preload("Lessons").
		Find(&units).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch units"})
		return
	}
	c.JSON(http.StatusOK, units)
}

func (h *Handler) UpdateUnitStatus(c *gin.Context) {
	user := auth.MustUser(c)
	unitID := c.Param("id")
	var payload struct {
		Status model.UnitStatus `json:"status" binding:"required"`
	}
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	entry := model.UserUnit{
		UserID: user.ID,
		UnitID: unitID,
		Status: payload.Status,
	}
	if err := h.db.WithContext(c.Request.Context()).
		Where("user_id = ? AND unit_id = ?", user.ID, unitID).
		Assign(entry).
		FirstOrCreate(&entry).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update unit status"})
		return
	}

	c.JSON(http.StatusOK, entry)
}

// Practice

func (h *Handler) GetQuestions(c *gin.Context) {
	mode := c.Query("mode")
	index := c.Query("index")
	seed := time.Now().UnixNano()
	if index != "" {
		if parsed, err := strconv.ParseInt(index, 10, 64); err == nil {
			seed = parsed
		}
	}

	track := practice.ModeToTrack(mode)
	qType := practice.ModeToQuestionType(mode)

	var questions []model.Question
	if qType == model.QKanji {
		// Build kanji questions dynamically from kanji_entries table.
		var entries []model.KanjiEntry
		if err := h.db.WithContext(c.Request.Context()).
			Order("id").
			Limit(200).
			Find(&entries).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch kanji entries"})
			return
		}
		questions = practice.BuildKanjiQuestions(entries, 10, seed)
	} else {
		query := h.db.WithContext(c.Request.Context()).
			Order("RANDOM()"). // randomize to mix hiragana/katakana pools
			Limit(30)
		if track != "" {
			query = query.Where("track = ?", track)
		}
		if qType != "" {
			query = query.Where("type = ?", qType)
		}
		if err := query.Find(&questions).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch questions"})
			return
		}
		questions = practice.PickRandom(questions, 10)
	}

	c.JSON(http.StatusOK, questions)
}

// Practice history & placement

func (h *Handler) PracticeHistory(c *gin.Context) {
	user := auth.MustUser(c)
	var attempts []model.PracticeAttempt
	if err := h.db.WithContext(c.Request.Context()).
		Where("user_id = ?", user.ID).
		Order("created_at desc").
		Limit(20).
		Find(&attempts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch history"})
		return
	}
	c.JSON(http.StatusOK, attempts)
}

func (h *Handler) PlacementQuestions(c *gin.Context) {
	seed := time.Now().UnixNano()
	if idx := c.Query("index"); idx != "" {
		if parsed, err := strconv.ParseInt(idx, 10, 64); err == nil {
			seed = parsed
		}
	}

	var questions []model.Question
	if err := h.db.WithContext(c.Request.Context()).
		Where("track = ?", "placement").
		Order("id").
		Limit(200).
		Find(&questions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch placement questions"})
		return
	}

	r := rand.New(rand.NewSource(seed))
	c.JSON(http.StatusOK, practice.PickRandomWithRand(questions, 30, r))
}

type practiceSubmitRequest struct {
	Mode    string `json:"mode"`
	Answers []struct {
		QuestionID string `json:"questionId"`
		Selected   string `json:"selected"`
	} `json:"answers" binding:"required"`
}

func kanjiEntryIDFromQuestionID(qid string) string {
	if idx := strings.LastIndex(qid, "-q"); idx != -1 {
		return qid[:idx]
	}
	return qid
}

func (h *Handler) SubmitPractice(c *gin.Context) {
	user := auth.MustUser(c)
	var req practiceSubmitRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	isKanjiMode := practice.ModeToQuestionType(req.Mode) == model.QKanji

	total := len(req.Answers)
	score := 0
	var answers []model.PracticeAnswer
	if isKanjiMode {
		entryIDs := make([]string, 0, len(req.Answers))
		seen := make(map[string]struct{})
		for _, a := range req.Answers {
			id := kanjiEntryIDFromQuestionID(a.QuestionID)
			if _, ok := seen[id]; !ok {
				entryIDs = append(entryIDs, id)
				seen[id] = struct{}{}
			}
		}

		var entries []model.KanjiEntry
		if err := h.db.WithContext(c.Request.Context()).
			Where("id IN ?", entryIDs).
			Find(&entries).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load kanji questions"})
			return
		}
		entryMap := make(map[string]model.KanjiEntry, len(entries))
		for _, e := range entries {
			entryMap[e.ID] = e
		}

		for idx, a := range req.Answers {
			entryID := kanjiEntryIDFromQuestionID(a.QuestionID)
			entry := entryMap[entryID]
			correct := practice.KanjiCorrectAnswer(entry)
			isCorrect := correct != "" && strings.TrimSpace(a.Selected) == correct
			if isCorrect {
				score++
			}
			answers = append(answers, model.PracticeAnswer{
				QuestionID:      a.QuestionID,
				PromptSnapshot:  entry.Kanji,
				Type:            model.QKanji,
				Selected:        a.Selected,
				Correct:         correct,
				IsCorrect:       isCorrect,
				QuestionOrdinal: idx + 1,
			})
		}
	} else {
		var questions []model.Question
		ids := make([]string, 0, len(req.Answers))
		for _, a := range req.Answers {
			ids = append(ids, a.QuestionID)
		}
		if err := h.db.WithContext(c.Request.Context()).
			Where("id IN ?", ids).Find(&questions).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load questions"})
			return
		}

		qMap := make(map[string]model.Question)
		for _, q := range questions {
			qMap[q.ID] = q
		}

		for idx, a := range req.Answers {
			q := qMap[a.QuestionID]
			isCorrect := strings.TrimSpace(a.Selected) == q.Answer
			if isCorrect {
				score++
			}
			answers = append(answers, model.PracticeAnswer{
				QuestionID:      a.QuestionID,
				PromptSnapshot:  q.Prompt,
				Type:            q.Type,
				Selected:        a.Selected,
				Correct:         q.Answer,
				IsCorrect:       isCorrect,
				QuestionOrdinal: idx + 1,
			})
		}
	}

	attempt := model.PracticeAttempt{
		UserID: user.ID,
		Track:  practice.ModeToTrack(req.Mode),
		Mode:   req.Mode,
		Score:  score,
		Total:  total,
		Passed: score >= 8,
	}

	err := h.db.WithContext(c.Request.Context()).Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&attempt).Error; err != nil {
			return err
		}
		for i := range answers {
			answers[i].AttemptID = attempt.ID
		}
		if len(answers) > 0 {
			if err := tx.Create(&answers).Error; err != nil {
				return err
			}
		}
		return nil
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save attempt"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"score":   score,
		"total":   total,
		"passed":  attempt.Passed,
		"answers": answers,
	})
}

// SRS

func (h *Handler) GetDueFlashcards(c *gin.Context) {
	user := auth.MustUser(c)
	var cards []model.Flashcard
	now := time.Now().UnixMilli()
	if err := h.db.WithContext(c.Request.Context()).
		Where("user_id = ? AND due <= ?", user.ID, now).
		Order("due asc").
		Limit(50).
		Find(&cards).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load flashcards"})
		return
	}
	c.JSON(http.StatusOK, cards)
}

func (h *Handler) GradeCard(c *gin.Context) {
	user := auth.MustUser(c)
	cardID := c.Param("id")
	var payload struct {
		Quality model.GradeQuality `json:"quality" binding:"required"`
	}
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var card model.Flashcard
	if err := h.db.WithContext(c.Request.Context()).
		First(&card, "id = ? AND user_id = ?", cardID, user.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "card not found"})
		return
	}

	updated := h.srsEngine.Apply(card, payload.Quality)

	err := h.db.WithContext(c.Request.Context()).Transaction(func(tx *gorm.DB) error {
		if err := tx.Save(&updated).Error; err != nil {
			return err
		}
		log := model.ReviewLog{
			UserID:    user.ID,
			CardID:    card.ID,
			Quality:   payload.Quality,
			PrevDue:   card.Due,
			NextDue:   updated.Due,
			CreatedAt: time.Now(),
		}
		if err := tx.Create(&log).Error; err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to grade"})
		return
	}

	// XP & streak minimal update
	h.db.WithContext(c.Request.Context()).
		Model(&model.Profile{}).
		Where("user_id = ?", user.ID).
		Update("xp", gorm.Expr("xp + ?", srs.GainedXP(payload.Quality)))

	c.JSON(http.StatusOK, updated)
}

func (h *Handler) SrsStats(c *gin.Context) {
	user := auth.MustUser(c)
	now := time.Now()
	today := now.Truncate(24 * time.Hour)

	var reviewedToday int64
	h.db.WithContext(c.Request.Context()).
		Model(&model.ReviewLog{}).
		Where("user_id = ? AND created_at >= ?", user.ID, today).
		Count(&reviewedToday)

	var totalCards int64
	h.db.WithContext(c.Request.Context()).
		Model(&model.Flashcard{}).
		Where("user_id = ?", user.ID).
		Count(&totalCards)

	var dueCount int64
	h.db.WithContext(c.Request.Context()).
		Model(&model.Flashcard{}).
		Where("user_id = ? AND due <= ?", user.ID, now.UnixMilli()).
		Count(&dueCount)

	c.JSON(http.StatusOK, gin.H{
		"reviewedToday": reviewedToday,
		"totalCards":    totalCards,
		"dueCards":      dueCount,
	})
}

func (h *Handler) CreateCustomFlashcard(c *gin.Context) {
	user := auth.MustUser(c)
	var payload struct {
		Prompt string              `json:"prompt" binding:"required"`
		Answer string              `json:"answer" binding:"required"`
		Level  model.TrackKey      `json:"level"`
		Type   model.FlashcardType `json:"type" binding:"required"`
	}
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	card := model.Flashcard{
		UserID:       user.ID,
		Prompt:       payload.Prompt,
		Answer:       payload.Answer,
		Level:        payload.Level,
		Type:         payload.Type,
		Ease:         2.5,
		IntervalDays: 1,
		Due:          time.Now().UnixMilli(),
	}
	if card.Level == "" {
		card.Level = model.TrackBeginner
	}

	if err := h.db.WithContext(c.Request.Context()).Create(&card).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create flashcard"})
		return
	}
	c.JSON(http.StatusCreated, card)
}

// Dashboard

func (h *Handler) DashboardSummary(c *gin.Context) {
	user := auth.MustUser(c)
	var profile model.Profile
	if err := h.db.WithContext(c.Request.Context()).
		First(&profile, "user_id = ?", user.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "profile not found"})
		return
	}

	var unitCount int64
	h.db.Model(&model.Unit{}).Count(&unitCount)

	var reviewedToday int64
	today := time.Now().Truncate(24 * time.Hour)
	h.db.Model(&model.ReviewLog{}).
		Where("user_id = ? AND created_at >= ?", user.ID, today).
		Count(&reviewedToday)

	c.JSON(http.StatusOK, gin.H{
		"profile":       profile,
		"unitsTotal":    unitCount,
		"reviewedToday": reviewedToday,
	})
}

// Next unit helper
func (h *Handler) NextUnit(c *gin.Context) {
	user := auth.MustUser(c)
	trackID := c.Param("id")

	var units []model.Unit
	if err := h.db.WithContext(c.Request.Context()).Where("track_id = ?", trackID).Order("created_at asc").Find(&units).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to load units"})
		return
	}

	if len(units) == 0 {
		c.JSON(http.StatusOK, gin.H{"unit": nil})
		return
	}

	// Check user status
	var userUnits []model.UserUnit
	h.db.WithContext(c.Request.Context()).
		Where("user_id = ? AND unit_id IN ?", user.ID, unitIDs(units)).
		Find(&userUnits)

	statusMap := make(map[string]model.UnitStatus)
	for _, uu := range userUnits {
		statusMap[uu.UnitID] = uu.Status
	}

	// Pick first not completed; else first
	var next model.Unit
	found := false
	for _, u := range units {
		if statusMap[u.ID] != model.UnitCompleted {
			next = u
			found = true
			break
		}
	}
	if !found {
		next = units[0]
	}

	c.JSON(http.StatusOK, gin.H{"unit": next})
}

func unitIDs(units []model.Unit) []string {
	out := make([]string, 0, len(units))
	for _, u := range units {
		out = append(out, u.ID)
	}
	return out
}
