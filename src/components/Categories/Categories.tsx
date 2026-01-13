import { MenuIcon } from "@/Icons";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Categories = ({
  className,
  headerContent = (
    <>
      <MenuIcon className="w-5 h-5 lg:w-6 lg:h-6" />
      <h1 className="text-[#000000CC] text-[clamp(19px,2.8vw,24px)] font-geologica">
        Categories
      </h1>
    </>
  ),
  avatarSize,
  labelClassName,
  close = () => {},
}: {
  className?: string;
  headerContent?: React.ReactNode;
  avatarSize?: string;
  labelClassName?: string;
  close?: (value: boolean) => void;
}) => {
  return (
    <div
      className={cn(
        "bg-[#ECECEC] rounded-[30px] px-4 py-5 lg:px-5 lg:py-6",
        className
      )}
    >
      <div className="flex items-center justify-center md:justify-start gap-2 md:border-b border-[#0000001A] pb-3 lg:pb-4">
        {headerContent}
      </div>
      <div className="flex flex-col gap-[30px] md:gap-[20px] pt-3 lg:pt-4">
        {CategoriesItems.map((item) => (
          <Link
            href={item.route}
            key={item.label}
            onClick={() => close(false)}
            className="flex items-center gap-[10px]"
          >
            <Image
              width={100}
              height={100}
              src={`/assets/avatars/${item.avatar}.svg`}
              alt=""
              className={cn(
                "w-5 h-5 ml:w-6 ml:h-6 lg:w-7 lg:h-7 object-cover",
                avatarSize
              )}
            />

            <p
              className={cn(
                "text-[clamp(14px,1.6vw,16px)] text-[#000000CC] font-poppins",
                labelClassName
              )}
            >
              {item.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;

const CategoriesItems = [
  {
    label: "Tubers & Roots",
    route: "/",
    avatar: "tubersRoots",
  },
  {
    label: "Grains & Garri",
    route: "/",
    avatar: "grainsGarri",
  },
  {
    label: "Fruits & Vegetables",
    route: "/",
    avatar: "fruitsVegetables",
  },
  {
    label: "Peppers, Onions & Tomatoes",
    route: "/",
    avatar: "peppersOnionsTomatoes",
  },
  {
    label: "Cooking Oils",
    route: "/",
    avatar: "cookingOil",
  },
  {
    label: "Seafood",
    route: "/",
    avatar: "seafood",
  },
  {
    label: "Poultry",
    route: "/",
    avatar: "poultry",
  },
  {
    label: "Beans & Nuts",
    route: "/",
    avatar: "beansNuts",
  },
  {
    label: "Meat",
    route: "/",
    avatar: "meat",
  },
];
