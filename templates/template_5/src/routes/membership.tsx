import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import {
  ShieldCheck,
  Users,
  CheckCircle2,
  FileText,
  Heart,
  ArrowRight,
  Info,
  Lock,
} from "lucide-react";

export const Route = createFileRoute("/membership")({
  component: MembershipPage,
});

function MembershipPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    category: "ordinary",
    agreedToRules: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreedToRules) return;
    setSubmitted(true);
  };

  const categories = [
    {
      title: "Ordinary Member (Annual)",
      eligibility: "Residents of Victoria aged 18+",
      rights: [
        "Full voting rights at the Annual General Meeting (AGM)",
        "Eligibility to nominate and stand for Management Committee elections",
        "Direct receipt of official organizational bulletins and financial reports",
        "Priority registration for community festival celebrations and seminars",
      ],
      tag: "Active Governance",
    },
    {
      title: "Life Member",
      eligibility: "Devotees seeking permanent foundation patronage",
      rights: [
        "Lifetime voting rights at all General Meetings of the Association",
        "Permanent inscription on the Temple Foundation Patron Honour Roll",
        "Personal invitation to special consecration and Kumbhabhishekam yajnas",
        "Lifetime spiritual blessings and special archana sankalpams",
      ],
      tag: "Enduring Patronage",
    },
    {
      title: "Youth & Student Associate",
      eligibility: "Students and young adults aged 16–25",
      rights: [
        "Mentorship in Vedic philosophy, leadership, and public speaking",
        "Active involvement in Balagokulam teaching and cultural coordination",
        "Youth committee leadership initiatives and interfaith forums",
        "Free participation in all youth cultural seminars and workshops",
      ],
      tag: "Next Generation",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1817] flex flex-col">
      <SiteNavigation />

      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-[#F3ECE2] border-b border-[#E5DACD] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#DED4C7] text-[#7A1F2D] text-xs font-mono uppercase tracking-widest mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C49A45]" />
              Incorporated Association • ABN 13 397 829 440
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1817] tracking-tight leading-tight">
              Community <span className="text-maroon-gradient">Membership</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#554D46] leading-relaxed">
              Join Ballarat Hindu Temple & Cultural Centre Incorporated as a formal voting member and help steward our sacred regional institution into the future.
            </p>
          </div>
        </div>
      </section>

      {/* Statutory Model Rules Notice */}
      <section className="bg-white border-b border-[#E5DACD] py-3.5 px-4 text-xs font-mono text-[#554D46]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#7A1F2D] shrink-0" />
            <span>
              <strong>Model Rules Constitution:</strong> Membership admission and rights are governed strictly under the <em>Associations Incorporation Reform Act 2012</em> (Victoria).
            </span>
          </div>
          <Link to="/governance" className="text-[#7A1F2D] font-bold underline shrink-0">
            Review Governance Rules →
          </Link>
        </div>
      </section>

      {/* Membership Tiers Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#7A1F2D]">
              Membership Classes
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-[#1C1817]">
              Choose Your Form of Engagement
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#554D46]">
              All members participate in shaping democratic governance, preserving cultural traditions, and supporting community welfare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-[#E5DACD] shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#F3ECE2] text-[#7A1F2D]">
                      {cat.tag}
                    </span>
                    <span className="text-xs font-mono text-[#554D46]">Class</span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-[#1C1817] mb-2">{cat.title}</h3>
                  <div className="text-xs font-mono text-[#7A1F2D] mb-4">{cat.eligibility}</div>

                  <ul className="space-y-2.5 pt-4 border-t border-[#F3ECE2]">
                    {cat.rights.map((r, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#554D46] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#C49A45] shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F3ECE2] text-[11px] font-mono text-[#554D46]">
                  Annual dues ratified at AGM
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Application Form */}
      <section className="py-16 sm:py-24 bg-[#F3ECE2]/50 border-t border-[#E5DACD]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5DACD] shadow-xl">
            <div className="text-center max-w-lg mx-auto mb-8">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1F2D]">
                Application for Admission
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1817] mt-1">
                Apply for BHTCC Membership
              </h2>
              <p className="text-xs sm:text-sm text-[#554D46] mt-2">
                Applications are reviewed and approved by the Management Committee in accordance with Victorian Association Model Rules.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-emerald-900">
                  Membership Application Submitted
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800">
                  Thank you, <strong>{form.fullName}</strong>. Your application for <strong>{form.category}</strong> membership has been submitted to the Secretary. You will receive an official confirmation letter and AGM notice at <strong>{form.email}</strong> following the next committee meeting.
                </p>
                <div className="pt-2">
                  <Link
                    to="/login"
                    className="inline-block px-5 py-2.5 rounded-full bg-[#7A1F2D] text-white text-xs font-mono font-bold uppercase tracking-wider"
                  >
                    Access Member Portal →
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. member@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 0422 123 456"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Membership Category *
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D] bg-white"
                    >
                      <option value="ordinary">Ordinary Member (Annual)</option>
                      <option value="life">Life Member (Permanent Patron)</option>
                      <option value="youth">Youth & Student Associate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                    Residential Address (Victoria) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="e.g. 45 Mair St, Ballarat Central VIC 3350"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#554D46]">
                    <input
                      type="checkbox"
                      required
                      checked={form.agreedToRules}
                      onChange={(e) => setForm({ ...form, agreedToRules: e.target.checked })}
                      className="mt-0.5 rounded border-[#E5DACD] text-[#7A1F2D] focus:ring-[#7A1F2D]"
                    />
                    <span>
                      I agree to support the purposes of Ballarat Hindu Temple & Cultural Centre Incorporated and undertake to comply with the Association's Model Rules and Victorian statutory obligations.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#7A1F2D] hover:bg-[#5E1521] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.01]"
                >
                  Submit Membership Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
