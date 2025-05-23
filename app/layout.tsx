import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// FontAwesome Konfiguration
config.autoAddCss = false;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Codaiq",
    default: "Codaiq | AI-Powered Website Builder",
  },
  description: "Transform your ideas into production-ready websites instantly with AI. Generate complete web solutions with natural language commands.",
  themeColor: "#020617",
  keywords: [
    "AI website builder",
    "Next.js generator", 
    "React code generator",
    "Instant web development",
    "AI web design",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codaiq.com",
    siteName: "Codaiq",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Codaiq AI Website Builder",
    }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@codaiq",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-[#020617] text-gray-100 font-poppins selection:bg-cyan-400/30">
        {children}
      </body>
    </html>
  );
}
