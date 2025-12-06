import { useCallback, useRef } from "react";

function buildOscillator(audioCtx: AudioContext, frequency: number, durationMs: number) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + durationMs / 1000);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  return oscillator;
}

export function useTonePlayer() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTone = useCallback((text: string) => {
    if (typeof window === "undefined") return;

    // Try speech synthesis for a closer "reading" experience
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "ja-JP";
      window.speechSynthesis.speak(utter);
      return;
    }

    // Fallback to a pleasant sine beep sequence when speech is unavailable
    const ctx = audioCtxRef.current ?? new AudioContext();
    audioCtxRef.current = ctx;
    const baseFreq = 440;

    text
      .split(" ")
      .filter(Boolean)
      .slice(0, 4)
      .forEach((token, idx) => {
        const freq = baseFreq + idx * 60;
        const osc = buildOscillator(ctx, freq, 320);
        const startAt = ctx.currentTime + idx * 0.38;
        osc.start(startAt);
        osc.stop(startAt + 0.32);
      });
  }, []);

  return { playTone };
}
