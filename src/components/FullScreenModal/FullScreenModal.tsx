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
