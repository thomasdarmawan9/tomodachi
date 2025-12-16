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
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:translate-y-[1px]";
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 text-white hover:shadow-lg hover:shadow-brand-500/25 focus-visible:ring-brand-400",
    ghost: "text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-200",
    outline:
      "border border-slate-200 bg-white text-slate-800 hover:border-brand-200 hover:bg-slate-50 focus-visible:ring-brand-100"
  };

  return (
    <button
      className={twMerge(base, variants[variant], className)}
      {...props}
    />
  );
}
