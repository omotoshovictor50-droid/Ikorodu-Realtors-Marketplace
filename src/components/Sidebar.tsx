"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  FolderKanban,
  Users,
  FileText,
  Calendar,
  Activity,
  Building2,
  Handshake,
  Megaphone,
  FolderOpen,
  Settings,
  HelpCircle,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/properties", label: "Properties", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/offers", label: "Offers", icon: FileText },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/activities", label: "Activities", icon: Activity },
  { href: "/contacts", label: "Contacts & Organizations", icon: Building2 },
  { href: "/brokers", label: "Brokers & External Agents", icon: Handshake },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/documents", label: "Documents", icon: FolderOpen },
];

const bottomItems = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-gray-200 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
          <MapPin className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight text-gray-900">
            IKORODU REALTORS
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            Property Management
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4.5 w-4.5 shrink-0",
                      isActive ? "text-blue-600" : "text-gray-400"
                    )}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom nav */}
      <div className="border-t border-gray-200 px-3 py-3">
        <ul className="space-y-0.5">
          {bottomItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4.5 w-4.5 shrink-0",
                      isActive ? "text-blue-600" : "text-gray-400"
                    )}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
