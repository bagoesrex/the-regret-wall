import type { Metadata } from "next";
import { Newsreader, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import QueryProvider from "@/providers/query-provider";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Regret Wall",
  description: "Leave something you wish you did differently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body
        className={`${newsreader.variable} ${caveat.variable} font-news flex min-h-full flex-col`}
      >
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
