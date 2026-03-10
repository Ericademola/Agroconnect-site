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
  grey: "text-gray-600 bg-[#EFF1F3]",
  orange: "text-[#E4B304] bg-[#E4B3041A] ",
  red: "text-[#E63946] bg-[#E639461A]",
  blue: "text-[#205FBE] bg-[#E2EEFF]",
  teal: "text-[#00B2A9] bg-[#E0F8F6]",
  redPlain: "text-[#F24236]",
  green: "text-[#00AC47] bg-[#00AC471A]",
  greenPlain: "text-[#16A34A] ",
  orangePlain: "text-[#D97706]",
  black: "text-white bg-blavk",
  purple: "text-[#8A38F5] bg-[#8A38F51A]",
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
      <div
        className={`text-[clamp(10px,1.2vw,14px)] font-normal font-poppins ${classStyleName} ${colorString} ${classText}`}
      >
        <span>{icon}</span>
        {status}
      </div>
    </div>
  );
};

export default StatusView;
