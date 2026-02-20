"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { ErrorIcon, Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";

const createChangePasswordSchema = (storedPassword: string) =>
  z
    .object({
      currentPassword: z
        .string()
        .nonempty({ message: "Please enter your current password" })
        .refine((val) => val === storedPassword, {
          message: "Current password is incorrect",
        }),
      newPassword: z
        .string()
        .refine((val) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(val), {
          message: "Min. 8 characters, 1 uppercase, 1 number",
        }),
      confirmPassword: z
        .string()
        .nonempty({ message: "Please confirm password" }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords must match",
    });

type TypeChangePasswordFormSchema = z.infer<
  ReturnType<typeof createChangePasswordSchema>
>;

interface ChangePasswordFormProps {
  initialData: { userPassword: string };
  onSubmit: (newPassword: string) => void;
  onForgotPassWord: () => void;
}

const ChangePasswordForm = ({
  initialData,
  onSubmit,
  onForgotPassWord,
}: ChangePasswordFormProps) => {
  const form = useForm<TypeChangePasswordFormSchema>({
    resolver: zodResolver(createChangePasswordSchema(initialData.userPassword)),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const handleFormSubmit = async (data: TypeChangePasswordFormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    onSubmit(data.newPassword);
    form.reset();
  };

  console.log("stored password:", initialData.userPassword);

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-8 border border-[#0000001A] rounded-2xl p-8"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="flex flex-col gap-5 text-[#525252] font-geologica">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                    Current Password
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
                    placeholder=""
                    type="password"
                    className="bg-[#ECECEC] h-[45px]"
                    inputClassName="text-[#000000B2] bg-[#ECECEC]"
                  />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <FormLabel className="text-[clamp(13px,1.2vw,14px)]">
                    New Password
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
                    placeholder=""
                    type="password"
                    className="bg-[#ECECEC] h-[45px]"
                    inputClassName="text-[#000000B2] bg-[#ECECEC]"
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
                    placeholder=""
                    type="password"
                    className="bg-[#ECECEC] h-[45px]"
                    inputClassName="text-[#000000B2] bg-[#ECECEC]"
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button
              type="submit"
              variant="default"
              size="lg"
              className=""
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? (
                <>
                  <p> Update Password</p>
                  <Spinner className="h-5 w-5" />
                </>
              ) : (
                "Update Password"
              )}
            </Button>
            <Button
              type="button"
              variant="link"
              size="sm"
              className="text-[#C09706] font-light"
              onClick={onForgotPassWord}
            >
              Forgot password?
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
