"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { ErrorIcon, Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";
import { FormSelect } from "../ui/formSelect";
import { useEffect, useState } from "react";

const BankFormSchema = z.object({
  bvn: z.string().regex(/^\d{11}$/, {
    message: "BVN must be exactly 11 digits",
  }),
  bankName: z.string().nonempty({ message: "Bank name is required" }),
  accountName: z.string().nonempty({ message: "Account name is required" }),
  accountNumber: z.string().regex(/^\d{10}$/, {
    message: "Account number must be exactly 10 digits",
  }),
});

export type TypeBankFormSchema = z.infer<typeof BankFormSchema>;

interface BankFormProps {
  initialData: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    bvn: string;
  };
  onSubmit: (data: TypeBankFormSchema) => void;
}

const BankForm = ({ initialData, onSubmit }: BankFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TypeBankFormSchema>({
    resolver: zodResolver(BankFormSchema),
    defaultValues: {
      bvn: initialData.bvn,
      bankName: initialData.bankName,
      accountName: initialData.accountName,
      accountNumber: initialData.accountNumber,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit, formState, reset } = form;

  useEffect(() => {
    reset({
      bvn: initialData.bvn,
      bankName: initialData.bankName,
      accountName: initialData.accountName,
      accountNumber: initialData.accountNumber,
    });
  }, [initialData, reset]);

  const handleFormSubmit = async (data: TypeBankFormSchema) => {
    setIsSubmitting(true);

    try {
      // Simulate bank verification API call
      await new Promise((resolve) => setTimeout(resolve, 800));
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
          <div className="flex flex-col gap-6">
            <div>
              <FormField
                control={form.control}
                name="bvn"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(14px,1.5vw,16px)] text-[#525252]">
                      Bank Verification Number (BVN)
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
                      onKeyDown={(e) => {
                        if (
                          !/[\d]/.test(e.key) &&
                          ![
                            "Backspace",
                            "Delete",
                            "Tab",
                            "ArrowLeft",
                            "ArrowRight",
                          ].includes(e.key)
                        ) {
                          e.preventDefault();
                        }
                      }}
                      className="bg-[#ECECEC] h-[45px]"
                      inputClassName="text-[#000000B2] bg-[#ECECEC] "
                    />
                  </div>
                )}
              />
              <p className="text-[#525252B2] text-[clamp(10px,1.2vw,14px)] mt-1 font-geologica">
                11-digit BVN number
              </p>
            </div>
            <FormField
              control={form.control}
              name="bankName"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                    Select Your Bank
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
              name="accountName"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                    Account Name
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
                    placeholder="Enter your account name"
                    type="text"
                    className="bg-[#ECECEC] h-[45px]"
                    inputClassName="text-[#000000B2] bg-[#ECECEC] "
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
                    Account Number
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
                    onKeyDown={(e) => {
                      if (
                        !/[\d]/.test(e.key) &&
                        ![
                          "Backspace",
                          "Delete",
                          "Tab",
                          "ArrowLeft",
                          "ArrowRight",
                        ].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    className="bg-[#ECECEC] h-[45px]"
                    inputClassName="text-[#000000B2] bg-[#ECECEC] "
                  />
                </div>
              )}
            />
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full"
            disabled={isSubmitting || !formState.isValid}
          >
            {isSubmitting ? <Spinner className="h-5 w-5" /> : "Add Account"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BankForm;
