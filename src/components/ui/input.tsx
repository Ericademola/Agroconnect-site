"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  hasError?: boolean;
  subtext?: string;
  clickAbleRightIcon?: boolean;
  setShowState?: (value: boolean) => void;
  externalClickAction?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputClass?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      type = "text",
      leftIcon,
      rightIcon,
      hasError,
      subtext,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <div
          className={cn(
            "flex items-center border bg-background px-3 h-14 rounded-[48px] has-[:focus]:ring-1 has-[:placeholder-shown]:text-[#828994]",
            hasError
              ? "border-red-500 has-[:focus]:ring-red-500"
              : "border-[#e0e2e4] has-[:focus]:ring-[#828994]",
            props.disabled && "bg-[#f0f0f0]",
            className
          )}
        >
          {leftIcon}
          <input
            type={type}
            className={cn(
              "flex h-[30px] md:h-[35px] lg:h-[40px] w-full placeholder-shown:text-[#828994] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              rightIcon ? "pr-3" : "",
              leftIcon ? "pl-3" : "",
              inputClassName
            )}
            ref={ref}
            {...props}
          />
          {rightIcon}
        </div>
        {(hasError || subtext) && (
          <small
            className={
              hasError ? "text-sm text-red-500" : "text-sm text-[#626C7A]"
            }
          >
            {subtext ?? (hasError ? "An error ocurred" : "")}
          </small>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
