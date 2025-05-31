'use client';

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
import { usePathname, useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardNav() {
  const pathname = usePathname();
  const params = useParams();
  const siteId = params?.siteId as string;
  
  // Fixed navigation items in the specified order
  const navigationItems = [
    {
      id: "ai-builder",
      label: "AI Webbuilder",
      href: "/dashboard/builder",
      icon: faRobot,
      description: "Create with AI"
    },
    {
      id: "my-sites",
      label: "My Sites",
      href: "/dashboard",
      icon: faGlobe,
      description: "Manage your websites"
    },
    {
      id: "editor",
      label: "Editor",
      href: siteId ? `/dashboard/${siteId}/editor` : "#",
      icon: faPencil,
      description: "Edit your site",
      disabled: !siteId
    },
    {
      id: "domain",
      label: "Domain & Hosting",
      href: siteId ? `/dashboard/${siteId}/domain` : "#",
      icon: faServer,
      description: "Manage domains",
      disabled: !siteId
    },
    {
      id: "analytics",
      label: "Analytics",
      href: siteId ? `/dashboard/${siteId}/analytics` : "#",
      icon: faChartLine,
      description: "View statistics",
      disabled: !siteId
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

  // Function to check if a route is active
  const isActive = (href: string) => {
    if (href === "#") return false;
    if (href === "/dashboard" && pathname === "/dashboard") return true;
    if (href !== "/dashboard" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/50 backdrop-blur-xl border-b border-gray-800/50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="mr-8">
            <span className="text-xl font-bold text-blue-500">Codaiq</span>
          </Link>

          {/* Navigation Items */}
          <ul className="flex items-center gap-1">
            {navigationItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.id}>
                  <Link
                    href={item.disabled ? "#" : item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
                      "hover:bg-gray-800/50",
                      item.disabled && "opacity-50 cursor-not-allowed",
                      active ? "bg-blue-500/20 text-blue-500" : "text-gray-400 hover:text-gray-100"
                    )}
                    title={item.disabled ? "Select a site first" : item.description}
                    onClick={e => item.disabled && e.preventDefault()}
                  >
                    <FontAwesomeIcon 
                      icon={item.icon as IconProp} 
                      className={cn(
                        "w-4 h-4",
                        active ? "text-blue-500" : ""
                      )}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
} 