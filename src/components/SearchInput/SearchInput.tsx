import { ChangeEvent, useState } from "react";

import { SearchIcon } from "@/Icons";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import debounce from "@/utils/debounce";

export default function SearchInput({
  className,
  setSearchText,
  placeholder = "Search for products...",
  leftIcon = <SearchIcon className="h-6 w-6" fill="#00000080" />,
  rightIcon = (
    <span className="bg-[#03601A] w-[45px] md:w-[63px] h-full rounded-r-[5px] md:rounded-r-[15px] flex items-center justify-center cursor-pointer">
      <SearchIcon className="w-5 h-5 md:w-6 md:h-6" />
    </span>
  ),
}: {
  className?: string;
  setSearchText: (val: string) => void;
  placeholder?: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}) {
  const [rawInput, setRawInput] = useState<string>("");

  const handleDebouncedInput = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, 2000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawInput(e.target.value);
    handleDebouncedInput(e);
  };

  return (
    <div className="w-full">
      <Input
        value={rawInput}
        onChange={handleChange}
        className={cn(
          "h-fit w-full border border-[#c4c4c433] has-[:focus]:ring-0  text-[#333333] rounded-[15px] bg-[#FFF]",
          className,
        )}
        inputClassName="bg-[#FFF] text-sm md:text-base placeholder:text-[#00000080]"
        leftIcon={leftIcon}
        placeholder={placeholder}
        rightIcon={rightIcon}
      />
    </div>
  );
}
