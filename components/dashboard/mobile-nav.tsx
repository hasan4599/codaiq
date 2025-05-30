import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faRobot,
  faGlobe,
  faPencil,
  faServer,
  faChartLine,
  faCog,
  faLifeRing,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navigationItems = [
  {
    label: "AI Webbuilder",
    href: "/dashboard/builder",
    icon: faRobot
  },
  {
    label: "My Sites",
    href: "/dashboard",
    icon: faGlobe
  },
  {
    label: "Editor",
    href: "/dashboard/site/editor",
    icon: faPencil,
    dynamic: true
  },
  {
    label: "Domain & Hosting",
    href: "/dashboard/site/domain",
    icon: faServer,
    dynamic: true
  },
  {
    label: "Analytics",
    href: "/dashboard/site/analytics",
    icon: faChartLine,
    dynamic: true
  },
  {
    label: "Settings",
    href: "/settings",
    icon: faCog
  },
  {
    label: "Support",
    href: "/support",
    icon: faLifeRing
  }
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Find current page label
  const currentPage = navigationItems.find(item => 
    item.href === pathname || 
    (item.href !== "/dashboard" && pathname.startsWith(item.href))
  )?.label || "Navigation";

  return (
    <div className="relative lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors"
      >
        <span className="text-sm font-medium">{currentPage}</span>
        <FontAwesomeIcon 
          icon={faChevronDown as IconProp} 
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 z-50 mt-2 py-2 bg-gray-900/95 backdrop-blur-xl rounded-lg border border-gray-800/50 shadow-xl"
            >
              {navigationItems.map((item) => {
                const active = pathname === item.href || 
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2 transition-colors ${
                      active
                        ? "bg-blue-500/10 text-blue-500"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-100"
                    }`}
                  >
                    <FontAwesomeIcon 
                      icon={item.icon as IconProp} 
                      className={`w-4 h-4 ${active ? "text-blue-500" : ""}`}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 