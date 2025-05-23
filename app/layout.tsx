import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins"
})

export const metadata: Metadata = {
  title: "Codaiq | AI-Powered Website Builder",
  themeColor: "#020617"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-[#020617] font-sans">
        {children}
      </body>
    </html>
  )
}
