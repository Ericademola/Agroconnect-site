"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { ErrorIcon, Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";
import { GoogleIcon } from "@/Icons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const LoginFormSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email" }),
  password: z.string().refine((val) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(val), {
    message: "Min. 8 characters, 1 uppercase, 1 number",
  }),
});

type TypeLoginFormSchema = z.infer<typeof LoginFormSchema>;

interface LoginFormProps {
  onForgotPassWord?: () => void;
}

const LoginForm = ({ onForgotPassWord }: LoginFormProps) => {
  const router = useRouter();
  const { login } = useAuth();

  const form = useForm<TypeLoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (data: TypeLoginFormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log(data);

    login();

    form.reset();
    router.push("/");
  };

  return (
    <div>
      <>
        <Form {...form}>
          <form
            className="flex flex-col gap-8 px-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4 text-[#525252] font-geologica">
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
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Button
                variant="link"
                className="text-[#C09706] text-[clamp(14px,1.4vw,16px)] font-regular"
                onClick={onForgotPassWord}
                type="button"
              >
                Forgot your Password?
              </Button>
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? <Spinner className="h-5 w-5" /> : "Login"}
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

export default LoginForm;
