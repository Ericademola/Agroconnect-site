import { ShopBagIcon } from "@/Icons";
import { Button } from "../ui/button";

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
      <div className="relative bg-[url('/plantainBg.png')] bg-no-repeat bg-cover bg-center w-full min-h-[250px] sm:min-h-[320px] md:h-[420px] ml:h-[450px] rounded-[10px] md:rounded-[30px] z-0">
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
      </div>
    </div>
  );
};

export default NewArrivals;
