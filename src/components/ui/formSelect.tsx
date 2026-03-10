import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type React from "react";
import { FormLabel } from "./form";

interface FormSelectProps {
  label?: string;
  hasError?: boolean;
  subtext?: React.ReactNode;
  placeholder?: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
  labelClassName?: string;
  bgclassName?: string;
}

export function FormSelect({
  label,
  hasError,
  subtext,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  labelClassName,
  bgclassName,
}: FormSelectProps) {
  return (
    <div className="w-full ">
      {label && (
        <FormLabel
          className={cn(
            "text-[#525252] text-[clamp(13px,1.2vw,14px)] font-geologica mb-2 block",
            labelClassName,
          )}
        >
          {label}
        </FormLabel>
      )}

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            "w-full border font-geologica px-3 py-6 rounded-sm focus:ring-1 focus:ring-[#8FE6A2]",
            hasError
              ? "border-red-500 focus:ring-red-500"
              : "border-[#0000001A]",
            bgclassName,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-[#c5f1cf] border border-[#E9E9E9]">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
}
