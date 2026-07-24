"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function Fields({ value, onChange }: Props) {
  return (
    <InputOTP
      value={value}
      onChange={(value) => onChange(value.toUpperCase())}
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      className="font-roboto"
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>

      <InputOTPSeparator />

      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}
