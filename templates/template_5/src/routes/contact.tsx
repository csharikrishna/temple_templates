import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import gardensImage from "@/assets/vastu-gardens.jpg";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const travelRoutes = [
    {
      from: "From Ballarat CBD",
      time: "Approx. 12 Minutes",
      distance: "11 km",
      directions:
        "Head south along Albert St / Glenelg Highway (B160) through Sebastopol. Turn right onto Ross Creek Road, continue for 5 km, then turn onto Vaggs Road. The sanctuary entrance is on your left.",
    },
    {
      from: "From Melbourne CBD",
      time: "Approx. 90 Minutes",
      distance: "122 km",
      directions:
        "Take the Western Freeway (M8) west towards Ballarat. Take the exit for Midland Hwy (A300) / Glenelg Hwy south towards Sebastopol and Ross Creek. Smooth dual-carriageway highway driving.",
    },
    {
      from: "From Geelong & Bellarine",
      time: "Approx. 65 Minutes",
      distance: "82 km",
      directions:
        "Follow Midland Highway (A300) north-west towards Buninyong, turning west onto Buninyong-Mt Mercer Rd and Ross Creek Rd to connect to Vaggs Road.",
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
              <MapPin className="w-3.5 h-3.5 text-[#C49A45]" />
              110 Vaggs Rd, Ross Creek VIC 3351
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1817] tracking-tight leading-tight">
              Location & <span className="text-maroon-gradient">Inquiries</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#554D46] leading-relaxed">
              We welcome inquiries from community members, devotees, visitors, and civic organizations across Regional Victoria and Australia.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Compliance & Active Site Notice */}
      <section className="bg-amber-50 border-b border-amber-200 py-4 px-4 text-xs font-mono text-amber-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-800 shrink-0" />
            <span>
              <strong>Construction Site Safety Protocol:</strong> 110 Vaggs Rd is an active civil engineering site. On-site access is restricted to scheduled community working bees and open days with site safety inductions.
            </span>
          </div>
          <span className="font-bold shrink-0">Safety First</span>
        </div>
      </section>

      {/* Main Grid: Form & Contact Info */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Contact Details & Siting */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1F2D]">
                  Sanctuary Coordinates
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1817] mt-1">
                  110 Vaggs Rd, Ross Creek
                </h2>
                <p className="text-xs sm:text-sm text-[#554D46] mt-2 leading-relaxed">
                  Located in the Golden Plains Shire, just 12 minutes south-west of Ballarat Central. 5 serene acres surrounded by native Australian gum trees.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-[#E5DACD] flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#F3ECE2] text-[#7A1F2D] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#1C1817]">Sanctuary Site</h4>
                    <p className="text-xs text-[#554D46] mt-0.5">
                      110 Vaggs Road, Ross Creek VIC 3351<br />
                      Golden Plains Shire, Victoria
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E5DACD] flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#F3ECE2] text-[#7A1F2D] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#1C1817]">General & Seva Email</h4>
                    <p className="text-xs text-[#554D46] mt-0.5">
                      contact@ballarat-hindu-temple.org.au<br />
                      treasurer@ballarat-hindu-temple.org.au
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E5DACD] flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#F3ECE2] text-[#7A1F2D] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#1C1817]">Statutory Entity</h4>
                    <p className="text-xs text-[#554D46] mt-0.5">
                      Ballarat Hindu Temple & Cultural Centre Inc<br />
                      ABN: 13 397 829 440 | Reg: A0096238K
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo Card */}
              <div className="rounded-3xl overflow-hidden border border-[#E5DACD] shadow-md bg-white">
                <img
                  src={gardensImage}
                  alt="Tranquil bushland surroundings of 110 Vaggs Rd, Ross Creek"
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4 text-xs font-mono text-[#554D46]">
                  Quiet country serenity in Ross Creek, Victoria.
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5DACD] shadow-xl">
                <div className="mb-8">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1F2D]">
                    Direct Communication
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1817] mt-1">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-[#554D46] mt-2">
                    Our volunteer committee will respond to your message promptly.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-serif font-bold text-lg text-emerald-900">
                      Message Received
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-800">
                      Thank you, <strong>{form.name}</strong>. Your inquiry has been delivered to the BHTCC management team. A representative will contact you at <strong>{form.email}</strong>.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 rounded-full bg-emerald-700 text-white text-xs font-mono"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="e.g. Rahul Verma"
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
                          placeholder="e.g. rahul@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="e.g. 0400 111 222"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                          Inquiry Topic *
                        </label>
                        <select
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D] bg-white"
                        >
                          <option value="general">General Community Question</option>
                          <option value="building-fund">Building Fund & Bank EFT Transfer</option>
                          <option value="pooja">Priest Services & Family Blessing</option>
                          <option value="membership">Membership Application</option>
                          <option value="volunteer">Volunteer Seva Opportunity</option>
                          <option value="civic">Civic / Interfaith / Media Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                        Your Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Write your message or question here..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-[#7A1F2D] hover:bg-[#5E1521] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.01]"
                    >
                      Send Message to Committee
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driving Directions Section */}
      <section className="py-16 bg-[#F3ECE2]/50 border-t border-[#E5DACD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#7A1F2D]">
              Pilgrimage Routes
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-[#1C1817]">
              Travel Directions to Ross Creek
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#554D46]">
              Easily accessible via sealed arterial roads across regional Victoria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {travelRoutes.map((rt) => (
              <div
                key={rt.from}
                className="bg-white rounded-3xl p-6 border border-[#E5DACD] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#7A1F2D] uppercase">
                      {rt.time}
                    </span>
                    <span className="text-[11px] font-mono text-[#554D46]">{rt.distance}</span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#1C1817] mb-2">{rt.from}</h4>
                  <p className="text-xs text-[#554D46] leading-relaxed">{rt.directions}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#F3ECE2] text-[11px] font-mono text-[#C49A45]">
                  GPS: 110 Vaggs Rd, Ross Creek VIC 3351
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
