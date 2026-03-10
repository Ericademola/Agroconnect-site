import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="w-full pl-3 pr-3 text-left text-[#666666] text-[13px] font-light rounded-sm font-geologica flex items-center justify-between hover:bg-transparent hover:text-none"
        >
          {date ? date.toLocaleDateString() : "Select date"}
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 text-[#666666]">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}
