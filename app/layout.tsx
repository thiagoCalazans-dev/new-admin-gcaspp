import type { Metadata } from "next";
import "@/src/theme/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/src/infra/cn";
import { Toaster } from "@/src/components/ui/toast/toaster";

export const metadata: Metadata = {
  title: "GCASPP - CRM",
  description: "Sistema de gestão GCASPP",
};

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
