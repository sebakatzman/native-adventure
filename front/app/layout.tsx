import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import NextLink from "next/link";
import Script from "next/script";
import Image from "next/image";
/* import "./globals.css"; */

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<html lang="en" suppressHydrationWarning>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  </head>
  <body
    className={clsx(
      "flex flex-col min-h-screen bg-background font-sans antialiased overflow-x-hidden",
      fontSans.variable
    )}
    suppressHydrationWarning={true}
  >
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <Navbar />
      <main className="flex-grow max-w-full mx-auto">{children}</main>
    </Providers>
  </body>
</html>
  );
}


