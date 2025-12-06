import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type BadgeProps = ComponentProps<"span"> & {
  tone?: "info" | "success" | "warning";
};

export function Badge({ className, tone = "info", ...props }: BadgeProps) {
  const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
    info: "bg-brand-50 text-brand-700 border-brand-100",
    success: "bg-green-50 text-green-700 border-green-100",
    warning: "bg-amber-50 text-amber-700 border-amber-200"
  };

  return (
    <span
      className={twMerge(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
