import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faRobot,
  faGlobe,
  faPencil,
  faServer,
  faChartLine,
  faCog,
  faLifeRing,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
}

// Navigation items in the specified order
const navigationItems = [
  {
    id: "my-sites",
    label: "My Sites",
    href: "/dashboard",
    icon: faGlobe,
    description: "Manage your websites"
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: faCog,
    description: "Configure settings"
  },
  {
    id: "support",
    label: "Support",
    href: "/support",
    icon: faLifeRing,
    description: "Get help"
  }
];

export default function DashboardSidebar({ open, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const siteId = params?.siteId as string;

  // Function to check if a route is active
  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") return true;
    if (href !== "/dashboard" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="hidden lg:block w-80 h-full bg-gray-900/95 backdrop-blur-xl border-r border-gray-800/50">
        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const active = isActive(item.href);
            const href = siteId ? item.href.replace('site', siteId) : item.href;

            return (
              <Link
                key={item.id}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  "hover:bg-gray-800/50",
                  {
                    "bg-blue-500/20 text-blue-500": active,
                    "text-gray-400": !active
                  }
                )}
                title={item.description}
              >
                <FontAwesomeIcon
                  icon={item.icon as IconProp}
                  className={cn(
                    "w-5 h-5",
                    active ? "text-blue-500" : ""
                  )}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: open ? 0 : -320 }}
        transition={{ type: "spring", damping: 20 }}
        className="lg:hidden fixed top-0 left-0 z-50 h-full w-80 bg-gray-900/95 backdrop-blur-xl border-r border-gray-800/50"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800/50">
          <Link href="/dashboard" className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faRobot as IconProp}
              className="text-blue-400 w-6 h-6"
            />
            <span className="text-xl font-bold">Codaiq</span>
          </Link>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faXmark as IconProp} className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const active = isActive(item.href);
            const href = siteId ? item.href.replace('site', siteId) : item.href;

            return (
              <Link
                key={item.id}
                href={href}
                onClick={(e) => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  "hover:bg-gray-800/50",
                  {
                    "bg-blue-500/20 text-blue-500": active,
                    "text-gray-400": !active,
                  }
                )}
                title={item.description}
              >
                <FontAwesomeIcon
                  icon={item.icon as IconProp}
                  className={cn(
                    "w-5 h-5",
                    active ? "text-blue-500" : ""
                  )}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
} 