import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faRobot,
  faGlobe,
  faPencil,
  faServer,
  faChartLine,
  faCog,
  faLifeRing
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function DashboardNav() {
  const pathname = usePathname();
  
  // Function to check if a route is active
  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") return true;
    if (href !== "/dashboard" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {navigationItems.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
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
            </li>
          );
        })}
      </ul>
    </nav>
  );
} 