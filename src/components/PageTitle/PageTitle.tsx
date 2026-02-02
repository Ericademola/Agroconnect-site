import React from "react";

interface IpageTitleProps {
  title: string;
  description?: string;
}

const PageTitle = ({ title, description }: IpageTitleProps) => {
  return (
    <div className="bg-[url('/shopBg.png')] bg-no-repeat bg-cover bg-center w-full min-h[100px] md:min-h-[180px] text-white ">
      <div className="pl-4 sm:pl-5 md:pl-6 ml:pl-8 lg:pl-12 pt-12 pb-4 md:pt-20">
        <h2 className="text-[clamp(18px,2.9vw,30px)] font-semibold font-geologica">
          {title}
        </h2>
        <p className="text-[clamp(12px,1.7vw,16px)] font-poppins mt-1">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PageTitle;
