// import "@FontAwesomeIcon";
"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import NavBar from "@/components/NavBar/NavBar";
import Catalogue from "@/components/Catalogue/Catalogue";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Header />
      <div className="relative bg-gradient-overlay  w-full flex justify-center items-center h-[150px] sm:h-[240px] md:h-[270px] lg:h-[350px] mt-12 sm:mt-14 md:mt-16 lg:mt-20 font-sans shadow-lg z-0">
        <div className="text-gray-950 absolute bottom-6 text-right right-4 sm:right-8 md:right-12 lg:right-20 w-[240px] sm:w-[320px] md:w-[350px] lg:w-[450px] z-50">
          <span className="font-bold text-[0.9rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[1.8rem]">
            <h3>New Arrival!!</h3>
          </span>
          <p className="font-medium text-[0.5rem] sm:text-[0.7rem] md:text-[0.9rem] lg:text-[1.1rem]">
            Pure Organic, Fresh and Chemical free.
            <br />
            <a
              href="#catalogue"
              className="font-bold text-[0.55rem] sm:text-[0.6rem] md:text-[0.8rem] lg:text-[1.15rem] underline underline-offset-2 cursor-pointer hover:text-blue-900"
            >
              Shop now
            </a>
            and taste the freshness.
          </p>
        </div>
      </div>
      <div id="catalogue" className="pt-14 md:pt-16 lg:pt-20">
        <p className="bg-green-300 text-center py-1.5 md:py-3 mb-6 md:mb-10 font-extrabold text-xl md:text-2xl lg:text-3xl text-gray-800">
          Shop now
        </p>
        <Catalogue />
      </div>
    </div>
  );
}
