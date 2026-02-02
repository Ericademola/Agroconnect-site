"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { ErrorIcon, Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";

const FooterFormSchema = z.object({
  fullName: z.string().nonempty({ message: "This field is required" }),
  email: z.string().trim().email({ message: "Please enter a valid email" }),
});

type TypeFooterFormSchema = z.infer<typeof FooterFormSchema>;

const FooterForm = () => {
  const form = useForm<TypeFooterFormSchema>({
    resolver: zodResolver(FooterFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: TypeFooterFormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <div>
      <>
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-3 text-[#525252] font-geologica">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
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
                      placeholder="Full name"
                      type="text"
                      className="bg-white h-[45px]"
                      inputClassName="text-[#000000B2] bg-white "
                    />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
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
                      placeholder="Email address"
                      type="email"
                      className="bg-white h-[45px]"
                      inputClassName="text-[#000000B2] bg-white "
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
              //   disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? <Spinner className="h-5 w-5" /> : "Submit"}
            </Button>
          </form>
        </Form>
      </>
    </div>
  );
};

export default FooterForm;
