import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface EmptyPageProps {
  image: string;
  altText: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonIcon?: React.ReactNode;
  buttonhref: string;
  className?: string;
}

const EmptyPage = ({
  image,
  altText,
  title,
  subtitle,
  buttonText,
  buttonIcon,
  buttonhref,
  className,
}: EmptyPageProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-7 py-12",
        className,
      )}
    >
      <Image
        src={image}
        alt={altText}
        width={100}
        height={100}
        className="object-contain w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] mx-auto"
      />
      <div className="text-[#00000099] flex flex-col items-center justify-center">
        <h3 className="text-[clamp(16px,1.5vw,24px)] font-geologica font-medium">
          {title}
        </h3>
        <p className="text-[clamp(10px,1.3vw,14px)] font-poppins w-[90%] md:w-full">
          {subtitle}
        </p>
        <Button
          variant="default"
          size="lg"
          className="flex items-center gap-2 mt-3"
          href={buttonhref}
        >
          {buttonIcon}

          <span>{buttonText}</span>
        </Button>
      </div>
    </div>
  );
};

export default EmptyPage;
