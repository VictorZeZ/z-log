"use client";

import { motion } from "motion/react";
import { LuText, LuTextQuote } from "react-icons/lu";
import { TbMessageChatbotFilled, TbMessageFilled } from "react-icons/tb";

function BackgroundPolygon() {
  return (
    <>
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 flex w-full items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute -translate-x-30 translate-y-40 sm:-translate-x-60 sm:translate-y-50"
        >
          <TbMessageChatbotFilled className="size-32 fill-indigo-500 sm:size-64 dark:fill-indigo-700" />
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute translate-x-30 -translate-y-40 sm:translate-x-60 sm:-translate-y-50"
        >
          <TbMessageFilled className="size-32 rotate-y-190 fill-indigo-500 sm:size-64 dark:fill-indigo-700" />
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute -translate-x-20 -translate-y-30 sm:-translate-x-120 sm:-translate-y-30"
        >
          <LuText className="size-32 text-indigo-500 sm:size-64 dark:text-indigo-700" />
        </motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute translate-x-20 translate-y-30 sm:translate-x-120 sm:translate-y-30"
        >
          <LuTextQuote className="sm:size-64 size-32 rotate-y-190 text-indigo-500 dark:text-indigo-700" />
        </motion.div>
      </div>
    </>
  );
}

export default BackgroundPolygon;
