export type TrackKey = "beginner" | "n5";

export type SkillFocus = "listening" | "reading" | "writing" | "speaking";

export interface Profile {
  name: string;
  track: TrackKey;
  targetMinutes: number;
  focuses: SkillFocus[];
  streakDays: number;
  xp: number;
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  level: TrackKey;
  skillTags: SkillFocus[];
  estimatedMinutes: number;
  audioHint?: string;
  quiz: QuizItem[];
}

export interface QuizItem {
  id: string;
  prompt: string;
  choices: string[];
  answer: string;
  hint?: string;
}

export interface Flashcard {
  id: string;
  prompt: string;
  answer: string;
  level: TrackKey;
  ease: number;
  intervalDays: number;
  due: number;
  type: "kana" | "vocab" | "kanji";
}

export interface TrackUnit {
  id: string;
  title: string;
  lessons: Lesson[];
  status: "not_started" | "in_progress" | "completed";
}

export interface LearningTrack {
  id: TrackKey;
  title: string;
  description: string;
  units: TrackUnit[];
}
