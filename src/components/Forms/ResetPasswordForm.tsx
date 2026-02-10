"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { ErrorIcon, Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";

const ResetPasswordViaEmailFormSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email" }),
});

type TypeResetPasswordViaEmailFormSchema = z.infer<
  typeof ResetPasswordViaEmailFormSchema
>;

interface ResetPasswordViaEmailFormProps {
  onPhoneNumberReset?: () => void;
  onSubmit?: (data: TypeResetPasswordViaEmailFormSchema) => void;
}

const ResetPasswordViaEmailForm = ({
  onPhoneNumberReset,
  onSubmit,
}: ResetPasswordViaEmailFormProps) => {
  const form = useForm<TypeResetPasswordViaEmailFormSchema>({
    resolver: zodResolver(ResetPasswordViaEmailFormSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const handleFormSubmit = async (
    data: TypeResetPasswordViaEmailFormSchema,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (onSubmit) {
      onSubmit(data);
    }
    form.reset();
  };

  return (
    <div>
      <>
        <Form {...form}>
          <form
            className="flex flex-col gap-8 px-1"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="flex flex-col gap-4 text-[#525252] font-geologica">
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Email
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
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <Spinner className="h-5 w-5" />
                ) : (
                  "Send Reset Link"
                )}
              </Button>
              <Button
                variant="link"
                className="text-[#C09706] text-[clamp(14px,1.4vw,16px)] font-regular"
                onClick={onPhoneNumberReset}
                type="button"
              >
                Reset via Phone Number instead
              </Button>
            </div>
          </form>
        </Form>
      </>
    </div>
  );
};

export default ResetPasswordViaEmailForm;

// ---- RESET PASSWORD VIA PHONE NUMBER ---- //

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

const ResetPasswordViaPhoneNumberFormSchema = z.object({
  phoneNumber: phoneSchema,
});

type TypeResetPasswordViaPhoneNumberFormSchema = z.infer<
  typeof ResetPasswordViaPhoneNumberFormSchema
>;

interface ResetPasswordViaPhoneNumberFormProps {
  onEmailReset?: () => void;
  onSubmit?: (data: TypeResetPasswordViaPhoneNumberFormSchema) => void;
}

export const ResetPasswordViaPhoneNumberForm = ({
  onEmailReset,
  onSubmit,
}: ResetPasswordViaPhoneNumberFormProps) => {
  const form = useForm<TypeResetPasswordViaPhoneNumberFormSchema>({
    resolver: zodResolver(ResetPasswordViaPhoneNumberFormSchema),
    defaultValues: {
      phoneNumber: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const handleFormSubmit = async (
    data: TypeResetPasswordViaPhoneNumberFormSchema,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (onSubmit) {
      onSubmit(data);
    }
    form.reset();
  };

  return (
    <div>
      <>
        <Form {...form}>
          <form
            className="flex flex-col gap-8 px-1"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="flex flex-col gap-4 text-[#525252] font-geologica">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
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
            <div className="flex flex-col gap-2 w-full">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <Spinner className="h-5 w-5" />
                ) : (
                  "Send Verification Code"
                )}
              </Button>
              <Button
                variant="link"
                className="text-[#C09706] text-[clamp(14px,1.4vw,16px)] font-regular"
                onClick={onEmailReset}
                type="button"
              >
                Reset via Email address instead
              </Button>
            </div>
          </form>
        </Form>
      </>
    </div>
  );
};
