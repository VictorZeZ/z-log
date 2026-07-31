"use client";

import { useState } from "react";
import {
  LuAtSign,
  LuEye,
  LuEyeOff,
  LuLockKeyhole,
  LuUser,
} from "react-icons/lu";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { RegisterFormValues } from "@/lib/validations/auth";

type Props = {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
};

export default function Fields({ register, errors }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const spanIconClassName =
    "bg-gray-two group-focus-within:bg-indigo-two pointer-events-none flex w-10 shrink-0 items-center justify-center rounded-s-md border duration-200 select-none";

  return (
    <>
      <div className="flex w-full flex-col gap-1">
        <div className="group flex w-full items-stretch rounded-md shadow-md">
          <span className={spanIconClassName} tabIndex={-1}>
            <LuUser />
          </span>

          <input
            type="text"
            placeholder="First name"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            className="font-roboto bg-gray-three w-1/2 flex-1 border border-x-0 py-2 ps-2 pe-4 text-sm duration-200 outline-none"
            {...register("firstName")}
          />

          <input
            type="text"
            placeholder="Last name"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            className="font-roboto bg-gray-three ml-0.5 w-1/2 flex-1 rounded-e-md border border-s-0 py-2 ps-2 pe-4 text-sm duration-200 outline-none"
            {...register("lastName")}
          />
        </div>
        {(errors.firstName || errors.lastName) && (
          <p className="text-destructive text-xs">
            {errors.firstName?.message ?? errors.lastName?.message}
          </p>
        )}
      </div>

      <div className="flex w-full flex-col gap-1">
        <div className="group flex w-full items-stretch rounded-md shadow-md">
          <span className={spanIconClassName} tabIndex={-1}>
            <LuAtSign />
          </span>

          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className="font-roboto w-full flex-1 rounded-e-md border border-s-0 bg-gray-100 py-2 ps-2 pe-4 text-sm duration-200 outline-none dark:bg-gray-950"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-destructive text-xs">{errors.email.message}</p>
        )}
      </div>

      <div className="flex w-full flex-col gap-1">
        <div className="group flex w-full items-stretch rounded-md shadow-md">
          <span className={spanIconClassName} tabIndex={-1}>
            <LuLockKeyhole />
          </span>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            className="font-roboto w-full flex-1 border-y bg-gray-100 py-2 ps-2 pe-4 text-sm duration-200 outline-none dark:bg-gray-950"
            {...register("password")}
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
        {errors.password && (
          <p className="text-destructive text-xs">{errors.password.message}</p>
        )}
      </div>

      <div className="flex w-full flex-col gap-1">
        <div className="group flex w-full items-stretch rounded-md shadow-md">
          <span className={spanIconClassName} tabIndex={-1}>
            <LuLockKeyhole />
          </span>

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            className="font-roboto w-full flex-1 border-y bg-gray-100 py-2 ps-2 pe-4 text-sm duration-200 outline-none dark:bg-gray-950"
            {...register("confirmPassword")}
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
        {errors.confirmPassword && (
          <p className="text-destructive text-xs">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
    </>
  );
}
