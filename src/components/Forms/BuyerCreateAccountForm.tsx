"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { ErrorIcon, Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";
import { FormSelect } from "../ui/formSelect";
import { GoogleIcon } from "@/Icons";
// import { useEffect } from "react";

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

const BuyerCreateAccountSchema = z
  .object({
    firstName: z.string().nonempty({ message: "This field is required" }),
    lastName: z.string().nonempty({ message: "This field is required" }),
    email: z.string().trim().email({ message: "Please enter a valid email" }),
    phoneNumber: phoneSchema,
    password: z
      .string()
      .refine((val) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(val), {
        message: "Min. 8 characters, 1 uppercase, 1 number",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Please confirm password" }),
    location: z.string().nonempty({ message: "This field is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

type TypeBuyerCreateAccountSchema = z.infer<typeof BuyerCreateAccountSchema>;

interface BuyerCreateAccountFormProps {
  onSubmit: (data: { email: string; phoneNumber: string }) => void;
}

const BuyerCreateAccountForm = ({ onSubmit }: BuyerCreateAccountFormProps) => {
  const form = useForm<TypeBuyerCreateAccountSchema>({
    resolver: zodResolver(BuyerCreateAccountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      location: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const handleFormSubmit = async (data: TypeBuyerCreateAccountSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    onSubmit({
      email: data.email,
      phoneNumber: data.phoneNumber,
    });
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
                name="firstName"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      First Name
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
                      placeholder="Enter your first name"
                      type="text"
                      className="bg-[#ECECEC] h-[45px]"
                      inputClassName="text-[#000000B2] bg-[#ECECEC] "
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Last Name
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
                      placeholder="Enter your last name"
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
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Password
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
                      placeholder="Enter A password"
                      type="password"
                      className="bg-[#ECECEC] h-[45px]"
                      inputClassName="text-[#000000B2] bg-[#ECECEC] "
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Confirm Password
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
                      placeholder="Confirm your password"
                      type="password"
                      className="bg-[#ECECEC] h-[45px]"
                      inputClassName="text-[#000000B2] bg-[#ECECEC] "
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Location
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
                        { label: "Abia", value: "abia" },
                        { label: "Adamawa", value: "adamawa" },
                        { label: "Akwa Ibom", value: "akwaibom" },
                        { label: "Anambra", value: "anambra" },
                        { label: "Bauchi", value: "bauchi" },
                        { label: "Bayelsa", value: "bayelsa" },
                        { label: "Benue", value: "benue" },
                        { label: "Borno", value: "borno" },
                        { label: "Cross River", value: "crossriver" },
                        { label: "Delta", value: "delta" },
                        { label: "Ebonyi", value: "ebonyi" },
                        { label: "Edo", value: "edo" },
                        { label: "Ekiti", value: "ekiti" },
                        { label: "Enugu", value: "enugu" },
                        { label: "Gombe", value: "gombe" },
                        { label: "Imo", value: "imo" },
                        { label: "Jigawa", value: "jigawa" },
                        { label: "Kaduna", value: "kaduna" },
                        { label: "Kano", value: "kano" },
                        { label: "Katsina", value: "katsina" },
                        { label: "Kebbi", value: "kebbi" },
                        { label: "Kogi", value: "kogi" },
                        { label: "Kwara", value: "kwara" },
                        { label: "Lagos", value: "lagos" },
                        { label: "Nasarawa", value: "nasarawa" },
                        { label: "Niger", value: "niger" },
                        { label: "Ogun", value: "ogun" },
                        { label: "Ondo", value: "ondo" },
                        { label: "Osun", value: "osun" },
                        { label: "Oyo", value: "oyo" },
                        { label: "Plateau", value: "plateau" },
                        { label: "Rivers", value: "rivers" },
                        { label: "Sokoto", value: "sokoto" },
                        { label: "Taraba", value: "taraba" },
                        { label: "Yobe", value: "yobe" },
                        { label: "Zamfara", value: "zamfara" },
                        { label: "Federal Capital Territory", value: "fct" },
                      ]}
                      placeholder="Select your location"
                      bgclassName="bg-[#ECECEC] h-[45px]"
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-ful"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <Spinner className="h-5 w-5" />
                ) : (
                  "Create an Account"
                )}
              </Button>
              <div className="flex items-center gap-2 font-geologica ">
                <span className="bg-[#EFEDED] flex-1 h-[2px]"></span>
                <p className="text-[#BBBBBB] text-[clamp(12px,1.3vw,14px)] font-bold">
                  OR
                </p>
                <span className="bg-[#EFEDED] flex-1 h-[2px]"></span>
              </div>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 text-black"
              >
                <GoogleIcon className="w-4 h-4" />
                Continue with Google
              </Button>
            </div>
          </form>
        </Form>
      </>
    </div>
  );
};

export default BuyerCreateAccountForm;
