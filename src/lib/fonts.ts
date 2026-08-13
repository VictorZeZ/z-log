import localFont from "next/font/local";

export const quicksand = localFont({
  src: [
    {
      path: "../../public/fonts/Quicksand/Quicksand-VariableFont_wght.ttf",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-quicksand",
  display: "swap",
});

export const inter = localFont({
  src: [
    {
      path: "../../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const roboto = localFont({
  src: [
    {
      path: "../../public/fonts/Roboto/Roboto-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
  display: "swap",
});

export const spaceGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/SpaceGrotesk/SpaceGrotesk-VariableFont_wght.ttf",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});
