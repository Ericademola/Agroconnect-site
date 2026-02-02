"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

// function Progress({
//   className,
//   value,
//   indicatorClassName,
//   ...props
// }: React.ComponentProps<typeof ProgressPrimitive.Root> & {
//   indicatorClassName?: string;
// }) {
//   return (
//     <ProgressPrimitive.Root
//       data-slot="progress"
//       className={cn(
//         "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
//         className,
//       )}
//       {...props}
//     >
//       <ProgressPrimitive.Indicator
//         data-slot="progress-indicator"
//         className={cn(
//           "bg-primary h-full w-full flex-1 transition-all",
//           indicatorClassName,
//         )}
//         style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
//       />
//     </ProgressPrimitive.Root>
//   );
// }

// export { Progress };

function Progress({
  className,
  value,
  max = 5,
  indicatorClassName,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string;
  max?: number;
}) {
  const safeValue = typeof value === "number" ? value : 0;

  const percentage = Math.min((safeValue / max) * 100, 100);

  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative h-[10px] w-full overflow-hidden rounded-full bg-[#E0E0E0]",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full transition-all bg-[#03601A]", indicatorClassName)}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
