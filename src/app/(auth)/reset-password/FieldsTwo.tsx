"use client";

import { useState } from "react";
import { LuEye, LuEyeOff, LuLockKeyhole } from "react-icons/lu";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ResetPasswordFormValues } from "@/lib/validations/auth";

type Props = {
  register: UseFormRegister<ResetPasswordFormValues>;
  errors: FieldErrors<ResetPasswordFormValues>;
};

export default function FieldsTwo({ register, errors }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const spanIconClassName =
    "bg-gray-two group-focus-within:bg-indigo-two pointer-events-none flex w-10 shrink-0 items-center justify-center rounded-s-md border duration-200 select-none";

  return (
    <>
      <div className="flex w-full flex-col gap-1">
        <div className="group flex w-full items-stretch rounded-md shadow-md">
          <span className={spanIconClassName} tabIndex={-1}>
            <LuLockKeyhole />
          </span>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            autoComplete="new-password"
            aria-invalid={!!errors.newPassword}
            className="font-roboto w-full flex-1 border-y bg-gray-100 py-2 ps-2 pe-4 text-sm duration-200 outline-none dark:bg-gray-950"
            {...register("newPassword")}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="flex w-10 items-center justify-center rounded-e-md border bg-gray-200 dark:bg-gray-900"
            tabIndex={-1}
          >
            {showPassword ? <LuEyeOff /> : <LuEye />}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-destructive text-xs">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div className="flex w-full flex-col gap-1">
        <div className="group flex w-full items-stretch rounded-md shadow-md">
          <span className={spanIconClassName} tabIndex={-1}>
            <LuLockKeyhole />
          </span>

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmNewPassword}
            className="font-roboto w-full flex-1 border-y bg-gray-100 py-2 ps-2 pe-4 text-sm duration-200 outline-none dark:bg-gray-950"
            {...register("confirmNewPassword")}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="flex w-10 items-center justify-center rounded-e-md border bg-gray-200 dark:bg-gray-900"
            tabIndex={-1}
          >
            {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
          </button>
        </div>
        {errors.confirmNewPassword && (
          <p className="text-destructive text-xs">
            {errors.confirmNewPassword.message}
          </p>
        )}
      </div>
    </>
  );
}
