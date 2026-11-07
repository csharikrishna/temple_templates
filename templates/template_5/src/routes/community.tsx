import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import prasadamImage from "@/assets/annadhanam-prasadam.jpg";
import gardensImage from "@/assets/vastu-gardens.jpg";
import {
  Users,
  Heart,
  BookOpen,
  Sparkles,
  Utensils,
  GraduationCap,
  Trees,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";

export const Route = createFileRoute("/community")({
  component: CommunityPage,
});

function CommunityPage() {
  const initiatives = [
    {
      title: "Satvik Annadhanam Mahaprasad",
      tag: "Universal Food Seva",
      icon: Utensils,
      image: prasadamImage,
      desc: "In Hindu tradition, sharing food is the highest form of charity (Annadhanam Parama Dhanam). BHTCC prepares pure vegetarian meals served on natural banana leaves, nourishing hundreds of devotees, visitors, and vulnerable Ballarat families.",
      stats: "100% Free Satvik Meals • Dedicated Commercial Kitchen Planned",
    },
    {
      title: "Balagokulam & Cultural School",
      tag: "Youth Heritage",
      icon: GraduationCap,
      image: gardensImage,
      desc: "Empowering children and youth with authentic cultural roots. Weekly classes in Sanskrit language basics, Vedic shloka chanting, Indian classical music, Bharatanatyam dance, and universal human values (Satya, Dharma, Shanti, Prema).",
      stats: "Ages 5–16 • Sunday Classes • Cultural Festivals",
    },
    {
      title: "Senior Citizens Satsang & Wellness",
      tag: "Elder Wellbeing",
      icon: Heart,
      image: gardensImage,
      desc: "Creating an affectionate, supportive circle for our revered elders. Gentle yoga, pranayama breathing, devotional bhajan sessions, health talks, and serene morning strolls along the protected native eucalyptus trails at 110 Vaggs Rd.",
      stats: "Weekly Assemblies • Transportation Assistance Available",
    },
    {
      title: "Interfaith & Multicultural Harmony",
      tag: "Social Cohesion",
      icon: Sparkles,
      image: prasadamImage,
      desc: "Active participation in the Ballarat Interfaith Network and regional civic commemorations. Opening Hindu spiritual philosophy to fellow Australians of all faiths, building bridge of mutual respect, friendship, and shared civic service.",
      stats: "Ballarat Interfaith Member • Open Cultural Tours",
    },
  ];

  const communityQuotes = [
    {
      quote:
        "Having this sanctuary rising in Ross Creek gives our children their cultural identity without having to make the long 2-hour drive into Melbourne every weekend. It is a blessing for all regional Victorian families.",
      name: "S. Murthy",
      role: "Ballarat Resident & Devotee",
    },
    {
      quote:
        "The Annadhanam kitchen embodies the true spirit of Australia and Sanatana Dharma alike — sharing a warm, nourishing meal with whoever enters the door, with open arms and zero judgment.",
      name: "P. Sharma",
      role: "Volunteer Seva Coordinator",
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
              <Users className="w-3.5 h-3.5 text-[#C49A45]" />
              Vasudhaiva Kutumbakam • The World is One Family
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1817] tracking-tight leading-tight">
              Community Life & <span className="text-maroon-gradient">Selfless Seva</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#554D46] leading-relaxed">
              BHTCC is more than stone sanctums — it is a vibrant living sanctuary where families connect, children celebrate their heritage, and nutritious meals are shared freely with all.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section: The Sacred Annadhanam Kitchen */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1F2D]">
                Annadhanam Parama Dhanam
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1817] leading-tight">
                Nourishing the Soul & Community Through Pure Food
              </h2>
              <p className="text-sm sm:text-base text-[#554D46] leading-relaxed">
                In Vedic culture, cooking and distributing satvik vegetarian food is considered an act of supreme worship. At every major festival and gathering, volunteers prepare traditional rice, sambar, rasam, kootu, and sweets served traditionally on fresh plantain leaves.
              </p>
              <p className="text-sm sm:text-base text-[#554D46] leading-relaxed">
                As part of our Phase 1 and 2 masterplan, a fully certified commercial community kitchen and 300-seat dining hall will provide regular food relief support, emergency bushfire meal staging, and free community lunches in Ross Creek.
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[#E5DACD] space-y-2">
                <div className="text-xs font-mono font-bold text-[#7A1F2D]">Community Kitchen Principles:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#554D46]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C49A45] shrink-0" />
                    <span>100% Satvik Pure Vegetarian</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C49A45] shrink-0" />
                    <span>Free to all regardless of faith</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C49A45] shrink-0" />
                    <span>Traditional Banana Leaf Serving</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C49A45] shrink-0" />
                    <span>Local Ballarat Produce Sourcing</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/volunteer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7A1F2D] hover:bg-[#5E1521] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105"
                >
                  Volunteer for Kitchen Seva
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-[#E5DACD] shadow-2xl bg-white">
                <img
                  src={prasadamImage}
                  alt="Satvik Annadhanam vegetarian feast served on banana leaf"
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />
                <div className="p-5 bg-white border-t border-[#E5DACD]">
                  <div className="text-xs font-serif font-bold text-[#1C1817]">
                    Traditional Satvik Mahaprasad
                  </div>
                  <div className="text-xs text-[#554D46] mt-1">
                    Freshly prepared with pure ghee, whole lentils, fragrant spices, and seasonal Victorian vegetables.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Initiatives Grid */}
      <section className="py-16 sm:py-24 bg-[#F3ECE2]/50 border-y border-[#E5DACD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#7A1F2D]">
              Our Programs
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-[#1C1817]">
              Fostering Culture, Wisdom & Connection
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#554D46]">
              Serving every generation of our regional community with care, respect, and enduring cultural pride.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DACD] shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#F3ECE2] text-[#7A1F2D] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E5DACD] text-[#7A1F2D]">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-[#1C1817] mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#554D46] leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F3ECE2] text-xs font-mono text-[#7A1F2D] font-bold">
                    {item.stats}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Reflections */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#7A1F2D]">
              Voices of Ballarat
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-[#1C1817]">
              Reflections from Our Regional Families
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityQuotes.map((q, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-[#E5DACD] shadow-sm flex flex-col justify-between"
              >
                <p className="text-sm font-serif italic text-[#554D46] leading-relaxed">
                  "{q.quote}"
                </p>
                <div className="mt-6 pt-4 border-t border-[#F3ECE2]">
                  <div className="font-serif font-bold text-sm text-[#1C1817]">{q.name}</div>
                  <div className="text-xs font-mono text-[#7A1F2D]">{q.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-16 bg-[#7A1F2D] text-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Join Hands in Community Seva
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
            Every festival meal served, language class taught, and garden cared for happens because of kind people like you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/volunteer"
              className="px-6 py-3 rounded-full bg-[#FAF8F5] text-[#7A1F2D] hover:bg-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Sign Up to Volunteer
            </Link>
            <Link
              to="/membership"
              className="px-6 py-3 rounded-full bg-transparent hover:bg-white/10 text-white border border-white/30 text-xs font-mono font-bold uppercase tracking-wider hover:scale-105 transition-all"
            >
              Become a BHTCC Member
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
