import { twMerge } from "tailwind-merge";

export function ProgressBar({
  value,
  max = 100,
  label
}: {
  value: number;
  max?: number;
  label?: string;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="space-y-2">
      {label ? <div className="text-sm text-slate-600">{label}</div> : null}
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={twMerge(
            "h-full rounded-full bg-brand-500 transition-all duration-300"
          )}
          style={{ width: `${pct}%` }}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
          role="progressbar"
        />
      </div>
      <div className="text-xs text-slate-500">{pct}% selesai</div>
    </div>
  );
}
