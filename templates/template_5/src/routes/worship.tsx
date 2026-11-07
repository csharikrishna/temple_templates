import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import shivaImage from "@/assets/sanctum-shiva.jpg";
import ganeshaImage from "@/assets/sanctum-ganesha.jpg";
import lampImage from "@/assets/temple-brass-lamp.jpg";
import bellImage from "@/assets/temple-bell-brass.jpg";
import { playTempleBell } from "@/lib/temple-audio";
import {
  Sparkles,
  Calendar,
  Clock,
  Heart,
  Volume2,
  AlertCircle,
  CheckCircle2,
  Mail,
  ArrowRight,
  ShieldCheck,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/worship")({
  component: WorshipPage,
});

function WorshipPage() {
  const [bellRinging, setBellRinging] = useState(false);
  const [poojaSubmitted, setPoojaSubmitted] = useState(false);
  const [poojaForm, setPoojaForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "archana",
    preferredDate: "",
    notes: "",
  });

  const handleRingBell = () => {
    playTempleBell();
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 2400);
  };

  const handlePoojaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPoojaSubmitted(true);
  };

  const deities = [
    {
      name: "Lord Shiva (Mahadeva)",
      sanskrit: "ॐ नमः शिवाय",
      title: "Presiding Cosmic Sanctum",
      image: shivaImage,
      description:
        "Worshipped as the sacred Shivalinga, representing timeless unmanifest reality, boundless compassion, and peaceful stillness. Sanctum abhishek includes pure water, milk, sandalwood, and fresh Bilva leaves.",
      significance: "Removes ignorance, grants inner peace, spiritual liberation (Moksha), and profound mental focus.",
      festivals: "Maha Shivaratri, Pradosham, Shravan Mondays",
    },
    {
      name: "Lord Ganesha (Vighnaharta)",
      sanskrit: "ॐ गं गणपतये नमः",
      title: "Lord of Beginnings & Wisdom",
      image: ganeshaImage,
      description:
        "The first worshipped deity in Sanatana Dharma. Consecrated in a traditional Agamic shrine, adorned with fresh chandan, red sindoor, and sacred sweet Modak offerings.",
      significance: "Clears hurdles, blesses new enterprises, examinations, and grants auspicious beginnings.",
      festivals: "Ganesh Chaturthi, Sankashti Chaturthi",
    },
    {
      name: "Lord Murugan (Kartikeya)",
      sanskrit: "ॐ शरवणभवाय नमः",
      title: "Protector of Righteousness",
      image: lampImage,
      description:
        "The commander of celestial forces, embodying courage, higher wisdom, and the golden spear of discernment (Vel). Revered across South Indian traditions.",
      significance: "Bestows valour, clarity of intellect, victory over inner doubt, and familial harmony.",
      festivals: "Skanda Sashti, Thaipusam, Panguni Uthiram",
    },
    {
      name: "Goddess Durga (Supreme Shakti)",
      sanskrit: "ॐ दुं दुर्गायै नमः",
      title: "Divine Mother & Guardian",
      image: bellImage,
      description:
        "The universal mother whose radiant protective grace sustains creation. Invoked with Kumkum archana, sacred lotus blossoms, and traditional Lalita Sahasranama chanting.",
      significance: "Shields families from negative influences, brings health, resilience, and spiritual elevation.",
      festivals: "Navaratri, Durga Ashtami, Vijayadashami",
    },
    {
      name: "Lord Venkateswara (Balaji)",
      sanskrit: "ॐ नमो वेङ्कटेशाय",
      title: "Lord of Compassion & Abundance",
      image: shivaImage,
      description:
        "The benevolent preserver of the Kali Yuga. His consecrated presence brings divine refuge, solace, and spiritual fulfillment to all who surrender at His lotus feet.",
      significance: "Bestows prosperity, dispels worldly tribulations, and inspires deep devotional surrender.",
      festivals: "Vaikunta Ekadashi, Brahmotsavam, Purattasi Saturdays",
    },
    {
      name: "Navagraha Sanctum",
      sanskrit: "ॐ नवग्रहाय नमः",
      title: "The Nine Planetary Deities",
      image: lampImage,
      description:
        "Arranged strictly according to traditional Vedic astrological orientation, harmonizing planetary energies for cosmic balance, wellbeing, and seasonal harmony.",
      significance: "Harmonizes astrological influences, protects health, and restores peace during transitions.",
      festivals: "Saturday Shani Puja, Solar & Lunar Transitions",
    },
  ];

  const rituals = [
    {
      time: "Dawn (Suprabhatam)",
      name: "Ushakkala Puja",
      desc: "Awakening of the sanctum with sacred conch blowing, lighting of pure ghee deepams, and Vedic morning mantras.",
    },
    {
      time: "Morning (09:00 AM)",
      name: "Maha Abhishek & Alankaram",
      desc: "Ceremonial bathing of the Shivalinga with sacred waters, milk, honey, panchamritam, and ornate floral decoration.",
    },
    {
      time: "Noon (12:00 PM)",
      name: "Madhyahna Aarti & Naivedyam",
      desc: "Offering of fresh Satvik Mahaprasadam cooked in the temple Annadhanam kitchen, followed by noon camphor aarti.",
    },
    {
      time: "Sunset (06:30 PM)",
      name: "Sandhya Deepa Aarti",
      desc: "The resonant evening bell ceremony with multi-tiered brass oil lamps, devotional bhajan chanting, and Vedic benediction.",
    },
    {
      time: "Night (08:30 PM)",
      name: "Sayana Aarti & Shanti Path",
      desc: "Closing rituals of stillness, offering quiet meditation, gratitude, and universal peace prayers (Lokah Samastah Sukhino Bhavantu).",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1817] flex flex-col">
      <SiteNavigation />

      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-[#F3ECE2] border-b border-[#E5DACD] overflow-hidden">
        <div className="absolute inset-0 bg-arch-grid-light opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#DED4C7] text-[#7A1F2D] text-xs font-mono uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#C49A45]" />
              Agamic Rituals & Sacred Traditions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1817] tracking-tight leading-tight">
              Consecrated Sanctums & <span className="text-maroon-gradient">Vedic Worship</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#554D46] leading-relaxed">
              Discover the divine deities, classical worship rituals, and eternal spiritual traditions establishing the spiritual foundation of BHTCC.
            </p>

            <div className="mt-8">
              <button
                onClick={handleRingBell}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#DED4C7] text-[#7A1F2D] hover:bg-[#F3ECE2] text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-sm"
              >
                <Volume2 className={`w-4 h-4 text-[#C49A45] ${bellRinging ? "animate-bounce" : ""}`} />
                <span>{bellRinging ? "Vibrating 432Hz Resonance..." : "Ring Sacred Temple Bell"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Status Notice Banner */}
      <div className="bg-[#5E1521] text-[#FAF8F5] py-4 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[#C49A45] shrink-0" />
            <span>
              <strong>Phase 1 Construction Darshan Notice:</strong> On-site daily darshan at 110 Vaggs Rd will officially open following the sanctum Maha Kumbhabhishekam consecration. In the interim, community poojas are held at designated Ballarat halls.
            </span>
          </div>
          <Link
            to="/events"
            className="underline hover:text-[#C49A45] shrink-0 font-bold"
          >
            Check Community Gathering Schedule →
          </Link>
        </div>
      </div>

      {/* Consecrated Deities Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#7A1F2D]">
              Presiding Murthis
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-[#1C1817]">
              Consecrated Deities of BHTCC
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#554D46]">
              Handcrafted by traditional sculptors from solid south-Indian granite according to rigid Agamic canons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {deities.map((deity) => (
              <div
                key={deity.name}
                className="bg-white rounded-3xl overflow-hidden border border-[#E5DACD] shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col"
              >
                <div className="relative h-60 overflow-hidden bg-[#F3ECE2]">
                  <img
                    src={deity.image}
                    alt={deity.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-wider">
                    {deity.title}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-[#7A1F2D] font-bold tracking-wide">
                      {deity.sanskrit}
                    </div>
                    <h3 className="font-serif font-bold text-xl text-[#1C1817] mt-1 mb-2">
                      {deity.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#554D46] leading-relaxed mb-4">
                      {deity.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F3ECE2] space-y-2 text-xs font-mono">
                    <div>
                      <span className="text-[#7A1F2D] font-bold">Significance: </span>
                      <span className="text-[#554D46]">{deity.significance}</span>
                    </div>
                    <div>
                      <span className="text-[#C49A45] font-bold">Key Festivals: </span>
                      <span className="text-[#554D46]">{deity.festivals}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional Daily Agamic Ritual Cycle */}
      <section className="py-16 sm:py-24 bg-[#F3ECE2]/50 border-y border-[#E5DACD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#7A1F2D]">
              Daily Ritual Cycle
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-[#1C1817]">
              The Five Sacred Agamic Aartis
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#554D46]">
              A timeless rhythm of worship that awakens divine presence, consecrates food, and blesses the community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {rituals.map((r, idx) => (
              <div
                key={r.name}
                className="bg-white rounded-3xl p-5 border border-[#E5DACD] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#7A1F2D] uppercase tracking-wider block mb-1">
                    0{idx + 1} • {r.time}
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#1C1817] mb-2">{r.name}</h4>
                  <p className="text-xs text-[#554D46] leading-relaxed">{r.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F3ECE2] text-[10px] font-mono text-[#C49A45]">
                  Sanatana Dharma Custom
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Pooja & Family Blessing Inquiries Form */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5DACD] shadow-xl">
            <div className="max-w-xl mx-auto text-center mb-10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1F2D]">
                Community Priest Services
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1817] mt-1">
                Request a Traditional Family Pooja
              </h2>
              <p className="text-xs sm:text-sm text-[#554D46] mt-3 leading-relaxed">
                Our resident priests conduct traditional Vedic ceremonies including Griha Pravesh (Housewarming), Namakarana (Baby Naming), Satyanarayana Vratam, and Wedding Blessings across Ballarat and Central Victoria.
              </p>
            </div>

            {poojaSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-emerald-900">
                  Pooja Inquiry Registered
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800">
                  Thank you, <strong>{poojaForm.name}</strong>. Our priest coordinator will contact you at {poojaForm.email} or {poojaForm.phone} to discuss auspicious muhurat dates and traditional samagri requirements.
                </p>
                <button
                  onClick={() => setPoojaSubmitted(false)}
                  className="px-4 py-2 rounded-full bg-emerald-700 text-white text-xs font-mono"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handlePoojaSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={poojaForm.name}
                      onChange={(e) => setPoojaForm({ ...poojaForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                      placeholder="e.g. Ramesh Patel"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={poojaForm.email}
                      onChange={(e) => setPoojaForm({ ...poojaForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                      placeholder="e.g. devotee@example.com"
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
                      value={poojaForm.phone}
                      onChange={(e) => setPoojaForm({ ...poojaForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                      placeholder="e.g. 0412 345 678"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Ceremony Type *
                    </label>
                    <select
                      value={poojaForm.service}
                      onChange={(e) => setPoojaForm({ ...poojaForm, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D] bg-white"
                    >
                      <option value="archana">Special Archana / Sankalpam</option>
                      <option value="griha">Griha Pravesh (Housewarming)</option>
                      <option value="satyanarayana">Sri Satyanarayana Vratam</option>
                      <option value="ganapathi">Ganapathi Homam / Havan</option>
                      <option value="namakarana">Namakarana (Naming Rite)</option>
                      <option value="vivaha">Vivaha (Wedding Blessing)</option>
                      <option value="other">Other Vedic Samskara</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                    Preferred Date & Auspicious Muhurat Notes
                  </label>
                  <textarea
                    rows={3}
                    value={poojaForm.notes}
                    onChange={(e) => setPoojaForm({ ...poojaForm, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    placeholder="Provide details such as location (Ballarat or home), Nakshatra / Rashi, and special intentions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#7A1F2D] hover:bg-[#5E1521] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.01]"
                >
                  Submit Pooja Inquiry to Priests
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
