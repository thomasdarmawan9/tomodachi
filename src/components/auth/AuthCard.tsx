"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";

type Mode = "login" | "signup";

export function AuthCard() {
  const { login, signup, loading, error } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<string | null>(null);

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
    try {
      if (mode === "login") {
        await login({ email, password });
        setStatus("Berhasil masuk. Selamat datang kembali!");
      } else {
        await signup({ name, email, password });
        setStatus("Akun berhasil dibuat. Yuk mulai latihan!");
      }
    } catch {
      setStatus(null);
      // error handled via context
    }
  };

  return (
    <Card className="border border-slate-100 bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        <div className="flex rounded-full bg-slate-100 p-1 text-xs font-semibold text-slate-700">
          <button
            className={`rounded-full px-3 py-1 transition ${
              mode === "login" ? "bg-white text-slate-900 shadow" : ""
            }`}
            onClick={() => setMode("login")}
          >
            Masuk
          </button>
          <button
            className={`rounded-full px-3 py-1 transition ${
              mode === "signup" ? "bg-white text-slate-900 shadow" : ""
            }`}
            onClick={() => setMode("signup")}
          >
            Daftar
          </button>
        </div>
      </div>

      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        {mode === "signup" ? (
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Nama</label>
            <Input placeholder="Nama tampilan" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        ) : null}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">Email</label>
          <Input
            type="email"
            placeholder="emailmu@contoh.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">Password</label>
          <Input
            type="password"
            placeholder="Minimal 6 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>
        {error ? <p className="text-xs font-semibold text-amber-700">Error: {error}</p> : null}
        {status ? <p className="text-xs font-semibold text-green-700">{status}</p> : null}
        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? "Memproses..." : mode === "login" ? "Masuk" : "Daftar"}
        </Button>
      </form>
      <p className="mt-2 text-[11px] text-slate-500">
        Dengan membuat akun, progres XP, streak, dan latihanmu akan tersimpan.
      </p>
    </Card>
  );
}
