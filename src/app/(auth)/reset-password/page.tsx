"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
  const [[step, direction], setStep] = useState<[number, number]>([1, 0]);

  const goToStep = (nextStep: number) => {
    setStep([nextStep, nextStep > step ? 1 : -1]);
  };

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
          <Form onContinue={() => goToStep(2)} />
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
          <FormTwo onBack={() => goToStep(1)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
