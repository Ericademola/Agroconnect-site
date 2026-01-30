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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import { CloseIcon } from "@/Icons";

export function DrawerDialog({
  children,
  open,
  close,
  max_height,
  title,
  subTitle,
  preventCloseOnOutsideClick,
  titleCSS,
  descriptionCSS,
  size = "sm",
  className,
  noTitleMargin = true,
  closeIcon = (
    <div className="border border-[#0000001A] h-8 w-8 flex items-center justify-center rounded-full">
      <CloseIcon />
    </div>
  ),
  contentCSS,
  headerClassName,
  scrollAreaClassName,
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
  scrollAreaClassName?: string;
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
        <Drawer open={open} onOpenChange={close}>
          <DrawerTrigger asChild />
          <DrawerContent
            className={cn(
              "px-4 h-full w-full",

              sizeClass,
              contentCSS,
            )}
          >
            <DrawerHeader className={cn("", headerClassName)}>
              <DrawerTitle className={titleCSS}>{title}</DrawerTitle>
              <DrawerDescription>{subTitle}</DrawerDescription>
            </DrawerHeader>
            <div
              className={cn(
                "overflow-y-auto hide-scrollbar max-h-[65vh] pb-5",
                scrollAreaClassName,
              )}
            >
              <ScrollArea>{children}</ScrollArea>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={close}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent
            className={cn(
              max_height ? "h-[90vh]" : "h-auto",
              sizeClass,
              contentCSS,
            )}
            onInteractOutside={handleOutsideInteraction}
          >
            {(title || subTitle) && (
              <DialogHeader
                closeIcon={closeIcon}
                className={cn("", headerClassName)}
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
