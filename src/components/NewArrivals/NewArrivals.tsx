"use client";
import { ShopBagIcon } from "@/Icons";
import { Button } from "../ui/button";
import { useState, useEffect, useRef } from "react";

const NewArrivals = () => {
  return (
    <div className="px-4 sm:px-5 md:px-7 ml:px-[50px] lg:px-[100] flex flex-col items-center gap-3 sm:gap-[20px] ml:gap-[30px]">
      <span className="text-center">
        <h2 className="text-[#000000CC] text-[clamp(16px,2.8vw,30px)] font-geologica font-semibold text-center leading-tight w-full">
          New Arrivals
        </h2>
        <p className="text-[#00000099] text-[clamp(14px,1.8vw,20px)] font-poppins">
          {`See what’s fresh, what’s trending, and what you’ll want to grab before
          it’s gone`}
        </p>
      </span>
      {/* <div className="relative bg-[url('/plantainBg.png')] bg-no-repeat bg-cover bg-center w-full min-h-[250px] sm:min-h-[320px] md:h-[420px] ml:h-[450px] rounded-[10px] md:rounded-[30px] z-0">
        <div className="absolute top-1/2 left-5 sm:left-8 md:left-12 -translate-y-1/2 z-20 leading-tight w-[55%] md:w-[70%] ml:w-[65%] lg:w-[45%] text-white flex flex-col gap-3 md:gap-5">
          <Button
            size="lg"
            className="bg-[#03A52B] rounded-full h-fit py-2 w-fit text-[clamp(10px,1.5vw,14px)]"
          >
            New
          </Button>
          <h1 className="font-geologica font-bold text-[clamp(18px,3vw,36px)] ">
            Freshly Ripe Plantains Are Back in Stock
          </h1>
          <p className="text-[clamp(12px,2vw,16px)] font-poppins">
            Get the best deals on this {`season's`} sweet plantains
            <br />— available while it lasts.
          </p>
          <Button
            href="/shop"
            variant="default"
            size="lg"
            className="w-fit text-[clamp(14px,1.5vw,16px)]"
          >
            <ShopBagIcon className="w-5 h-5" />
            Shop Now
          </Button>
        </div>
        <div className="flex gap-2 items-center justify-center absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 ">
          <span className="w-[12px] sm:w-[16px] md:w-[42px] h-[3px] sm:h-[5px] md:h-[10px] rounded-[5px] md:rounded-[20px] bg-[#C09706]"></span>
          <span className="w-[2.75px] sm:w-[6px] md:w-[11px] h-[3px] sm:h-[5px] md:h-[10px] rounded-[5px] sm:rounded-[7px] md:rounded-[20px] bg-white"></span>
          <span className="w-[2.75px] sm:w-[6px] md:w-[11px] h-[3px] sm:h-[5px] md:h-[10px] rounded-[5px] sm:rounded-[7px] md:rounded-[20px] bg-white"></span>
          <span className="w-[2.75px] sm:w-[6px] md:w-[11px] h-[3px] sm:h-[5px] md:h-[10px] rounded-[5px] sm:rounded-[7px] md:rounded-[20px] bg-white"></span>
        </div>
      </div> */}
      <ArrivalCarousel />
    </div>
  );
};

export default NewArrivals;

const carouselData = [
  {
    id: 1,
    badge: "New",
    badgeColor: "bg-[#03A52B]",
    title: "Freshly Ripe Plantains Are Back in Stock",
    description:
      "Get the best deals on this season's sweet plantains — available while it lasts.",
    backgroundImage: "/plantainBg.png",
    ctaText: "Shop Now",
    ctaLink: "/shop",
  },
  {
    id: 2,
    badge: "Hot Deal",
    badgeColor: "bg-[#FF6B35]",
    title: "Organic Tomatoes Straight from Local Farms",
    description:
      "Juicy, vine-ripened tomatoes picked at peak freshness — perfect for your recipes.",
    backgroundImage: "/shopBg.png",
    ctaText: "Shop Now",
    ctaLink: "/shop",
  },
  {
    id: 3,
    badge: "Limited",
    badgeColor: "bg-[#8B4513]",
    title: "Premium Cocoa Beans Now Available",
    description:
      "Rich, aromatic cocoa beans harvested from the finest farms — order before they're gone.",
    backgroundImage: "/fruitBg.jpg",
    ctaText: "Shop Now",
    ctaLink: "/shop",
  },
  {
    id: 4,
    badge: "Fresh",
    badgeColor: "bg-[#00A86B]",
    title: "Crisp Garden Vegetables Delivered Daily",
    description:
      "Farm-fresh vegetables picked this morning — bringing nature's best to your table.",
    backgroundImage: "/shopBg.png",
    ctaText: "Shop Now",
    ctaLink: "/shop",
  },
];

export const ArrivalCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swiped left - go to next slide
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }

    if (touchStartX.current - touchEndX.current < -50) {
      // Swiped right - go to previous slide
      setCurrentSlide(
        (prev) => (prev - 1 + carouselData.length) % carouselData.length
      );
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }
  };

  // Handle mouse events for desktop swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      // Only if mouse button is pressed
      touchEndX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }

    if (touchStartX.current - touchEndX.current < -50) {
      setCurrentSlide(
        (prev) => (prev - 1 + carouselData.length) % carouselData.length
      );
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const currentData = carouselData[currentSlide];

  return (
    <div className="relative w-full">
      {/* Carousel Content */}
      <div
        className="relative bg-no-repeat bg-cover bg-center w-full min-h-[250px] sm:min-h-[320px] md:h-[420px] ml:h-[450px] rounded-[10px] md:rounded-[30px] z-0 transition-all duration-500 cursor-grab active:cursor-grabbing"
        style={{ backgroundImage: `url('${currentData.backgroundImage}')` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Content Overlay */}
        <div className="absolute top-1/2 left-5 sm:left-8 md:left-12 -translate-y-1/2 z-20 leading-tight w-[55%] md:w-[50%] lg:w-[45%] text-white flex flex-col gap-3 md:gap-5 pointer-events-none">
          <Button
            size="lg"
            className={`${currentData.badgeColor} rounded-full h-fit py-2 w-fit text-[clamp(10px,1.5vw,14px)] pointer-events-auto`}
          >
            {currentData.badge}
          </Button>
          <h1 className="font-geologica font-bold text-[clamp(18px,3vw,36px)]">
            {currentData.title}
          </h1>
          <p className="text-[clamp(12px,2vw,16px)] font-poppins">
            {currentData.description}
          </p>
          <Button
            href={currentData.ctaLink}
            variant="default"
            size="lg"
            className="w-fit text-[clamp(14px,1.5vw,16px)] pointer-events-auto"
          >
            <ShopBagIcon className="w-5 h-5" />
            {currentData.ctaText}
          </Button>
        </div>

        {/* Indicator Dots */}
        <div className="flex gap-2 items-center justify-center absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 z-30">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-[5px] md:rounded-[20px] cursor-pointer ${
                index === currentSlide
                  ? "w-[12px] sm:w-[16px] md:w-[42px] h-[3px] sm:h-[5px] md:h-[10px] bg-[#C09706]"
                  : "w-[2.75px] sm:w-[6px] md:w-[11px] h-[3px] sm:h-[5px] md:h-[10px] bg-white hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
