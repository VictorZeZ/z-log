"use client";

import { useState } from "react";
import {
  LuAtSign,
  LuEye,
  LuEyeOff,
  LuLockKeyhole,
  LuUser,
} from "react-icons/lu";

export default function Fields() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmShowPassword] =
    useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmShowPassword = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

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
          placeholder="First name"
          autoComplete="given-name"
          className="font-roboto bg-gray-three w-1/2 flex-1 border border-x-0 py-2 ps-2 pe-4 text-sm duration-200 outline-none"
        />
        <input
          type="text"
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
          placeholder="Password"
          autoComplete="new-password"
          className="font-roboto w-full flex-1 border-y bg-gray-100 py-2 ps-2 pe-4 text-sm duration-200 outline-none dark:bg-gray-950"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
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
          placeholder="Confirm password"
          autoComplete="new-password"
          className="font-roboto w-full flex-1 border-y bg-gray-100 py-2 ps-2 pe-4 text-sm duration-200 outline-none dark:bg-gray-950"
        />
        <button
          type="button"
          onClick={toggleConfirmShowPassword}
          className="flex w-10 items-center justify-center rounded-e-md border bg-gray-200 dark:bg-gray-900"
          tabIndex={-1}
        >
          {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
        </button>
      </div>
    </>
  );
}
