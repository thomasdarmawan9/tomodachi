"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type KanaCell = {
  roma: string;
  hira: string;
  kata: string;
};

const gojuon: (KanaCell | null)[][] = [
  [
    { roma: "a", hira: "あ", kata: "ア" },
    { roma: "i", hira: "い", kata: "イ" },
    { roma: "u", hira: "う", kata: "ウ" },
    { roma: "e", hira: "え", kata: "エ" },
    { roma: "o", hira: "お", kata: "オ" }
  ],
  [
    { roma: "ka", hira: "か", kata: "カ" },
    { roma: "ki", hira: "き", kata: "キ" },
    { roma: "ku", hira: "く", kata: "ク" },
    { roma: "ke", hira: "け", kata: "ケ" },
    { roma: "ko", hira: "こ", kata: "コ" }
  ],
  [
    { roma: "sa", hira: "さ", kata: "サ" },
    { roma: "shi", hira: "し", kata: "シ" },
    { roma: "su", hira: "す", kata: "ス" },
    { roma: "se", hira: "せ", kata: "セ" },
    { roma: "so", hira: "そ", kata: "ソ" }
  ],
  [
    { roma: "ta", hira: "た", kata: "タ" },
    { roma: "chi", hira: "ち", kata: "チ" },
    { roma: "tsu", hira: "つ", kata: "ツ" },
    { roma: "te", hira: "て", kata: "テ" },
    { roma: "to", hira: "と", kata: "ト" }
  ],
  [
    { roma: "na", hira: "な", kata: "ナ" },
    { roma: "ni", hira: "に", kata: "ニ" },
    { roma: "nu", hira: "ぬ", kata: "ヌ" },
    { roma: "ne", hira: "ね", kata: "ネ" },
    { roma: "no", hira: "の", kata: "ノ" }
  ],
  [
    { roma: "ha", hira: "は", kata: "ハ" },
    { roma: "hi", hira: "ひ", kata: "ヒ" },
    { roma: "fu", hira: "ふ", kata: "フ" },
    { roma: "he", hira: "へ", kata: "ヘ" },
    { roma: "ho", hira: "ほ", kata: "ホ" }
  ],
  [
    { roma: "ma", hira: "ま", kata: "マ" },
    { roma: "mi", hira: "み", kata: "ミ" },
    { roma: "mu", hira: "む", kata: "ム" },
    { roma: "me", hira: "め", kata: "メ" },
    { roma: "mo", hira: "も", kata: "モ" }
  ],
  [
    { roma: "ya", hira: "や", kata: "ヤ" },
    null,
    { roma: "yu", hira: "ゆ", kata: "ユ" },
    null,
    { roma: "yo", hira: "よ", kata: "ヨ" }
  ],
  [
    { roma: "ra", hira: "ら", kata: "ラ" },
    { roma: "ri", hira: "り", kata: "リ" },
    { roma: "ru", hira: "る", kata: "ル" },
    { roma: "re", hira: "れ", kata: "レ" },
    { roma: "ro", hira: "ろ", kata: "ロ" }
  ],
  [
    { roma: "wa", hira: "わ", kata: "ワ" },
    null,
    null,
    null,
    { roma: "wo", hira: "を", kata: "ヲ" }
  ],
  [
    { roma: "n", hira: "ん", kata: "ン" },
    null,
    null,
    null,
    null
  ]
];

const dakuten: (KanaCell | null)[][] = [
  [
    { roma: "ga", hira: "が", kata: "ガ" },
    { roma: "gi", hira: "ぎ", kata: "ギ" },
    { roma: "gu", hira: "ぐ", kata: "グ" },
    { roma: "ge", hira: "げ", kata: "ゲ" },
    { roma: "go", hira: "ご", kata: "ゴ" }
  ],
  [
    { roma: "za", hira: "ざ", kata: "ザ" },
    { roma: "ji", hira: "じ", kata: "ジ" },
    { roma: "zu", hira: "ず", kata: "ズ" },
    { roma: "ze", hira: "ぜ", kata: "ゼ" },
    { roma: "zo", hira: "ぞ", kata: "ゾ" }
  ],
  [
    { roma: "da", hira: "だ", kata: "ダ" },
    { roma: "ji", hira: "ぢ", kata: "ヂ" },
    { roma: "zu", hira: "づ", kata: "ヅ" },
    { roma: "de", hira: "で", kata: "デ" },
    { roma: "do", hira: "ど", kata: "ド" }
  ],
  [
    { roma: "ba", hira: "ば", kata: "バ" },
    { roma: "bi", hira: "び", kata: "ビ" },
    { roma: "bu", hira: "ぶ", kata: "ブ" },
    { roma: "be", hira: "べ", kata: "ベ" },
    { roma: "bo", hira: "ぼ", kata: "ボ" }
  ]
];

const handakuten: (KanaCell | null)[][] = [
  [
    { roma: "pa", hira: "ぱ", kata: "パ" },
    { roma: "pi", hira: "ぴ", kata: "ピ" },
    { roma: "pu", hira: "ぷ", kata: "プ" },
    { roma: "pe", hira: "ぺ", kata: "ペ" },
    { roma: "po", hira: "ぽ", kata: "ポ" }
  ]
];

const youon: KanaCell[][] = [
  [
    { roma: "kya", hira: "きゃ", kata: "キャ" },
    { roma: "kyu", hira: "きゅ", kata: "キュ" },
    { roma: "kyo", hira: "きょ", kata: "キョ" }
  ],
  [
    { roma: "sha", hira: "しゃ", kata: "シャ" },
    { roma: "shu", hira: "しゅ", kata: "シュ" },
    { roma: "sho", hira: "しょ", kata: "ショ" }
  ],
  [
    { roma: "cha", hira: "ちゃ", kata: "チャ" },
    { roma: "chu", hira: "ちゅ", kata: "チュ" },
    { roma: "cho", hira: "ちょ", kata: "チョ" }
  ],
  [
    { roma: "nya", hira: "にゃ", kata: "ニャ" },
    { roma: "nyu", hira: "にゅ", kata: "ニュ" },
    { roma: "nyo", hira: "にょ", kata: "ニョ" }
  ],
  [
    { roma: "hya", hira: "ひゃ", kata: "ヒャ" },
    { roma: "hyu", hira: "ひゅ", kata: "ヒュ" },
    { roma: "hyo", hira: "ひょ", kata: "ヒョ" }
  ],
  [
    { roma: "mya", hira: "みゃ", kata: "ミャ" },
    { roma: "myu", hira: "みゅ", kata: "ミュ" },
    { roma: "myo", hira: "みょ", kata: "ミョ" }
  ],
  [
    { roma: "rya", hira: "りゃ", kata: "リャ" },
    { roma: "ryu", hira: "りゅ", kata: "リュ" },
    { roma: "ryo", hira: "りょ", kata: "リョ" }
  ],
  [
    { roma: "gya", hira: "ぎゃ", kata: "ギャ" },
    { roma: "gyu", hira: "ぎゅ", kata: "ギュ" },
    { roma: "gyo", hira: "ぎょ", kata: "ギョ" }
  ],
  [
    { roma: "ja", hira: "じゃ", kata: "ジャ" },
    { roma: "ju", hira: "じゅ", kata: "ジュ" },
    { roma: "jo", hira: "じょ", kata: "ジョ" }
  ],
  [
    { roma: "bya", hira: "びゃ", kata: "ビャ" },
    { roma: "byu", hira: "びゅ", kata: "ビュ" },
    { roma: "byo", hira: "びょ", kata: "ビョ" }
  ],
  [
    { roma: "pya", hira: "ぴゃ", kata: "ピャ" },
    { roma: "pyu", hira: "ぴゅ", kata: "ピュ" },
    { roma: "pyo", hira: "ぴょ", kata: "ピョ" }
  ]
];

const vowels = ["a", "i", "u", "e", "o"] as const;

function KanaGrid({ rows, script }: { rows: (KanaCell | null)[][]; script: "hira" | "kata" }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {rows.map((row, rowIdx) =>
        row.map((cell, colIdx) =>
          cell ? (
            <div
              key={`${cell.roma}-${rowIdx}-${colIdx}`}
              className="flex h-24 flex-col justify-between rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm"
            >
              <div className="flex items-start justify-between text-xs uppercase tracking-wide text-slate-400">
                <span>{vowels[colIdx] ?? ""}</span>
                <span className="font-semibold text-slate-500">{cell.roma}</span>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-slate-900">
                  {script === "hira" ? cell.hira : cell.kata}
                </p>
                <p className="text-xs font-medium uppercase text-slate-500">{cell.roma}</p>
              </div>
            </div>
          ) : (
            <div
              key={`placeholder-${rowIdx}-${colIdx}`}
              aria-hidden
              className="h-24 rounded-xl border border-dashed border-slate-100 bg-slate-50"
            />
          )
        )
      )}
    </div>
  );
}

export default function DictionaryPage() {
  const [script, setScript] = useState<"hira" | "kata">("hira");

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:py-10">
      <header className="rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 px-5 py-6 text-white shadow-card sm:px-6 sm:py-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-wide text-white/80">Kamus · Kana Chart</p>
            <h1 className="text-3xl font-bold">Dictionary</h1>
            <p className="text-sm leading-relaxed text-white/85">
              Pilih tab Hiragana atau Katakana untuk melihat semua huruf beserta romajinya.
              Setiap kartu mewakili satu huruf, mudah di-scan dan diklik.
            </p>
          </div>
          <Link href="/">
            <Button variant="ghost" className="h-12 w-12 p-0 text-white hover:bg-white/15">
              <svg
                className="h-6 w-6"
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
          </Link>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pilih kategori</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={script === "hira" ? "primary" : "outline"}
            className="px-4"
            onClick={() => setScript("hira")}
          >
            Hiragana
          </Button>
          <Button
            variant={script === "kata" ? "primary" : "outline"}
            className="px-4"
            onClick={() => setScript("kata")}
          >
            Katakana
          </Button>
        </div>
      </div>

      <Card className="space-y-4 border border-slate-100 p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {script === "hira" ? "Huruf Hiragana" : "Huruf Katakana"}
            </p>
            <p className="text-xs text-slate-500">Disusun per kolom a · i · u · e · o</p>
          </div>
          <p className="text-xs rounded-full bg-slate-100 px-3 py-1 text-slate-600">
            1 huruf = 1 kartu
          </p>
        </div>

        <KanaGrid rows={gojuon} script={script} />
      </Card>

      <Card className="space-y-4 border border-slate-100 p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {script === "hira" ? "Tenten (Dakuten) Hiragana" : "Tenten (Dakuten) Katakana"}
            </p>
            <p className="text-xs text-slate-500">Baris ga/za/da/ba dengan titik (゛ / ゛).</p>
          </div>
          <p className="text-xs rounded-full bg-slate-100 px-3 py-1 text-slate-600">
            Variasi bersuara
          </p>
        </div>

        <KanaGrid rows={dakuten} script={script} />
      </Card>

      <Card className="space-y-4 border border-slate-100 p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {script === "hira" ? "Maru (Handakuten) Hiragana" : "Maru (Handakuten) Katakana"}
            </p>
            <p className="text-xs text-slate-500">Baris pa dengan lingkaran kecil (゜ / ゜).</p>
          </div>
          <p className="text-xs rounded-full bg-slate-100 px-3 py-1 text-slate-600">
            Variasi p/b → p
          </p>
        </div>

        <KanaGrid rows={handakuten} script={script} />
      </Card>

      <Card className="space-y-4 border border-slate-100 p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {script === "hira" ? "Youon (ゃ ゅ ょ) Hiragana" : "Youon (ャ ュ ョ) Katakana"}
            </p>
            <p className="text-xs text-slate-500">Kombinasi kecil ya/yu/yo (ゃ/ゅ/ょ) untuk bunyi gabungan.</p>
          </div>
          <p className="text-xs rounded-full bg-slate-100 px-3 py-1 text-slate-600">
            Kombinasi ya/yu/yo
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {youon.map((row, rowIdx) =>
            row.map((cell, colIdx) => (
              <div
                key={`${cell.roma}-${rowIdx}-${colIdx}`}
                className="flex h-24 flex-col justify-between rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm"
              >
                <div className="flex items-start justify-between text-xs uppercase tracking-wide text-slate-400">
                  <span>{["ya", "yu", "yo"][colIdx] ?? ""}</span>
                  <span className="font-semibold text-slate-500">{cell.roma}</span>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-slate-900">
                    {script === "hira" ? cell.hira : cell.kata}
                  </p>
                  <p className="text-[11px] font-medium uppercase text-slate-500">{cell.roma}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </main>
  );
}
