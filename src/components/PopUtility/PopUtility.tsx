import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Button } from "../ui/button";

interface ISuccessErrorPopup {
  header?: string;
  desc?: string;
  hideRightCloseButton?: boolean;
  buttonTitle?: string | ReactNode;
  secondBtnClassName?: string;
  firstBtnClassName?: string;
  leftFlexButtonTitle?: string;
  rightFlexButtonTitle?: string;
  icon?: React.ReactNode;
  customHomeNav?: string;
  secondButtonTitle?: string | ReactNode;
  handleFirstBtnAtn?: () => void;
  handleSecondBtnAtn?: () => void;
  loadingFirstBtnAtn?: boolean;
  loadingSecondBtnAtn?: boolean;
  loadingLeftFlexBtnAtn?: boolean;
  loadingRightFlexBtnAtn?: boolean;
  handleLeftFlexBtnAtn?: () => void;
  handleRightFlexBtnAtn?: () => void;
  firstVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  secondVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  leftFlexButtonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  rightFlexButtonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  rightFlexButtonClassName?: string;
  leftFlexButtonClassName?: string;
  rightFlexButtonLeftIcon?: React.ReactNode;
  descNode?: ReactNode;
  disabledSecondBtn?: boolean;
  disabledFirstBtn?: boolean;
  disabledLeftFlexBtn?: boolean;
  disabledRightFlexBtn?: boolean;
  //   firstBtnLoaderClassName?: string;
  //   secondBtnLoaderClassName?: string;
  //   leftFlexBtnLoaderClassName?: string;
  //   rightFlexBtnLoaderClassName?: string;
  buttonsectionClassName?: string;
  hrClassName?: string;
  className?: string;
  headerClassName?: string;
  descClassName?: string;
}

const PopUpUtility = ({
  header,
  desc,
  buttonTitle,
  secondButtonTitle,
  leftFlexButtonTitle,
  rightFlexButtonTitle,
  secondBtnClassName,
  firstBtnClassName,
  icon,
  firstVariant = "default",
  secondVariant = "secondary",
  customHomeNav, // buttonLink,
  handleFirstBtnAtn,
  handleSecondBtnAtn,
  loadingFirstBtnAtn = false,
  loadingSecondBtnAtn = false,
  loadingLeftFlexBtnAtn = false,
  loadingRightFlexBtnAtn = false,
  handleLeftFlexBtnAtn,
  handleRightFlexBtnAtn,
  leftFlexButtonVariant = "ghost",
  rightFlexButtonVariant = "secondary",
  rightFlexButtonClassName,
  leftFlexButtonClassName,
  rightFlexButtonLeftIcon,
  descNode,
  disabledSecondBtn = false,
  disabledFirstBtn = false,
  disabledLeftFlexBtn = false,
  disabledRightFlexBtn = false,
  //   firstBtnLoaderClassName,
  //   secondBtnLoaderClassName,
  //   leftFlexBtnLoaderClassName,
  //   rightFlexBtnLoaderClassName,
  buttonsectionClassName,
  hrClassName,
  className,
  headerClassName,
  descClassName,
}: ISuccessErrorPopup) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 justify-center items-center w-full rounded-xl border-[0.5px] border-[#E9E9E9] bg-[#FFFFFF]",
        className,
      )}
    >
      <div className="p-6 flex flex-col gap-4 justify-center items-center w-full text-center">
        {icon}

        {header && (
          <h2
            className={cn(
              "text-black text-[clamp(20px,2.7vw,30px)] font-raleway font-semibold leading-tight",
              headerClassName,
            )}
          >
            {header}
          </h2>
        )}

        {desc && (
          <p
            className={cn(
              "text-[#000000B2] text-[clamp(12px,1.3vw,14px)] font-raleway leading-tight text-center w-full",
              descClassName,
            )}
          >
            {desc}
          </p>
        )}

        {descNode && descNode}
      </div>
      <hr className={cn("w-full text-[#E9E9E9]", hrClassName)} />
      <div
        className={cn(
          "p-6 flex flex-col gap-4 justify-center items-center w-full",
          buttonsectionClassName,
        )}
      >
        {buttonTitle && (
          <Button
            variant={firstVariant}
            size="lg"
            className={cn("w-full", firstBtnClassName)}
            onClick={handleFirstBtnAtn}
            disabled={disabledFirstBtn}
            loading={loadingFirstBtnAtn}
            // loaderClassName={firstBtnLoaderClassName}
          >
            {buttonTitle}
          </Button>
        )}

        {secondButtonTitle && (
          <Button
            variant={secondVariant}
            size="lg"
            className={cn("w-full", secondBtnClassName)}
            disabled={disabledSecondBtn}
            loading={loadingSecondBtnAtn}
            onClick={handleSecondBtnAtn}
            // loaderClassName={secondBtnLoaderClassName}
          >
            {secondButtonTitle}
          </Button>
        )}

        {leftFlexButtonTitle && rightFlexButtonTitle && (
          <div className="w-full flex justify-between gap-4 font-geologica text-[clamp(13px,1.5vw,16px)]">
            <Button
              variant={leftFlexButtonVariant}
              size="lg"
              className={cn("w-full", leftFlexButtonClassName)}
              disabled={disabledLeftFlexBtn}
              onClick={handleLeftFlexBtnAtn}
              loading={loadingLeftFlexBtnAtn}
              //   loaderClassName={leftFlexBtnLoaderClassName}
            >
              {leftFlexButtonTitle}
            </Button>
            <Button
              variant={rightFlexButtonVariant}
              size="lg"
              className={cn("w-full", rightFlexButtonClassName)}
              disabled={disabledRightFlexBtn}
              onClick={handleRightFlexBtnAtn}
              loading={loadingRightFlexBtnAtn}
              //   loaderClassName={rightFlexBtnLoaderClassName}
            >
              {rightFlexButtonLeftIcon} {rightFlexButtonTitle}
            </Button>
          </div>
        )}

        {customHomeNav && (
          <Button variant="ghost" className="mt-5 w-full">
            {customHomeNav}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PopUpUtility;
