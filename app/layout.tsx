// @ts-nocheck
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Codaiq | AI-Powered Website Builder",
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: "dark",
        variables: {
          // Primary colors (your blue theme)
          colorPrimary: "#3b82f6",
          colorPrimaryText: "#ffffff",

          // Text colors
          colorText: "#f9fafb",
          colorTextSecondary: "#d1d5db",
          colorTextOnPrimaryBackground: "#ffffff",

          // Background colors
          colorBackground: "#1f2937",
          colorInputBackground: "#374151",
          colorShimmer: "#374151",

          // Input colors
          colorInputText: "#ffffff",

          // Neutral colors
          colorNeutral: "#6b7280",

          // Status colors
          colorDanger: "#ef4444",
          colorSuccess: "#22c55e",
          colorWarning: "#f59e0b",

          // Design system
          borderRadius: "0.75rem",
          fontFamily: "inherit",
          fontSize: "14px",
        },
      }}
    >
      <html lang="en" className={poppins.variable} suppressHydrationWarning>
        <body className="bg-[#020617] text-white font-sans">{children}</body>
      </html>
    </ClerkProvider>
  );
}
