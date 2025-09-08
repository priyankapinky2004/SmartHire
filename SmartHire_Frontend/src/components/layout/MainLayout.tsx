import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Candidates", href: "/candidates", icon: UsersIcon },
    { name: "Assessments", href: "/assessments", icon: ClipboardIcon },
    { name: "Interviews", href: "/interviews", icon: CalendarIcon },
    { name: "Reports", href: "/reports", icon: ChartBarIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform md:translate-x-0 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:static md:inset-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 text-white font-bold text-xl border-b border-gray-700">
            AI Smart Hire
            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto mt-2 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-200" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-gray-700 p-4">
            <Link
              to="/profile"
              className="flex items-center space-x-3 text-sm text-white hover:text-gray-300"
            >
              <div className="bg-indigo-600 h-9 w-9 rounded-full flex items-center justify-center font-medium">
                HR
              </div>
              <div>
                <p className="font-medium">HR Admin</p>
                <p className="text-xs text-gray-400 group-hover:text-gray-300">
                  View profile
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        {/* Mobile menu button */}
        <div className="sticky top-0 z-30 bg-gray-100 px-4 py-3 border-b md:hidden">
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            ☰
          </button>
        </div>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;

// Icons
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2a5 5 0 00-10 0v2m0 0H2v-2a3 3 0 015.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const ClipboardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
);

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const ChartBarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm6 0v-10a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm-6 0a2 2 0 002 2h2a2 2 0 002-2"
    />
  </svg>
);
