import { LeftArrowIcon } from "@/Icons";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const CategoriesCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const currentScroll = scrollContainerRef.current.scrollLeft;

      scrollContainerRef.current.scrollTo({
        left:
          direction === "left"
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#F5F5F5] px-4 md:px-6 lg:px-[30px] py-7 md:py-[45px] lg:py-[60px] flex flex-col items-center gap-5 md:gap-7 lg:gap-10">
      <h2 className="text-[#000000CC] text-[clamp(16px,2.9vw,32px)] font-geologica font-semibold text-center leading-tight w-[100%] sm:w-[90%] md:w-[80%] ml:w-[85%] lg:w-[70%]">
        Explore our wide range of farm-fresh categories, carefully grouped so
        you can shop with ease and confidence
      </h2>

      <div className="grid grid-cols-3 space-y-4 gap-3 md:hidden">
        {CarouselItems.map((item) => (
          <Link
            href={item.route}
            key={item.label}
            className="flex flex-col items-center gap-[14px]"
          >
            <div className="w-[105px] h-[100px] flex items-center justify-center">
              <Image
                width={220}
                height={215}
                src={`/assets/avatars/${item.avatar}.svg`}
                alt=""
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <p className="text-xs text-[#000000CC] text-center font-poppins">
              {item.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="hidden md:grid grid-cols-[auto_1fr_auto] items-center">
        {/* Left Arrow */}
        <span
          onClick={() => scroll("left")}
          className=" bg-white flex items-center justify-center border border-[#0000001A] rounded-full w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] mr-4"
        >
          <LeftArrowIcon className="w-5 h-5" />
        </span>

        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex items-start gap-[8px] overflow-x-auto px-[10px] scroll-smooth hide-scrollbar"
        >
          {CarouselItems.map((item) => (
            <Link
              href={item.route}
              key={item.label}
              className="flex flex-col items-center gap-[14px] min-w-[200px]"
            >
              <div className="w-[200px] h-[190px] flex items-center justify-center">
                <Image
                  width={220}
                  height={215}
                  src={`/assets/avatars/${item.avatar}.svg`}
                  alt=""
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <p className="text-[clamp(10px,2vw,18px)] text-[#000000CC] text-center font-poppins">
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <span
          onClick={() => scroll("right")}
          className=" bg-white flex items-center justify-center border border-[#0000001A] rounded-full w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] ml-4"
        >
          <LeftArrowIcon className="w-5 h-5 rotate-180" />
        </span>
      </div>
    </div>
  );
};

export default CategoriesCarousel;

const CarouselItems = [
  {
    label: "Tubers & Roots",
    route: "/",
    avatar: "ctubersRoots",
  },
  {
    label: "Grains & Garri",
    route: "/",
    avatar: "cgrainsGarri",
  },
  {
    label: "Fruits & Vegetables",
    route: "/",
    avatar: "cfruitsVegetables",
  },
  {
    label: "Peppers, Onions & Tomatoes",
    route: "/",
    avatar: "cpeppersOnionsTomatoes",
  },
  {
    label: "Cooking Oils",
    route: "/",
    avatar: "ccookingOil",
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
    avatar: "cbeansNuts",
  },
  {
    label: "Meat",
    route: "/",
    avatar: "meat",
  },
];
