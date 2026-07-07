"use client";

import { useState } from "react";
import { LuAtSign, LuEye, LuEyeOff, LuLockKeyhole } from "react-icons/lu";

type Props = {
  email: string;
  password: string;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
};

export default function Fields({
  email,
  password,
  onEmailChange,
  onPasswordChange,
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex w-full items-stretch rounded-md shadow-md">
        <span
          className="flex w-10 items-center justify-center rounded-s-md border bg-neutral-200 select-none dark:bg-neutral-900"
          tabIndex={-1}
        >
          <LuAtSign />
        </span>

        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="Email Address"
          autoComplete="email"
          className="font-roboto flex-1 rounded-e-md border border-s-0 bg-neutral-100 py-2 ps-2 pe-4 text-sm duration-200 outline-none focus:ps-4 dark:bg-neutral-950"
        />
      </div>

      <div className="flex w-full items-stretch rounded-md shadow-md">
        <span
          className="flex w-10 items-center justify-center rounded-s-md border bg-neutral-200 select-none dark:bg-neutral-900"
          tabIndex={-1}
        >
          <LuLockKeyhole />
        </span>

        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          className="font-roboto flex-1 border-y bg-neutral-100 py-2 ps-2 pe-4 text-sm duration-200 outline-none focus:ps-4 dark:bg-neutral-950"
        />

        <button
          type="button"
          onClick={toggleShowPassword}
          className="flex w-10 items-center justify-center rounded-e-md border bg-neutral-200 dark:bg-neutral-900"
          tabIndex={-1}
        >
          {showPassword ? <LuEyeOff /> : <LuEye />}
        </button>
      </div>
    </>
  );
}
