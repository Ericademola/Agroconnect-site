type StatusProps = {
  status: string;
  icon?: React.ReactNode;
  text?: string;
  grey?: string;
  red?: string;
  orange?: string;
  blue?: string;
  black?: string;
  teal?: string;
  redPlain?: string;
  greenPlain?: string;
  orangePlain?: string;
  green?: string;
  styleOption?: boolean;
  disable?: boolean;
  classText?: string;
  classStyleName?: string;
  purple?: string;
};

const colors = {
  grey: "text-gray-600 bg-[#EFF1F3] font-semibold text-[12px]",
  orange: "text-[#E4B304] bg-[#E4B3041A] font-semibold text-[12px]",
  red: "text-[#E63946] bg-[#E639461A] font-semibold text-[12px]",
  blue: "text-[#205FBE] bg-[#E2EEFF] font-semibold text-[12px]",
  teal: "text-[#00B2A9] bg-[#E0F8F6] font-semibold text-[12px]",
  redPlain: "text-[#F24236] font-normal text-[14px]",
  green: "text-[#00AC47] bg-[#00AC471A] font-semibold text-[12px]",
  greenPlain: "text-[#16A34A] font-normal text-[14px]",
  orangePlain: "text-[#D97706] font-normal text-[14px]",
  black: "text-white bg-blavk font-semibold text-[12px]",
  purple: "text-[#8A38F5] bg-[#8A38F51A] font-semibold text-[12px]",
};
const StatusView = ({
  status,
  icon,
  classText,
  grey,
  orange,
  red,
  blue,
  teal,
  green,
  black,
  greenPlain,
  redPlain,
  orangePlain,
  purple,
  styleOption = false,
  disable = false,
  classStyleName = "leading-[13px] flex justify-center items-center rounded-[20px] py-1 px-4",
}: StatusProps) => {
  let colorString: string;
  switch (status) {
    case `${red}`:
      colorString = colors.red;
      break;
    case `${grey}`:
      colorString = colors.grey;
      break;
    case `${orange}`:
      colorString = colors.orange;
      break;
    case `${blue}`:
      colorString = colors.blue;
      break;
    case `${teal}`:
      colorString = colors.teal;
      break;
    case `${green}`:
      colorString = colors.green;
      break;
    case `${redPlain}`:
      colorString = colors.redPlain;
      break;
    case `${greenPlain}`:
      colorString = colors.greenPlain;
      break;
    case `${orangePlain}`:
      colorString = colors.orangePlain;
      break;
    case `${black}`:
      colorString = colors.black;
      break;
    case `${purple}`:
      colorString = colors.purple;
      break;
    default:
      colorString = "";
  }
  return (
    <div
      className={`flex ${styleOption ? "" : "justify-center"} ${
        disable ? "opacity-30" : "opacity-100"
      }`}
    >
      <div className={`${classStyleName} ${colorString} ${classText}`}>
        <span>{icon}</span>
        {status}
      </div>
    </div>
  );
};

export default StatusView;
