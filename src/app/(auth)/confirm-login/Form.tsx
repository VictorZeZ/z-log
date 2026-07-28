"use client";

import Image from "next/image";
import Fields from "./Fields";
import { LuArrowRight } from "react-icons/lu";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useResendLoginVerificationCode } from "@/hooks/api/useResendLoginVerificationCode";
import { ApiError } from "@/types/api/common";
import { getErrorMessage } from "@/lib/api/errorMessages";
import { useConfirmLogin } from "@/hooks/api/Useconfirmlogin";

const CODE_LENGTH = 6;
const DEFAULT_COUNTDOWN_SECONDS = 60;

function secondsUntil(expiresAt: string): number {
  const remainingMs = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.round(remainingMs / 1000));
}

export default function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [challengeId, setChallengeId] = useState(
    searchParams.get("challengeId"),
  );
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(DEFAULT_COUNTDOWN_SECONDS);

  const { mutate: confirmLoginUser, isPending: isConfirming } =
    useConfirmLogin();
  const { mutate: resendCode, isPending: isResending } =
    useResendLoginVerificationCode();

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    if (!challengeId) {
      toast.error("Invalid or missing verification link.");
      router.replace("/login");
    }
  }, [challengeId, router]);

  const handleError = (error: unknown) => {
    const message =
      error instanceof ApiError
        ? getErrorMessage(error)
        : "Something went wrong. Please try again.";

    toast.error(message);
  };

  const handleResend = () => {
    if (!challengeId) return;

    resendCode(
      { challengeId },
      {
        onSuccess: (data) => {
          setChallengeId(data.challengeId);
          setCode("");
          setSeconds(secondsUntil(data.expiresAt));

          router.replace(`/confirm-login?challengeId=${data.challengeId}`);
          toast.success("Verification code resent.");
        },
        onError: handleError,
      },
    );
  };

  const handleSubmit = () => {
    if (!challengeId || code.length !== CODE_LENGTH) return;

    confirmLoginUser(
      { challengeId, code },
      {
        onSuccess: () => {
          toast.success("Logged in successfully.");
          router.push("/");
        },
        onError: handleError,
      },
    );
  };

  const minutes = Math.floor(seconds / 60);
  const remain = seconds % 60;

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
          <h1 className="text-3xl tracking-widest">Confirm Login</h1>
          <p className="text-center text-sm opacity-70">
            We've sent a 6-character verification code to your email. Enter it
            below to complete your sign in.
          </p>
        </div>

        <div className="flex w-full flex-col items-center justify-start gap-4">
          <Fields value={code} onChange={setCode} />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isConfirming || code.length !== CODE_LENGTH}
            className="group flex items-center justify-center gap-2 rounded-md border bg-gray-200 px-10 py-2 shadow-md disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950"
          >
            Continue
            <LuArrowRight className="text-indigo-500 duration-200 group-hover:translate-x-2" />
          </button>

          <div className="text-center text-sm">
            {seconds > 0 ? (
              <p className="text-muted-foreground select-none">
                Resend code in{" "}
                <span className="font-medium text-slate-500">
                  {String(minutes).padStart(2, "0")}:
                  {String(remain).padStart(2, "0")}
                </span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-primary font-medium hover:underline disabled:pointer-events-none disabled:opacity-50"
              >
                Resend code
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
