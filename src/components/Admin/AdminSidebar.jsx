"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Menu,
  CalendarDays,
  ClipboardList,
  ShieldAlert,
  Home,
  BarChart3,
  UserRound,
  Briefcase,
  Award,
  FolderKanban,
  MessageSquareQuote,
  Newspaper,
  CalendarCheck,
  MapPin,
  Settings,
  PanelTop,
  Trophy,
  FileStack,
  Gavel,
  X,
} from "lucide-react";
import { groups, sections } from "@/lib/adminSections";

const sectionIcons = {
  navbar: Menu,
  bookingModal: CalendarDays,
  consultationForm: CalendarDays,
  inquiries: ClipboardList,
  disclaimer: ShieldAlert,
  hero: Home,
  stats: BarChart3,
  about: UserRound,
  practice: Briefcase,
  whyChoose: Award,
  featuredCases: FolderKanban,
  testimonials: MessageSquareQuote,
  latestUpdates: Newspaper,
  consultationBanner: CalendarCheck,
  contactSection: MapPin,
  siteSettings: Settings,
  pageHero: PanelTop,
  recognitions: Trophy,
  caseStudiesPage: FileStack,
  courtExperiencePage: Gavel,
};

function sectionHref(sectionKey) {
  const section = sections[sectionKey];
  if (section.model === "consultationForm") return "/admin/consultation-form";
  if (section.model === "inquiries") return "/admin/crm/inquiries";
  return section.model === "settings" ? "/admin/site-settings" : `/admin/home/${sectionKey}`;
}

export default function AdminSidebar({ mobileOpen, onClose }) {
  const pathname = usePathname();

  const nav = (
    <nav className="px-3 py-4">
      <SidebarLink
        href="/admin"
        label="Dashboard"
        icon={LayoutDashboard}
        active={pathname === "/admin"}
        onNavigate={onClose}
      />

      {groups.map((group) => (
        <div key={group.key} className="mt-5">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
            {group.label}
          </p>
          <div className="mt-2 space-y-0.5">
            {group.sections.map((sectionKey) => {
              const section = sections[sectionKey];
              const href = sectionHref(sectionKey);
              const Icon = sectionIcons[sectionKey] || Settings;

              return (
                <SidebarLink
                  key={sectionKey}
                  href={href}
                  label={section.navLabel || section.label}
                  icon={Icon}
                  active={pathname === href}
                  onNavigate={onClose}
                />
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  const brand = (
    <div className="flex items-start justify-between border-b border-white/10 px-6 py-6">
      <div>
        <h1 className="text-lg font-bold leading-snug text-white">
          Shashank Shekhar Tripathi
        </h1>
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#D4AF37]">
          Admin Panel
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-white/70 hover:text-white lg:hidden"
        aria-label="Close menu"
      >
        <X size={22} />
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-full w-72 shrink-0 overflow-y-auto bg-[#07172E] text-white lg:block">
        {brand}
        {nav}
      </aside>

      {/* Mobile overlay sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <aside className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-[#07172E] text-white shadow-2xl">
            {brand}
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}

function SidebarLink({ href, label, icon: Icon, active, onNavigate }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
        active
          ? "bg-[#0f2748] text-white border-l-2 border-[#D4AF37]"
          : "text-white/70 hover:bg-[#0f2748]/60 hover:text-white border-l-2 border-transparent"
      }`}
    >
      <Icon size={17} className="shrink-0 text-[#D4AF37]" />
      <span className="truncate">{label}</span>
    </Link>
  );
}
