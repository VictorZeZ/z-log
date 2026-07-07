"use client";

import { useTheme } from "@/hooks/useTheme";
import { useEffect } from "react";

function ApplyTheme() {
  const { theme, isReady } = useTheme();

  useEffect(() => {
    if (!isReady) return;
  }, [theme, isReady]);

  return null;
}

export default ApplyTheme;
