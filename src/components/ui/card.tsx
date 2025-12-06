import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "card border border-slate-100 bg-white p-4 shadow-card",
        className
      )}
      {...props}
    />
  );
}
