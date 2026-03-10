"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { ErrorIcon, Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";
import { GoogleIcon } from "@/Icons";
import { FormSelect } from "../ui/formSelect";

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

const CreateAccounSchema = z
  .object({
    firstName: z.string().nonempty({ message: "First name is required" }),
    lastName: z.string().nonempty({ message: "Last name is required" }),
    email: z
      .string()
      .trim()
      .nonempty({ message: "Email address is required" })
      .email({ message: "Enter a valid email address (e.g. name@email.com)" }),
    phoneNumber: phoneSchema,
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .refine((val) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(val), {
        message:
          "Password must be at least 8 characters, include 1 uppercase letter and 1 number",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Please confirm your password" }),
    address: z.string().nonempty({ message: "Home address is required" }),
    state: z.string().nonempty({ message: "Please select your state" }),
    city: z.string().nonempty({ message: "Please select your city" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match. Please try again",
  });

type TypeCreateAccounSchema = z.infer<typeof CreateAccounSchema>;

interface CreateAccounFormProps {
  onSubmit: (data: { email: string }) => void;
}

const CreateAccounForm = ({ onSubmit }: CreateAccounFormProps) => {
  const form = useForm<TypeCreateAccounSchema>({
    resolver: zodResolver(CreateAccounSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      address: "",
      state: "",
      city: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const handleFormSubmit = async (data: TypeCreateAccounSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    onSubmit({
      email: data.email,
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
                      maxLength={11}
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
              <div className="grid ml:grid-cols-2 gap-4 ml:gap-6">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                        State
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
                        placeholder="Select your state"
                        bgclassName="bg-[#ECECEC] h-[45px]"
                      />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                        City
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
                          { label: "Umuahia", value: "umuahia" },
                          { label: "Yola", value: "yola" },
                          { label: "Uyo", value: "uyo" },
                          { label: "Awka", value: "awka" },
                          { label: "Bauchi", value: "bauchi" },
                          { label: "Yenagoa", value: "yenagoa" },
                          { label: "Makurdi", value: "makurdi" },
                          { label: "Maiduguri", value: "maiduguri" },
                          { label: "Calabar", value: "calabar" },
                          { label: "Asaba", value: "asaba" },
                          { label: "Abakaliki", value: "abakaliki" },
                          { label: "Benin City", value: "benin-city" },
                          { label: "Ado Ekiti", value: "ado-ekiti" },
                          { label: "Enugu", value: "enugu" },
                          { label: "Gombe", value: "gombe" },
                          { label: "Owerri", value: "owerri" },
                          { label: "Dutse", value: "dutse" },
                          { label: "Kaduna", value: "kaduna" },
                          { label: "Kano", value: "kano" },
                          { label: "Katsina", value: "katsina" },
                          { label: "Birnin Kebbi", value: "birnin-kebbi" },
                          { label: "Lokoja", value: "lokoja" },
                          { label: "Ilorin", value: "ilorin" },
                          { label: "Lafia", value: "lafia" },
                          { label: "Ikeja", value: "ikeja" },
                          { label: "Minna", value: "minna" },
                          { label: "Abeokuta", value: "abeokuta" },
                          { label: "Akure", value: "akure" },
                          { label: "Osogbo", value: "osogbo" },
                          { label: "Ibadan", value: "ibadan" },
                          { label: "Jalingo", value: "jalingo" },
                          { label: "Damaturu", value: "damaturu" },
                          { label: "Gusau", value: "gusau" },
                          { label: "Abuja", value: "abuja" },
                        ]}
                        placeholder="Select your city"
                        bgclassName="bg-[#ECECEC] h-[45px]"
                      />
                    </div>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Address
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
                      placeholder="Enter your address"
                      type="text"
                      className="bg-[#ECECEC] h-[45px]"
                      inputClassName="text-[#000000B2] bg-[#ECECEC] "
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
                className="w-full"
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

export default CreateAccounForm;
