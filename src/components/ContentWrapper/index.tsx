import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

interface Props {
  children: React.ReactNode;
}
const ContentWrapper = (props: Props) => {
  return (
    <div className="w-full relative max-w-[1440px] mx-auto min-h-screen bg-[#fff] text-black">
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
};

export default ContentWrapper;
