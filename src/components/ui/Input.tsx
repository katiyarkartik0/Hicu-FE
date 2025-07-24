import React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ type = "text", className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn("border border-1 px-3 py-2 my-1 rounded-lg", className)}
      {...props}
    />
  );
});
Input.displayName = "Input";

export default Input;
