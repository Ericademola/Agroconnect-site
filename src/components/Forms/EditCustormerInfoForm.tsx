"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { ErrorIcon, Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";
import { IuserData } from "@/types";

// FOR PHONE NUMBER
const phoneSchema = z.string().refine(
  (value) => {
    const local = /^0\d{10}$/; // 11-digit Nigerian local number
    const intl = /^\+[1-9]\d{7,14}$/; // international number
    return local.test(value) || intl.test(value);
  },
  {
    message: "Enter a valid phone number",
  },
);

const EditCustormerInfoSchema = z.object({
  fullName: z.string().nonempty({ message: "Full name is required" }),
  email: z.string().trim().email({ message: "Please enter a valid email" }),
  phoneNumber: phoneSchema,
});

type TypeEditCustormerInfoFormData = z.infer<typeof EditCustormerInfoSchema>;

interface EditCustomerInfoFormProps {
  initialData?: IuserData;
  onSubmit: (data: TypeEditCustormerInfoFormData) => void;
}

const EditCustormerInfoForm = ({
  initialData,
  onSubmit,
}: EditCustomerInfoFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TypeEditCustormerInfoFormData>({
    resolver: zodResolver(EditCustormerInfoSchema),
    defaultValues: {
      fullName: initialData?.userFullName,
      email: initialData?.email,
      phoneNumber: initialData?.phoneNumber,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit, formState, reset } = form;

  useEffect(() => {
    reset({
      fullName: initialData?.userFullName,
      email: initialData?.email,
      phoneNumber: initialData?.phoneNumber,
    });
  }, [initialData, reset]);

  const handleFormSubmit = async (data: TypeEditCustormerInfoFormData) => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      onSubmit(data);
    } catch (error) {
      console.error("Failed to edit customer info:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-14 px-1"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="flex flex-col gap-4 text-[#525252] font-geologica">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2">
                  <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                    Full Name
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
                    placeholder="Enter your name"
                    type="text"
                    className="bg-[#ECECEC] h-[45px]"
                    inputClassName="text-[#000000B2] bg-[#ECECEC] "
                  />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2">
                  <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                    Email Address
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
                    placeholder="Enter your email"
                    type="email"
                    className="bg-[#ECECEC] h-[45px]"
                    inputClassName="text-[#000000B2] bg-[#ECECEC] "
                  />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2">
                  <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                    Phone Number:
                  </FormLabel>
                  <Input
                    hasError={fieldState.invalid}
                    subtext={
                      fieldState.error ? (
                        <span className="flex items-center gap-1 pt-1 text-red-500 border-[#D5D5D5] ">
                          <ErrorIcon />
                          {fieldState.error.message}
                        </span>
                      ) : null
                    }
                    {...field}
                    placeholder="Enter your phone number"
                    type="text"
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
            {isSubmitting ? (
              <Spinner className="h-5 w-5" />
            ) : (
              "Update Information"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditCustormerInfoForm;
