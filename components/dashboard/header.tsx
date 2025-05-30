import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBars, faBell, faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserButton } from "@clerk/nextjs";
import DashboardNav from "./nav";
import MobileNav from "./mobile-nav";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faBars as IconProp} className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3">
              <FontAwesomeIcon 
                icon={faRocket as IconProp} 
                className="text-blue-400 w-6 h-6" 
              />
              <span className="text-xl font-bold hidden sm:inline-block">
                Codaiq
              </span>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
          </div>

          {/* Center section - Desktop Navigation */}
          <DashboardNav />

          {/* Right section */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors relative">
              <FontAwesomeIcon icon={faBell as IconProp} className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            
            <UserButton 
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
} 