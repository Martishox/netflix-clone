"use client";

import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/app/component/Provider";
import { ProfileProvider } from "@/app/component/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netflix",
  description: "Netflix - Watch TV Shows Online, Watch Movies Online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/net.ico" />
      </head>
      <body className={inter.className}>
        <ProfileProvider>
          <Provider>{children}</Provider>
        </ProfileProvider>
      </body>
    </html>
  );
}
