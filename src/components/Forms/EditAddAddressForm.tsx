"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { ErrorIcon, Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";
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

const EditAddAddressSchema = z.object({
  fullName: z.string().nonempty({ message: "This field is required" }),
  phoneNumber: phoneSchema,
  state: z.string().nonempty({ message: "This field is required" }),
  city: z.string().nonempty({ message: "This field is required" }),
  fullAddress: z.string().nonempty({ message: "This field is required" }),
  houseNumber: z.string().optional(),
  area: z.string().nonempty({ message: "This field is required" }),
  addtionalInfo: z.string().optional(),
});

export type TypeEditAddAddressFormData = z.infer<typeof EditAddAddressSchema>;

interface EditAddAddressFormProps {
  initialData: {
    fullName: string;
    phoneNumber: string;
    state: string;
    city: string;
    fullAddress: string;
    houseNumber?: string;
    area: string;
    addtionalInfo?: string;
  };
  onSubmit: (data: TypeEditAddAddressFormData) => void;
}

const EditAddAddressForm = ({
  initialData,
  onSubmit,
}: EditAddAddressFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TypeEditAddAddressFormData>({
    resolver: zodResolver(EditAddAddressSchema),
    defaultValues: {
      fullName: initialData.fullName,
      phoneNumber: initialData.phoneNumber,
      state: initialData.state.toLowerCase(),
      city: initialData.city.toLowerCase(),
      fullAddress: initialData.fullAddress,
      houseNumber: initialData.houseNumber,
      area: initialData.area,
      addtionalInfo: initialData.addtionalInfo,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit, formState, reset } = form;

  useEffect(() => {
    reset({
      fullName: initialData.fullName,
      phoneNumber: initialData.phoneNumber,
      state: initialData.state.toLowerCase(),
      city: initialData.city.toLowerCase(),
      fullAddress: initialData.fullAddress,
      houseNumber: initialData.houseNumber,
      area: initialData.area,
      addtionalInfo: initialData.addtionalInfo,
    });
  }, [initialData, reset]);

  const handleFormSubmit = async (data: TypeEditAddAddressFormData) => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      onSubmit(data);
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-8 lg:gap-10 px-1"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="flex flex-col gap-5 text-[#525252] font-geologica md:h-[60vh] lg:h-[55vh] overflow-y-auto hide-scrollbar">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
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

            <FormField
              control={form.control}
              name="fullAddress"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                    Full Address
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
                    placeholder="Enter your full address"
                    type="text"
                    className="bg-[#ECECEC] h-[45px]"
                    inputClassName="text-[#000000B2] bg-[#ECECEC] "
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="houseNumber"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                    House Number (optional)
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
                    placeholder="Enter your house number"
                    type="text"
                    className="bg-[#ECECEC] h-[45px]"
                    inputClassName="text-[#000000B2] bg-[#ECECEC] "
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                    Area
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
                    placeholder="Enter your area"
                    type="text"
                    className="bg-[#ECECEC] h-[45px]"
                    inputClassName="text-[#000000B2] bg-[#ECECEC] "
                  />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="addtionalInfo"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                    Additional Information i.e Landmark (optional)
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
                    placeholder="Enter your additional information"
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
            {isSubmitting ? <Spinner className="h-5 w-5" /> : "Save Address"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditAddAddressForm;
