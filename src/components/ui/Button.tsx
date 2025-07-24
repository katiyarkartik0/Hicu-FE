import { cn } from "@/lib/utils";
import React from "react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn("px-8 py-2 rounded-md border", className)}
      {...props}
    />
  );
});
Button.displayName = "Button";

export default Button;