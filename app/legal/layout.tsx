"use client";

import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <html lang="en">
      <body>
        <div
          ref={ref}
          className="min-h-screen bg-[#111827cc] text-gray-100 font-poppins overflow-x-hidden"
        >
          {/* Parallax Background */}
          <motion.div
            className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[3%] -z-10"
            style={{ y: yBg }}
          />

          {/* Header */}
          <Header />
          {/* Main Content */}
          <main style={{ paddingTop: `${headerHeight}px` }}>{children}</main>

          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
