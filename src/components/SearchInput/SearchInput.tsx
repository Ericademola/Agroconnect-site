import { ChangeEvent, useState } from "react";


import { Loader, SearchIcon } from "@/Icons";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import debounce from "@/utils/debounce";

export default function SearchInput({
  className,
  setSearchText,
  placeholder = "Search",
  loading,
}: {
  className?: string;
  setSearchText: (val: string) => void;
  placeholder?: string;
  loading?: boolean;
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
    <Input
      value={rawInput}
      onChange={handleChange}
      className={cn(
        "h-fit border border-[#c4c4c433] has-[:focus]:ring-[#5755FF] rounded-[100px] md:rounded-[10px] bg-[#F8F8F8] placeholder:text-[#828994] text-[#000000]",
        className
      )}
      inputClassName="bg-[#F8F8F8]"
      leftIcon={<SearchIcon width={20} height={20} />}
      placeholder={placeholder}
      rightIcon={loading ? <Loader className="h-6 w-6 animate-spin" /> : undefined}
    />
  );
}
