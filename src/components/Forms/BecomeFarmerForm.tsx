"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { ErrorIcon, Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { CloseIcon } from "@/Icons";
import { capitalizeFirstLetter } from "@/utils/formatText";

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

const FarmerCreateAccountSchema = z.object({
  farmName: z.string().nonempty({ message: "Farm name is required" }),
  farmAddress: z.string().nonempty({ message: "Farm address is required" }),
  farmLongitude: z
    .string()
    .nonempty({ message: "Longitude is required" })
    .refine(
      (val) =>
        !isNaN(parseFloat(val)) &&
        parseFloat(val) >= -180 &&
        parseFloat(val) <= 180,
      {
        message: "Enter a valid longitude between -180 and 180",
      },
    ),
  farmLatitude: z
    .string()
    .nonempty({ message: "Latitude is required" })
    .refine(
      (val) =>
        !isNaN(parseFloat(val)) &&
        parseFloat(val) >= -90 &&
        parseFloat(val) <= 90,
      {
        message: "Enter a valid latitude between -90 and 90",
      },
    ),
  farmEmail: z
    .string()
    .trim()
    .nonempty({ message: "Farm email address is required" })
    .email({ message: "Enter a valid email address (e.g. name@email.com)" }),
  FarmPhoneNumber: phoneSchema,
  farmProducts: z
    .array(z.string())
    .min(1, { message: "Please add at least one product your farm produces" }),
});

type TypeFarmerCreateAccountSchema = z.infer<typeof FarmerCreateAccountSchema>;

interface FarmerCreateAccountFormProps {
  onSubmit: (data: { email: string }) => void;
}

const FarmerCreateAccountForm = ({
  onSubmit,
}: FarmerCreateAccountFormProps) => {
  const form = useForm<TypeFarmerCreateAccountSchema>({
    resolver: zodResolver(FarmerCreateAccountSchema),
    defaultValues: {
      farmName: "",
      farmAddress: "",
      farmLongitude: "",
      farmLatitude: "",
      farmProducts: [],
      farmEmail: "",
      FarmPhoneNumber: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const handleFormSubmit = async (data: TypeFarmerCreateAccountSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    onSubmit({
      email: data.farmEmail,
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
                name="farmName"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Farm Name
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
                      placeholder="Enter your farm name"
                      type="text"
                      className="bg-[#ECECEC] h-[45px]"
                      inputClassName="text-[#000000B2] bg-[#ECECEC] "
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="farmAddress"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Farm Address
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
                      placeholder="Enter your farm address"
                      type="text"
                      className="bg-[#ECECEC] h-[45px]"
                      inputClassName="text-[#000000B2] bg-[#ECECEC] "
                    />
                  </div>
                )}
              />

              <div className="grid ml:grid-cols-2 gap-4 ml:gap-8">
                <FormField
                  control={form.control}
                  name="farmLongitude"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                        Farm Longitude
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
                        placeholder="Enter your farm location"
                        type="text"
                        className="bg-[#ECECEC] h-[45px]"
                        inputClassName="text-[#000000B2] bg-[#ECECEC] "
                      />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="farmLatitude"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                        Farm Latitude
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
                        placeholder="Enter your farm location"
                        type="text"
                        className="bg-[#ECECEC] h-[45px]"
                        inputClassName="text-[#000000B2] bg-[#ECECEC] "
                      />
                    </div>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="farmEmail"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Farm Email
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
                      placeholder="Enter your farm email"
                      type="email"
                      className="bg-[#ECECEC] h-[45px]"
                      inputClassName="text-[#000000B2] bg-[#ECECEC] "
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="FarmPhoneNumber"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Farm Phone Number:
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
                      placeholder="Enter your farm phone number"
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
                name="farmProducts"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Farm Products
                    </FormLabel>
                    <FarmProductsInput
                      value={field.value ?? []}
                      onChange={field.onChange}
                      hasError={fieldState.invalid}
                      subtext={
                        fieldState.error ? (
                          <span className="flex items-center gap-1 pt-1 text-red-500 text-xs">
                            <ErrorIcon />
                            {fieldState.error.message}
                          </span>
                        ) : null
                      }
                      placeholder="e.g. Yam, Rice, Beans..."
                    />
                  </div>
                )}
              />

              <div className="flex flex-col gap-1">
                <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                  Profile Picture
                </FormLabel>
                <div></div>
              </div>
            </div>

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
                "Become a Farmer"
              )}
            </Button>
          </form>
        </Form>
      </>
    </div>
  );
};

export default FarmerCreateAccountForm;

// ============================================
// FARM PRODUCTS INPUT
// ============================================

interface FarmProductsInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  hasError?: boolean;
  subtext?: React.ReactNode;
  placeholder?: string;
}

export function FarmProductsInput({
  value,
  onChange,
  hasError,
  subtext,
  placeholder = "e.g. Yam, Rice, Beans...",
}: FarmProductsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const trimmed = capitalizeFirstLetter(inputValue.trim());
    if (!trimmed) return;
    if (value.includes(trimmed)) return; // prevent duplicates
    onChange([...value, trimmed]);
    setInputValue("");
  };

  const handleRemove = (product: string) => {
    onChange(value.filter((v) => v !== product));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Added products display */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((product) => (
            <span
              key={product}
              className="flex items-center gap-1 bg-[#F5F5F5] border border-[#0000001A] text-[#000000CC] px-3 py-1 rounded-full text-[clamp(12px,1.2vw,14px)] font-geologica"
            >
              {product}
              <button
                type="button"
                onClick={() => handleRemove(product)}
                className="ml-1 hover:text-red-500 transition-colors"
              >
                <CloseIcon className="w-[10px] h-[10px] lg:w-3 ml:h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input + Add button */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`flex-1 h-[45px] px-4 rounded-lg bg-[#ECECEC] text-[#000000B2] font-geologica text-[clamp(13px,1.3vw,15px)] outline-none border ${
            hasError ? "border-red-500" : "border-[#0000001A]"
          } focus:border-[#8FE6A2] transition-colors`}
        />
        <Button
          type="button"
          variant="default"
          size="sm"
          className="h-[45px] px-5"
          onClick={handleAdd}
          disabled={!inputValue.trim()}
        >
          Add
        </Button>
      </div>

      {subtext && <div>{subtext}</div>}
    </div>
  );
}
