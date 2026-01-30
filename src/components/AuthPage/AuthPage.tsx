"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface AuthPageProps {
  buyerForm?: React.ReactNode;
  farmerForm?: React.ReactNode;
  text: string;
  linkhref: string;
  linkText: string;
  header: string;
}

const AuthPage = ({
  buyerForm,
  farmerForm,
  text,
  linkhref,
  header,
  linkText,
}: AuthPageProps) => {
  const [activeTab, setActiveTab] = useState<string>("buyer");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="grid md:grid-cols-2  gap-4">
      <div className="relative">
        <Image
          width={100}
          height={100}
          src="/assets/images/authBg.png"
          alt=""
          className="object-cover rounded-r-full h-full w-full border-[#0000001A] border-r-6 border-t-6 border-b-6 hidden md:block"
        />

        <Image
          width={100}
          height={100}
          src="/assets/images/authBgMobile.png"
          alt=""
          className="object-cover rounded-b-full h-[300px] sm:h-[400px] w-full border-[#0000001A] block md:hidden"
        />

        <div className="flex flex-col gap-2 font-geologica absolute bottom-32 md:bottom-48 left-0 right-0">
          <span className="bg-white w-[80%] h-[2px] ml-auto"></span>
          <div className="mx-auto md:mx-0 md:px-10">
            <p className="text-white text-xl sm:text-2xl font-semibold block md:hidden">
              Connecting Farmers & <br /> Consumers for Fresher Living
            </p>
            <p className="text-white text-[clamp(20px,3.2vw,40px)] font-semibold hidden md:block">
              Connecting Farmers
              <br />
              & Consumers for
              <br />
              Fresher Living
            </p>
          </div>
          <span className="bg-white w-[80%] md:w-[60%] h-[2px]"></span>
        </div>
      </div>

      <div className="md:border-2 border-[#0000001A] rounded-[20px] font-geologica flex flex-col pt-5 gap-8 mx-4 sm:mx-5 md:mr-6 ml:mr-8 lg:mr-12 mb-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center cursor-pointer gap-[5px]">
            <Image
              width={100}
              height={100}
              src="/assets/images/logo.png"
              alt=""
              className="w-[60px] md:w-[70px] ml:w-[80px] lg:w-[100px] h-auto object-cover"
            />

            <p className="font-prompt font-semibold text-[clamp(20px,3.2vw,32px)] text-[#03601A]">
              Agroconnect
            </p>
          </div>
          <div className="mt-5 mb-3 flex flex-col items-center">
            <h1 className="text-[#000000CC] text-[clamp(20px,2.7vw,32px)] font-medium">
              {header}
            </h1>
            <div className="text-[clamp(12px,1.4vw,16px)] flex items-center gap-1">
              <p className="text-[#525252]">{text} </p>
              <Link href={linkhref} className="text-[#C09706] font-medium">
                {linkText}
              </Link>
            </div>
          </div>
          <div className="border border-[#0000001A] rounded-[18px] px-3 py-2 text-[clamp(14px,1.6vw,18px)] flex items-center gap-4">
            <div
              className={`cursor-pointer ${
                activeTab === "buyer"
                  ? "text-[#03601A] shadow-xl shadow-[#00000024] rounded-[18px] px-3 py-2"
                  : "text-[#333333B2]"
              }`}
              onClick={() => handleTabClick("buyer")}
            >
              As a Buyer
            </div>
            <div
              className={`cursor-pointer ${
                activeTab === "farmer"
                  ? "text-[#03601A] shadow-xl shadow-[#00000024] rounded-[18px] px-3 py-2"
                  : "text-[#333333B2]"
              }`}
              onClick={() => handleTabClick("farmer")}
            >
              As a Farmer
            </div>
          </div>
        </div>
        <div className="border-t border-[#0000001A] py-4 md:px-5 ml:px-6 lg:px-7 md:py-4 lg:py-5">
          {activeTab === "buyer" ? (
            <div className="w-full">{buyerForm}</div>
          ) : (
            <div className="w-full">{farmerForm}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
