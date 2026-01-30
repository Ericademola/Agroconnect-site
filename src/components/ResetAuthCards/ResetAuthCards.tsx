import Image from "next/image";

interface ResetAuthCardsProps {
  title: string;
  subTitle: string;
  cardContent: React.ReactNode;
}
const ResetAuthCards = ({
  title,
  subTitle,
  cardContent,
}: ResetAuthCardsProps) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-3">
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
        <div className="mt-5 mb-3 flex flex-col items-center text-[#000000CC]">
          <h1 className="text-[clamp(20px,2.7vw,32px)] font-medium">{title}</h1>
          <div className="text-[clamp(12px,1.4vw,14px)] flex items-center gap-1 text-center">
            <p className="">{subTitle}</p>
          </div>
        </div>
      </div>
      <div className="w-full">{cardContent}</div>
    </div>
  );
};

export default ResetAuthCards;
