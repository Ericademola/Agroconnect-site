import CartButton from "@/components/cartbutton/page";
import NavBar from "@/components/navbar/page";
import Link from "next/link";
import Image from "next/image";

export default function Cart() {
  return (
    <div>
      <NavBar />
      <div className="bg-gray-200 h-screen flex flex-col items-center pt-20 md:pt-24 lg:pt-28"></div>
    </div>
  );
}
