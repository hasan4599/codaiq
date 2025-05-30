import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { 
  faChartLine, 
  faCode, 
  faCog, 
  faDatabase, 
  faGlobe, 
  faImage, 
  faXmark 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: faChartLine, label: "Overview", href: "/dashboard" },
  { icon: faGlobe, label: "Websites", href: "/dashboard/websites" },
  { icon: faCode, label: "Components", href: "/dashboard/components" },
  { icon: faImage, label: "Media", href: "/dashboard/media" },
  { icon: faDatabase, label: "Data", href: "/dashboard/data" },
  { icon: faCog, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardSidebar({ open, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();

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
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: open ? 0 : -300 }}
        transition={{ type: "spring", damping: 20 }}
        className={`fixed top-0 left-0 z-40 h-screen w-64 border-r border-gray-800/50 bg-gray-900/95 backdrop-blur-xl lg:sticky lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <span className="text-lg font-semibold">Navigation</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors lg:hidden"
          >
            <FontAwesomeIcon icon={faXmark as IconProp} className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  isActive 
                    ? "bg-blue-500/10 text-blue-500" 
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-100"
                }`}
              >
                <FontAwesomeIcon 
                  icon={item.icon as IconProp} 
                  className={`w-5 h-5 ${isActive ? "text-blue-500" : ""}`} 
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
} 