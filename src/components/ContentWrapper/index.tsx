import React from "react";
import NavBar from "../NavBar/NavBar";

interface Props {
  children: React.ReactNode;
}
const ContentWrapper = (props: Props) => {
  return (
    <div className="w-full relative max-w-[1440px] mx-auto min-h-screen bg-[#f9fafb]">
      <NavBar />
      {props.children}
    </div>
  );
};

export default ContentWrapper;
