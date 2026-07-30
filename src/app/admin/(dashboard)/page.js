import Link from "next/link";
import {
  Briefcase,
  Award,
  FolderKanban,
  MessageSquareQuote,
  Newspaper,
  Images,
  Trophy,
  Home,
  CalendarDays,
  Settings,
} from "lucide-react";
import { dbConnect } from "@/lib/mongodb";
import HomeContent from "@/models/HomeContent";

export default async function AdminDashboardPage() {
  await dbConnect();
  const home = await HomeContent.findOne({}).lean();

  const stats = [
    { label: "Practice Areas", count: home?.practice?.items?.length || 0, icon: Briefcase },
    { label: "Why Choose Reasons", count: home?.whyChoose?.items?.length || 0, icon: Award },
    { label: "Featured Cases", count: home?.featuredCases?.items?.length || 0, icon: FolderKanban },
    { label: "Testimonials", count: home?.testimonials?.items?.length || 0, icon: MessageSquareQuote },
    { label: "Articles", count: home?.latestUpdates?.articles?.length || 0, icon: Newspaper },
    { label: "Media Items", count: home?.latestUpdates?.media?.length || 0, icon: Images },
    { label: "Achievements", count: home?.latestUpdates?.achievements?.length || 0, icon: Trophy },
  ];

  const quickLinks = [
    { label: "Edit Hero Banner", href: "/admin/home/hero", icon: Home },
    { label: "Edit Practice Areas", href: "/admin/home/practice", icon: Briefcase },
    { label: "Book a Consultation Text", href: "/admin/home/bookingModal", icon: CalendarDays },
    { label: "Site Settings", href: "/admin/site-settings", icon: Settings },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EFF4FB]">
              <stat.icon size={22} className="text-[#07172E]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#07172E]">{stat.count}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-[#07172E]">Quick Links</h2>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 rounded-lg border border-[#07172E]/20 px-4 py-2.5 text-sm font-medium text-[#07172E] transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <link.icon size={16} className="text-[#D4AF37]" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
