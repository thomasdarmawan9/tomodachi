"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLearning } from "@/lib/learning-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import kanjiN5 from "@/assets/kanji_n5.json";

type Question = {
  id: string;
  prompt: string;
  choices: string[];
  answer: string;
  type: "matching" | "typing" | "ordering" | "reading" | "listening" | "kanji";
};

type KanjiEntry = {
  kanji: string;
  arti_umum: string;
  kosakata?: { kata: string; baca: string; arti: string }[];
};

const beginnerQuestions: Question[] = [
  { id: "b1", prompt: "Matching: pilih romaji yang sesuai untuk kana あ", choices: ["a", "i", "u", "o"], answer: "a", type: "matching" },
  { id: "b2", prompt: "Matching: kana mana untuk bunyi 'ko'?", choices: ["こ", "か", "け", "く"], answer: "こ", type: "matching" },
  { id: "b3", prompt: "Typing: pilih kana untuk romaji 'su'", choices: ["す", "そ", "し", "せ"], answer: "す", type: "typing" },
  { id: "b4", prompt: "Typing: pilih katakana untuk romaji 'a'", choices: ["ア", "エ", "イ", "オ"], answer: "ア", type: "typing" },
  { id: "b5", prompt: "Ordering: urutan kata untuk 'sushi' dalam kana adalah?", choices: ["すし", "しす", "すさ", "さし"], answer: "すし", type: "ordering" },
  { id: "b6", prompt: "Matching: romaji untuk kana け adalah?", choices: ["ke", "ka", "ko", "ku"], answer: "ke", type: "matching" },
  { id: "b7", prompt: "Typing: pilih kana untuk romaji 'ta'", choices: ["た", "て", "と", "ち"], answer: "た", type: "typing" },
  { id: "b8", prompt: "Ordering: mana yang menulis 'ai' (cinta) dengan benar?", choices: ["あい", "いあ", "あお", "あん"], answer: "あい", type: "ordering" },
  { id: "b9", prompt: "Matching: pilih katakana untuk bunyi 'ko'", choices: ["コ", "カ", "ケ", "ク"], answer: "コ", type: "matching" },
  { id: "b10", prompt: "Typing: kana mana untuk romaji 'ne'?", choices: ["ね", "ぬ", "な", "の"], answer: "ね", type: "typing" }
];

const n5Questions: Question[] = [
  { id: "n1", prompt: "Reading: これは りんご です の arti?", choices: ["Ini apel", "Itu apel", "Ini jeruk", "Ini pir"], answer: "Ini apel", type: "reading" },
  { id: "n2", prompt: "Ordering: susun kalimat 'Saya adalah mahasiswa'.", choices: ["わたし は がくせい です", "です わたし は がくせい", "がくせい です わたし は", "は わたし がくせい です"], answer: "わたし は がくせい です", type: "ordering" },
  { id: "n3", prompt: "Typing (partikel): Watashi __ sensei です", choices: ["は", "が", "を", "に"], answer: "は", type: "typing" },
  { id: "n4", prompt: "Kanji: 人 dibaca (kunyomi) sebagai?", choices: ["ひと", "にん", "じん", "ひ"], answer: "ひと", type: "kanji" },
  { id: "n5", prompt: "Listening (arti): おはようございます berarti?", choices: ["Selamat pagi", "Selamat malam", "Permisi", "Selamat jalan"], answer: "Selamat pagi", type: "listening" },
  { id: "n6", prompt: "Reading: いま なんじ ですか berarti?", choices: ["Sekarang jam berapa?", "Kamu dari mana?", "Berapa harga?", "Apa kabar?"], answer: "Sekarang jam berapa?", type: "reading" },
  { id: "n7", prompt: "Ordering: susun kalimat 'Tanaka makan roti'.", choices: ["田中さん は パン を たべます", "パン を 田中さん は たべます", "を パン たべます 田中さん は", "たべます パン を 田中さん は"], answer: "田中さん は パン を たべます", type: "ordering" },
  { id: "n8", prompt: "Typing (partikel tempat): えき __ いきます", choices: ["に", "を", "が", "で"], answer: "に", type: "typing" },
  { id: "n9", prompt: "Kanji: 日 arti yang tepat?", choices: ["Hari", "Orang", "Pohon", "Air"], answer: "Hari", type: "kanji" },
  { id: "n10", prompt: "Listening/meaning: こんにちは digunakan kapan?", choices: ["Siang/halo", "Pagi", "Malam", "Selamat tinggal"], answer: "Siang/halo", type: "listening" }
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildKanjiQuestions(count = 10): Question[] {
  const entries = kanjiN5 as KanjiEntry[];
  const choicePool = entries
    .flatMap((item) => item.kosakata?.map((kv) => `${kv.baca} · ${kv.arti}`) ?? [])
    .filter(Boolean);

  return shuffle(entries)
    .slice(0, count)
    .map((entry, idx) => {
      const kosakata = entry.kosakata ?? [];
      const picked = kosakata.length ? kosakata[Math.floor(Math.random() * kosakata.length)] : undefined;
      const correct = picked ? `${picked.baca} · ${picked.arti}` : `${entry.kanji} · ${entry.arti_umum}`;
      const distractors = shuffle(choicePool.filter((choice) => choice !== correct)).slice(0, 3);
      const choices = shuffle([correct, ...distractors]);

      return {
        id: `kanji-${entry.kanji}-${idx}`,
        prompt: entry.kanji,
        choices,
        answer: correct,
        type: "kanji"
      };
    });
}

function QuestionCard({
  question,
  index,
  selected,
  onSelect
}: {
  question: Question;
  index: number;
  selected?: string;
  onSelect: (choice: string) => void;
}) {
  const letters = ["A", "B", "C", "D"];
  const isKanjiQuestion = question.type === "kanji";

  return (
    <Card className="space-y-4 border border-slate-100">
      <div className="flex items-center justify-between gap-2">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-900">
            {index + 1}. {isKanjiQuestion ? "Pilih bacaan (hiragana) + arti untuk kanji berikut" : question.prompt}
          </p>
          {isKanjiQuestion ? <p className="text-4xl font-bold leading-tight text-slate-900">{question.prompt}</p> : null}
          <p className="text-xs text-slate-500 capitalize">{question.type}</p>
        </div>
        <Badge tone="info">A-D</Badge>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {question.choices.map((choice, idx) => {
          const active = selected === choice;
          const base =
            "flex items-center justify-center gap-2 rounded-xl border px-4 py-4 text-lg font-semibold transition text-center";
          return (
            <button
              key={choice}
              className={`${base} ${
                active ? "border-brand-500 bg-brand-50 text-brand-800" : "border-slate-200 bg-white hover:border-slate-300"
              }`}
              onClick={() => onSelect(choice)}
            >
              <span className="text-sm font-bold text-brand-600">{letters[idx]}.</span>
              <span className="text-slate-900">{choice}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

export default function PracticePage() {
  const { profile } = useLearning();
  const searchParams = useSearchParams();
  const isKanjiMode = searchParams.get("mode") === "kanji";
  const isBeginner = profile.track === "beginner";
  const router = useRouter();

  const baseQuestions = useMemo(() => {
    if (isKanjiMode) return buildKanjiQuestions(10);
    return isBeginner ? beginnerQuestions : n5Questions;
  }, [isBeginner, isKanjiMode]);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setQuestions(shuffle(baseQuestions).slice(0, 10));
    setAnswers({});
    setCurrent(0);
  }, [baseQuestions]);

  const total = questions.length || 10;
  const answeredCount = Object.keys(answers).length;

  const handleSubmit = () => {
    if (!questions.length) return;
    const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0), 0);
    const level = isKanjiMode ? "kanji" : isBeginner ? "beginner" : "n5";
    router.push(`/result?score=${score}&total=${total}&level=${level}`);
  };

  const handleGoHome = () => {
    const proceed = window.confirm("Jawaban tidak akan tersimpan. Yakin ingin kembali ke beranda?");
    if (!proceed) return;
    router.push("/");
  };

  const activeQuestion = questions[current];
  const levelLabel = isKanjiMode ? "Kanji N5" : isBeginner ? "Beginner (Kana)" : "N5 Dasar";

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-6 md:py-10">
      <header className="rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 px-5 py-6 text-white shadow-card">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/80">Step 2 · {isKanjiMode ? "Latihan Kanji" : "Latihan Inti"}</p>
            <h1 className="text-3xl font-bold">Latihan {levelLabel}</h1>
            <p className="text-sm text-white/85">
              {isKanjiMode
                ? "Mode kanji: tebak bacaan hiragana + arti bahasa Indonesia untuk tiap kanji. Soal diambil acak dari bank Kanji N5."
                : "Mode latihan disesuaikan dengan jalur yang dipilih di onboarding. Ubah jalur di halaman utama jika perlu."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="warning">{isKanjiMode ? "Kanji" : isBeginner ? "Beginner" : "N5"}</Badge>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Ganti preferensi
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 h-10 w-10 p-0"
              onClick={handleGoHome}
              aria-label="Kembali ke beranda"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 10L12 3l9 7" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Soal {current + 1}/{total} · pilihan A-D
            </p>
            <p className="text-xs text-slate-500">
              {isKanjiMode ? "Kanji: baca (hiragana) + arti bahasa Indonesia" : "Matching, typing, ordering sesuai level"}
            </p>
          </div>
          <Badge tone="info">Level: {levelLabel}</Badge>
        </div>

        {activeQuestion ? (
          <div className="space-y-3">
            <QuestionCard
              question={activeQuestion}
              index={current}
              selected={answers[activeQuestion.id]}
              onSelect={(choice) => setAnswers((prev) => ({ ...prev, [activeQuestion.id]: choice }))}
            />
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="text-sm text-slate-700">
                Terjawab: {answeredCount}/{total}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="px-3"
                  onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
                  disabled={current === 0}
                >
                  ← Sebelumnya
                </Button>
                {current < total - 1 ? (
                  <Button
                    variant="primary"
                    className="px-3"
                    onClick={() => setCurrent((prev) => Math.min(total - 1, prev + 1))}
                  >
                    Berikutnya →
                  </Button>
                ) : null}
                <Button
                  variant="primary"
                  className="px-4"
                  onClick={handleSubmit}
                  disabled={answeredCount < total}
                >
                  Submit jawaban
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
