"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { ErrorIcon, Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";
import Rating from "../Rating/Rating";
import { Textarea } from "../ui/textarea";

const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Please select a rating" })
    .max(5, { message: "Rating must be between 1 and 5" }),
  reviewText: z
    .string()
    .min(5, { message: "Review must be at least 5 characters" })
    .max(500, { message: "Review cannot exceed 500 characters" }),
});

type TypeReviewFormData = z.infer<typeof reviewSchema>;

const ReviewRatingForm = () => {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TypeReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      reviewText: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit, watch, setValue, control, formState } = form;

  const onSubmit = async (data: TypeReviewFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log(data);

      form.reset({
        rating: 0,
        reviewText: "",
      });
      setSubmitStatus("success");
    } catch (error) {
      console.error("Failed to submit review:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  //   const closeModal = () => {
  //     setSubmitStatus("idle");
  //   };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-5 font-poppins"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="rating"
            render={({ fieldState }) => (
              <div className="flex flex-col gap-2">
                <FormLabel className="text-[#000000CC] gap-1 text-[clamp(14px,1.4vw,16px)]">
                  Add your rating <span className="text-[#FB3958]">*</span>
                </FormLabel>
                <Rating
                  value={watch("rating")}
                  onChange={(v) =>
                    setValue("rating", v, { shouldValidate: true })
                  }
                  className="md:text-xl"
                />
                {fieldState.error && (
                  <span className="flex items-center gap-1 pt-1 text-red-500 text-xs">
                    <ErrorIcon />
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            )}
          />
          <FormField
            control={control}
            name="reviewText"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <FormLabel className="text-[#000000CC] gap-1 text-[clamp(14px,1.4vw,16px)] font-medium">
                  Write your review <span className="text-[#FB3958]">*</span>
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
                  placeholder="Write your review here..."
                  className="border-[#D5D5D5] border text-[#000000CC] text-sm"
                  textareaClassName="min-h-[100px]"
                  disabled={isSubmitting}
                />
              </div>
            )}
          />
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-fit mt-4"
            disabled={isSubmitting || !formState.isValid}
          >
            {isSubmitting ? <Spinner className="h-5 w-5" /> : "Submit Review"}
          </Button>
        </form>
      </Form>

      {/* Success Modal */}
      {/* <DrawerDialog
        open={submitStatus === "success"}
        close={closeModal}
        size="sm"
        headerClassName="border-none py-0"
      >
        <PopUpUtility
          className="w-fit py-5 border-none"
          header="Review Submitted"
          desc="Thank you! Your endorsement has been published in the Kinbranch Marketplace."
          icon={<SuccessFullPopIcon className="w-[156px] h-[156px]" />}
          buttonsectionClassName="p-0"
          hrClassName="hidden"
        />
      </DrawerDialog> */}

      {/* Error Modal */}
      {/* <DrawerDialog
        open={submitStatus === "error"}
        close={closeModal}
        size="sm"
        headerClassName="border-none py-0"
      >
        <PopUpUtility
          className="w-fit py-5 border-none"
          header="Review Failed"
          desc="Oops! Something went wrong while submitting your review. Please try again."
          icon={
            <SuccessFullPopIcon
              className="w-[156px] h-[156px]"
              fill="#F44336"
              color="#F44336"
            />
          }
          buttonsectionClassName="p-0"
          hrClassName="hidden"
        />
      </DrawerDialog> */}
    </>
  );
};

export default ReviewRatingForm;
