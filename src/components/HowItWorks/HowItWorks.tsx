import Image from "next/image";

const HowItWorks = () => {
  return (
    <div className="bg-[#F5F5F5] px-4 sm:px-[60px] md:px-[80px] ml:px-[150px] lg:px-[170px] py-5 sm:py-6 md:py-10 ml:py-14 lg:py-[70px] xl:py-[70px] flex flex-col items-center gap-7">
      <h2 className="text-[#000000CC] text-[clamp(16px,2.7vw,30px)] font-geologica font-semibold text-center leading-tight w-full sm:w-[90%] md:w-[80%] ml:w-[85%] lg:w-[60%]">
        How AgriConnect Works; From
        <br className="hidden md:block" />
        Farm to Your Table in Simple Step
      </h2>
      <div className="font-poppins w-full grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr] gap-[10px] sm:gap-3 md:gap-5 lg:gap-6">
        {/* First row - 2 cols + 1 col */}
        <div className="flex flex-col md:col-span-2 bg-[#FBB4B5] rounded-[15px] pt-4 md:pt-[30px] pl-4 md:pl-[30px] h-[164px] sm:h-[220px] ml:h-[260px] overflow-hidden">
          <h3 className="text-black text-[clamp(18px,2.2vw,26px)] text-nowrap font-medium mb-1">
            Farmers List Their Produce
          </h3>
          <span className="grid md:grid-cols-[3fr_2fr] mt-auto">
            <p className="text-[#00000099] text-[clamp(12px,1.4vw,16px)] pr-4 sm:pr-0">
              {`Verified farmers showcase what's in season`}
            </p>
            <div className="ml-auto">
              <Image
                src={"/assets/images/howFarmer.png"}
                alt={"A farmer with farm products"}
                width={100}
                height={100}
                className="w-[100px] sm:w-[150px] md:w-full h-[100px] sm:h-[160px] md:h-[180px] ml:h-[200px] lg:h-[230px] object-cover md:object-contain rounded-br-[15px]"
              />
            </div>
          </span>
        </div>

        <div className="flex flex-col bg-[#B2F3F9]  rounded-[15px] pt-4 md:pt-[26px] pl-4 md:pl-[20px] h-[164px] sm:h-[220px] ml:h-[260px] overflow-hidden">
          <span className="pr-3">
            <h3 className="text-black text-[clamp(18px,2.2vw,26px)] text-nowrap font-medium mb-1">
              You Shop with Ease
            </h3>
            <p className="text-[#00000099] text-[clamp(12px,1.4vw,16px)]">
              Search, filter, and add to your cart
            </p>
          </span>
          <div className="mt-auto ml-auto">
            <Image
              src={"/assets/images/howFruitBasket.png"}
              alt={"A farmer with farm products"}
              width={100}
              height={100}
              className="w-full h-[100px] sm:h-[138px] md:h-[100px] ml:h-[138px] object-cover md:object-contain rounded-br-[15px]"
            />
          </div>
        </div>

        {/* Second row - 1 col + 2 cols */}
        <div className="relative flex flex-col bg-[#E2FFC9] rounded-[15px] pt-4 md:pt-[26px] pl-4 md:pl-[20px] h-[164px] sm:h-[220px] ml:h-[260px] overflow-hidden">
          <h3 className="text-black text-[clamp(18px,2.2vw,26px)] text-nowrap font-medium mb-1">
            We Handle Logistics
          </h3>
          <span className="grid md:grid-cols-[3fr_2fr]">
            <p className="text-[#00000099] text-[clamp(12px,1.4vw,16px)] pr-4 sm:pr-0">
              Orders are processed and dispatched quickly
            </p>
            <div className="absolute bottom-0 right-0">
              <Image
                src={"/assets/images/howFarmer.png"}
                alt={"A farmer with farm products"}
                width={100}
                height={100}
                className="w-[100px] sm:w-[150px] md:w-full h-[100px] sm:h-[160px] ml:h-[180px] lg:h-[200px]  object-fill rounded-br-[15px]"
              />
            </div>
          </span>
        </div>

        <div className="flex flex-col md:col-span-2 bg-[#E9FFA2] rounded-[15px] pt-4 md:pt-[30px] pl-4 md:pl-[30px] h-[164px] sm:h-[220px] ml:h-[260px] overflow-hidden">
          <h3 className="text-black text-[clamp(18px,2.2vw,26px)] text-nowrap font-medium mb-1">
            Freshness Delivered
          </h3>
          <span className="grid md:grid-cols-[3fr_2fr] h-full">
            <p className="text-[#00000099] text-[clamp(12px,1.4vw,16px)] pr-4 sm:pr-0">
              Receive farm-fresh goods right at your door
            </p>
            <div className="mt-auto ml-auto ">
              <Image
                src={"/assets/images/howFruitBasket.png"}
                alt={"A farmer with farm products"}
                width={100}
                height={100}
                className=" w-full h-[100px] sm:h-[138px] md:h-[100px] ml:h-[120px] object-cover md:object-contain rounded-br-[15px]"
              />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
