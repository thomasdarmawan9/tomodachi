import { Flashcard, LearningTrack, Profile } from "./types";

export const defaultProfile: Profile = {
  name: "Tomodachi Learner",
  track: "beginner",
  targetMinutes: 20,
  focuses: ["reading", "listening"],
  streakDays: 3,
  xp: 120
};

export const tracks: LearningTrack[] = [
  {
    id: "beginner",
    title: "Beginner Kana",
    description: "Hiragana dan Katakana dasar dengan audio dan kuis cepat.",
    units: [
      {
        id: "hiragana-1",
        title: "Hiragana Inti",
        status: "in_progress",
        lessons: [
          {
            id: "hi-a",
            title: "A I U E O",
            summary: "Pengenalan bunyi vokal inti dengan audio dasar.",
            level: "beginner",
            skillTags: ["reading", "listening"],
            estimatedMinutes: 8,
            audioHint: "あ い う え お",
            quiz: [
              {
                id: "hi-a-q1",
                prompt: "Kana mana untuk bunyi 'a'?",
                choices: ["あ", "い", "う", "お"],
                answer: "あ",
                hint: "Bentuk seperti huruf a dengan tambahan ekor."
              },
              {
                id: "hi-a-q2",
                prompt: "Bunyi untuk kana え?",
                choices: ["e", "o", "i", "u"],
                answer: "e"
              }
            ]
          },
          {
            id: "hi-k",
            title: "K-Line",
            summary: "Ka Ki Ku Ke Ko dengan latihan dengar → pilih.",
            level: "beginner",
            skillTags: ["listening", "reading"],
            estimatedMinutes: 10,
            audioHint: "か き く け こ",
            quiz: [
              {
                id: "hi-k-q1",
                prompt: "Kana mana untuk bunyi 'ke'?",
                choices: ["け", "か", "こ", "く"],
                answer: "け"
              },
              {
                id: "hi-k-q2",
                prompt: "Bunyi untuk kana く?",
                choices: ["ku", "ko", "ka", "ke"],
                answer: "ku"
              }
            ]
          }
        ]
      },
      {
        id: "katakana-1",
        title: "Katakana Dasar",
        status: "not_started",
        lessons: [
          {
            id: "ka-a",
            title: "A I U E O (カタカナ)",
            summary: "Vokal dasar untuk kata serapan.",
            level: "beginner",
            skillTags: ["reading", "listening"],
            estimatedMinutes: 7,
            audioHint: "ア イ ウ エ オ",
            quiz: [
              {
                id: "ka-a-q1",
                prompt: "Simbol untuk bunyi 'o'?",
                choices: ["オ", "イ", "エ", "ウ"],
                answer: "オ"
              },
              {
                id: "ka-a-q2",
                prompt: "Bunyi untuk kana ウ?",
                choices: ["u", "o", "i", "e"],
                answer: "u"
              }
            ]
          },
          {
            id: "ka-k",
            title: "K-Line Katakana",
            summary: "Ka Ki Ku Ke Ko versi katakana untuk kata pinjaman.",
            level: "beginner",
            skillTags: ["reading", "listening"],
            estimatedMinutes: 9,
            audioHint: "カ キ ク ケ コ",
            quiz: [
              {
                id: "ka-k-q1",
                prompt: "Kana untuk bunyi 'ke'?",
                choices: ["ケ", "コ", "カ", "ク"],
                answer: "ケ"
              }
            ]
          }
        ]
      },
      {
        id: "kana-mixed",
        title: "Latihan Campuran",
        status: "not_started",
        lessons: [
          {
            id: "mix-words",
            title: "Baca Kata Sederhana",
            summary: "Gabungkan hiragana + katakana untuk kata serapan.",
            level: "beginner",
            skillTags: ["reading", "listening"],
            estimatedMinutes: 12,
            audioHint: "あお/アイス",
            quiz: [
              {
                id: "mix-q1",
                prompt: "Baca アイ, arti apa?",
                choices: ["ai (love)", "ie (house)", "oi (hey)"],
                answer: "ai (love)"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "n5",
    title: "N5 Dasar",
    description:
      "Vocab, grammar, kanji pertama, dan latihan listening/reading campuran.",
    units: [
      {
        id: "n5-vocab-1",
        title: "Vocab Kehidupan Harian",
        status: "in_progress",
        lessons: [
          {
            id: "n5-v1",
            title: "Salam & Perkenalan",
            summary: "Ohayou, Konnichiwa, Hajimemashite dengan konteks kalimat.",
            level: "n5",
            skillTags: ["listening", "speaking"],
            estimatedMinutes: 10,
            audioHint: "こんにちは",
            quiz: [
              {
                id: "n5-v1-q1",
                prompt: "Arti こんにちは?",
                choices: ["Selamat siang", "Selamat pagi", "Permisi"],
                answer: "Selamat siang"
              },
              {
                id: "n5-v1-q2",
                prompt: "Respon tepat untuk はじめまして?",
                choices: ["よろしくお願いします", "こんにちは", "おはよう"],
                answer: "よろしくお願いします"
              }
            ]
          },
          {
            id: "n5-v2",
            title: "Angka & Waktu",
            summary: "Hitung 1-10, jam, menit dengan pola sederhana.",
            level: "n5",
            skillTags: ["reading", "listening"],
            estimatedMinutes: 12,
            audioHint: "いち に さん",
            quiz: [
              {
                id: "n5-v2-q1",
                prompt: "Bacaan kanji 三?",
                choices: ["san", "yon", "roku"],
                answer: "san"
              }
            ]
          }
        ]
      },
      {
        id: "n5-grammar-1",
        title: "Pola Kalimat Dasar",
        status: "not_started",
        lessons: [
          {
            id: "n5-g1",
            title: "Desu & Partikel Wa",
            summary: "Kalimat nominal sederhana dan topik は.",
            level: "n5",
            skillTags: ["reading", "writing"],
            estimatedMinutes: 11,
            audioHint: "わたし は 田中 です",
            quiz: [
              {
                id: "n5-g1-q1",
                prompt: "Partikel untuk penanda topik?",
                choices: ["は", "が", "を", "に"],
                answer: "は"
              }
            ]
          },
          {
            id: "n5-g2",
            title: "Partikel Objek を",
            summary: "Menyatakan objek langsung.",
            level: "n5",
            skillTags: ["reading", "writing"],
            estimatedMinutes: 10,
            audioHint: "パン を たべます",
            quiz: [
              {
                id: "n5-g2-q1",
                prompt: "Kalimat mana yang benar?",
                choices: [
                  "パン を たべます",
                  "パン は たべます を",
                  "パン を です"
                ],
                answer: "パン を たべます"
              }
            ]
          }
        ]
      },
      {
        id: "n5-kanji-1",
        title: "Kanji Pertama",
        status: "not_started",
        lessons: [
          {
            id: "n5-k1",
            title: "Kanji Dasar: 人, 日, 木",
            summary: "Arti dan bacaan onyomi-kunyomi.",
            level: "n5",
            skillTags: ["reading", "writing"],
            estimatedMinutes: 9,
            audioHint: "ひ と, に ち, き",
            quiz: [
              {
                id: "n5-k1-q1",
                prompt: "Arti kanji 人?",
                choices: ["Orang", "Hari", "Pohon"],
                answer: "Orang"
              }
            ]
          }
        ]
      }
    ]
  }
];

export const flashcardsSeed: Flashcard[] = [
  {
    id: "fc-a",
    prompt: "あ",
    answer: "a",
    level: "beginner",
    ease: 2.5,
    intervalDays: 1,
    due: Date.now(),
    type: "kana"
  },
  {
    id: "fc-ka",
    prompt: "カ",
    answer: "ka",
    level: "beginner",
    ease: 2.5,
    intervalDays: 1,
    due: Date.now(),
    type: "kana"
  },
  {
    id: "fc-n5-v1",
    prompt: "こんにちは",
    answer: "selamat siang",
    level: "n5",
    ease: 2.3,
    intervalDays: 1,
    due: Date.now(),
    type: "vocab"
  },
  {
    id: "fc-kanji-hito",
    prompt: "人",
    answer: "orang (hito)",
    level: "n5",
    ease: 2.2,
    intervalDays: 1,
    due: Date.now(),
    type: "kanji"
  }
];
