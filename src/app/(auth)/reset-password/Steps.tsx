"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import Form from "./Form";
import FormTwo from "./FormTwo";

const variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
  }),
};

export default function Steps() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const expiresAt = searchParams.get("expiresAt");

  const [[step, direction], setStep] = useState<[number, number]>([1, 0]);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!email) {
      toast.error("Invalid or missing reset link.");
      router.replace("/forgot-password");
    }
  }, [email, router]);

  const goToStep = (nextStep: number) => {
    setStep([nextStep, nextStep > step ? 1 : -1]);
  };

  const handleContinue = (verifiedCode: string) => {
    setCode(verifiedCode);
    goToStep(2);
  };

  if (!email) {
    return null;
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      {step === 1 ? (
        <motion.div
          key="form-1"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          <Form
            email={email}
            expiresAt={expiresAt}
            onContinue={handleContinue}
          />
        </motion.div>
      ) : (
        <motion.div
          key="form-2"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          <FormTwo email={email} code={code} onBack={() => goToStep(1)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
