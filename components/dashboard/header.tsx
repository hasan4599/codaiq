'use client';

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBars, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Mail, MailOpen } from "lucide-react";
import { Fetch } from "@/hooks/fetch";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

// Mock notification data
const mockNotifications = [
  { id: 1, text: "Welcome to the dashboard!", isRead: true, time: "2d ago" },
  { id: 2, text: "You have a new message.", isRead: false, time: "1h ago" },
  { id: 3, text: "Deployment completed.", isRead: true, time: "3d ago" },
];

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<{ email: string, name: string, image: string } | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    signOut({ callbackUrl: "/sign-in" });
  };

  const hasUnread = mockNotifications.some((n) => !n.isRead);

  useEffect(() => {
    try {
      setLoading(true)
      const handle = async () => {
        const response = await Fetch({ body: '', api: 'get/user/selected', method: "GET", host: 'server', loading: (v) => { } })
        if (response !== null) {
          setUser({
            name: response.fullName,
            email: response.email,
            image: response.avatarUrl
          })
        }
      }
      handle();
    } finally {
      setLoading(false)
    }
  }, []);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }

      if (
        notifDropdownRef.current &&
        !notifDropdownRef.current.contains(event.target as Node)
      ) {
        setShowNotificationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-xl">
      <div className="px-4 w-full">
        <div className="flex h-16 items-center justify-between gap-4 w-full">
          {/* Left section - Mobile Menu */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faBars as IconProp} className="w-5 h-5" />
          </button>

          {/* Right section */}
          <div className="flex items-center gap-4 w-full justify-end">
            {/* Notification Button */}
            <div className="relative" ref={notifDropdownRef}>
              <button
                onClick={() => setShowNotificationDropdown((prev) => !prev)}
                className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors relative"
                aria-label="Notifications"
              >
                <FontAwesomeIcon icon={faBell as IconProp} className="w-5 h-5" />
                {hasUnread && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </button>
              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-3 text-sm text-white z-50 min-w-[350px] w-full max-w-sm">
                  <p className="text-sm text-gray-300 mb-2 font-semibold">Notifications</p>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {mockNotifications.length > 0 ? (
                      mockNotifications.map((n) => (
                        <div
                          key={n.id}
                          className={`flex items-start justify-between px-3 py-2 rounded-md ${n.isRead ? "text-gray-400" : "bg-blue-500/10 text-white"
                            }`}
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium">{n.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                          </div>
                          <div className="ml-3 mt-1">
                            {n.isRead ? (
                              <MailOpen size={16} className="text-gray-500" />
                            ) : (
                              <Mail size={16} className="text-blue-500" />
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400">No notifications.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setShowUserDropdown((prev) => !prev)}
                  className="w-8 h-8 rounded-full overflow-hidden border border-gray-700 hover:ring-2 hover:ring-blue-500 transition-all"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-white" />
                  )}
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg text-sm text-white z-50 w-64">
                    <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-3">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt="User avatar"
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700">
                          <FontAwesomeIcon icon={faUser} className="text-white w-5 h-5" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-semibold">{user.name}</span>
                        <span className="text-xs text-gray-400">{user.email}</span>
                      </div>
                    </div>

                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left hover:bg-gray-700 px-3 py-2 rounded-md transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push("/sign-in")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
