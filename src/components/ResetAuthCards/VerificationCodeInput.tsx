"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VerificationCodeInputProps {
  onVerify: (code: string) => void;
  email?: string;
  loading?: boolean;
}

const VerificationCodeInput = ({
  onVerify,
  loading,
}: VerificationCodeInputProps) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
      setIsExpired(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split("");
    setCode([...newCode, ...Array(6 - newCode.length).fill("")]);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleVerify = () => {
    const fullCode = code.join("");

    if (fullCode.length !== 6) return;

    if (isExpired) {
      setErrorMsg(
        "This verification code has expired. Please request a new one.",
      );
      return;
    }

    setErrorMsg("");
    onVerify(fullCode);
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setIsExpired(false);
    setErrorMsg("");
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    console.log("Resending code...");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-10">
      {/* Code Inputs */}
      <div className="flex gap-2 items-center justify-between w-full px-5">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              "w-10 h-12 md:w-12 md:h-14 text-center text-xl md:text-2xl font-semibold rounded-lg border-1 transition-all bg-[#ECECEC]",
              "focus:outline-none focus:ring-2 focus:ring-[#C09706] focus:border-[#C09706]",
              digit ? "border-[#C09706]" : "border-[#F5F5F5]",
            )}
            autoFocus={index === 0}
          />
        ))}
      </div>

      {/* Buttons & Messages */}
      <div className="flex flex-col items-center gap-3 w-full">
        {errorMsg && (
          <p className="text-sm text-red-500 text-center">{errorMsg}</p>
        )}

        <Button
          variant="default"
          size="lg"
          className="w-full"
          onClick={handleVerify}
          disabled={code.join("").length !== 6}
          loading={loading}
        >
          Verify
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-fit h-fit p-0 hover:bg-transparent text-[#C09706] disabled:opacity-50"
          onClick={handleResend}
          disabled={!canResend}
        >
          Resend Code{" "}
          <span className="text-[#00000099] ml-1">
            {!canResend && `(${formatTime(timer)})`}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default VerificationCodeInput;
