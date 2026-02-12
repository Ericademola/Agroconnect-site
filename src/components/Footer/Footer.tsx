import {
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  AppleIcon,
  PlayStoreIcon,
} from "@/Icons";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import FooterForm from "../Forms/FooterForm";

export default function Footer() {
  return (
    <footer className="mt-4 sm:mt-10 md:mt-20 flex flex-col w-full gap-4 sm:gap-10 md:gap-20">
      <div className="px-4 sm:px-5 md:px-6 ml:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 ml:grid-cols-[1fr_1fr_auto] items-start gap-6 sm:gap-8 ml:gap-10 lg:gap-12">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 lg:gap-5">
            <Link
              href="/"
              className="flex items-center cursor-pointer gap-[5px]"
            >
              <Image
                width={100}
                height={100}
                src="/assets/images/logo.png"
                alt=""
                className="w-[50px] md:w-[58px] lg:w-[67px] h-auto object-cover"
              />

              <p className="font-prompt font-semibold text-[clamp(17px,1.9vw,24px)] text-[#03601A]">
                Agroconnect
              </p>
            </Link>
            <p className="text-[#00000099] text-[clamp(12.5px,1.2vw,14px)] font-poppins">
              AgriConnect brings you closer to the farm by connecting farmers
              and buyers in one seamless platform for fresh produce, fair trade,
              and everyday nourishment
            </p>
          </div>
          <div className="mt-auto flex flex-col gap-5">
            <div className="font-poppins flex items-center gap-4 ">
              {[
                {
                  buttonIcon: <AppleIcon className="w-5 h-5" fill="#333333" />,
                  buttonText: " Apple Store",
                },
                {
                  buttonIcon: <PlayStoreIcon className="w-5 h-5" />,
                  buttonText: "Google Store",
                },
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="lg"
                  className="flex items-center gap-2 px-3 md:px-6"
                >
                  {item.buttonIcon}
                  <span className="flex flex-col">
                    <p className="text-[#00000099] text-[10px]">
                      Download on the
                    </p>
                    <h3 className="text-black text-xs font-medium">
                      {item.buttonText}
                    </h3>
                  </span>
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-5">
              {[
                {
                  socialIcon: <TwitterIcon className="w-4 h-4 md:w-5 md:h-5" />,
                  href: "/",
                },
                {
                  socialIcon: (
                    <FacebookIcon className="w-4 h-4 md:w-5 md:h-5" />
                  ),
                  href: "/",
                },
                {
                  socialIcon: (
                    <InstagramIcon className="w-4 h-4 md:w-5 md:h-5" />
                  ),
                  href: "/",
                },
              ].map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="border-2 border-black w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full flex items-center justify-center"
                >
                  {item.socialIcon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4 lg:gap-5">
            <h3 className="text-black font-poppins font-medium text-[clamp(16px,1.6vw,20px)]">
              Quicklinks
            </h3>
            <div className="flex flex-col gap-2">
              {[
                {
                  text: "Home",
                  href: "/",
                },
                {
                  text: "Shop (Categories)",
                  href: "/shop",
                },
                {
                  text: "About Us",
                  href: "/about",
                },
                {
                  text: "How It Works",
                  href: "/#howItWorks",
                },
                {
                  text: "Contact us",
                  href: "/contact",
                },
                {
                  text: "Terms & Conditions",
                  href: "/termsAndConditions",
                },
              ].map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="font-poppins text-[clamp(12.5px,1.2vw,14px)] text-[#00000099]"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:gap-5">
            <h3 className="text-black font-poppins font-medium text-[clamp(16px,1.6vw,20px)]">
              My Account
            </h3>
            <div className="flex flex-col gap-2">
              {[
                {
                  text: "My Profile",
                  href: "/profile",
                },
                {
                  text: "Order History",
                  href: "/orderHistory",
                },
                {
                  text: "Shopping Cart",
                  href: "/cart",
                },
                {
                  text: "Wishlist",
                  href: "/wishList",
                },
              ].map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="font-poppins text-[clamp(12.5px,1.2vw,14px)] text-[#00000099]"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full ml:w-[300px] h-full bg-[#03601A] rounded-[20px] px-5 py-4 flex flex-col gap-8">
          <h3 className="text-white text-base font-poppins font-medium">
            Be the First to Know; Fresh Offers, New Products & More
          </h3>
          <FooterForm />
        </div>
      </div>

      <div className="bg-[#F5F5F5] py-8 md:py-6 flex items-center justify-center gap-3 md:gap-8">
        <p className="text-[#969696] text-[clamp(8px,1.2vw,14px)] font-poppins">
          All payments are secured by
        </p>
        <div className="flex items-center gap-1 md:gap-5">
          {[
            "/assets/images/flutterWave.png",
            "/assets/images/paystack.png",
            "/assets/images/visa.png",
            "/assets/images/mastercard.png",
            "/assets/images/verve.png",
            "/assets/images/visaElectron.png",
            "/assets/images/americanExpress.png",
          ].map((item, index) => (
            <Image
              width={120}
              height={25}
              src={item}
              alt=""
              key={index}
              className="w-full h-[10px] md:h-[25px] object-contain"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
