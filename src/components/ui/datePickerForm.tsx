import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormLabel } from "./form";
import { ChevronDownIcon } from "lucide-react";

interface FormDatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  hasError?: boolean;
  subtext?: React.ReactNode;
  labelClassName?: string;
  bgclassName?: string;
}

export function DatePickerForm({
  label,
  value,
  onChange,
  hasError,
  subtext,
  labelClassName,
  bgclassName,
}: FormDatePickerProps) {
  return (
    <div className="w-full">
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

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "w-full px-3 text-left font-normal rounded-[10px] font-geologica flex items-center justify-between hover:bg-transparent hover:text-none",
              !value && "text-muted-foreground",
              hasError ? "border-red-500" : "border-[#0000001A]",
              bgclassName,
            )}
          >
            {value ? format(value, "PPP") : "dd/mm/yy"}
            <ChevronDownIcon className="size-4 text-[#212121]" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            required={true}
            selected={value}
            onSelect={(date) => date && onChange?.(date)}
            disabled={(date) => date < new Date("1900-01-01")}
            startMonth={new Date("1900-01-01")}
            endMonth={new Date("2100-12-31")}
            captionLayout="dropdown"
            className="border rounded-md"
            classNames={{
              button: "p-2 rounded-md text-sm text-left",
            }}
          />
        </PopoverContent>
      </Popover>

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
