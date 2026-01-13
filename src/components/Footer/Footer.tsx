// import { XIcon, FacebookIcon, InstagramIcon, TikTokIcon } from "@/Icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#15803D] py-6 mt-12 flex flex-col px-10 w-full">
      <div className="flex flex-col sm:flex-row  items-start gap-6 sm:gap-10">
        <div className="">
          <h3 className="text-[1rem] font-bold text-[#f0fdf4] hover:text-[#7bf1a8]  cursor-default">
            ABOUT AGROCONNECT
          </h3>
          <div className="text-[0.8rem] inline-flex flex-col gap-1 mt-2">
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Contact Us
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              About Us
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Career
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Our Blog
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>

        <div className="">
          <h3 className="text-[1rem] font-bold text-[#f0fdf4] hover:text-[#7bf1a8]  cursor-default">
            PAYMENT
          </h3>
          <div className="text-[0.8rem] inline-flex flex-col gap-1 mt-2">
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              {" "}
              Payment on Delivery
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Bank Transfer
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Master Card
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Verve
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Visa
            </Link>
          </div>
        </div>

        <div className="">
          <h3 className="text-[1rem] font-bold text-[#f0fdf4] hover:text-[#7bf1a8]  cursor-default">
            BUYING ON AGROCONNECT
          </h3>
          <div className="text-[0.8rem] inline-flex flex-col gap-1 mt-2">
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              FAQs
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Delivery
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Track My Order
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Return Policy
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="">
          <h3 className="text-[1rem] font-bold text-[#f0fdf4] hover:text-[#7bf1a8]  cursor-default">
            NEED HELP?
          </h3>
          <div className="text-[0.8rem] inline-flex flex-col gap-1 mt-2">
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Chat with us
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Contact Us
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Help Center
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Report a Problem
            </Link>
            <Link
              href={"#"}
              className="text-sm text-[#b9f8cf] hover:text-[#7bf1a8]"
            >
              Become a Seller
            </Link>
          </div>
        </div>

        <div className="">
          <h3 className="text-[1rem] font-bold text-[#f0fdf4] hover:text-[#7bf1a8]  cursor-default">
            JOIN US
          </h3>
          {/* <div className="text-[0.8rem] inline-flex  gap-2 mt-2">
            <Link href={"#"} className="">
              <FacebookIcon className="w-5 h-5 text-[#b9f8cf] hover:text-[#7bf1a8] " />
            </Link>
            <Link href={"#"} className="">
              <InstagramIcon className="w-5 h-5 text-[#b9f8cf] hover:text-[#7bf1a8] " />
            </Link>
            <Link href={"#"} className="">
              <XIcon className="w-5 h-5 text-[#b9f8cf] hover:text-[#7bf1a8] " />
            </Link>
            <Link href={"#"} className="">
              <TikTokIcon className="w-5 h-5 text-[#b9f8cf] hover:text-[#7bf1a8] " />
            </Link>
          </div> */}
        </div>
      </div>
      <p className="text-[1rem] mt-15 border-t border-[#f0fdf4] pt-4 text-[#f0fdf4] text-center">
        &copy; {new Date().getFullYear()} Agroconnect. All rights reserved.
      </p>
    </footer>
  );
}
