import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
  subtext?: React.ReactNode;
  textareaClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, subtext, textareaClassName, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);

    const setRef = (el: HTMLTextAreaElement) => {
      internalRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref)
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
          el;
    };

    const handleInput = () => {
      const el = internalRef.current;
      if (!el) return;

      el.style.height = "auto"; // reset height
      el.style.height = Math.min(el.scrollHeight, 70) + "px"; // max 70px
    };

    return (
      <div className="w-full">
        <div
          className={cn(
            "flex items-start border bg-background px-3 py-2 rounded-[10px] transition-all duration-200 ease-in-out focus-within:ring-2 focus-within:ring-[#8FE6A2] focus-within:border-[#0000001A]",
            hasError ? "border-red-500" : "border-[#0000001A]",
            props.disabled && "bg-[#f0f0f0]",
            className,
          )}
        >
          <textarea
            ref={setRef}
            onInput={handleInput}
            className={cn(
              "flex w-full h-auto font-geologica text-[13px] resize-none rounded-[10px] placeholder-shown:text-[#828994] placeholder:text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-y-auto hide-scrollbar",
              textareaClassName,
            )}
            {...props}
          />
        </div>
        {(hasError || subtext) && (
          <small
            className={
              hasError ? "text-xs text-red-500" : "text-sm text-[#626C7A]"
            }
          >
            {subtext ?? (hasError ? "An error occurred" : "")}
          </small>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
