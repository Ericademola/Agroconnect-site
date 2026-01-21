import { QuoteIcon } from "@/Icons";
import Image from "next/image";
const Testimonial = () => {
  return (
    <div>
      <div className="bg-[#F5F5F5] sm:rounded-[20px] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 px-[16px] md:px-[24px] lg:px-[38px] py-[28px] md:py-[40px] lg:py-[50px]">
        <div className="flex flex-col items-center md:items-start justify-center gap-1 md:gap-[10px]">
          <h2 className="text-[#000000CC] text-[clamp(16px,2.2vw,28px)] font-geologica font-semibold">
            What Our Customers Are Saying
          </h2>
          <p className="text-[#00000099] text-[clamp(14px,1.4vw,18px)] font-poppins w-[90%] md:w-full text-center md:text-start">
            See how AgriConnect is changing the way
            <br className="hidden md:block" />
            people buy, sell, and enjoy fresh food.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-3 md:gap-6">
          {Testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative flex flex-col gap-2 bg-[#FFFFFF] border-[1.5px] border-[#ECECEC] px-4 py-4 rounded-[10px] font-poppins w-full md:max-w-[430px] ${
                index === 0
                  ? "mr-0 md:mr-auto"
                  : index === 1
                    ? "mx-0 md:mx-auto"
                    : "ml-0 md:ml-auto"
              }`}
            >
              <QuoteIcon className="w-4 h-4 md:w-5 md:h-5 absolute right-4 top-4" />
              <span
                className="absolute left-0 top-0 w-2 h-full rounded-l-[10px]"
                style={{ backgroundColor: testimonial.borderColor }}
              ></span>
              <h3 className="font-medium text-[clamp(13.5px,1.6vw,18px)] text-black">
                {testimonial.userName}, {testimonial.occupation}
              </h3>
              <div className="flex items-start gap-5">
                <p className="text-[clamp(10px,1.4vw,13.5px)] text-[#00000099]">
                  {testimonial.testimonialText}
                </p>
                <Image
                  src={testimonial.profilePicture}
                  alt={testimonial.userName}
                  width={100}
                  height={100}
                  className="rounded-full w-[37px] sm:w-[40px] md:w-[50px] h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

const Testimonials = [
  {
    userId: 1,
    userName: "David Okon",
    profilePicture: "/assets/images/testimonial1.png",
    occupation: "Home Cook",
    testimonialText:
      "I got my plantains and tomatoes fresher and faster than any store around. It honestly feels like buying straight from the farm.",
    borderColor: "#C0970680",
  },
  {
    userId: 2,
    userName: "Amina Yusuf",
    profilePicture: "/assets/images/testimonial2.png",
    occupation: "Cassava Farmer",
    testimonialText:
      "AgriConnect has completely changed how I sell my produce. I don’t have to wait at the market all day anymore — buyers find me directly",
    borderColor: "#DDDDDD",
  },
  {
    userId: 3,
    userName: "Ngozi Ude",
    profilePicture: "/assets/images/testimonial3.png",
    occupation: "Grocery Seller",
    testimonialText:
      "As a small shop owner, restocking used to be stressful. Now I just order through AgriConnect — it’s reliable and the prices are fair",
    borderColor: "#C0970680",
  },
];
