"use client";

import Image from "next/image";
import Fields from "./Fields";
import { LuArrowRight } from "react-icons/lu";
import Link from "next/link";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { useLogin } from "@/hooks/api/useLogin";
import { ApiError } from "@/types/api/common";
import { getErrorMessage } from "@/lib/api/errorMessages";

export default function Form() {
  const router = useRouter();
  const { mutate: loginUser, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginUser(values, {
      onSuccess: (data) => {
        if (data.requiresTwoFactor && data.challengeId) {
          toast.success("Verification code sent to your email.");

          const params = new URLSearchParams({ challengeId: data.challengeId });
          if (data.expiresAt) {
            params.set("expiresAt", data.expiresAt);
          }

          router.push(`/confirm-login?${params.toString()}`);
          return;
        }

        toast.success("Logged in successfully.");
        router.push("/");
      },
      onError: (error) => {
        const message =
          error instanceof ApiError
            ? getErrorMessage(error)
            : "Something went wrong. Please try again.";

        toast.error(message);
      },
    });
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 1, type: "spring" }}
      className="xs:h-auto xs:w-116 xs:rounded-lg xs:pt-0 xs:backdrop-blur-[2px] relative flex h-dvh w-full transform-gpu flex-col items-center border bg-gray-200/90 pt-10 pb-6 shadow-2xl will-change-transform sm:bg-gray-200/50 dark:bg-gray-900/90 sm:dark:bg-gray-900/50"
    >
      <div className="xs:-translate-y-1/2 absolute flex w-full translate-y-2 items-center justify-start px-8 tracking-widest">
        <Image
          src="/logo/wide-logo.png"
          alt="Vetowo Logo"
          width={120}
          height={50}
          className="h-auto w-auto object-cover"
          priority
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex h-full w-full flex-col items-center justify-start gap-10 p-8"
        noValidate
      >
        <div className="flex w-full flex-col items-center justify-center gap-2 select-none">
          <h1 className="text-3xl tracking-widest">LOGIN</h1>
          <p className="text-center text-sm opacity-70">
            Log in to explore articles and enjoy great content.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-start gap-4">
          <Fields register={register} errors={errors} />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="group flex items-center justify-center gap-2 rounded-md border bg-gray-200 px-10 py-2 shadow-md disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950"
          >
            Continue
            <LuArrowRight className="text-indigo-500 duration-200 group-hover:translate-x-2" />
          </button>

          <p className="text-muted-foreground text-sm">
            <span className="select-none">Don't have an account? </span>
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
}
