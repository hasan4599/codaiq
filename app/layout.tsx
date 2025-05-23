import "./globals.css";
import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-[#020617]">
        {children}
      </body>
    </html>
  );
}
