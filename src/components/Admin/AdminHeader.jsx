"use client";

import { usePathname } from "next/navigation";
import { User, ExternalLink, Menu } from "lucide-react";
import { sections } from "@/lib/adminSections";
import LogoutButton from "./LogoutButton";

function titleForPath(pathname) {
  if (pathname === "/admin") return "Dashboard";
  if (pathname === "/admin/site-settings") return sections.siteSettings.label;

  const match = pathname.match(/^\/admin\/home\/([^/]+)/);
  if (match && sections[match[1]]) {
    return sections[match[1]].label;
  }

  return "Admin";
}

export default function AdminHeader({ email, onMenuClick }) {
  const pathname = usePathname();
  const title = titleForPath(pathname);

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="text-[#07172E] lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-xl font-bold text-[#07172E]">{title}</h1>
      </div>

      <div className="flex items-center gap-5 text-sm">
        <span className="hidden items-center gap-1.5 text-gray-600 sm:flex">
          <User size={16} className="text-[#07172E]" />
          {email || "Site Admin"}
        </span>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#07172E] hover:text-[#D4AF37] transition-colors"
        >
          <ExternalLink size={16} />
          View Site
        </a>

        <LogoutButton />
      </div>
    </header>
  );
}
