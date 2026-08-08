import type { Metadata } from "next";
import { Newsreader, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";

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
  description: "Leave something you wish, you did differently",
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
        <Toaster
          position="bottom-left"
          closeButton
          expand={false}
          gap={10}
          offset={24}
          visibleToasts={3}
          duration={4000}
          theme="system"
          containerAriaLabel="Notifications"
          toastOptions={{
            className:
              "font-news border-black/10 bg-[var(--background)] text-[var(--foreground)] shadow-[0_12px_36px_rgba(23,23,23,0.12)] backdrop-blur-md",
            style: {
              borderRadius: "8px",
              padding: "12px 14px",
            },
            closeButtonAriaLabel: "Dismiss notification",
          }}
        />
      </body>
    </html>
  );
}
