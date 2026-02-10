"use client";
import { CopyIcon } from "@/Icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

interface PaymentCardProps {
  amount?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  onCancel: () => void;
  handlePaymentConfirm: () => void;
  savingsNotification?: React.ReactNode;
}

const PaymentCard = ({
  amount,
  bankName,
  accountNumber,
  accountName,
  onCancel,
  handlePaymentConfirm,
  savingsNotification,
}: PaymentCardProps) => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber?.toString() ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const onConfirmClick = () => {
    setLoading(true);
    handlePaymentConfirm();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-geologica text-[clamp(14px,1.8vw,16px)] text-[#525252] mb-[10px]">
          {`Amount You're Sending`}
          <i className="text-[clamp(10px,1.3vw,12.5px)] font-light">
            (Enter the exact amount so we can track it faster.)
          </i>
        </p>
        <Input
          readOnly
          value={amount}
          className="bg-[#ECECEC] h-[35px] border-[#F5F5F5] has-[:focus]:ring-0"
        />
      </div>
      <div className="bg-[#F5F5F5] border border-[#3333331A] rounded-[10px] py-4 px-6 flex flex-col gap-3 text-[clamp(12px,1.2vw,14px)] font-raleway">
        <p>
          Bank Name: <span className="font-semibold">{bankName}</span>
        </p>
        <div className="flex items-center gap-4">
          <p>
            Account Number:{" "}
            <span className="font-semibold"> {accountNumber}</span>
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="w-fit h-fit p-0 hover:bg-transparent"
            onClick={handleCopy}
          >
            <CopyIcon className="w-5 h-5" />
            {copied && (
              <span className="ml-1 text-[10px] font-poppins font-extralight">
                Copied
              </span>
            )}
          </Button>
        </div>

        <p>
          Account Name: <span className="font-semibold">{accountName}</span>
        </p>
      </div>
      <div>{savingsNotification}</div>
      <div className="grid grid-cols-[1fr_2fr] gap-3 mt-12">
        <Button variant="secondary" size="lg" onClick={onCancel} className="">
          Cancel
        </Button>
        <Button
          variant="default"
          size="lg"
          onClick={onConfirmClick}
          className="flex-1"
          loading={loading}
          disabled={loading}
        >
          {loading ? "Processing..." : "I've Sent the Money"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentCard;
