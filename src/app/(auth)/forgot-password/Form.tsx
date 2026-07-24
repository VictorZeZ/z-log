"use client";

import Image from "next/image";
import Fields from "./Fields";
import { LuArrowRight } from "react-icons/lu";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";

export default function Form() {
  const [email, setEmail] = useState("");

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

      <div className="mt-10 flex h-full w-full flex-col items-center justify-start gap-10 p-8">
        <div className="flex w-full flex-col items-center justify-center gap-2 select-none">
          <h1 className="text-3xl tracking-widest">Forgot Password</h1>
          <p className="text-center text-sm opacity-70">
            Enter your email address, and we'll send you a verification code to
            reset your password.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-start gap-4">
          <Fields email={email} onEmailChange={setEmail} />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4">
          <button className="group flex items-center justify-center gap-2 rounded-md border bg-gray-200 px-10 py-2 shadow-md dark:bg-gray-950">
            Continue
            <LuArrowRight className="text-indigo-500 duration-200 group-hover:translate-x-2" />
          </button>

          <p className="text-muted-foreground text-sm">
            <span className="select-none">Remember your password? </span>
            <Link
              href="/login"
              tabIndex={-1}
              className="text-primary font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
