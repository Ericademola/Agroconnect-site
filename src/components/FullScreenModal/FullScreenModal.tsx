import { type ReactNode } from "react";

const FullScreenModal = ({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
}) => {
  return (
    <div>
      {/* Modal */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            color: "white",
            zIndex: 1000,
            overflow: "scroll",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
export default FullScreenModal;

// import { type ReactNode } from "react";
// // import Image from "next/image";
// import { cn } from "@/lib/utils";
// // import { Button } from "../ui/button";
// // import { LeftArrowIcon } from "@/Icons";

// interface IProps {
//   children: ReactNode;
//   isOpen: boolean;
//   setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
//   contentCSS?: string;
// }

// const FullScreenModal = ({
//   children,
//   isOpen,
//   // setIsOpen,
//   contentCSS,
// }: IProps) => {
//   return (
//     <div>
//       {/* Modal */}
//       {isOpen && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             backgroundColor: "#fff", // semi-transparent background
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             color: "white",
//             zIndex: 1000,
//             overflowY: "auto",
//           }}
//         >
//           <div className={cn("h-full w-full", contentCSS)}>
//             <div className="flex items-center gap-2 my-2 w-full border-b border-[#6E737C] pb-4"></div>
//             {children}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default FullScreenModal;
