"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useTheme() {
  const [theme, setTheme] = useState<string>("system");
  const [isReady, setIsReady] = useState<boolean>(false);

  const applyTheme = () => {
    const userTheme = Cookies.get("theme");
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (userTheme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else if (userTheme === "light") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      if (systemTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      setTheme("system");
    }
  };

  const runThemeTransition = (apply: () => void) => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const startViewTransition = (
      document as unknown as {
        startViewTransition?: (callback: () => void) => void;
      }
    ).startViewTransition;

    if (!startViewTransition || prefersReducedMotion) {
      apply();
      return;
    }

    const originX = 0;
    const originY = 0;
    const endRadius = Math.hypot(
      window.innerWidth - originX,
      window.innerHeight - originY,
    );

    document.documentElement.style.setProperty("--vt-x", `${originX}px`);
    document.documentElement.style.setProperty("--vt-y", `${originY}px`);
    document.documentElement.style.setProperty("--vt-radius", `${endRadius}px`);

    startViewTransition.call(document, () => {
      apply();
    });
  };

  const setThemeSystem = () => {
    runThemeTransition(() => {
      Cookies.remove("theme");
      const systemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      if (systemTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      setTheme("system");
    });
  };

  const setThemeLight = () => {
    runThemeTransition(() => {
      document.documentElement.classList.remove("dark");
      Cookies.set("theme", "light", { expires: 365 });
      setTheme("light");
    });
  };

  const setThemeDark = () => {
    runThemeTransition(() => {
      document.documentElement.classList.add("dark");
      Cookies.set("theme", "dark", { expires: 365 });
      setTheme("dark");
    });
  };

  useEffect(() => {
    applyTheme();
    setIsReady(true);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (Cookies.get("theme")) return;
      applyTheme();
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return { theme, isReady, setThemeSystem, setThemeLight, setThemeDark };
}
