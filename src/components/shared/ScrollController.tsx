"use client";

import { useEffect } from "react";

function ScrollController() {
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      window.scrollBy({
        top: event.deltaY > 0 ? 40 : -40,
        behavior: "auto",
      });
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return null;
}

export default ScrollController;
