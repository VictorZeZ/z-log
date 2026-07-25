"use client";

import { useState } from "react";
import {
  LuAtSign,
  LuEye,
  LuEyeOff,
  LuLockKeyhole,
  LuUser,
} from "react-icons/lu";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;

  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
};

export default function Fields({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmShowPassword] = useState(false);

  const spanIconClassName =
    "bg-gray-two group-focus-within:bg-indigo-two pointer-events-none flex w-10 shrink-0 items-center justify-center rounded-s-md border duration-200 select-none";

  return (
    <>
      <div className="group flex w-full items-stretch rounded-md shadow-md">
        <span className={spanIconClassName} tabIndex={-1}>
          <LuUser />
        </span>

        <input
          type="text"
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
          placeholder="First name"
          autoComplete="given-name"
          className="font-roboto bg-gray-three w-1/2 flex-1 border border-x-0 py-2 ps-2 pe-4 text-sm duration-200 outline-none"
        />

        <input
          type="text"
          value={lastName}
          onChange={(e) => onLastNameChange(e.target.value)}
          placeholder="Last name"
          autoComplete="family-name"
          className="font-roboto bg-gray-three ml-0.5 w-1/2 flex-1 rounded-e-md border border-s-0 py-2 ps-2 pe-4 text-sm duration-200 outline-none"
        />
      </div>

      <div className="group flex w-full items-stretch rounded-md shadow-md">
        <span className={spanIconClassName} tabIndex={-1}>
          <LuAtSign />
        </span>

        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          className="font-roboto w-full flex-1 rounded-e-md border border-s-0 bg-gray-100 py-2 ps-2 pe-4 text-sm duration-200 outline-none dark:bg-gray-950"
        />
      </div>

      <div className="group flex w-full items-stretch rounded-md shadow-md">
        <span className={spanIconClassName} tabIndex={-1}>
          <LuLockKeyhole />
        </span>

        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="Password"
          autoComplete="new-password"
          className="font-roboto w-full flex-1 border-y bg-gray-100 py-2 ps-2 pe-4 text-sm duration-200 outline-none dark:bg-gray-950"
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

      <div className="group flex w-full items-stretch rounded-md shadow-md">
        <span className={spanIconClassName} tabIndex={-1}>
          <LuLockKeyhole />
        </span>

        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          placeholder="Confirm password"
          autoComplete="new-password"
          className="font-roboto w-full flex-1 border-y bg-gray-100 py-2 ps-2 pe-4 text-sm duration-200 outline-none dark:bg-gray-950"
        />

        <button
          type="button"
          onClick={() => setShowConfirmShowPassword((prev) => !prev)}
          className="flex w-10 items-center justify-center rounded-e-md border bg-gray-200 dark:bg-gray-900"
          tabIndex={-1}
        >
          {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
        </button>
      </div>
    </>
  );
}
