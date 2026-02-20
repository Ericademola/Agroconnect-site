"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { ErrorIcon, Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";
import { InfoIcon, MegaPhoneIcon } from "@/Icons";
import { FormSelect } from "../ui/formSelect";
import PopNotification from "../PopNotification/PopNotification";
import Image from "next/image";
import { useState } from "react";

const BankFormSchema = z.object({
  bvn: z.string().regex(/^\d{11}$/, {
    message: "BVN must be exactly 11 digits",
  }),
  bankName: z.string().nonempty({ message: "This field is required" }),
  accountNumber: z.string().regex(/^\d{10}$/, {
    message: "Account number must be exactly 10 digits",
  }),
});

export type TypeBankFormSchema = z.infer<typeof BankFormSchema>;

interface BankFormProps {
  onCancel: () => void;
  onSubmit: (data: TypeBankFormSchema) => void;
}

const BankForm = ({ onCancel, onSubmit }: BankFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TypeBankFormSchema>({
    resolver: zodResolver(BankFormSchema),
    defaultValues: {
      bvn: "",
      bankName: "",
      accountNumber: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit, formState } = form;

  const handleFormSubmit = async (data: TypeBankFormSchema) => {
    setIsSubmitting(true);

    try {
      // Simulate bank verification API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSubmit(data);
    } catch (error) {
      console.error("Failed to verify bank details", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="flex flex-col gap-6 border-b border-[#0000001A] py-6">
            <div className="bg-[#03601A14] border border-[#03601A] rounded-[10px] p-3 flex items-center gap-4">
              <Image
                src={"/assets/avatars/bankSecured.svg"}
                alt={"Bank Secured"}
                width={50}
                height={50}
                className="object-contain w-[35px] h-[35px]"
              />
              <div className="flex flex-col gap-1 font-raleway ">
                <p className="font-medium text-[clamp(14px,1.6vw,18px)] text-black">
                  Your data is secure
                </p>
                <p className="text-[clamp(12px,1.4vw,15px)] text-[#000000CC]">
                  We use bank-level encryption to protect your information
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="font-geologica">
                <FormField
                  control={form.control}
                  name="bvn"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <FormLabel className="text-[clamp(14px,1.5vw,16px)] text-[#525252]">
                        Bank Verification Number (BVN){" "}
                        <span className="text-[#E63946] text-xs">*</span>
                      </FormLabel>
                      <Input
                        hasError={fieldState.invalid}
                        subtext={
                          fieldState.error ? (
                            <span className="flex items-center gap-1 pt-1 text-red-500 text-xs">
                              <ErrorIcon />
                              {fieldState.error.message}
                            </span>
                          ) : null
                        }
                        {...field}
                        placeholder="Enter your BVN"
                        type="text"
                        maxLength={11}
                        className="bg-[#ECECEC] h-[45px]"
                        inputClassName="text-[#000000B2] bg-[#ECECEC] "
                      />
                    </div>
                  )}
                />
                <p className="text-[#525252B2] text-[clamp(10px,1.2vw,14px)] mt-1">
                  11-digit BVN number
                </p>
              </div>
              <div className="bg-[#F5F5F5] border border-[#333333] rounded-[10px] p-3 flex items-center gap-4">
                <InfoIcon className="w-8 h-8" />
                <div className="flex flex-col gap-1 font-raleway ">
                  <p className="font-medium text-[clamp(14px,1.6vw,18px)] text-black">
                    Why we need your BVN
                  </p>
                  <p className="text-[clamp(12px,1.4vw,15px)] text-[#000000CC]">
                    Your BVN helps us verify your identity and link your bank
                    accounts for automatic loan repayment
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-[#525252] font-geologica">
            <h3 className="text-[#000000CC] text-[clamp(12px,1.4vw,16px)]">
              Bank Account Details
            </h3>
            <div className="flex flex-col gap-5 bg-[#F5F5F5] border border-[#0000001A] rounded-2xl px-6 py-4">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Select Your Bank{" "}
                      <span className="text-[#E63946] text-xs">*</span>
                    </FormLabel>
                    <FormSelect
                      hasError={fieldState.invalid}
                      subtext={
                        fieldState.error ? (
                          <span className="flex items-center gap-1 pt-1 text-red-500 ">
                            <ErrorIcon />
                            {fieldState.error.message}
                          </span>
                        ) : null
                      }
                      value={field.value}
                      onChange={field.onChange}
                      options={[
                        { label: "First Bank", value: "First Bank" },
                        {
                          label: "United Bank for Africa (UBA)",
                          value: "United Bank for Africa (UBA)",
                        },
                        { label: "Zenith Bank", value: "Zenith Bank" },
                        { label: "Sterling Bank", value: "Sterling Bank" },
                        { label: "Fidelity Bank", value: "Fidelity Bank" },
                        { label: "Access Bank", value: "Access Bank" },
                        { label: "GT Bank", value: "GT Bank" },
                        { label: "Ecobank", value: "Ecobank" },
                        { label: "Keystone Bank", value: "Keystone Bank" },
                        { label: "Wema Bank", value: "Wema Bank" },
                        { label: "Union Bank", value: "Union Bank" },
                        {
                          label: "Stanbic IBTC Bank",
                          value: "Stanbic IBTC Bank",
                        },
                      ]}
                      placeholder="Select your bank"
                      bgclassName="bg-[#ECECEC] h-[45px]"
                    />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Account Number{" "}
                      <span className="text-[#E63946] text-xs">*</span>
                    </FormLabel>
                    <Input
                      hasError={fieldState.invalid}
                      subtext={
                        fieldState.error ? (
                          <span className="flex items-center gap-1 pt-1 text-red-500 text-xs">
                            <ErrorIcon />
                            {fieldState.error.message}
                          </span>
                        ) : null
                      }
                      {...field}
                      placeholder="Enter your 10-digit account number"
                      type="text"
                      maxLength={10}
                      className="bg-[#ECECEC] h-[45px]"
                      inputClassName="text-[#000000B2] bg-[#ECECEC] "
                    />
                  </div>
                )}
              />
            </div>
          </div>

          <PopNotification
            icon={<MegaPhoneIcon className="w-5 h-5" />}
            textClassName="text-[clamp(10px,1.2vw,14px)]"
            textContent={
              <p>
                Loan repayments will be automatically deducted from this account
                based on your selected schedule.
              </p>
            }
          />
          <div className="flex items-center gap-4 w-full">
            <Button
              variant="secondary"
              className="text-[clamp(13px,1.3vw,15px)] font-regular"
              onClick={onCancel}
              type="button"
              size="lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full"
              disabled={isSubmitting || !formState.isValid}
            >
              {isSubmitting ? (
                <Spinner className="h-5 w-5" />
              ) : (
                "Verify Account"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BankForm;
