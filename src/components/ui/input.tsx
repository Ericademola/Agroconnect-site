"use client";
import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HideEyeIcon, ShowEyeIcon } from "@/Icons";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  hasError?: boolean;
  subtext?: React.ReactNode;
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
      clickAbleRightIcon,
      setShowState,
      externalClickAction,
      ...props
    },
    ref,
  ) => {
    const [show, setShow] = useState(false);
    const getRightIcon = () => {
      if (clickAbleRightIcon) {
        if (setShowState) {
          setShowState(show);
        }
        const handleRightIconClick = () => {
          setShow(!show);
          if (externalClickAction) {
            externalClickAction();
          }
        };
        return (
          <button onClick={handleRightIconClick} type="button">
            {rightIcon}
          </button>
        );
      }

      if (type === "password") {
        return (
          <button onClick={() => setShow(!show)} type="button">
            {show ? (
              <ShowEyeIcon className="w-4 h-4 md:w-5 md:h-5 text-[#828994]" />
            ) : (
              <HideEyeIcon className="w-4 h-4 md:w-5 md:h-5 text-[#828994]" />
            )}
          </button>
        );
      } else {
        return rightIcon;
      }
    };

    return (
      <div className="w-full">
        <div
          className={cn(
            "flex items-center border bg-background px-3 h-14 rounded-[10px] has-[:focus]:ring-1 has-[:placeholder-shown]:text-[#828994]",
            hasError
              ? "border-red-500 has-[:focus]:ring-red-500"
              : "border-[#0000001A] has-[:focus]:ring-[#8FE6A2]",
            props.disabled && "bg-[#f0f0f0]",
            className,
          )}
        >
          {leftIcon}
          <input
            type={type === "password" ? (show ? "text" : "password") : type}
            className={cn(
              "flex h-[30px] md:h-[35px] lg:h-[40px] w-full placeholder-shown:text-[#948288] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-sm",
              rightIcon ? "pr-3" : "",
              leftIcon ? "pl-3" : "",
              inputClassName,
            )}
            ref={ref}
            {...props}
          />
          {getRightIcon()}
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
  },
);
Input.displayName = "Input";

export { Input };

export const ErrorIcon = () => (
  <svg
    className="mt-0.5"
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 11.5422C3.03147 11.5422 0.625 9.13577 0.625 6.16724C0.625 3.19871 3.03147 0.792236 6 0.792236C8.96853 0.792236 11.375 3.19871 11.375 6.16724C11.375 9.13577 8.96853 11.5422 6 11.5422ZM5.5 3.41724V4.16724H6.5V3.41724H5.5ZM5 5.66724H5.5V8.66724H6.5V4.66724H5V5.66724Z"
      fill="#EF4444"
    />
  </svg>
);
