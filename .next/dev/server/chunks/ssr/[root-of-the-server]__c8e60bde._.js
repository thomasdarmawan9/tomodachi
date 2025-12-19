module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultProfile",
    ()=>defaultProfile,
    "flashcardsSeed",
    ()=>flashcardsSeed,
    "tracks",
    ()=>tracks
]);
const defaultProfile = {
    name: "Tomodachi Learner",
    track: "beginner",
    targetMinutes: 20,
    focuses: [
        "reading",
        "listening"
    ],
    streakDays: 3,
    xp: 120
};
const tracks = [
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
                        skillTags: [
                            "reading",
                            "listening"
                        ],
                        estimatedMinutes: 8,
                        audioHint: "あ い う え お",
                        quiz: [
                            {
                                id: "hi-a-q1",
                                prompt: "Kana mana untuk bunyi 'a'?",
                                choices: [
                                    "あ",
                                    "い",
                                    "う",
                                    "お"
                                ],
                                answer: "あ",
                                hint: "Bentuk seperti huruf a dengan tambahan ekor."
                            },
                            {
                                id: "hi-a-q2",
                                prompt: "Bunyi untuk kana え?",
                                choices: [
                                    "e",
                                    "o",
                                    "i",
                                    "u"
                                ],
                                answer: "e"
                            }
                        ]
                    },
                    {
                        id: "hi-k",
                        title: "KA KI KU KE KO",
                        summary: "Ka Ki Ku Ke Ko dengan latihan dengar → pilih.",
                        level: "beginner",
                        skillTags: [
                            "listening",
                            "reading"
                        ],
                        estimatedMinutes: 10,
                        audioHint: "か き く け こ",
                        quiz: [
                            {
                                id: "hi-k-q1",
                                prompt: "Kana mana untuk bunyi 'ke'?",
                                choices: [
                                    "け",
                                    "か",
                                    "こ",
                                    "く"
                                ],
                                answer: "け"
                            },
                            {
                                id: "hi-k-q2",
                                prompt: "Bunyi untuk kana く?",
                                choices: [
                                    "ku",
                                    "ko",
                                    "ka",
                                    "ke"
                                ],
                                answer: "ku"
                            }
                        ]
                    },
                    {
                        id: "hi-s",
                        title: "SA SHI SU SE SO",
                        summary: "Konsonan S-line dengan variasi shi.",
                        level: "beginner",
                        skillTags: [
                            "listening",
                            "reading"
                        ],
                        estimatedMinutes: 9,
                        audioHint: "さ し す せ そ",
                        quiz: []
                    },
                    {
                        id: "hi-t",
                        title: "TA CHI TSU TE TO",
                        summary: "Konsonan T-line dengan chi/tsu.",
                        level: "beginner",
                        skillTags: [
                            "listening",
                            "reading"
                        ],
                        estimatedMinutes: 9,
                        audioHint: "た ち つ て と",
                        quiz: []
                    },
                    {
                        id: "hi-n",
                        title: "NA NI NU NE NO",
                        summary: "Konsonan N-line.",
                        level: "beginner",
                        skillTags: [
                            "listening",
                            "reading"
                        ],
                        estimatedMinutes: 8,
                        audioHint: "な に ぬ ね の",
                        quiz: []
                    },
                    {
                        id: "hi-h",
                        title: "HA HI FU HE HO",
                        summary: "Konsonan H-line (fu khusus).",
                        level: "beginner",
                        skillTags: [
                            "listening",
                            "reading"
                        ],
                        estimatedMinutes: 8,
                        audioHint: "は ひ ふ へ ほ",
                        quiz: []
                    },
                    {
                        id: "hi-m",
                        title: "MA MI MU ME MO",
                        summary: "Konsonan M-line.",
                        level: "beginner",
                        skillTags: [
                            "listening",
                            "reading"
                        ],
                        estimatedMinutes: 8,
                        audioHint: "ま み む め も",
                        quiz: []
                    },
                    {
                        id: "hi-y",
                        title: "YA YU YO + N",
                        summary: "Semi-vokal Y-line dan ん.",
                        level: "beginner",
                        skillTags: [
                            "listening",
                            "reading"
                        ],
                        estimatedMinutes: 8,
                        audioHint: "や ゆ よ ん",
                        quiz: []
                    },
                    {
                        id: "hi-r",
                        title: "RA RI RU RE RO",
                        summary: "Konsonan R-line.",
                        level: "beginner",
                        skillTags: [
                            "listening",
                            "reading"
                        ],
                        estimatedMinutes: 8,
                        audioHint: "ら り る れ ろ",
                        quiz: []
                    },
                    {
                        id: "hi-w",
                        title: "WA WO + Kombo",
                        summary: "WA/WO dan kombo kecil ya/yu/yo.",
                        level: "beginner",
                        skillTags: [
                            "listening",
                            "reading"
                        ],
                        estimatedMinutes: 10,
                        audioHint: "わ を きゃ きゅ きょ",
                        quiz: []
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
                        skillTags: [
                            "reading",
                            "listening"
                        ],
                        estimatedMinutes: 7,
                        audioHint: "ア イ ウ エ オ",
                        quiz: [
                            {
                                id: "ka-a-q1",
                                prompt: "Simbol untuk bunyi 'o'?",
                                choices: [
                                    "オ",
                                    "イ",
                                    "エ",
                                    "ウ"
                                ],
                                answer: "オ"
                            },
                            {
                                id: "ka-a-q2",
                                prompt: "Bunyi untuk kana ウ?",
                                choices: [
                                    "u",
                                    "o",
                                    "i",
                                    "e"
                                ],
                                answer: "u"
                            }
                        ]
                    },
                    {
                        id: "ka-k",
                        title: "K-Line Katakana",
                        summary: "Ka Ki Ku Ke Ko versi katakana untuk kata pinjaman.",
                        level: "beginner",
                        skillTags: [
                            "reading",
                            "listening"
                        ],
                        estimatedMinutes: 9,
                        audioHint: "カ キ ク ケ コ",
                        quiz: [
                            {
                                id: "ka-k-q1",
                                prompt: "Kana untuk bunyi 'ke'?",
                                choices: [
                                    "ケ",
                                    "コ",
                                    "カ",
                                    "ク"
                                ],
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
                        skillTags: [
                            "reading",
                            "listening"
                        ],
                        estimatedMinutes: 12,
                        audioHint: "あお/アイス",
                        quiz: [
                            {
                                id: "mix-q1",
                                prompt: "Baca アイ, arti apa?",
                                choices: [
                                    "ai (love)",
                                    "ie (house)",
                                    "oi (hey)"
                                ],
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
        description: "Vocab, grammar, kanji pertama, dan latihan listening/reading campuran.",
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
                        skillTags: [
                            "listening",
                            "speaking"
                        ],
                        estimatedMinutes: 10,
                        audioHint: "こんにちは",
                        quiz: [
                            {
                                id: "n5-v1-q1",
                                prompt: "Arti こんにちは?",
                                choices: [
                                    "Selamat siang",
                                    "Selamat pagi",
                                    "Permisi"
                                ],
                                answer: "Selamat siang"
                            },
                            {
                                id: "n5-v1-q2",
                                prompt: "Respon tepat untuk はじめまして?",
                                choices: [
                                    "よろしくお願いします",
                                    "こんにちは",
                                    "おはよう"
                                ],
                                answer: "よろしくお願いします"
                            }
                        ]
                    },
                    {
                        id: "n5-v2",
                        title: "Angka & Waktu",
                        summary: "Hitung 1-10, jam, menit dengan pola sederhana.",
                        level: "n5",
                        skillTags: [
                            "reading",
                            "listening"
                        ],
                        estimatedMinutes: 12,
                        audioHint: "いち に さん",
                        quiz: [
                            {
                                id: "n5-v2-q1",
                                prompt: "Bacaan kanji 三?",
                                choices: [
                                    "san",
                                    "yon",
                                    "roku"
                                ],
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
                        skillTags: [
                            "reading",
                            "writing"
                        ],
                        estimatedMinutes: 11,
                        audioHint: "わたし は 田中 です",
                        quiz: [
                            {
                                id: "n5-g1-q1",
                                prompt: "Partikel untuk penanda topik?",
                                choices: [
                                    "は",
                                    "が",
                                    "を",
                                    "に"
                                ],
                                answer: "は"
                            }
                        ]
                    },
                    {
                        id: "n5-g2",
                        title: "Partikel Objek を",
                        summary: "Menyatakan objek langsung.",
                        level: "n5",
                        skillTags: [
                            "reading",
                            "writing"
                        ],
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
                        skillTags: [
                            "reading",
                            "writing"
                        ],
                        estimatedMinutes: 9,
                        audioHint: "ひ と, に ち, き",
                        quiz: [
                            {
                                id: "n5-k1-q1",
                                prompt: "Arti kanji 人?",
                                choices: [
                                    "Orang",
                                    "Hari",
                                    "Pohon"
                                ],
                                answer: "Orang"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
const flashcardsSeed = [
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
}),
"[project]/src/lib/api-client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE_URL",
    ()=>BASE_URL,
    "apiFetch",
    ()=>apiFetch
]);
"use client";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (("TURBOPACK compile-time truthy", 1) ? "http://localhost:8080/api/v1" : "TURBOPACK unreachable");
async function apiFetch(path, options = {}) {
    const { method = "GET", body, token, headers = {}, cache = "no-store" } = options;
    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        cache,
        headers: {
            "Content-Type": "application/json",
            ...token ? {
                Authorization: `Bearer ${token}`
            } : {},
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined
    });
    const data = await res.json().catch(()=>({}));
    if (!res.ok) {
        const message = data && (data.error || data.message) || res.statusText;
        throw new Error(message);
    }
    return data;
}
;
}),
"[project]/src/lib/tracks-api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchNextUnit",
    ()=>fetchNextUnit,
    "fetchTracks",
    ()=>fetchTracks,
    "fetchUnits",
    ()=>fetchUnits,
    "updateUnitStatus",
    ()=>updateUnitStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-ssr] (ecmascript)");
"use client";
;
async function fetchTracks(token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])("/tracks", {
        token
    });
}
async function fetchUnits(trackId, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/tracks/${trackId}/units`, {
        token
    });
}
async function updateUnitStatus(unitId, status, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/units/${unitId}/status`, {
        method: "POST",
        token,
        body: {
            status
        }
    });
}
async function fetchNextUnit(trackId, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/tracks/${trackId}/next-unit`, {
        token
    });
}
}),
"[project]/src/lib/store/learning-slice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "completeOnboarding",
    ()=>completeOnboarding,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchTracksThunk",
    ()=>fetchTracksThunk,
    "gradeCard",
    ()=>gradeCard,
    "markUnit",
    ()=>markUnit,
    "persistUnitStatusThunk",
    ()=>persistUnitStatusThunk,
    "setOnboardingComplete",
    ()=>setOnboardingComplete,
    "setProfile",
    ()=>setProfile,
    "setTracks",
    ()=>setTracks,
    "updateProfile",
    ()=>updateProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tracks$2d$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tracks-api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const initialState = {
    profile: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultProfile"],
    tracks: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tracks"],
    flashcards: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flashcardsSeed"],
    reviewedToday: 0,
    onboardingComplete: false,
    tracksStatus: "idle",
    tracksError: undefined
};
function updateSrs(card, quality) {
    const qualityScore = quality === "again" ? 0 : quality === "good" ? 1 : 2;
    const baseEaseDelta = (qualityScore - 1) * 0.15;
    const nextEase = Math.max(1.3, card.ease + baseEaseDelta);
    const nextInterval = quality === "again" ? 1 : Math.max(1, Math.round(card.intervalDays * (nextEase + (quality === "easy" ? 0.15 : 0))));
    const nextDue = Date.now() + nextInterval * 24 * 60 * 60 * 1000;
    return {
        ...card,
        ease: Number(nextEase.toFixed(2)),
        intervalDays: nextInterval,
        due: nextDue
    };
}
const fetchTracksThunk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("learning/fetchTracks", async (token, { rejectWithValue })=>{
    try {
        const trackList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tracks$2d$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchTracks"])(token);
        const withUnits = await Promise.all(trackList.map(async (track)=>{
            const units = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tracks$2d$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchUnits"])(track.id, token);
            return {
                ...track,
                units: units.map((u)=>({
                        ...u,
                        lessons: u.lessons || []
                    }))
            };
        }));
        return withUnits;
    } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : "Gagal memuat track");
    }
});
const persistUnitStatusThunk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("learning/persistUnitStatus", async ({ trackId, unitId, status, token }, { rejectWithValue })=>{
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tracks$2d$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateUnitStatus"])(unitId, status, token);
        return {
            trackId,
            unitId,
            status
        };
    } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : "Gagal update status unit");
    }
});
const learningSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "learning",
    initialState,
    reducers: {
        setProfile (state, action) {
            state.profile = action.payload ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultProfile"];
        },
        updateProfile (state, action) {
            state.profile = {
                ...state.profile,
                ...action.payload
            };
        },
        markUnit (state, action) {
            const { trackId, unitId, status } = action.payload;
            state.tracks = state.tracks.map((track)=>track.id === trackId ? {
                    ...track,
                    units: track.units.map((unit)=>unit.id === unitId ? {
                            ...unit,
                            status
                        } : unit)
                } : track);
        },
        gradeCard (state, action) {
            state.flashcards = state.flashcards.map((card)=>card.id === action.payload.cardId ? updateSrs(card, action.payload.quality) : card);
            const gainedXp = action.payload.quality === "easy" ? 12 : action.payload.quality === "good" ? 8 : 4;
            state.reviewedToday += 1;
            state.profile = {
                ...state.profile,
                xp: state.profile.xp + gainedXp
            };
        },
        completeOnboarding (state) {
            state.onboardingComplete = true;
        },
        setOnboardingComplete (state, action) {
            state.onboardingComplete = action.payload;
        },
        setTracks (state, action) {
            state.tracks = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchTracksThunk.pending, (state)=>{
            state.tracksStatus = "loading";
            state.tracksError = undefined;
        }).addCase(fetchTracksThunk.fulfilled, (state, action)=>{
            state.tracksStatus = "succeeded";
            state.tracks = action.payload;
        }).addCase(fetchTracksThunk.rejected, (state, action)=>{
            state.tracksStatus = "failed";
            state.tracksError = action.payload ?? "Gagal memuat track";
        }).addCase(persistUnitStatusThunk.fulfilled, (state, action)=>{
            const { trackId, unitId, status } = action.payload;
            state.tracks = state.tracks.map((track)=>track.id === trackId ? {
                    ...track,
                    units: track.units.map((unit)=>unit.id === unitId ? {
                            ...unit,
                            status
                        } : unit)
                } : track);
        });
    }
});
const { setProfile, updateProfile, markUnit, gradeCard, completeOnboarding, setOnboardingComplete, setTracks } = learningSlice.actions;
const __TURBOPACK__default__export__ = learningSlice.reducer;
}),
"[project]/src/lib/store/hooks.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppDispatch",
    ()=>useAppDispatch,
    "useAppSelector",
    ()=>useAppSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
"use client";
;
const useAppDispatch = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
const useAppSelector = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"];
}),
"[project]/src/lib/learning-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LearningProvider",
    ()=>LearningProvider,
    "useLearning",
    ()=>useLearning
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store/learning-slice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store/hooks.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function LearningProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
function useLearning() {
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const learning = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppSelector"])((state)=>state.learning);
    const actions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            setProfile: (profile)=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setProfile"])(profile)),
            updateProfile: (patch)=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateProfile"])(patch)),
            markUnit: (trackId, unitId, status)=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markUnit"])({
                    trackId,
                    unitId,
                    status
                })),
            gradeCard: (cardId, quality)=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gradeCard"])({
                    cardId,
                    quality
                })),
            completeOnboarding: ()=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["completeOnboarding"])()),
            setOnboardingComplete: (value)=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setOnboardingComplete"])(value))
        }), [
        dispatch
    ]);
    return {
        ...learning,
        ...actions
    };
}
}),
"[project]/src/lib/practice-api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchHistory",
    ()=>fetchHistory,
    "fetchPlacementQuestions",
    ()=>fetchPlacementQuestions,
    "fetchQuestions",
    ()=>fetchQuestions,
    "submitAnswers",
    ()=>submitAnswers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-ssr] (ecmascript)");
"use client";
;
async function fetchQuestions(mode, token, opts) {
    const params = new URLSearchParams({
        mode
    });
    if (typeof opts?.index === "number") {
        params.set("index", String(opts.index));
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/practice/questions?${params.toString()}`, {
        token
    });
}
async function submitAnswers(mode, answers, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])("/practice/submit", {
        method: "POST",
        token,
        body: {
            mode,
            answers
        }
    });
}
async function fetchHistory(token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])("/practice/history", {
        token
    });
}
async function fetchPlacementQuestions(token, opts) {
    const params = new URLSearchParams();
    if (typeof opts?.index === "number") {
        params.set("index", String(opts.index));
    }
    const suffix = params.toString() ? `?${params.toString()}` : "";
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/placement/questions${suffix}`, {
        token
    });
}
}),
"[project]/src/lib/store/dashboard-slice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearDashboard",
    ()=>clearDashboard,
    "default",
    ()=>__TURBOPACK__default__export__,
    "loadDashboardData",
    ()=>loadDashboardData,
    "setNextUnit",
    ()=>setNextUnit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$practice$2d$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/practice-api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tracks$2d$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tracks-api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const initialState = {
    history: [],
    nextUnit: null,
    loading: false,
    error: undefined
};
const loadDashboardData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("dashboard/load", async ({ token, track }, { rejectWithValue })=>{
    try {
        const [history, next] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$practice$2d$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchHistory"])(token),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tracks$2d$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchNextUnit"])(track, token)
        ]);
        return {
            history: history.slice(0, 5),
            nextUnit: next.unit || null
        };
    } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : "Gagal memuat data beranda");
    }
});
const dashboardSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "dashboard",
    initialState,
    reducers: {
        clearDashboard (state) {
            state.history = [];
            state.nextUnit = null;
            state.error = undefined;
            state.loading = false;
        },
        setNextUnit (state, action) {
            state.nextUnit = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(loadDashboardData.pending, (state)=>{
            state.loading = true;
            state.error = undefined;
        }).addCase(loadDashboardData.fulfilled, (state, action)=>{
            state.loading = false;
            state.history = action.payload.history;
            state.nextUnit = action.payload.nextUnit;
        }).addCase(loadDashboardData.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload ?? "Gagal memuat data beranda";
        });
    }
});
const { clearDashboard, setNextUnit } = dashboardSlice.actions;
const __TURBOPACK__default__export__ = dashboardSlice.reducer;
}),
"[project]/src/lib/store/auth-slice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bootstrapAuth",
    ()=>bootstrapAuth,
    "clearAuthError",
    ()=>clearAuthError,
    "default",
    ()=>__TURBOPACK__default__export__,
    "loginThunk",
    ()=>loginThunk,
    "logoutThunk",
    ()=>logoutThunk,
    "refreshProfileThunk",
    ()=>refreshProfileThunk,
    "setToken",
    ()=>setToken,
    "signupThunk",
    ()=>signupThunk
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store/learning-slice.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const TOKEN_KEY = "auth_token";
const initialState = {
    user: null,
    profile: null,
    token: null,
    loading: true,
    initialized: false,
    error: undefined
};
function normalizeProfile(data) {
    return {
        name: data.name,
        track: data.track,
        targetMinutes: data.targetMinutes,
        focuses: data.focuses,
        streakDays: data.streakDays,
        xp: data.xp,
        onboardingComplete: data.onboardingComplete
    };
}
async function fetchMe(token) {
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])("/auth/me", {
        token
    });
    const profile = normalizeProfile(data);
    const pickedUser = data.user ? {
        id: data.user.id,
        email: data.user.email
    } : {
        id: data.userId,
        email: ""
    };
    return {
        user: pickedUser,
        profile
    };
}
const bootstrapAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/bootstrap", async (_, { dispatch, rejectWithValue })=>{
    const stored = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
    if ("TURBOPACK compile-time truthy", 1) {
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setProfile"])(undefined));
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setOnboardingComplete"])(false));
        return {
            token: null,
            user: null,
            profile: null
        };
    }
    //TURBOPACK unreachable
    ;
});
const loginThunk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/login", async ({ email, password }, { dispatch, rejectWithValue })=>{
    try {
        const resp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])("/auth/login", {
            method: "POST",
            body: {
                email,
                password
            }
        });
        const { profile } = await fetchMe(resp.token);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if (profile) {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setProfile"])(profile));
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setOnboardingComplete"])(Boolean(profile.onboardingComplete)));
        }
        return {
            token: resp.token,
            user: resp.user,
            profile
        };
    } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : "Gagal masuk");
    }
});
const signupThunk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/signup", async ({ name, email, password }, { dispatch, rejectWithValue })=>{
    try {
        const resp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])("/auth/signup", {
            method: "POST",
            body: {
                name,
                email,
                password
            }
        });
        const { profile } = await fetchMe(resp.token);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if (profile) {
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setProfile"])(profile));
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setOnboardingComplete"])(Boolean(profile.onboardingComplete)));
        }
        return {
            token: resp.token,
            user: resp.user,
            profile
        };
    } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : "Gagal daftar");
    }
});
const refreshProfileThunk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/refreshProfile", async ({ token }, { dispatch, rejectWithValue })=>{
    try {
        const { profile } = await fetchMe(token);
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setProfile"])(profile));
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setOnboardingComplete"])(Boolean(profile?.onboardingComplete)));
        return profile;
    } catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : "Gagal memuat profil");
    }
});
const logoutThunk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("auth/logout", async (_, { dispatch })=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setProfile"])(undefined));
    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setOnboardingComplete"])(false));
});
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError (state) {
            state.error = undefined;
        },
        setToken (state, action) {
            state.token = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(bootstrapAuth.pending, (state)=>{
            state.loading = true;
            state.error = undefined;
        }).addCase(bootstrapAuth.fulfilled, (state, action)=>{
            state.loading = false;
            state.initialized = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.profile = action.payload.profile;
        }).addCase(bootstrapAuth.rejected, (state, action)=>{
            state.loading = false;
            state.initialized = true;
            state.token = null;
            state.user = null;
            state.profile = null;
            state.error = action.payload ?? "Gagal memuat profil";
        }).addCase(loginThunk.pending, (state)=>{
            state.loading = true;
            state.error = undefined;
        }).addCase(loginThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.profile = action.payload.profile;
        }).addCase(loginThunk.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload ?? "Gagal masuk";
        }).addCase(signupThunk.pending, (state)=>{
            state.loading = true;
            state.error = undefined;
        }).addCase(signupThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.profile = action.payload.profile;
        }).addCase(signupThunk.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload ?? "Gagal daftar";
        }).addCase(refreshProfileThunk.pending, (state)=>{
            state.loading = true;
        }).addCase(refreshProfileThunk.fulfilled, (state, action)=>{
            state.loading = false;
            state.profile = action.payload;
        }).addCase(refreshProfileThunk.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload ?? "Gagal memuat profil";
        }).addCase(logoutThunk.fulfilled, (state)=>{
            state.token = null;
            state.user = null;
            state.profile = null;
            state.error = undefined;
            state.loading = false;
            state.initialized = true;
        });
    }
});
const { clearAuthError, setToken } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
}),
"[project]/src/lib/auth-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$dashboard$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store/dashboard-slice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$auth$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store/auth-slice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store/hooks.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function AuthProvider({ children }) {
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$auth$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bootstrapAuth"])());
    }, [
        dispatch
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
function useAuth() {
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppSelector"])((state)=>state.auth);
    const actions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            login: (params)=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$auth$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loginThunk"])(params)).unwrap(),
            signup: (params)=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$auth$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signupThunk"])(params)).unwrap(),
            logout: ()=>{
                void dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$auth$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logoutThunk"])());
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$dashboard$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearDashboard"])());
            },
            refreshProfile: ()=>{
                if (!auth.token) return Promise.resolve();
                return dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$auth$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["refreshProfileThunk"])({
                    token: auth.token
                })).unwrap();
            }
        }), [
        auth.token,
        dispatch
    ]);
    return {
        ...auth,
        ...actions
    };
}
}),
"[project]/src/lib/store/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$auth$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store/auth-slice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$dashboard$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store/dashboard-slice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store/learning-slice.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$auth$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        dashboard: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$dashboard$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        learning: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$learning$2d$slice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    }
});
}),
"[project]/src/lib/store/StoreProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoreProvider",
    ()=>StoreProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store/index.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function StoreProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/store/StoreProvider.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c8e60bde._.js.map