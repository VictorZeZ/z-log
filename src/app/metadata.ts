import { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://zlog.code101.ir"),

  title: {
    default: "Z LOG",
    template: "%s | Z LOG",
  },

  description:
    "Z LOG is a modern blogging platform for discovering, writing, and sharing ideas.",

  applicationName: "Z LOG",

  authors: [{ name: "Meraj Esmaeili" }],
  creator: "Meraj Esmaeili",
  publisher: "Meraj Esmaeili",

  category: "Publishing",

  keywords: [
    "blog",
    "blogging platform",
    "articles",
    "stories",
    "writing",
    "publishing",
    "content creation",
    "modern blog",
    "Z LOG",
  ],

  icons: {
    apple: "/logo/logo.png",
  },

  openGraph: {
    title: "Z LOG",
    description:
      "A modern blogging platform for discovering, writing, and sharing ideas.",
    siteName: "Z LOG",
    type: "website",
    locale: "en_US",
    url: "https://zlog.code101.ir",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Z LOG",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Z LOG",
    description:
      "A modern blogging platform for discovering, writing, and sharing ideas.",
    images: ["/logo/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
