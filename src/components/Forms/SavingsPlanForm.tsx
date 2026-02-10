"use client";

import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";
import { useEffect, useState } from "react";
import { DownIcon } from "@/Icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const SavingsPlanFormSchema = z.object({
  duration: z.string(),
  paymentInterval: z.string(),
});

type TypeSavingsPlanFormSchema = z.infer<typeof SavingsPlanFormSchema>;

interface SavingsPlanFormProps {
  productNames: string[];
  totalAmount: string;
  onSubmit: (data: TypeSavingsPlanFormSchema) => void;
}

const SavingsPlanForm = ({
  productNames,
  totalAmount,
  onSubmit,
}: SavingsPlanFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProductNames, setShowProductNames] = useState(false);

  const form = useForm<TypeSavingsPlanFormSchema>({
    resolver: zodResolver(SavingsPlanFormSchema),
    defaultValues: {
      duration: "1 month",
      paymentInterval: "Daily",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit, formState, reset } = form;

  useEffect(() => {
    reset({
      duration: "1 month",
      paymentInterval: "Daily",
    });
  }, [productNames, totalAmount, reset]);

  const handleFormSubmit = async (data: TypeSavingsPlanFormSchema) => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      onSubmit(data);
    } catch (error) {
      console.error("Failed to create savings plan", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <>
        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="flex flex-col gap-4 text-[#525252] font-geologica">
              <div className="flex flex-col gap-1">
                <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                  Product
                </FormLabel>
                <Popover
                  open={showProductNames}
                  onOpenChange={setShowProductNames}
                >
                  <PopoverTrigger asChild>
                    <Input
                      readOnly
                      value={productNames[0]}
                      rightIcon={<DownIcon className="w-4 h-4" />}
                      leftIcon={null}
                      className="has-[:focus]:ring-0 h-[45px] bg-[#ECECEC] border-[#F5F5F5]"
                      inputClassName="text-start text-black text-[clamp(13px,1.5vw,16px)]"
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-[450px] md:mr-[50px] bg-white rounded-2xl p-[15px] pb-10 flex flex-col gap-5">
                    {productNames.map((name, index) => (
                      <div
                        key={index}
                        className="text-[clamp(13px,1.5vw,16px)]"
                      >
                        <p>{name}</p>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col gap-1">
                <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                  Goal Amount
                </FormLabel>
                <Input
                  readOnly
                  value={totalAmount}
                  className="bg-[#ECECEC] h-[45px] border-[#F5F5F5] has-[:focus]:ring-0 text-[#0000004D]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                  Duration
                </FormLabel>
                <div className="flex flex-wrap items-center gap-4 w-full">
                  {[
                    "1 month",
                    "2 months",
                    "3 months",
                    "4 months",
                    "5 months",
                    "6 months",
                  ].map((duration) => {
                    const isActive = form.watch("duration") === duration;

                    return (
                      <button
                        key={duration}
                        type="button"
                        onClick={() =>
                          form.setValue("duration", duration, {
                            shouldValidate: true,
                          })
                        }
                        className={`text-nowrap py-3 px-5 bg-[#ECECEC] rounded-md border text-[clamp(12px,1.4vw,15px)] 
        ${isActive ? "border-[#C09706] text-[#C09706]" : "border-[#F5F5F5] text-[#00000066]"}
      `}
                      >
                        {duration}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                  Payment Interval
                </FormLabel>
                <div className="grid grid-cols-3 gap-5">
                  {["Daily", "Weekly", "Monthly"].map((interval) => {
                    const isActive = form.watch("paymentInterval") === interval;

                    return (
                      <button
                        key={interval}
                        type="button"
                        onClick={() =>
                          form.setValue("paymentInterval", interval, {
                            shouldValidate: true,
                          })
                        }
                        className={`p-3 bg-[#ECECEC] rounded-md border text-[clamp(12px,1.4vw,15px)]
        ${isActive ? "border-[#C09706] text-[#C09706]" : "border-[#F5F5F5] text-[#00000066]"}
      `}
                      >
                        {interval}
                      </button>
                    );
                  })}
                </div>
              </div>
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
                "Create Savings Plan"
              )}
            </Button>
          </form>
        </Form>
      </>
    </div>
  );
};

export default SavingsPlanForm;
