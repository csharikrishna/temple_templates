import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Heart,
  Users,
  Utensils,
  Trees,
  Calendar,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/volunteer")({
  component: VolunteerPage,
});

function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    availability: "weekends",
    areas: [] as string[],
    hasWwcc: "no",
    comments: "",
  });

  const sevaRoles = [
    {
      id: "kitchen",
      title: "Annadhanam & Kitchen Seva",
      desc: "Vegetable chopping, Satvik meal preparation, banana leaf prasadam service, and post-event kitchen cleaning.",
      icon: Utensils,
    },
    {
      id: "grounds",
      title: "5-Acre Parkland & Tree Care",
      desc: "Landscaping, watering young native eucalyptus trees, bushland path clearing, and conservation work at Ross Creek.",
      icon: Trees,
    },
    {
      id: "events",
      title: "Festival Logistics & Hospitality",
      desc: "Floral garland making, mandapa stage decoration, parking marshaling, and welcoming elderly devotees.",
      icon: Calendar,
    },
    {
      id: "education",
      title: "Youth Balagokulam Mentoring",
      desc: "Assisting teachers with Sanskrit chanting, cultural storytelling, classical dance, and children's crafts.",
      icon: GraduationCap,
    },
    {
      id: "professional",
      title: "Professional & Technical Skills",
      desc: "Civil engineering, accounting, legal compliance, web development, photography, and audio engineering.",
      icon: Briefcase,
    },
  ];

  const toggleArea = (id: string) => {
    if (form.areas.includes(id)) {
      setForm({ ...form, areas: form.areas.filter((a) => a !== id) });
    } else {
      setForm({ ...form, areas: [...form.areas, id] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1817] flex flex-col">
      <SiteNavigation />

      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-[#F3ECE2] border-b border-[#E5DACD] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#DED4C7] text-[#7A1F2D] text-xs font-mono uppercase tracking-widest mb-6">
              <Heart className="w-3.5 h-3.5 text-[#C49A45] fill-current" />
              Nishkama Karma • Selfless Service
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1817] tracking-tight leading-tight">
              Volunteer <span className="text-maroon-gradient">Seva</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#554D46] leading-relaxed">
              Every flower threaded, meal cooked, tree planted, and child taught is an offering of selfless love that enriches our regional Victorian community.
            </p>
          </div>
        </div>
      </section>

      {/* Seva Philosophy Quote */}
      <section className="bg-white border-b border-[#E5DACD] py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif italic text-base sm:text-lg text-[#7A1F2D]">
            "मानव सेवा ही माधव सेवा है — Service to humanity is truly service to the Divine."
          </p>
          <span className="text-xs font-mono text-[#554D46] mt-1 block">
            Guiding Tenet of the BHTCC Volunteer Guild
          </span>
        </div>
      </section>

      {/* Roles Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#7A1F2D]">
              Areas of Service
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-[#1C1817]">
              Where Can You Offer Your Seva?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#554D46]">
              No previous experience is required — simply an earnest heart and willingness to contribute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sevaRoles.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DACD] shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#F3ECE2] text-[#7A1F2D] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-[#1C1817] mb-2">{role.title}</h3>
                    <p className="text-xs sm:text-sm text-[#554D46] leading-relaxed">{role.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#F3ECE2] text-[11px] font-mono text-[#7A1F2D] font-bold">
                    Join Team in Registration Form Below ↓
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Volunteer Registration Form */}
      <section className="py-16 sm:py-24 bg-[#F3ECE2]/50 border-t border-[#E5DACD]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5DACD] shadow-xl">
            <div className="text-center max-w-lg mx-auto mb-8">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1F2D]">
                Volunteer Enrolment
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1817] mt-1">
                Register as a BHTCC Volunteer
              </h2>
              <p className="text-xs sm:text-sm text-[#554D46] mt-2">
                Join our roster of dedicated regional community volunteers.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-emerald-900">
                  Welcome to the Seva Family
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800">
                  Thank you, <strong>{form.name}</strong>. Your volunteer registration has been forwarded to our Seva Coordinators. We will contact you at <strong>{form.email}</strong> ahead of our next community event or grounds working bee.
                </p>
                <div className="pt-2">
                  <Link
                    to="/events"
                    className="inline-block px-5 py-2.5 rounded-full bg-[#7A1F2D] text-white text-xs font-mono font-bold uppercase tracking-wider"
                  >
                    View Upcoming Community Events →
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Meera Raman"
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
                      placeholder="e.g. volunteer@example.com"
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
                      placeholder="e.g. 0433 987 654"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      General Availability *
                    </label>
                    <select
                      value={form.availability}
                      onChange={(e) => setForm({ ...form, availability: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D] bg-white"
                    >
                      <option value="weekends">Weekends Only (Saturdays / Sundays)</option>
                      <option value="weekdays">Weekdays (Mornings or Evenings)</option>
                      <option value="festivals">Major Festivals Only</option>
                      <option value="flexible">Flexible / As Needed</option>
                    </select>
                  </div>
                </div>

                {/* Seva Areas Selection */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-2">
                    Select Preferred Seva Areas (Check all that apply):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {sevaRoles.map((role) => (
                      <button
                        type="button"
                        key={role.id}
                        onClick={() => toggleArea(role.id)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                          form.areas.includes(role.id)
                            ? "border-[#7A1F2D] bg-[#F3ECE2] text-[#7A1F2D] font-bold"
                            : "border-[#E5DACD] bg-white text-[#554D46] hover:bg-[#FAF8F5]"
                        }`}
                      >
                        <span>{role.title}</span>
                        {form.areas.includes(role.id) && (
                          <CheckCircle2 className="w-4 h-4 text-[#7A1F2D]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Working with Children Check (WWCC) */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DACD] text-xs space-y-2">
                  <div className="font-mono font-bold text-[#7A1F2D]">
                    Victorian Child Safety Compliance:
                  </div>
                  <p className="text-[#554D46]">
                    Do you currently hold an active Victorian Working with Children Check (WWCC)? (Required for Balagokulam youth mentoring roles).
                  </p>
                  <div className="flex gap-4 pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="wwcc"
                        value="yes"
                        checked={form.hasWwcc === "yes"}
                        onChange={() => setForm({ ...form, hasWwcc: "yes" })}
                        className="text-[#7A1F2D]"
                      />
                      <span>Yes (Active Card)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="wwcc"
                        value="no"
                        checked={form.hasWwcc === "no"}
                        onChange={() => setForm({ ...form, hasWwcc: "no" })}
                        className="text-[#7A1F2D]"
                      />
                      <span>Not Yet / Willing to Apply</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                    Special Skills or Additional Comments
                  </label>
                  <textarea
                    rows={2}
                    value={form.comments}
                    onChange={(e) => setForm({ ...form, comments: e.target.value })}
                    placeholder="Tell us about your background, culinary skills, machinery experience, or musical talents..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#7A1F2D] hover:bg-[#5E1521] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.01]"
                >
                  Submit Volunteer Registration
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
