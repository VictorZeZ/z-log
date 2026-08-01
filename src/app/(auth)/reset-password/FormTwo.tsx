"use client";

import Image from "next/image";
import { LuArrowLeft, LuRefreshCcw } from "react-icons/lu";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import FieldsTwo from "./FieldsTwo";
import {
  resetPasswordFormSchema,
  type ResetPasswordFormValues,
} from "@/lib/validations/auth";
import { useResetPassword } from "@/hooks/api/useResetPassword";
import { handleApiError } from "@/lib/api/errorHandler";

type Props = {
  email: string;
  code: string;
  onBack: () => void;
};

export default function FormTwo({ email, code, onBack }: Props) {
  const router = useRouter();
  const { mutate: resetPasswordUser, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { newPassword: "", confirmNewPassword: "" },
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    resetPasswordUser(
      { email, code, newPassword: values.newPassword },
      {
        onSuccess: () => {
          toast.success("Password reset successfully. Please log in.");
          router.push("/login");
        },
        onError: handleApiError,
      },
    );
  };

  return (
    <motion.div className="xs:h-auto xs:w-116 xs:rounded-lg xs:pt-0 xs:backdrop-blur-[2px] relative flex h-dvh w-full transform-gpu flex-col items-center border bg-gray-200/90 pt-10 pb-6 shadow-2xl will-change-transform sm:bg-gray-200/50 dark:bg-gray-900/90 sm:dark:bg-gray-900/50">
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
          <h1 className="text-3xl tracking-widest">Reset Your Password</h1>
          <p className="text-center text-sm opacity-70">
            Enter a new password for your account. Make sure it's strong and
            unique.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-start gap-4">
          <FieldsTwo register={register} errors={errors} />
        </div>

        <div className="flex w-full items-center justify-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="group flex items-center justify-center gap-2 rounded-md border bg-gray-200 px-10 py-2 shadow-md dark:bg-gray-950"
          >
            <LuArrowLeft className="text-indigo-500 duration-200 group-hover:-translate-x-2" />
            Back
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="group flex items-center justify-center gap-2 rounded-md border bg-gray-200 px-10 py-2 shadow-md disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950"
          >
            Reset Password
            <LuRefreshCcw className="text-indigo-500 duration-300 group-hover:rotate-180" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
