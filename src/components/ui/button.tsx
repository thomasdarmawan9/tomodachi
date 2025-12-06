import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "ghost" | "outline";
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500",
    ghost: "text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-200",
    outline:
      "border border-slate-200 text-slate-800 hover:bg-slate-50 focus-visible:ring-slate-200"
  };

  return (
    <button
      className={twMerge(base, variants[variant], className)}
      {...props}
    />
  );
}
