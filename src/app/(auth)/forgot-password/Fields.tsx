"use client";

import { LuAtSign } from "react-icons/lu";

type Props = {
  email: string;
  onEmailChange: (v: string) => void;
};

export default function Fields({ email, onEmailChange }: Props) {
  const spanIconClassName =
    "bg-gray-two group-focus-within:bg-indigo-two pointer-events-none flex w-10 shrink-0 items-center justify-center rounded-s-md border duration-200 select-none";

  return (
    <>
      <div className="group flex w-full items-stretch rounded-md shadow-md">
        <span className={spanIconClassName} tabIndex={-1}>
          <LuAtSign />
        </span>

        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="Email Address"
          autoComplete="email"
          className="font-roboto w-full flex-1 rounded-e-md border border-s-0 bg-gray-100 py-2 ps-2 pe-4 text-sm duration-200 outline-none dark:bg-gray-950"
        />
      </div>
    </>
  );
}
