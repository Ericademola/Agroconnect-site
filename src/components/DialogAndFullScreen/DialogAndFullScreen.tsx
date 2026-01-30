import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import FullScreenModal from "../FullScreenModal/FullScreenModal";
import { ScrollArea } from "../ui/scroll-area";
// import { CloseIcon } from "@/assets/icon";

export function DialogAndFullScreen({
  children,
  open,
  close,
  max_height,
  title,
  subTitle,
  // hideRightCloseButton,
  // hideLeftCloseButton = true,
  preventCloseOnOutsideClick,
  titleCSS,
  descriptionCSS,
  size = "sm",
  className,
  noTitleMargin = false,
  // closeButtonClassName,
  contentCSS,
  headerClassName,
  closeIcon,
}: {
  children: React.ReactNode;
  open: boolean;
  close: () => void;
  width?: string;
  max_height?: boolean;
  title?: string;
  subTitle?: string;
  hideRightCloseButton?: boolean;
  hideLeftCloseButton?: boolean;
  preventCloseOnOutsideClick?: boolean;
  titleCSS?: string;
  descriptionCSS?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  style?: React.CSSProperties;
  showMobileCloseButton?: boolean;
  drawerArrorClose?: boolean;
  noTitleMargin?: boolean;
  contentCSS?: string;
  acceptDrawer?: boolean;
  alwaysShowDialog?: boolean;
  hideOnMobile?: boolean;
  closeButtonClassName?: string;
  closeIcon?: React.ReactNode;
  headerClassName?: string;
}) {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const handleOutsideInteraction = (e: Event) => {
    if (preventCloseOnOutsideClick) e.preventDefault();
  };
  let sizeClass = "";
  switch (size) {
    case "xs":
      sizeClass = "w-fit";
      break;
    case "sm":
      sizeClass = "sm:max-w-lg";
      break;
    case "md":
      sizeClass = "sm:max-w-xl";
      break;
    case "lg":
      sizeClass = "sm:max-w-[50rem]";
      break;
    case "xl":
      sizeClass = "sm:max-w-[55rem]";
      break;

    default:
      break;
  }

  return (
    <div className={cn("", className)}>
      {isMobile ? (
        <FullScreenModal
          isOpen={open}
          setIsOpen={close}
          contentCSS={contentCSS}
        >
          {children}
        </FullScreenModal>
      ) : (
        <Dialog open={open} onOpenChange={close}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent
            // hideRightCloseButton={hideRightCloseButton}
            // hideLeftCloseButton={hideLeftCloseButton}
            // closeIcon={closeIcon}
            className={cn(
              max_height ? "h-[90vh]" : "h-auto",
              sizeClass,
              contentCSS,
              // "p-2 sm:p-6"
            )}
            onInteractOutside={handleOutsideInteraction}
            // closeButtonClassName={closeButtonClassName}
          >
            {(title || subTitle) && (
              <DialogHeader
                // className="mt-[30px]"
                className={cn(
                  "border-b border-[#6E737C] pb-4",
                  headerClassName,
                )}
                closeIcon={closeIcon}
              >
                <DialogTitle className={titleCSS}>{title}</DialogTitle>
                <DialogDescription className={descriptionCSS}>
                  {subTitle}
                </DialogDescription>
              </DialogHeader>
            )}
            <ScrollArea
              className={`${
                title || subTitle ? "" : !noTitleMargin && "sm:mt-[30px]"
              }`}
            >
              {children}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
