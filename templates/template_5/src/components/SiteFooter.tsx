import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Copy, Check, Heart, ShieldCheck, Mail, MapPin, ExternalLink, ArrowRight } from "lucide-react";

export function SiteFooter() {
  const [copiedBsb, setCopiedBsb] = useState(false);
  const [copiedAcc, setCopiedAcc] = useState(false);

  const copyToClipboard = (text: string, type: "bsb" | "acc") => {
    navigator.clipboard.writeText(text);
    if (type === "bsb") {
      setCopiedBsb(true);
      setTimeout(() => setCopiedBsb(false), 2000);
    } else {
      setCopiedAcc(true);
      setTimeout(() => setCopiedAcc(false), 2000);
    }
  };

  return (
    <footer className="bg-[#1C1817] text-[#FAF8F5] pt-16 pb-12 border-t border-[#7A1F2D]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Identity & Legal Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#7A1F2D] text-[#C49A45] flex items-center justify-center font-serif text-xl border border-[#C49A45]/30">
                ॐ
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#FAF8F5]">
                  Ballarat Hindu Temple
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-[#C49A45]">
                  & Cultural Centre Incorporated
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#FAF8F5]/80 leading-relaxed">
              Establishing Regional Victoria's permanent Vedic spiritual home and cultural sanctuary across 5 peaceful acres at 110 Vaggs Rd, Ross Creek. Consecrated to timeless Sanatana Dharma values of peace, seva, and universal community harmony.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono space-y-1.5">
              <div className="text-[#C49A45] font-bold">Statutory Incorporated Details:</div>
              <div className="text-white/80">ABN: 13 397 829 440</div>
              <div className="text-white/80">Victorian Association Reg: A0096238K</div>
              <div className="text-white/80">Golden Plains Shire Planning Zone: Place of Worship</div>
            </div>
          </div>

          {/* Column 2: Sanctuary & Project */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#C49A45]">
              Sanctuary
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#FAF8F5]/80">
              <li>
                <Link to="/our-story" className="hover:text-white transition-colors">
                  Our Story & Roots
                </Link>
              </li>
              <li>
                <Link to="/temple-project" className="hover:text-white transition-colors">
                  5-Acre Masterplan
                </Link>
              </li>
              <li>
                <Link to="/worship" className="hover:text-white transition-colors">
                  Consecrated Deities
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors">
                  Sanctum Visual Gallery
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  Festivals & Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Community & Seva */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#C49A45]">
              Community
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#FAF8F5]/80">
              <li>
                <Link to="/community" className="hover:text-white transition-colors">
                  Satvik Annadhanam Kitchen
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-white transition-colors">
                  Volunteer Seva
                </Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-white transition-colors">
                  Ordinary & Life Membership
                </Link>
              </li>
              <li>
                <Link to="/donations" className="hover:text-white transition-colors">
                  Temple Building Fund
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Location & Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: CBA Direct Building Fund Box */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#C49A45]">
              Building Fund EFT
            </h4>
            <div className="p-4 rounded-2xl bg-[#7A1F2D]/20 border border-[#7A1F2D]/50 text-xs font-mono space-y-2">
              <div className="text-[11px] text-[#FAF8F5]/70">Commonwealth Bank of Australia (CBA)</div>
              <div>
                <span className="text-white/60 text-[10px] block">Account Name:</span>
                <span className="font-bold text-white text-[11px]">Ballarat Hindu Temple & Cultural Centre Inc</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-white/60 text-[10px] block">BSB:</span>
                  <span className="font-bold text-[#C49A45]">063-500</span>
                </div>
                <button
                  onClick={() => copyToClipboard("063-500", "bsb")}
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] text-white flex items-center gap-1 transition-all"
                >
                  {copiedBsb ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedBsb ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-white/60 text-[10px] block">Account No:</span>
                  <span className="font-bold text-[#C49A45]">1089 4231</span>
                </div>
                <button
                  onClick={() => copyToClipboard("10894231", "acc")}
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] text-white flex items-center gap-1 transition-all"
                >
                  {copiedAcc ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedAcc ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <div className="text-[10px] text-white/50 italic pt-1">
                Zero merchant fee deductions via EFT.
              </div>
            </div>
          </div>
        </div>

        {/* Media & Architectural Disclaimer Bar */}
        <div className="py-6 border-b border-white/10 text-[11px] sm:text-xs text-white/60 leading-relaxed">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="font-mono text-[#C49A45] font-semibold uppercase tracking-wider shrink-0">
              [Notice on Architectural Visuals]:
            </span>
            <span>
              All 3D perspective representations of the completed temple complex are conceptual architectural renderings illustrating the Shilpa Shastra masterplan vision. Phase 1 civil groundworks, driveway engineering, and drainage are currently underway at 110 Vaggs Rd, Ross Creek VIC.
            </span>
          </div>
        </div>

        {/* Traditional Owners Acknowledgement */}
        <div className="py-6 border-b border-white/10 text-[11px] sm:text-xs text-white/60 leading-relaxed">
          <span className="text-[#C49A45] font-semibold">Acknowledgement of Country: </span>
          The Ballarat Hindu Temple & Cultural Centre respectfully acknowledges the Wadawurrung people of the Kulin Nation, the Traditional Custodians of the sacred lands and waterways upon which our sanctuary is rising. We pay our deep respects to their Elders past, present, and emerging.
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
          <div>
            © {new Date().getFullYear()} Ballarat Hindu Temple & Cultural Centre Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/governance" className="hover:text-white transition-colors">
              Model Rules & Governance
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Inquiries
            </Link>
            <span>•</span>
            <Link to="/login" className="hover:text-white transition-colors">
              Member Sign-In
            </Link>
            <span>•</span>
            <Link to="/admin" className="hover:text-white transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
