import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import NextLink from "next/link";

import { cn } from "@/lib/utils";
// import { Loader } from "@/Icons";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-md text-[clamp(12px,1.5vw,16px)] font-medium transition-all disabled:pointer-events-none disabled:opacity-50  outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ",
  {
    variants: {
      variant: {
        default:
          "bg-[#C09706] text-primary-foreground text-white shadow-xs hover:bg-[#C09706]/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-[#DEE2E5] border-[2px] bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-[#F3F3F3] text-secondary-foreground shadow-xs hover:bg-[#F3F3F3]/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-6 sm:h-7 md:h-8 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-12 rounded-md px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, href, ...props }, ref) => {
    return href ? (
      <NextLink
        href={href}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {props.children}
      </NextLink>
    ) : (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.children}
        {loading && <Spinner className="h-6 w-6 ml-2" />}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
