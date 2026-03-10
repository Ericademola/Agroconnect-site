"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { ErrorIcon, Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";

const CreateNewPasswordFormSchema = z
  .object({
    password: z
      .string()
      .refine((val) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(val), {
        message: "Min. 8 characters, 1 uppercase, 1 number",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Please confirm password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

type TypeCreateNewPasswordFormSchema = z.infer<
  typeof CreateNewPasswordFormSchema
>;

interface CreateNewPasswordFormProps {
  onSubmit: (password: string) => void;
}

const CreateNewPasswordForm = ({ onSubmit }: CreateNewPasswordFormProps) => {
  const form = useForm<TypeCreateNewPasswordFormSchema>({
    resolver: zodResolver(CreateNewPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const handleFormSubmit = async (data: TypeCreateNewPasswordFormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    onSubmit(data.password);
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
            </div>
            <div>
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
                  "Save New Password"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </>
    </div>
  );
};

export default CreateNewPasswordForm;
