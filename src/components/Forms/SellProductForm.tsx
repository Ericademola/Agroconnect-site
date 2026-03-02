"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { ErrorIcon, Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { CloseIcon, LogoutIcon } from "@/Icons";
// import { capitalizeFirstLetter } from "@/utils/formatText";
import Image from "next/image";
import DecrementAndIncrementButton from "../CatalogueButtons/CartButton/DecrementAndIncrementButton";
import { FormSelect } from "../ui/formSelect";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { DatePickerForm } from "../ui/datePickerForm";

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

const SellProductFormSchema = z.object({
  quantityAvailable: z.number().min(1, { message: "Please select a rating" }),
  pricePerUnit: z.string().nonempty({ message: "Selling price is required" }),
  cropVariety: z.string().nonempty({ message: "Crop variety is required" }),
  harvestPeriod: z.date({ message: "Date of harvest is required" }),
  packageMethod: z.string().nonempty({ message: "Package method is required" }),
  deliveryDate: z.date({ message: "Delivery date is required" }),
  description: z.string().optional(),
  emergancyContact: phoneSchema,
  deliveryMethod: z
    .string()
    .nonempty({ message: "Delivery method is required" }),
  productImagesVideos: z
    .any()
    .refine((file) => file instanceof File, { message: "Please upload a file" })
    .refine(
      (file) => !(file instanceof File) || file.size <= 10 * 1024 * 1024,
      {
        message: "File size must be under 10MB",
      },
    ),
});

export type TypeSellProductFormSchema = z.infer<typeof SellProductFormSchema>;

interface SellProductFormProps {
  onSubmit: (data: TypeSellProductFormSchema & { totalValue: string }) => void;
  unit: string;
  platformPrice: number;
  onCancel: () => void;
}

const SellProductFormForm = ({
  onSubmit,
  unit,
  onCancel,
  platformPrice,
}: SellProductFormProps) => {
  const [quantity, setQuantity] = useState(1);
  const [attachment, setAttachment] = useState("");

  const form = useForm<TypeSellProductFormSchema>({
    resolver: zodResolver(SellProductFormSchema),
    defaultValues: {
      quantityAvailable: quantity,
      pricePerUnit: "₦",
      cropVariety: "",
      harvestPeriod: undefined,
      packageMethod: "",
      deliveryDate: undefined,
      description: "",
      emergancyContact: "",
      deliveryMethod: "dispatch-to-platform-office",
      productImagesVideos: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const handleFormSubmit = async (data: TypeSellProductFormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    onSubmit({ ...data, totalValue });
    form.reset();
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    let newFile: File | null = null;

    if (e.type === "drop") {
      const dragEvent = e as React.DragEvent<HTMLDivElement>;
      newFile = dragEvent.dataTransfer.files[0] ?? null;
    } else {
      const changeEvent = e as React.ChangeEvent<HTMLInputElement>;
      if (changeEvent.target.files !== null) {
        newFile = changeEvent.target.files[0];
      }
    }

    if (newFile) {
      if (newFile.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB. Please upload a smaller file.");
        return;
      }
      const fileUrl = URL.createObjectURL(newFile);
      setAttachment(fileUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const pricePerUnit = form.watch("pricePerUnit");
  const deliveryMethod = form.watch("deliveryMethod");

  const totalValue = (() => {
    const priceNum = parseFloat(pricePerUnit.replace(/[^0-9.]/g, ""));
    if (!priceNum || isNaN(priceNum)) return "₦0";
    return `₦${(priceNum * quantity).toLocaleString()}`;
  })();

  return (
    <div>
      <>
        <Form {...form}>
          <form
            className="flex flex-col gap-8 px-1 text-[#525252] font-geologica"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="flex flex-col gap-4 ">
              <div className="grid ml:grid-cols-2 gap-4 ml:gap-8">
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[clamp(13px,1.2vw,14px)] text-[#000000CC]">
                    Quantity Available
                  </FormLabel>
                  <DecrementAndIncrementButton
                    quantity={quantity}
                    onIncrement={() => setQuantity((q) => q + 1)}
                    onDecrement={() => setQuantity((q) => Math.max(0, q - 1))}
                    btnClassName="h-[45px] w-[45px]"
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="pricePerUnit"
                    render={({ field, fieldState }) => (
                      <div className="flex flex-col gap-1">
                        <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                          Your Selling Price (per {unit})
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
                          placeholder="Enter your selling price here"
                          type="text"
                          className="bg-[#ECECEC] h-[45px]"
                          inputClassName="text-[#000000B2] bg-[#ECECEC] "
                        />
                      </div>
                    )}
                  />
                  <p className="text-[#525252B2] text-[clamp(10px,1.2vw,14px)] mt-1 font-geologica">
                    Platform price: ₦{platformPrice}
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="cropVariety"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                        Variety of Crop
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
                        placeholder="e.g. cherry tomatoes"
                        type="text"
                        className="bg-[#ECECEC] h-[45px]"
                        inputClassName="text-[#000000B2] bg-[#ECECEC] "
                      />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="harvestPeriod"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                        Harvest Period
                      </FormLabel>
                      <DatePickerForm
                        value={field.value}
                        onChange={field.onChange}
                        hasError={fieldState.invalid}
                        bgclassName="bg-[#ECECEC]"
                        subtext={
                          fieldState.error ? (
                            <span className="flex items-center gap-1 pt-1 text-red-500 ">
                              <ErrorIcon />
                              {fieldState.error.message}
                            </span>
                          ) : null
                        }
                      />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="packageMethod"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                        Package Method
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
                          { label: "Bag", value: "bag" },
                          { label: "Basket", value: "basket" },
                          { label: "Box", value: "box" },
                        ]}
                        placeholder="Select a package method"
                        bgclassName="bg-[#ECECEC] h-[45px]"
                      />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                      <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                        Delivery Date
                      </FormLabel>
                      <DatePickerForm
                        value={field.value}
                        onChange={field.onChange}
                        hasError={fieldState.invalid}
                        bgclassName="bg-[#ECECEC]"
                        subtext={
                          fieldState.error ? (
                            <span className="flex items-center gap-1 pt-1 text-red-500 ">
                              <ErrorIcon />
                              {fieldState.error.message}
                            </span>
                          ) : null
                        }
                      />
                    </div>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-2">
                    <FormLabel className="text-[#000000CC] gap-1 text-[clamp(14px,1.4vw,16px)] font-medium">
                      Description (Optional)
                    </FormLabel>
                    <Textarea
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
                      placeholder="Additional details about your product"
                      className="border-[#D5D5D5] border text-[#000000CC] text-sm"
                      textareaClassName="min-h-[100px]"
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="emergancyContact"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Emergancy Contact
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
                      placeholder="+234 000 000 0000"
                      type="text"
                      maxLength={11}
                      className="bg-[#ECECEC] h-[45px]"
                      inputClassName="text-[#000000B2] bg-[#ECECEC] "
                    />
                  </div>
                )}
              />

              <div className="flex flex-col gap-1 text-[#000000CC]">
                <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                  Delivery Method
                </FormLabel>
                <div className="flex flex-col gap-3">
                  {DeliveryMethodOptions.map((option) => {
                    const isSelected = deliveryMethod === option.optionValue;

                    return (
                      <div
                        key={option.optionValue}
                        className={cn(
                          "flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors",
                          isSelected
                            ? "bg-[#F5F5F5] border-[#03601A]"
                            : "bg-white border-[#00000033] hover:border-[#03601A]/30",
                        )}
                        onClick={() =>
                          form.setValue("deliveryMethod", option.optionValue, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                            isSelected
                              ? "border-[#03601A]"
                              : "border-[#00000033]",
                          )}
                        >
                          {isSelected && (
                            <div className="w-3 h-3 rounded-full bg-[#03601A]" />
                          )}
                        </div>

                        <div className="flex flex-col gap-0.5">
                          <h2 className="text-[clamp(14px,1.5vw,17px)]">
                            {option.optionTitle}
                          </h2>
                          <p className="text-[#000000B2] text-[clamp(10px,1.1vw,12px)]">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <FormField
                control={form.control}
                name="productImagesVideos"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                      Product Images/Videos
                    </FormLabel>
                    <div
                      onDragOver={handleDragOver}
                      onDrop={(e) => {
                        handleFileUpload(e);
                        const file = e.dataTransfer?.files?.[0];
                        if (file) field.onChange(file);
                      }}
                      className="w-full border-dashed border-2 border-[#00000033] rounded-2xl overflow-hidden"
                    >
                      {attachment ? (
                        <div className="relative w-full sm:w-[350px] md:w-[300px] ml:w-[350px] h-[250px] py-5 px-5 ">
                          <Image
                            src={attachment}
                            alt="Farm profile preview"
                            className="w-full h-full object-contain rounded-xl bg-[#d8d8d8]"
                            width={100}
                            height={100}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            onClick={() => {
                              setAttachment("");
                              field.onChange("");
                            }}
                            className="absolute top-2 right-2 bg-black rounded-full p-2 shadow w-fit h-fit border border-[#4e4e4ea8]"
                          >
                            <CloseIcon
                              className="w-[10px] h-[10px]"
                              stroke="#fff"
                            />
                          </Button>
                        </div>
                      ) : (
                        <label className="inline-flex flex-col text-center w-full cursor-pointer items-center justify-center gap-2 py-4 px-6 md:py-8">
                          <div className="flex justify-center">
                            <LogoutIcon
                              className="w-6 h-6 md:w-8 md:h-8 rotate-90"
                              fill="#000"
                            />
                          </div>
                          <p className="text-[#C09706]">
                            Click to upload{" "}
                            <span className="text-[#525252]">
                              or drag and drop
                            </span>
                          </p>
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              handleFileUpload(e);
                              const file = e.target.files?.[0];
                              if (file) field.onChange(file);
                            }}
                          />
                          <h3 className="text-[clamp(10px,1.1vw,12px)] text-center">
                            PNG, JPG, MP4 up to 10MB
                          </h3>
                        </label>
                      )}
                    </div>

                    {fieldState.error ? (
                      <span className="flex items-center gap-1 pt-1 text-red-500 text-xs">
                        <ErrorIcon />
                        {fieldState.error.message}
                      </span>
                    ) : null}
                  </div>
                )}
              />

              <div className="bg-[#F5A7211A] rounded-[10px] border-[0.5px] border-[#F5A721] p-4">
                <h3 className="text-[clamp(12px,1.5vw,16px)] text-[#000000CC] mb-4">
                  Application Summary
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    {
                      label: "Quantity",
                      value: `${quantity} ${unit}`,
                    },
                    {
                      label: "Total Value",
                      value: totalValue,
                    },
                  ].map((item) => (
                    <p
                      key={item.label}
                      className="flex items-center gap-2 text-[clamp(12px,1.2vw,14px)] "
                    >
                      <span className="text-[#00000099]">{item.label}:</span>
                      <span className="text-black">{item.value}</span>
                    </p>
                  ))}{" "}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5 w-full">
              <Button
                variant="secondary"
                className="text-[clamp(13px,1.3vw,15px)] font-normal px-10"
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
                className="w-full font-normal"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <Spinner className="h-5 w-5" />
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </>
    </div>
  );
};

export default SellProductFormForm;

export const DeliveryMethodOptions = [
  {
    optionTitle: "Dispatch to Platform Office",
    optionValue: "dispatch-to-platform-office",
    description: "Send to our collection center",
  },
  {
    optionTitle: "Self Delivery",
    optionValue: "self-delivery",
    description: "You deliver to platform office",
  },
  {
    optionTitle: "Platform Pickup",
    optionValue: "platform-pickup",
    description: "We collect from your location",
  },
];
