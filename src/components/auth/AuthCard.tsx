"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { AnimatedPerson } from "@/components/illustrations/AnimatedPerson";
import heroPerson from "@/assets/peoplehome.png";
import femaleHero from "@/assets/peoplehome2.png";

type Mode = "login" | "signup";
type Gender = "male" | "female" | "";

// Animated Person Component - Female version (pink color)
function AnimatedPersonFemale() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      role="img"
      aria-label="Ilustrasi wanita bergerak"
    >
      <defs>
        <linearGradient id="bgBubbleFemale" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fce7f3" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#bgBubbleFemale)" opacity="0.55" />
      <circle cx="100" cy="100" r="70" fill="#fff" />

      {/* Body - Pink dress */}
      <rect x="90" y="70" width="20" height="50" rx="10" fill="#ec4899" />
      {/* Head */}
      <circle cx="100" cy="55" r="14" fill="#1f2937" />

      {/* Arms */}
      <g stroke="#ec4899" strokeWidth="8" strokeLinecap="round">
        <line x1="90" y1="80" x2="65" y2="95">
          <animate
            attributeName="x2"
            dur="1.1s"
            values="65;60;65"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            dur="1.1s"
            values="95;85;95"
            repeatCount="indefinite"
          />
        </line>
        <line x1="110" y1="80" x2="135" y2="95">
          <animate
            attributeName="x2"
            dur="1.1s"
            values="135;140;135"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            dur="1.1s"
            values="95;85;95"
            repeatCount="indefinite"
          />
        </line>
      </g>

      {/* Legs */}
      <g stroke="#1f2937" strokeWidth="9" strokeLinecap="round">
        <line x1="95" y1="120" x2="80" y2="155">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 95 120;12 95 120;0 95 120"
            dur="1.1s"
            repeatCount="indefinite"
          />
        </line>
        <line x1="105" y1="120" x2="120" y2="155">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 105 120;-12 105 120;0 105 120"
            dur="1.1s"
            repeatCount="indefinite"
          />
        </line>
      </g>

      {/* Ground bounce */}
      <ellipse cx="100" cy="168" rx="32" ry="6" fill="#ec4899" opacity="0.18">
        <animate
          attributeName="opacity"
          dur="1.1s"
          values="0.18;0.3;0.18"
          repeatCount="indefinite"
        />
        <animate
          attributeName="rx"
          dur="1.1s"
          values="32;36;32"
          repeatCount="indefinite"
        />
      </ellipse>
    </svg>
  );
}

// Default Animated Person - Purple version
function AnimatedPersonDefault() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      role="img"
      aria-label="Ilustrasi orang bergerak"
    >
      <defs>
        <linearGradient id="bgBubbleDefault" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#bgBubbleDefault)" opacity="0.55" />
      <circle cx="100" cy="100" r="70" fill="#fff" />

      {/* Body - Purple */}
      <rect x="90" y="70" width="20" height="50" rx="10" fill="#8b5cf6" />
      {/* Head */}
      <circle cx="100" cy="55" r="14" fill="#1f2937" />

      {/* Arms */}
      <g stroke="#8b5cf6" strokeWidth="8" strokeLinecap="round">
        <line x1="90" y1="80" x2="65" y2="95">
          <animate
            attributeName="x2"
            dur="1s"
            values="65;60;65"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            dur="1s"
            values="95;85;95"
            repeatCount="indefinite"
          />
        </line>
        <line x1="110" y1="80" x2="135" y2="95">
          <animate
            attributeName="x2"
            dur="1s"
            values="135;140;135"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y2"
            dur="1s"
            values="95;85;95"
            repeatCount="indefinite"
          />
        </line>
      </g>

      {/* Legs */}
      <g stroke="#1f2937" strokeWidth="9" strokeLinecap="round">
        <line x1="95" y1="120" x2="80" y2="155">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 95 120;15 95 120;0 95 120"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
        <line x1="105" y1="120" x2="120" y2="155">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 105 120;-15 105 120;0 105 120"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
      </g>

      {/* Ground bounce */}
      <ellipse cx="100" cy="168" rx="32" ry="6" fill="#8b5cf6" opacity="0.18">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0.18;0.3;0.18"
          repeatCount="indefinite"
        />
        <animate
          attributeName="rx"
          dur="1s"
          values="32;36;32"
          repeatCount="indefinite"
        />
      </ellipse>
    </svg>
  );
}

export function AuthCard() {
  const { login, signup, loading, error } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState<Gender>("");
  const [status, setStatus] = useState<string | null>(null);
  const [randomId, setRandomId] = useState("------");

  useEffect(() => {
    // Generate client-only ID to avoid SSR mismatch; set once on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRandomId(Math.random().toString(36).substr(2, 6).toUpperCase());
  }, []);

  const title = useMemo(() => (mode === "login" ? "Masuk untuk lanjut belajar" : "Daftar & simpan progres"), [mode]);
  const subtitle = useMemo(
    () =>
      mode === "login"
        ? "Lanjutkan XP, streak, dan latihanmu di semua perangkat."
        : "Buat akun gratis untuk menyimpan progres, XP, dan streak.",
    [mode]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const trimmedCountry = country.trim();
    const parsedAge = Number(age);
    if (mode === "signup") {
      if (!trimmedName || !trimmedCountry || !gender) {
        setStatus("Lengkapi nama, negara, dan gender.");
        return;
      }
      if (Number.isNaN(parsedAge) || parsedAge < 13 || parsedAge > 120) {
        setStatus("Umur harus antara 13-120.");
        return;
      }
      if (password.length < 6) {
        setStatus("Password minimal 6 karakter.");
        return;
      }
    } else {
      if (!trimmedEmail || password.length < 6) {
        setStatus("Email dan password minimal 6 karakter.");
        return;
      }
    }
    try {
      if (mode === "login") {
        await login({ email: trimmedEmail, password });
        setStatus("Berhasil masuk. Selamat datang kembali!");
      } else {
        const selectedGender = gender as Exclude<Gender, "">;
        await signup({
          name: trimmedName,
          email: trimmedEmail,
          password,
          age: parsedAge,
          country: trimmedCountry,
          gender: selectedGender
        });
        setStatus("Akun berhasil dibuat. Yuk mulai latihan!");
      }
      router.push("/#steps");
    } catch {
      setStatus(null);
      // error handled via context
    }
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Header Toggle */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="flex rounded-full bg-gradient-to-r from-slate-100 to-slate-200 p-1.5 text-sm font-bold text-slate-700 shadow-lg">
            <button
              className={`rounded-full px-6 py-2.5 transition-all duration-300 ${
                mode === "login" ? "bg-white text-brand-600 shadow-md scale-105" : "hover:bg-white/50"
              }`}
              onClick={() => !loading && setMode("login")}
              disabled={loading}
            >
              🔑 Masuk
            </button>
            <button
              className={`rounded-full px-6 py-2.5 transition-all duration-300 ${
                mode === "signup" ? "bg-white text-brand-600 shadow-md scale-105" : "hover:bg-white/50"
              }`}
              onClick={() => !loading && setMode("signup")}
              disabled={loading}
            >
              ✨ Daftar
            </button>
          </div>
        </div>
        <div>
          <p className="text-lg font-bold text-slate-900">{title}</p>
          <p className="text-sm text-slate-600">{subtitle}</p>
        </div>
      </div>

      {/* ID Card Preview - Now at the top and full width */}
      <div className="relative w-full">
        {/* Card Container with 3D effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-600 rounded-2xl blur-xl opacity-30 transform rotate-1"></div>
        
        <Card className="relative overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-purple-600 p-6 lg:p-8">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          
          <div className="relative space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white/90">TOMODACHI</p>
                <p className="text-[10px] text-white/70">Learning ID Card</p>
              </div>
              <div className="text-xs text-white/80 font-mono bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                {mode === "signup" ? "NEW" : "MEMBER"}
              </div>
            </div>

            {/* Avatar & Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                {/* Avatar with Animated Person */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 border-2 border-white/40 flex items-center justify-center backdrop-blur-sm overflow-hidden p-2">
                    {gender === "male" && (
                      <Image
                        src={heroPerson}
                        alt="Profil laki-laki"
                        fill
                        sizes="(max-width: 640px) 128px, 144px"
                        className="rounded-xl object-cover"
                        priority={false}
                      />
                    )}
                    {gender === "female" && (
                      <Image
                        src={femaleHero}
                        alt="Profil perempuan"
                        fill
                        sizes="(max-width: 640px) 128px, 144px"
                        className="rounded-xl object-cover"
                        priority={false}
                      />
                    )}
                    {!gender && <AnimatedPersonDefault />}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-3 text-center sm:text-left w-full">
                  <div>
                    <p className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">Full Name</p>
                    <p className="text-xl font-bold text-white truncate">
                      {mode === "signup" ? (name || "Your Name") : (email.split("@")[0] || "Member")}
                    </p>
                  </div>
                  
                  {mode === "signup" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[9px] text-white/70 font-semibold uppercase">Age</p>
                        <p className="text-base font-bold text-white">{age || "--"} tahun</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-white/70 font-semibold uppercase">Gender</p>
                        <p className="text-base font-bold text-white capitalize">
                          {gender === "male" ? "Laki-laki" : gender === "female" ? "Perempuan" : "--"}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {mode === "signup" && (
                    <div className="pt-2 border-t border-white/20">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🌍</span>
                        <div className="flex-1">
                          <p className="text-[9px] text-white/70 font-semibold uppercase">Country</p>
                          <p className="text-base font-bold text-white">{country || "Your Country"}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Email Badge */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
              <p className="text-[9px] text-white/70 font-semibold uppercase mb-1">Email Address</p>
              <p className="text-sm font-mono text-white truncate">{email || "your@email.com"}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-[10px] text-white/60">
              <span>🎯 Start your journey</span>
              <span className="font-mono">ID: {randomId}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Form */}
      <Card className="relative border-2 border-slate-200 bg-white p-6 shadow-xl max-w-2xl mx-auto">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <span>👤</span> Nama Lengkap
                </label>
                <Input
                  placeholder="Masukkan nama lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                  className="text-base py-5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <span>🎂</span> Umur
                  </label>
                  <Input
                    type="number"
                    placeholder="18"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    min="13"
                    max="120"
                    disabled={loading}
                    className="text-base py-5"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <span>⚧️</span> Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    required
                    disabled={loading}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  >
                    <option value="">Pilih</option>
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <span>🌍</span> Negara
                </label>
                <Input
                  placeholder="Indonesia, Japan, etc."
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  disabled={loading}
                  className="text-base py-5"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <span>📧</span> Email
            </label>
            <Input
              type="email"
              placeholder="emailmu@contoh.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="text-base py-5"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <span>🔒</span> Password
            </label>
            <Input
              type="password"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              disabled={loading}
              className="text-base py-5"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-red-700 flex items-center gap-2">
                <span>⚠️</span> {error}
              </p>
            </div>
          )}

          {status && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
                <span>✅</span> {status}
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full py-6 text-base font-bold shadow-lg hover:shadow-xl transition-all" 
            disabled={loading}
          >
            {loading ? "⏳ Memproses..." : mode === "login" ? "🚀 Masuk Sekarang" : "✨ Buat Akun Baru"}
          </Button>

          <p className="text-xs text-center text-slate-500">
            {mode === "login" 
              ? "Belum punya akun? Klik tombol Daftar di atas" 
              : "Dengan mendaftar, progres belajarmu akan tersimpan dengan aman"}
          </p>
        </form>

        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-brand-100 bg-brand-50">
              <svg
                className="h-8 w-8 animate-spin text-brand-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="m4.93 4.93 2.83 2.83" />
                <path d="m16.24 16.24 2.83 2.83" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <path d="m4.93 19.07 2.83-2.83" />
                <path d="m16.24 7.76 2.83-2.83" />
              </svg>
            </div>
            <p className="text-base font-bold text-slate-700">Memproses...</p>
          </div>
        )}
      </Card>
    </div>
  );
}
