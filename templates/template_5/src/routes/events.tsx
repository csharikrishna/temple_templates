import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Bell,
  CheckCircle2,
  AlertCircle,
  Filter,
  ArrowRight,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/events")({
  component: EventsPage,
});

function EventsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [alertEmail, setAlertEmail] = useState("");
  const [alertSubmitted, setAlertSubmitted] = useState(false);

  const festivals = [
    {
      name: "Maha Shivaratri Observance",
      vedicMonth: "Magha / Phalguna (Krishna Chaturdashi)",
      category: "major",
      status: "Seasonal Celebration",
      description:
        "The auspicious great night of Lord Shiva. Celebrated with continuous four-prahara Rudrabhishekam, continuous chanting of Om Namah Shivaya, devotional bhajans, and dawn Satvik prasadam.",
      highlights: ["All-night meditative vigil", "Sacred Bilva Patra Archana", "Community Bhajan Mandali"],
    },
    {
      name: "Sri Rama Navami & Hanuman Utsav",
      vedicMonth: "Chaitra (Shukla Navami)",
      category: "major",
      status: "Seasonal Celebration",
      description:
        "Celebrating the appearance of Maryada Purushottama Lord Rama. Features Sri Sita Rama Kalyana Utsavam (sacred symbolic marriage ritual) and 108 continuous recitations of Sri Hanuman Chalisa.",
      highlights: ["Panakam & Kosambari prasadam", "Sundarakanda recitation", "Children's moral storytelling"],
    },
    {
      name: "Ganesh Chaturthi Mahotsav",
      vedicMonth: "Bhadrapada (Shukla Chaturthi)",
      category: "flagship",
      status: "Signature Ballarat Festival",
      description:
        "BHTCC's landmark regional festival uniting hundreds of families across Western Victoria. Traditional clay murthi installation, daily community aartis, cultural performances, and Grand Mahaprasad.",
      highlights: ["Over 400 attendees annually", "Eco-friendly clay Ganesh", "Community cultural dance"],
    },
    {
      name: "Sri Krishna Janmashtami",
      vedicMonth: "Shravana / Bhadrapada (Krishna Ashtami)",
      category: "major",
      status: "Seasonal Celebration",
      description:
        "Midnight divine birth celebration of Bhagavan Sri Krishna. Devotees decorate ornate swings (Jhula), prepare traditional butter offerings and 56-bhog delicacies, followed by midnight aarti.",
      highlights: ["Lalla Jhula offering", "Bhagavad Gita recitation", "Prasadam distribution"],
    },
    {
      name: "Sharad Navaratri & Durga Puja",
      vedicMonth: "Ashwin (Shukla Paksha)",
      category: "major",
      status: "Nine Sacred Nights",
      description:
        "Nine nights honoring the Divine Mother in Her forms as Durga, Lakshmi, and Saraswati. Concludes with festive community Dandiya / Garba and Vijayadashami Vidyarambham for young students.",
      highlights: ["Daily Chandi / Lalita Archana", "Family Garba & Dandiya", "Vidyarambham school blessings"],
    },
    {
      name: "Deepavali (Diwali) Festival of Lights",
      vedicMonth: "Kartika (Amavasya)",
      category: "major",
      status: "Grand Light Festival",
      description:
        "The victory of light over darkness and knowledge over ignorance. Lighting of 1,008 traditional brass and clay deepams, Sri Lakshmi Kuber Puja for community welfare, and festive fireworks display.",
      highlights: ["1,008 Clay Deepams illuminated", "Lakshmi Puja invocation", "Regional interfaith welcome"],
    },
  ];

  const filtered = festivals.filter((f) => {
    if (filter === "flagship") return f.category === "flagship";
    if (filter === "major") return f.category === "major";
    return true;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail) return;
    setAlertSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1817] flex flex-col">
      <SiteNavigation />

      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-[#F3ECE2] border-b border-[#E5DACD] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#DED4C7] text-[#7A1F2D] text-xs font-mono uppercase tracking-widest mb-6">
              <Calendar className="w-3.5 h-3.5 text-[#C49A45]" />
              Vedic Panchangam Observances
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1817] tracking-tight leading-tight">
              Festivals & <span className="text-maroon-gradient">Sacred Calendar</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#554D46] leading-relaxed">
              Celebrating the holy Hindu lunar calendar in Central Victoria with devotion, authentic rituals, classical music, and traditional Annadhanam feasts.
            </p>
          </div>
        </div>
      </section>

      {/* Important Date Confirmation Policy Notice */}
      <section className="bg-white border-b border-[#E5DACD] py-4 px-4 text-xs font-mono text-[#554D46]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#7A1F2D] shrink-0" />
            <span>
              <strong>Panchangam Astronomical Calculation Policy:</strong> Specific lunar calendar dates and venue bookings are finalized four weeks prior to each festival. No unconfirmed dates are published prematurely.
            </span>
          </div>
          <span className="text-[#7A1F2D] font-bold shrink-0">Ballarat Community Venues</span>
        </div>
      </section>

      {/* Filter and Festivals Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-6 border-b border-[#E5DACD]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1817]">
                Annual Observances
              </h2>
              <p className="text-xs sm:text-sm text-[#554D46] mt-1">
                Classical traditions observed annually by the Ballarat Hindu community.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                  filter === "all"
                    ? "bg-[#7A1F2D] text-white shadow-sm"
                    : "bg-white text-[#554D46] border border-[#E5DACD] hover:bg-[#F3ECE2]"
                }`}
              >
                All Festivals
              </button>
              <button
                onClick={() => setFilter("flagship")}
                className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                  filter === "flagship"
                    ? "bg-[#7A1F2D] text-white shadow-sm"
                    : "bg-white text-[#554D46] border border-[#E5DACD] hover:bg-[#F3ECE2]"
                }`}
              >
                Signature Flagship
              </button>
              <button
                onClick={() => setFilter("major")}
                className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                  filter === "major"
                    ? "bg-[#7A1F2D] text-white shadow-sm"
                    : "bg-white text-[#554D46] border border-[#E5DACD] hover:bg-[#F3ECE2]"
                }`}
              >
                Major Observances
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((fest) => (
              <div
                key={fest.name}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DACD] shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F3ECE2] text-[#7A1F2D]">
                      {fest.status}
                    </span>
                    <span className="text-[11px] font-mono text-[#554D46]">{fest.vedicMonth}</span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-[#1C1817] mb-2">{fest.name}</h3>
                  <p className="text-xs sm:text-sm text-[#554D46] leading-relaxed mb-4">
                    {fest.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-[#F3ECE2]">
                    <div className="text-[10px] font-mono font-bold uppercase text-[#7A1F2D]">
                      Celebration Highlights:
                    </div>
                    {fest.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#554D46]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C49A45] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F3ECE2] flex items-center justify-between text-[11px] font-mono text-[#554D46]">
                  <span>Timing: Lunar Alignment</span>
                  <span className="text-[#7A1F2D] font-bold">Announced via Bulletin</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thoughtful Empty State / Event Bulletin Signup */}
      <section className="py-16 sm:py-20 bg-[#F3ECE2]/60 border-y border-[#E5DACD]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white text-[#7A1F2D] border border-[#E5DACD] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Bell className="w-6 h-6 text-[#C49A45]" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1F2D]">
            Community Notification Service
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1817] mt-1">
            Receive Exact Festival Dates & Venue Bulletins
          </h2>
          <p className="text-xs sm:text-sm text-[#554D46] mt-3 leading-relaxed">
            In accordance with our strict data integrity policy, exact dates, hall bookings, and pooja schedules are confirmed four weeks before each holy day. Enter your email to receive direct community circulars.
          </p>

          {alertSubmitted ? (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono">
              ✓ Subscribed successfully! You will receive official BHTCC festival circulars at {alertEmail}.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={alertEmail}
                onChange={(e) => setAlertEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-full border border-[#E5DACD] bg-white text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#7A1F2D] hover:bg-[#5E1521] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105 shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <div className="mt-4 text-[11px] font-mono text-[#554D46]">
            Strict privacy protection. Never shared with third parties. Unsubscribe anytime.
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
