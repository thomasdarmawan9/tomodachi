import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={twMerge(
        "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
        className
      )}
      {...props}
    />
  );
});
