import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Menu,
  X,
  Volume2,
  Heart,
  User,
  ChevronDown,
  Building,
  Sparkles,
  BookOpen,
  Calendar,
  Image as ImageIcon,
  ShieldCheck,
  Mail,
  Users,
} from "lucide-react";
import { playTempleBell } from "@/lib/temple-audio";

export function SiteNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [bellRinging, setBellRinging] = useState(false);
  const location = useLocation();

  const handleRingBell = () => {
    playTempleBell();
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 2400);
  };

  const navGroups = [
    {
      title: "Sanctuary",
      items: [
        { label: "Our Story", href: "/our-story", desc: "Ballarat diaspora heritage (2016–2026)", icon: BookOpen },
        { label: "Temple Project", href: "/temple-project", desc: "5-acre masterplan & stone masonry", icon: Building },
        { label: "Worship & Deities", href: "/worship", desc: "Consecrated sanctums & sacred rituals", icon: Sparkles },
      ],
    },
    {
      title: "Community",
      items: [
        { label: "Community & Seva", href: "/community", desc: "Satvik Annadhanam & regional care", icon: Users },
        { label: "Festivals & Events", href: "/events", desc: "Annual Panchangam celebrations", icon: Calendar },
        { label: "Visual Gallery", href: "/gallery", desc: "Sanctum & landscape photo archives", icon: ImageIcon },
      ],
    },
    {
      title: "Support",
      items: [
        { label: "Building Fund", href: "/donations", desc: "CBA direct bank transfer (EFT)", icon: Heart },
        { label: "Membership", href: "/membership", desc: "Join as an Ordinary or Life Member", icon: ShieldCheck },
        { label: "Volunteer Seva", href: "/volunteer", desc: "Offer your time & skills", icon: Users },
      ],
    },
    {
      title: "Trust",
      items: [
        { label: "Governance & Rules", href: "/governance", desc: "ABN, Model Rules & transparency", icon: ShieldCheck },
        { label: "Contact & Visit", href: "/contact", desc: "110 Vaggs Rd directions & inquiries", icon: Mail },
      ],
    },
  ];

  return (
    <>
      {/* Top Sacred Announcement Bar */}
      <div className="bg-[#5E1521] text-[#FAF8F5] text-[11px] sm:text-xs py-1.5 px-4 font-mono tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45] animate-pulse"></span>
            <span>PHASE 1 CIVIL SITE WORKS UNDERWAY • 110 VAGGS RD, ROSS CREEK VIC</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] sm:text-[11px] text-[#FAF8F5]/80">
            <span>ABN: 13 397 829 440</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">VICTORIAN ASSOC: A0096238K</span>
            <Link to="/governance" className="underline hover:text-[#C49A45] transition-colors">
              Disclosures
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DACD] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Sacred Crest & Brand */}
            <Link to="/" className="flex items-center gap-3.5 group text-left">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#7A1F2D] to-[#5E1521] text-[#C49A45] flex items-center justify-center font-serif text-xl sm:text-2xl shadow-md border border-[#C49A45]/30 group-hover:scale-105 transition-transform">
                ॐ
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base sm:text-lg text-[#1C1817] leading-tight tracking-tight group-hover:text-[#7A1F2D] transition-colors">
                  Ballarat Hindu Temple
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#7A1F2D]">
                  & Cultural Centre • Ross Creek
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navGroups.map((group) => (
                <div
                  key={group.title}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(group.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono font-medium tracking-wide uppercase transition-all ${
                      group.items.some((item) => location.pathname === item.href)
                        ? "text-[#7A1F2D] bg-[#F3ECE2] font-semibold"
                        : "text-[#554D46] hover:text-[#7A1F2D] hover:bg-[#F3ECE2]/60"
                    }`}
                  >
                    <span>{group.title}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#554D46]/70 group-hover:rotate-180 transition-transform" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 w-64 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                    <div className="bg-white rounded-2xl p-2 shadow-xl border border-[#E5DACD] ring-1 ring-black/5">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isCurrent = location.pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                              isCurrent
                                ? "bg-[#FAF8F5] text-[#7A1F2D]"
                                : "hover:bg-[#FAF8F5] text-[#1C1817]"
                            }`}
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#F3ECE2] text-[#7A1F2D] flex items-center justify-center shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-serif font-bold text-[#1C1817]">
                                {item.label}
                              </div>
                              <div className="text-[11px] text-[#554D46] leading-tight">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2.5">
              {/* Sacred Bell Button */}
              <button
                onClick={handleRingBell}
                title="Ring Sacred Temple Bell (Web Audio synthesized 432Hz)"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#DED4C7] bg-white text-[#7A1F2D] text-xs font-mono font-medium hover:bg-[#F3ECE2] transition-all hover:scale-105 shadow-sm ${
                  bellRinging ? "ring-2 ring-[#C49A45] scale-105 bg-[#F3ECE2]" : ""
                }`}
              >
                <Volume2 className={`w-3.5 h-3.5 text-[#C49A45] ${bellRinging ? "animate-bounce" : ""}`} />
                <span className="hidden xl:inline">{bellRinging ? "Resonating..." : "Ring Bell"}</span>
              </button>

              {/* Member Sign-In */}
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#DED4C7] bg-white text-[#1C1817] text-xs font-mono font-medium hover:bg-[#F3ECE2] transition-all hover:scale-105"
              >
                <User className="w-3.5 h-3.5 text-[#7A1F2D]" />
                <span>Portal</span>
              </Link>

              {/* Building Fund Primary CTA */}
              <Link
                to="/donations"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7A1F2D] hover:bg-[#5E1521] text-[#FAF8F5] text-xs font-mono font-semibold uppercase tracking-wider transition-all shadow-md hover:scale-105 hover:shadow-lg"
              >
                <Heart className="w-3.5 h-3.5 text-[#C49A45] fill-current" />
                <span>Building Fund</span>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={handleRingBell}
                className="p-2 rounded-xl bg-white border border-[#E5DACD] text-[#7A1F2D] hover:bg-[#F3ECE2]"
                aria-label="Ring Temple Bell"
              >
                <Volume2 className="w-4 h-4 text-[#C49A45]" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-white border border-[#E5DACD] text-[#1C1817] hover:bg-[#F3ECE2] transition-colors"
                aria-label="Open navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#7A1F2D]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E5DACD] bg-[#FAF8F5] max-h-[85vh] overflow-y-auto px-4 py-5 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              <Link
                to="/donations"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-[#7A1F2D] text-[#FAF8F5] text-xs font-mono font-bold uppercase tracking-wider text-center shadow-md"
              >
                <Heart className="w-3.5 h-3.5 text-[#C49A45] fill-current" />
                Building Fund
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-white border border-[#DED4C7] text-[#1C1817] text-xs font-mono font-bold uppercase tracking-wider text-center"
              >
                <User className="w-3.5 h-3.5 text-[#7A1F2D]" />
                Member Sign In
              </Link>
            </div>

            {/* Navigation Sections */}
            <div className="space-y-4">
              {navGroups.map((group) => (
                <div key={group.title} className="bg-white rounded-2xl p-3 border border-[#E5DACD]">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#7A1F2D] px-2 mb-1.5">
                    {group.title}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isCurrent = location.pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between p-2 rounded-xl transition-all ${
                            isCurrent
                              ? "bg-[#FAF8F5] text-[#7A1F2D] font-bold"
                              : "text-[#1C1817] hover:bg-[#FAF8F5]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-lg bg-[#F3ECE2] text-[#7A1F2D] flex items-center justify-center">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-serif">{item.label}</span>
                          </div>
                          <span className="text-[10px] text-[#554D46]">{item.desc.split(" ")[0]}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Contact & Bank Details Footer inside mobile drawer */}
            <div className="mt-5 p-3.5 rounded-2xl bg-[#F3ECE2] border border-[#E5DACD] text-center">
              <div className="text-[11px] font-serif font-bold text-[#1C1817]">110 Vaggs Rd, Ross Creek VIC</div>
              <div className="text-[10px] font-mono text-[#554D46] mt-0.5">
                CBA Building Fund: BSB 063-500 | Acc 1089 4231
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
