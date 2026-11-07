import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import templeHeroImage from "@/assets/bhtcc-vision-concept.jpg";
import brassLampImage from "@/assets/temple-brass-lamp.jpg";
import ganeshaImage from "@/assets/sanctum-ganesha.jpg";
import shivaImage from "@/assets/sanctum-shiva.jpg";
import templeBellImage from "@/assets/temple-bell-brass.jpg";
import prasadamImage from "@/assets/annadhanam-prasadam.jpg";
import vastuGardensImage from "@/assets/vastu-gardens.jpg";
import {
  MapPin,
  Calendar,
  Clock,
  Compass,
  Heart,
  Landmark,
  ShieldCheck,
  Sparkles,
  Users,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Info,
  Building,
  Mail,
  Phone,
  CheckCircle2,
  Maximize2,
  X,
  Menu,
  Volume2,
  Copy,
  Check,
  Layers,
  Eye,
  Award,
  EyeOff,
  Image as ImageIcon,
  Grid,
  Columns,
  LayoutGrid,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: TemplePage,
});

function TemplePage() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [copiedBsb, setCopiedBsb] = useState(false);
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [donationTier, setDonationTier] = useState<number>(251);
  const [bellRinging, setBellRinging] = useState(false);
  const [hideHeroCard, setHideHeroCard] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<string>("all");
  const [galleryLayout, setGalleryLayout] = useState<"insta-grid" | "insta-split" | "journal">("insta-grid");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pure Web Audio synthesized traditional Vedic temple bell chime
  const playTempleBell = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      setBellRinging(true);
      setTimeout(() => setBellRinging(false), 2400);

      const freqs = [432, 864, 1296, 1728];
      const gains = [0.35, 0.18, 0.08, 0.04];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const decay = 2.8 - idx * 0.4;
        gain.gain.setValueAtTime(gains[idx] ?? 0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + decay);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + decay);
      });
    } catch {
      // Audio fallback without interrupting user flow
    }
  };

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

  const galleryItems = [
    {
      id: "g1",
      title: "Sacred Architectural Concept",
      category: "architecture",
      tag: "Masterplan",
      src: templeHeroImage,
      desc: "Vedic Vastu traditional stone shikhara & pillared mandapa under regional Victorian dawn light.",
    },
    {
      id: "g2",
      title: "Consecrated Lord Shiva Sanctum",
      category: "deities",
      tag: "Presiding Sanctum",
      src: shivaImage,
      desc: "Sacred black granite Shivalinga with fresh Bilva leaves, white jasmine, and vibhuti.",
    },
    {
      id: "g3",
      title: "Lord Ganesha Agamic Shrine",
      category: "deities",
      tag: "Vighnaharta",
      src: ganeshaImage,
      desc: "Carved granite deity in sanctum niche adorned with fragrant marigold garland and chandan.",
    },
    {
      id: "g4",
      title: "Traditional Brass Kuthu Vilakku",
      category: "traditions",
      tag: "Sacred Deepam",
      src: brassLampImage,
      desc: "Handcrafted South Indian ceremonial oil lamp glowing with pure cotton wicks for daily aarti.",
    },
    {
      id: "g5",
      title: "Ornate Vedic Temple Bell",
      category: "traditions",
      tag: "Ghanta",
      src: templeBellImage,
      desc: "Hanging bronze bell with sacred Shilpa Shastra engravings tuned to 432Hz harmonic chime.",
    },
    {
      id: "g6",
      title: "Satvik Annadhanam Mahaprasad",
      category: "seva",
      tag: "Free Community Kitchen",
      src: prasadamImage,
      desc: "Consecrated vegetarian feast on fresh banana leaf: saffron rice, dal, payasam kheer, and vada.",
    },
    {
      id: "g7",
      title: "5-Acre Vastu Meditation Gardens",
      category: "grounds",
      tag: "Ross Creek Sanctuary",
      src: vastuGardensImage,
      desc: "Landscaped Victorian eucalyptus parkland with blooming lotus reflection pond and walking trails.",
    },
  ];

  const filteredGallery =
    galleryFilter === "all" ? galleryItems : galleryItems.filter((item) => item.category === galleryFilter);

  const hotspots = [
    {
      id: 0,
      title: "Maha Gopuram & Vimana",
      subtitle: "The Soaring Granite Spire",
      x: "80%",
      y: "32%",
      elevation: "45 ft (13.7 m)",
      shastra: "Dravidian Shilpa Shastra",
      description:
        "Multi-tiered granite and sandstone shikhara sculpted with Agamic motifs, capturing morning sunlight across Golden Plains Shire.",
      specs: ["Natural Sandstone & Granite", "East-facing solar alignment", "Hand-carved celestial guardians"],
    },
    {
      id: 1,
      title: "Sculpted Mukhamandapa",
      subtitle: "Open Pillared Congregation Hall",
      x: "64%",
      y: "65%",
      elevation: "Colonnade Level",
      shastra: "Vastu Mandala Layout",
      description:
        "Spacious stone colonnade designed for prayer assembly, sacred bhajans, and cooling natural cross-ventilation across the 5-acre estate.",
      specs: ["Hand-chiseled lotus pillars", "Integrated Parikrama path", "Acoustically tuned stone roof"],
    },
    {
      id: 2,
      title: "Garbhagriha & Sanctum",
      subtitle: "The Sacred Core Sanctuary",
      x: "48%",
      y: "68%",
      elevation: "Adhisthana Base",
      shastra: "9x9 Paramasayika Grid",
      description:
        "The sanctum sanctorum housing presiding consecrated shrines for Lord Shiva, Ganesha, Murugan, Venkateswara, and Goddess Durga.",
      specs: ["Vedic Vastu alignment", "Traditional abhishek drainage", "Dedicated priest prahara"],
    },
    {
      id: 3,
      title: "5-Acre Native Victorian Grounds",
      subtitle: "Gardens & Meditation Trails",
      x: "22%",
      y: "75%",
      elevation: "Landscape Grade",
      shastra: "Ecological Harmony",
      description:
        "Preserved Australian eucalyptus trees, walking trails, peaceful reflection ponds, and outdoor congregation lawns at 110 Vaggs Rd.",
      specs: ["Native flora preservation", "Ample community parking", "Children's cultural play area"],
    },
  ];

  const milestones = [
    {
      chapter: "I",
      year: "2016",
      title: "Legal Founding & Incorporation",
      status: "Ratified",
      body: "Ballarat Hindu Temple & Cultural Centre was formally incorporated as an Association in Victoria (ABN: 13 397 829 440) to support regional families.",
    },
    {
      chapter: "II",
      year: "2018",
      title: "Inaugural Ganesh Chaturthi",
      status: "Celebrated",
      body: "Ballarat's first landmark annual multicultural festival, attracting over 400 attendees and receiving formal civic appreciation.",
    },
    {
      chapter: "III",
      year: "2020",
      title: "5-Acre Ross Creek Land Acquisition",
      status: "Secured",
      body: "Unconditional acquisition of 110 Vaggs Rd, Ross Creek in Golden Plains Shire, chosen for ideal Vastu orientation and serene rural peace.",
    },
    {
      chapter: "IV",
      year: "2022",
      title: "$900,000 Government Commitments",
      status: "Parliamentary",
      body: "Victorian State and Commonwealth grant commitments formally recognized in the Parliament of Victoria for community infrastructure.",
    },
    {
      chapter: "V",
      year: "2024",
      title: "Historic Bhoomi Pooja Groundbreaking",
      status: "Consecrated",
      body: "Over 800 devotees, spiritual acharyas, and Victorian dignitaries gathered on-site for the sacred Vedic earth consecration rites.",
    },
    {
      chapter: "VI",
      year: "2025–2026",
      title: "Phase 1: Civil Works & Stone Fabrication",
      status: "Active Execution",
      body: "Master civil earthworks, access roads, utilities, and master stonecarvers fashioning authentic granite sanctum elements.",
    },
  ];

  const deities = [
    {
      name: "Lord Shiva",
      title: "Mahadeva & Somaskanda",
      image: shivaImage,
      shloka: "ॐ नमः शिवाय",
      translation: "Salutations to the Auspicious, Supreme Cosmic Preserver of Inner Peace.",
      role: "Presiding Sanctum Deity",
    },
    {
      name: "Lord Ganesha",
      title: "Vighnaharta & Prathama",
      image: ganeshaImage,
      shloka: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ",
      translation: "Remover of obstacles and guardian of every noble, auspicious undertaking.",
      role: "Auspicious Entrance Sanctum",
    },
    {
      name: "Lord Murugan",
      title: "Skanda & Karthikeya",
      image: brassLampImage,
      shloka: "ॐ षण्मुखाय नमः",
      translation: "Embodiment of courage, righteous spiritual wisdom, and supreme clarity.",
      role: "Southern Flank Sanctum",
    },
    {
      name: "Lord Venkateswara",
      title: "Balaji / Maha Vishnu",
      image: templeBellImage,
      shloka: "नमो भगवते वासुदेवाय",
      translation: "The compassionate guardian who bestows grace, harmony, and prosperity.",
      role: "Western Chamber Sanctum",
    },
    {
      name: "Goddess Durga",
      title: "Maha Shakti & Parvati",
      image: vastuGardensImage,
      shloka: "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके",
      translation: "Divine mother granting protection, strength, and boundless compassion.",
      role: "Northern Sanctuary Chamber",
    },
  ];

  const navLinks = [
    { href: "#vision", label: "Vision" },
    { href: "#gallery", label: "Gallery" },
    { href: "#explorer", label: "Masterplan" },
    { href: "#sanctum", label: "Deities" },
    { href: "#milestones", label: "Chronicle" },
    { href: "#community", label: "Seva" },
    { href: "#location", label: "Siting" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1817] font-sans-body selection:bg-[#7A1F2D]/20 selection:text-[#7A1F2D]">
      {/* SHARED SITE NAVIGATION */}
      <SiteNavigation />

      {/* 3. HERO VIEWPORT: ADAPTIVE ON EVERY MOBILE & DESKTOP SCREEN */}
      <section
        id="vision"
        className="relative min-h-[85vh] sm:min-h-[92vh] md:min-h-[96vh] flex items-center justify-start overflow-hidden pt-4 sm:pt-6 pb-16 sm:pb-20"
      >
        {/* Full-Bleed Temple Background Image with Portrait/Landscape Framing */}
        <div
          className="absolute inset-0 bg-cover bg-[center_top] sm:bg-[center_35%] bg-no-repeat transition-transform duration-1000 scale-100"
          style={{ backgroundImage: `url(${templeHeroImage})` }}
        />

        {/* Non-Intrusive Vignettes: Leaves the Gopuram & golden sunrise completely clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-black/25 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-black/25 via-transparent to-transparent pointer-events-none" />

        {/* Toggle to Hide Overlay & View Background Unobstructed */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20">
          <button
            type="button"
            onClick={() => setHideHeroCard(!hideHeroCard)}
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/95 hover:bg-white text-[#1C1817] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider shadow-lg border border-[#E5DACD] transition-all hover:scale-105"
          >
            {hideHeroCard ? <Eye className="w-3.5 h-3.5 text-[#7A1F2D]" /> : <EyeOff className="w-3.5 h-3.5 text-[#7A1F2D]" />}
            <span>{hideHeroCard ? "Show Card" : "Full View"}</span>
          </button>
        </div>

        {/* Content Container (Adaptive Left Column) */}
        {!hideHeroCard && (
          <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl bg-white/90 backdrop-blur-xl border border-white/80 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl shadow-black/20 space-y-4 sm:space-y-6 transition-all duration-300">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 border border-[#C58A3E]/50 bg-[#FAF8F5] px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#7A1F2D]">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C58A3E]" />
                <span>Vedic Vastu Masterplan • 5-Acre Sanctuary</span>
              </div>

              <h1 className="font-serif-heading text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1C1817] leading-[1.15]">
                A Sacred Sanctuary for <br />
                <span className="text-maroon-gradient font-cinzel">Ballarat & Regional Victoria</span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-[#4A433D] leading-relaxed">
                Harmonizing traditional stone temple geometry with regional Victoria's golden countryside. Establishing
                the first Hindu temple, cultural learning academy, and community food-relief centre across 5 serene
                acres at 110 Vaggs Rd, Ross Creek.
              </p>

              {/* Action Buttons Responsive Layout */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
                <a
                  href="#gallery"
                  className="inline-flex items-center justify-center gap-2 bg-[#7A1F2D] hover:bg-[#5E1521] text-white font-medium px-5 sm:px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#7A1F2D]/25 hover:scale-105 active:scale-95 text-center"
                >
                  <ImageIcon className="w-4 h-4 text-[#D4A359]" />
                  <span>Explore Gallery</span>
                </a>

                <a
                  href="#explorer"
                  className="inline-flex items-center justify-center gap-2 bg-[#FAF8F5] hover:bg-[#F3ECE2] border border-[#DED4C7] text-[#1C1817] px-5 sm:px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 text-center"
                >
                  <Eye className="w-4 h-4 text-[#7A1F2D]" />
                  <span>Inspect Masterplan</span>
                </a>

                <button
                  type="button"
                  onClick={() => setLightboxImage(templeHeroImage)}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F5EFE6] border border-[#DED4C7] text-[#1C1817] py-2.5 sm:p-3 rounded-full shadow-sm hover:scale-105 sm:hover:scale-110 transition-transform text-xs font-mono"
                  title="Fullscreen View"
                >
                  <Maximize2 className="w-4 h-4 text-[#7A1F2D]" />
                  <span className="sm:hidden">Fullscreen</span>
                </button>
              </div>

              {/* Specs Chips Responsive 2x2 on Mobile, 4x1 on Tablet/Desktop */}
              <div className="pt-3 sm:pt-4 border-t border-[#E8DFD3] grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center">
                <div className="bg-[#FAF8F5] p-2 sm:p-2.5 rounded-2xl border border-[#EAE1D5]">
                  <span className="block font-bold text-xs sm:text-sm text-[#7A1F2D] font-serif-heading">5.00 Acres</span>
                  <span className="text-[9px] sm:text-[10px] text-[#736B63] font-mono">Freehold Title</span>
                </div>
                <div className="bg-[#FAF8F5] p-2 sm:p-2.5 rounded-2xl border border-[#EAE1D5]">
                  <span className="block font-bold text-xs sm:text-sm text-[#7A1F2D] font-serif-heading">$900k+</span>
                  <span className="text-[9px] sm:text-[10px] text-[#736B63] font-mono">Govt Grants</span>
                </div>
                <div className="bg-[#FAF8F5] p-2 sm:p-2.5 rounded-2xl border border-[#EAE1D5]">
                  <span className="block font-bold text-xs sm:text-sm text-[#7A1F2D] font-serif-heading">45 Feet</span>
                  <span className="text-[9px] sm:text-[10px] text-[#736B63] font-mono">Maha Shikhara</span>
                </div>
                <div className="bg-[#FAF8F5] p-2 sm:p-2.5 rounded-2xl border border-[#EAE1D5]">
                  <span className="block font-bold text-xs sm:text-sm text-[#7A1F2D] font-serif-heading">800+</span>
                  <span className="text-[9px] sm:text-[10px] text-[#736B63] font-mono">Devotees</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. VISUAL HERITAGE GALLERY (SIDE-BY-SIDE INSTAGRAM POST VIEW) */}
      <section id="gallery" className="py-12 sm:py-20 bg-white border-y border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-4 sm:gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E5DACD] text-xs font-mono text-[#7A1F2D] font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-[#C49A45] animate-pulse" />
                <span>SANCTUARY ASSET ARCHIVE • INSTA VIEW</span>
              </div>
              <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1817]">
                Sanctuary Assets & Traditional Living Heritage
              </h2>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#554D46] max-w-xl">
                Explore consecrated sanctum deities, sacred brass deepams, Annadhanam kitchen, and native 5-acre meditation grounds.
              </p>
            </div>

            {/* Layout Mode Toggle (Insta Grid Side-by-Side vs Split View vs Journal) */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-[#FAF8F5] border border-[#E5DACD] self-start md:self-end">
              <button
                type="button"
                onClick={() => setGalleryLayout("insta-grid")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all ${
                  galleryLayout === "insta-grid"
                    ? "bg-[#7A1F2D] text-white font-bold shadow-xs"
                    : "text-[#554D46] hover:text-[#1C1817]"
                }`}
                title="Side-by-side Instagram Post Grid (2-up on mobile)"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Insta Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setGalleryLayout("insta-split")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all ${
                  galleryLayout === "insta-split"
                    ? "bg-[#7A1F2D] text-white font-bold shadow-xs"
                    : "text-[#554D46] hover:text-[#1C1817]"
                }`}
                title="Side-by-side Split View (Photo on Left, Details on Right)"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Side-by-Side</span>
              </button>
              <button
                type="button"
                onClick={() => setGalleryLayout("journal")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all ${
                  galleryLayout === "journal"
                    ? "bg-[#7A1F2D] text-white font-bold shadow-xs"
                    : "text-[#554D46] hover:text-[#1C1817]"
                }`}
                title="Editorial Journal Cards"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Journal</span>
              </button>
            </div>
          </div>

          {/* Filter Pills with Horizontal Scroll */}
          <div className="flex overflow-x-auto sm:flex-wrap gap-1.5 sm:gap-2 pb-3 mb-6 -mx-3 px-3 sm:mx-0 sm:px-0">
            {[
              { id: "all", label: "All Assets" },
              { id: "architecture", label: "Architecture" },
              { id: "deities", label: "Sanctum Deities" },
              { id: "traditions", label: "Traditions" },
              { id: "seva", label: "Mahaprasad Seva" },
              { id: "grounds", label: "5-Acre Grounds" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setGalleryFilter(tab.id)}
                className={`shrink-0 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  galleryFilter === tab.id
                    ? "bg-[#7A1F2D] text-white shadow-md shadow-[#7A1F2D]/20 font-bold"
                    : "bg-[#FAF8F5] text-[#554D46] border border-[#E5DACD] hover:border-[#7A1F2D] hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* LAYOUT 1: MINIMIZED 2-COLUMN SIDE-BY-SIDE GRID (DEFAULT) */}
          {galleryLayout === "insta-grid" && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
              {filteredGallery.map((item) => (
                <article
                  key={item.id}
                  onClick={() => setLightboxImage(item.src)}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-[#E5DACD] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#7A1F2D]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Top Header */}
                  <div className="p-2 sm:p-2.5 flex items-center justify-between border-b border-[#F3ECE2] bg-[#FAF8F5]/80">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#7A1F2D] to-[#5E1521] text-[#C49A45] flex items-center justify-center font-serif text-[10px] sm:text-xs shrink-0 shadow-xs border border-[#C49A45]/30">
                        ॐ
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] sm:text-[11px] font-mono font-bold text-[#1C1817] truncate leading-tight flex items-center gap-1">
                          <span className="truncate">bhtcc.sanctuary</span>
                          <span className="text-[#C49A45] text-[9px] shrink-0">✦</span>
                        </div>
                        <div className="text-[8px] sm:text-[9px] font-mono text-[#554D46] truncate">
                          Ross Creek VIC
                        </div>
                      </div>
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full bg-[#F3ECE2] text-[#7A1F2D] font-bold shrink-0">
                      {item.tag}
                    </span>
                  </div>

                  {/* Square Aspect Ratio Media */}
                  <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-2.5 py-1 rounded-full bg-white/95 text-[#1C1817] text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                        <Maximize2 className="w-3 h-3 text-[#7A1F2D]" />
                        Expand
                      </span>
                    </div>
                  </div>

                  {/* Minimized Caption */}
                  <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h3 className="font-serif-heading text-xs sm:text-sm font-bold text-[#1C1817] leading-tight line-clamp-1 group-hover:text-[#7A1F2D] transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[10px] sm:text-xs text-[#554D46] leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-2.5 pt-1.5 border-t border-[#F3ECE2] flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#8C8477]">
                      <span>BHTCC Asset</span>
                      <span className="text-[#7A1F2D] font-bold group-hover:translate-x-0.5 transition-transform">
                        View →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* LAYOUT 2: SIDE-BY-SIDE SPLIT VIEW (IMAGE ON LEFT, CONTENT ON RIGHT) */}
          {galleryLayout === "insta-split" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredGallery.map((item) => (
                <article
                  key={item.id}
                  onClick={() => setLightboxImage(item.src)}
                  className="group bg-white rounded-3xl border border-[#E5DACD] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#7A1F2D]/50 transition-all duration-300 flex flex-col sm:flex-row cursor-pointer"
                >
                  {/* Left Side: Square / Proportional Media */}
                  <div className="w-full sm:w-1/2 aspect-square sm:aspect-auto sm:min-h-[220px] relative overflow-hidden bg-stone-100 shrink-0">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-[#7A1F2D] shadow-xs">
                      {item.tag}
                    </div>
                  </div>

                  {/* Right Side: Details */}
                  <div className="w-full sm:w-1/2 p-4 sm:p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-[#F3ECE2]">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#7A1F2D] text-[#C49A45] flex items-center justify-center font-serif text-xs border border-[#C49A45]/30">
                            ॐ
                          </div>
                          <div>
                            <div className="text-xs font-mono font-bold text-[#1C1817] flex items-center gap-1">
                              <span>bhtcc.sanctuary</span>
                              <span className="text-[#C49A45] text-[10px]">✦</span>
                            </div>
                            <div className="text-[10px] font-mono text-[#554D46]">110 Vaggs Rd, Ross Creek</div>
                          </div>
                        </div>
                      </div>

                      <div className="py-3 space-y-1.5">
                        <h3 className="font-serif-heading text-base font-bold text-[#1C1817] group-hover:text-[#7A1F2D] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#554D46] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#F3ECE2] flex items-center justify-between text-[10px] font-mono text-[#8C8477]">
                      <span>BHTCC Asset</span>
                      <span className="text-[#7A1F2D] font-bold group-hover:translate-x-0.5 transition-transform">
                        View →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* LAYOUT 3: EDITORIAL JOURNAL CARDS */}
          {galleryLayout === "journal" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxImage(item.src)}
                  className="group relative bg-[#FAF8F5] rounded-3xl border border-[#E5DACD] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#7A1F2D] transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-stone-100">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-[#7A1F2D] shadow-sm">
                      {item.tag}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-[#1C1817] group-hover:text-[#7A1F2D] transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-[#554D46] leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#EAE1D5] flex items-center justify-between text-[11px] font-mono text-[#8C8477]">
                      <span>BHTCC Authentic Asset</span>
                      <span className="text-[#7A1F2D] font-bold group-hover:translate-x-1 transition-transform">
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. INTERACTIVE MASTERPLAN EXPLORER (WITH MOBILE QUICK-SELECTOR) */}
      <section id="explorer" className="py-14 sm:py-20 bg-[#F5EFE6] border-b border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#7A1F2D] font-semibold">
                // SPATIAL ARCHITECTURE SPECIFICATION
              </span>
              <h2 className="mt-1.5 sm:mt-2 font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1817]">
                Deconstruct the Architectural Masterplan
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#554D46] max-w-xl">
                Tap numbered pins or select components below to inspect hand-carved stone proportions and sacred Vastu
                orientations.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#DED4C7] text-xs font-mono text-[#7A1F2D] shadow-sm shrink-0">
              <Layers className="w-4 h-4 text-[#C58A3E]" />
              <span>INTERACTIVE SANCTUARY MAP</span>
            </div>
          </div>

          {/* Mobile Hotspot Quick-Tabs Bar */}
          <div className="lg:hidden flex overflow-x-auto gap-2 pb-3 mb-2 -mx-4 px-4">
            {hotspots.map((spot) => (
              <button
                key={spot.id}
                type="button"
                onClick={() => setActiveHotspot(spot.id)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeHotspot === spot.id
                    ? "bg-[#7A1F2D] text-white font-bold shadow-md shadow-[#7A1F2D]/20"
                    : "bg-white text-[#554D46] border border-[#E5DACD]"
                }`}
              >
                0{spot.id + 1} {spot.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border-2 border-white bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
              <div className="relative group">
                <img
                  src={templeHeroImage}
                  alt="Ballarat Hindu Temple architectural elements analyzer"
                  className="w-full h-[320px] sm:h-[450px] lg:h-[580px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
                />

                {hotspots.map((spot) => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspot(spot.id)}
                    style={{ left: spot.x, top: spot.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                    aria-label={`Inspect ${spot.title}`}
                  >
                    <span className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          activeHotspot === spot.id ? "bg-[#7A1F2D]" : "bg-[#C58A3E]"
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-7 w-7 sm:h-8 sm:w-8 items-center justify-center text-xs font-bold font-mono transition-all duration-300 group-hover:scale-125 shadow-lg ${
                          activeHotspot === spot.id
                            ? "bg-[#7A1F2D] text-white ring-4 ring-[#7A1F2D]/30"
                            : "bg-white text-[#7A1F2D] border-2 border-[#7A1F2D]"
                        }`}
                      >
                        0{spot.id + 1}
                      </span>
                    </span>
                  </button>
                ))}

                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#E5DACD] text-[10px] sm:text-[11px] font-mono text-[#7A1F2D] font-bold shadow-sm">
                  TAP PIN TO INSPECT
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-[#E5DACD] rounded-3xl p-5 sm:p-7 shadow-lg shadow-[#7A1F2D]/5 transition-all duration-300 hover:shadow-xl space-y-5 sm:space-y-6">
              {activeHotspot !== null && (
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#7A1F2D] mb-3 border-b border-[#F0E8DE] pb-2.5">
                    <span className="font-bold">SPECIFICATION // 0{activeHotspot + 1}</span>
                    <span className="bg-[#F5EFE6] px-2.5 py-0.5 rounded-full text-[10px] text-[#554D46]">
                      {hotspots[activeHotspot]?.shastra}
                    </span>
                  </div>

                  <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#1C1817]">
                    {hotspots[activeHotspot]?.title}
                  </h3>
                  <span className="block text-xs font-mono text-[#C58A3E] font-semibold mt-1">
                    {hotspots[activeHotspot]?.subtitle}
                  </span>

                  <p className="mt-3.5 text-xs sm:text-sm text-[#554D46] leading-relaxed">
                    {hotspots[activeHotspot]?.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#F0E8DE]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8477] font-bold block mb-2">
                      Architectural Parameters:
                    </span>
                    <ul className="space-y-2 text-xs font-mono text-[#38322D]">
                      {hotspots[activeHotspot]?.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#7A1F2D] shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 p-3.5 bg-[#FAF8F5] border border-[#EAE1D5] rounded-2xl flex items-center justify-between text-xs font-mono">
                    <span className="text-[#8C8477]">Elevation:</span>
                    <span className="text-[#7A1F2D] font-bold">{hotspots[activeHotspot]?.elevation}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONSECRATED DEITIES (RESPONSIVE CARDS) */}
      <section id="sanctum" className="py-14 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7A1F2D] font-semibold">
              // SANCTUM SANCTORUM (GARBHAGRIHA)
            </span>
            <h2 className="mt-1.5 sm:mt-2 font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1817]">
              Consecrated Shrines of the Ballarat Sanctuary
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#554D46]">
              Consecrated shrines receiving sacred cosmic energy and hosting authentic daily aartis, archana, and holy
              festival observances.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {deities.map((deity, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E5DACD] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#7A1F2D] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="h-44 sm:h-48 w-full overflow-hidden relative bg-stone-100">
                    <img
                      src={deity.image}
                      alt={deity.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-[#7A1F2D] shadow-sm">
                      {deity.role}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#1C1817] group-hover:text-[#7A1F2D] transition-colors">
                      {deity.name}
                    </h3>
                    <span className="block text-xs font-mono text-[#8C8477] mt-0.5">{deity.title}</span>

                    <div className="my-4 p-3 bg-[#FAF8F5] border-l-4 border-[#7A1F2D] rounded-r-2xl text-center">
                      <p className="font-serif text-sm font-bold text-[#7A1F2D]">{deity.shloka}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#554D46] leading-relaxed italic">{deity.translation}</p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#F2EAE0] flex items-center justify-between text-[11px] font-mono text-[#8C8477]">
                  <span>Vedic Agamic Rites</span>
                  <CheckCircle2 className="w-4 h-4 text-[#C58A3E] group-hover:scale-125 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HISTORICAL CHRONICLE (ADAPTIVE GRID) */}
      <section id="milestones" className="py-14 sm:py-20 bg-[#F5EFE6] border-y border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7A1F2D] font-semibold">
              // INSTITUTIONAL CHRONICLE
            </span>
            <h2 className="mt-1.5 sm:mt-2 font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1817]">
              Decade of Grassroots Community Devotion
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#554D46]">
              A journey of persistent community effort—from rented halls in 2016 to our permanent 5-acre consecrated
              grounds at Ross Creek.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="bg-white border border-[#E5DACD] rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#7A1F2D]/50 hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#7A1F2D] mb-3">
                    <span className="font-bold">CHAPTER // {m.chapter}</span>
                    <span className="bg-[#FAF8F5] px-2.5 py-0.5 rounded-full border border-[#E8DFD3] text-[10px] text-[#554D46]">
                      {m.status}
                    </span>
                  </div>

                  <span className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#7A1F2D]">{m.year}</span>
                  <h4 className="mt-1 font-semibold text-sm sm:text-base text-[#1C1817]">{m.title}</h4>

                  <p className="mt-2.5 text-xs sm:text-sm text-[#554D46] leading-relaxed">{m.body}</p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#F2EAE0] text-[10px] font-mono text-[#8C8477]">
                  BALLARAT HINDU TEMPLE RECORD
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. COMMUNITY SEVA & ANNADHANAM BANANA LEAF FEAST */}
      <section id="community" className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#7A1F2D] font-semibold">
                // SOCIAL WELFARE & SERVICE
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1817]">
                Annadhanam Seva: Nourishing Regional Families
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#554D46] leading-relaxed">
                Upholding the sacred Hindu value of <em>Seva</em> (selfless service), BHTCC actively serves western
                regional Victoria through continuous food security, language preservation, and intercultural dialogue.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  {
                    title: "Emergency Care Packages & Food Relief",
                    desc: "Monthly dry-ration hampers and direct food relief distributed to regional families in need and local crisis accommodation shelters.",
                  },
                  {
                    title: "Annadhanam Mahaprasad Community Kitchen",
                    desc: "Planned commercial community kitchen providing sanctified, nutritious vegetarian meals to all community visitors regardless of background.",
                  },
                  {
                    title: "Youth Cultural Heritage & Sanskrit Academy",
                    desc: "Structured weekend lessons preserving Vedic philosophy, classical Carnatic and Hindustani music, dance, and regional Indian languages.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 sm:p-5 bg-[#FAF8F5] border border-[#E5DACD] rounded-2xl shadow-sm hover:shadow-md hover:border-[#7A1F2D]/40 transition-all duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#7A1F2D] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-[#1C1817]">{item.title}</h4>
                      <p className="text-xs text-[#554D46] mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mahaprasad Banana Leaf Feature Card */}
            <div className="lg:col-span-6">
              <div
                onClick={() => setLightboxImage(prasadamImage)}
                className="bg-white border-2 border-[#C58A3E]/40 rounded-3xl p-4 sm:p-6 shadow-xl shadow-[#7A1F2D]/5 transition-all duration-300 hover:shadow-2xl cursor-pointer group"
              >
                <div className="h-52 sm:h-64 rounded-2xl overflow-hidden relative mb-4 sm:mb-5">
                  <img
                    src={prasadamImage}
                    alt="Annadhanam Mahaprasad Feast on fresh banana leaf"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-[#7A1F2D]">
                    Free Community Annadhanam
                  </div>
                </div>

                <p className="font-cinzel text-lg sm:text-xl text-[#7A1F2D] font-bold mb-1.5 sm:mb-2">अन्नं परब्रह्म स्वरूपम्</p>
                <p className="font-serif italic text-xs sm:text-sm text-[#1C1817] leading-relaxed">
                  "Food is the supreme manifestation of the divine. Sharing sanctified meals breaks all social barriers
                  and unites our multicultural regional family."
                </p>
                <div className="mt-4 pt-3 border-t border-[#F0E8DE] flex items-center justify-between text-xs font-mono text-[#8C8477]">
                  <span>Saturday Community Annadhanam</span>
                  <span className="text-[#7A1F2D] font-bold">110 Vaggs Rd Kitchen →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SITING & ACCESS: 110 VAGGS RD (RESPONSIVE STACK) */}
      <section id="location" className="py-14 sm:py-20 bg-[#F5EFE6] border-y border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7A1F2D] font-semibold">
              // GEOGRAPHIC SITING & ACCESS
            </span>
            <h2 className="mt-1.5 sm:mt-2 font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1817]">
              Visiting the 5-Acre Ross Creek Sanctuary
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#554D46]">
              Convenient regional access from Ballarat, Melbourne, Geelong, and western regional Victoria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white border border-[#E5DACD] rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#7A1F2D] hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF8F5] border border-[#E5DACD] flex items-center justify-center text-[#7A1F2D] mb-3.5">
                  <MapPin className="w-5 h-5 text-[#7A1F2D]" />
                </div>
                <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-[#1C1817]">Sanctuary Address</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#554D46] leading-relaxed">
                  <strong>110 Vaggs Road</strong>
                  <br />
                  Ross Creek VIC 3351
                  <br />
                  Golden Plains Shire, Australia
                </p>
                <div className="mt-3.5 pt-3.5 border-t border-[#F2EAE0] text-xs font-mono text-[#8C8477] space-y-1">
                  <p>• 12 mins from Ballarat Railway Station</p>
                  <p>• 1 hr 20 mins from Western Melbourne</p>
                  <p>• Connected via Glenelg Highway</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=110+Vaggs+Rd,+Ross+Creek+VIC+3351"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 border border-[#7A1F2D] text-[#7A1F2D] hover:bg-[#7A1F2D] hover:text-white py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 hover:scale-105"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-white border border-[#E5DACD] rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#7A1F2D] hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF8F5] border border-[#E5DACD] flex items-center justify-center text-[#7A1F2D] mb-3.5">
                  <Clock className="w-5 h-5 text-[#7A1F2D]" />
                </div>
                <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-[#1C1817]">Ceremony Access</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#554D46] leading-relaxed">
                  As the site is in active Phase 1 civil development, congregational poojas occur on scheduled holy
                  tithis.
                </p>
                <div className="mt-3.5 pt-3.5 border-t border-[#F2EAE0] text-xs font-mono text-[#8C8477] space-y-1">
                  <p>• Modest and respectful attire</p>
                  <p>• Designated on-site parking</p>
                  <p>• Devotee sign-in for safety</p>
                </div>
              </div>
              <div className="mt-5 p-3 bg-[#FAF8F5] text-[11px] font-mono text-[#7A1F2D] rounded-2xl border border-[#E8DFD3] text-center font-bold">
                CHECK MONTHLY BULLETIN FOR SERVICE DATES
              </div>
            </div>

            <div className="bg-white border border-[#E5DACD] rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[#7A1F2D] hover:-translate-y-1.5 transition-all duration-300">
              <div>
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF8F5] border border-[#E5DACD] flex items-center justify-center text-[#7A1F2D] mb-3.5">
                  <Mail className="w-5 h-5 text-[#7A1F2D]" />
                </div>
                <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-[#1C1817]">Official Contact</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#554D46] leading-relaxed">
                  Connect with the BHTCC Executive Management Committee for pooja bookings, seva, or membership.
                </p>
                <div className="mt-3.5 pt-3.5 border-t border-[#F2EAE0] text-xs font-mono text-[#8C8477] space-y-1.5">
                  <p className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#7A1F2D] shrink-0" />
                    <span className="truncate">info@ballarathindutemple.org.au</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#7A1F2D] shrink-0" />
                    <span>+61 3 5300 0000</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-[#7A1F2D] shrink-0" />
                    <span>Reg: A0096238K (Victoria)</span>
                  </p>
                </div>
              </div>
              <a
                href="mailto:info@ballarathindutemple.org.au"
                className="mt-5 inline-flex items-center justify-center gap-2 bg-[#7A1F2D] hover:bg-[#5E1521] text-[#FAF8F5] py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 hover:scale-105"
              >
                <span>Email Committee</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TRANSPARENT GIVING & BUILDING FUND */}
      <section id="fund" className="py-14 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-[#7A1F2D]/20 rounded-3xl p-5 sm:p-8 md:p-12 shadow-xl shadow-[#7A1F2D]/5 transition-all duration-300 hover:shadow-2xl hover:border-[#7A1F2D]/40 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7A1F2D] font-bold">
              // SACRED BUILDING FUND (SEVA)
            </span>
            <h2 className="mt-1.5 sm:mt-2 font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1817]">
              Contribute to the Temple Construction
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#554D46] max-w-xl mx-auto leading-relaxed">
              Every stone carved and native garden path paved is made possible through devotee generosity. Support the
              Ballarat Hindu Temple construction via direct bank transfer (EFT).
            </p>

            {/* Dedication Tiers: 2-col on small phones, inline on desktop */}
            <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-3">
              {[108, 251, 501, 1008].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setDonationTier(amt)}
                  className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all duration-300 hover:scale-105 ${
                    donationTier === amt
                      ? "bg-[#7A1F2D] text-white border-[#7A1F2D] font-bold shadow-md shadow-[#7A1F2D]/20"
                      : "bg-[#FAF8F5] text-[#1C1817] border-[#DED4C7] hover:border-[#7A1F2D]"
                  }`}
                >
                  ${amt} Dedication
                </button>
              ))}
            </div>

            {/* Bank Transfer Details Box with Touch-Friendly Copy Targets */}
            <div className="mt-6 sm:mt-8 bg-[#FAF8F5] border border-[#E5DACD] rounded-2xl p-4 sm:p-6 max-w-lg mx-auto text-left space-y-3 text-xs sm:text-sm font-mono shadow-inner">
              <div className="flex flex-col xs:flex-row justify-between xs:items-center border-b border-[#EAE1D5] pb-2 gap-1">
                <span className="text-[#8C8477]">Account Name:</span>
                <span className="font-semibold text-[#1C1817] text-left xs:text-right">Ballarat Hindu Temple Inc.</span>
              </div>
              <div className="flex flex-col xs:flex-row justify-between xs:items-center border-b border-[#EAE1D5] pb-2 gap-1">
                <span className="text-[#8C8477]">Bank:</span>
                <span className="font-semibold text-[#1C1817]">Commonwealth Bank</span>
              </div>

              <div className="flex justify-between items-center border-b border-[#EAE1D5] pb-2">
                <span className="text-[#8C8477]">BSB:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#7A1F2D] text-sm sm:text-base">063-500</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("063-500", "bsb")}
                    className="p-2 hover:bg-white text-[#8C8477] hover:text-[#7A1F2D] rounded-full border border-transparent hover:border-[#DED4C7] transition-all hover:scale-110 active:scale-95"
                    title="Copy BSB"
                  >
                    {copiedBsb ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-[#EAE1D5] pb-2">
                <span className="text-[#8C8477]">Account No:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#7A1F2D] text-sm sm:text-base">1089 4231</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("10894231", "acc")}
                    className="p-2 hover:bg-white text-[#8C8477] hover:text-[#7A1F2D] rounded-full border border-transparent hover:border-[#DED4C7] transition-all hover:scale-110 active:scale-95"
                    title="Copy Account Number"
                  >
                    {copiedAcc ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-[#8C8477]">Reference:</span>
                <span className="text-[#7A1F2D] font-bold italic truncate max-w-[200px]">YourName - ${donationTier}</span>
              </div>
            </div>

            <p className="mt-4 text-[10px] sm:text-[11px] font-mono text-[#8C8477]">
              All funds managed under strict non-profit governance (ABN: 13 397 829 440). Tax receipts issued upon email
              confirmation.
            </p>
          </div>
        </div>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-14 sm:py-20 bg-[#F5EFE6] border-t border-[#E8DFD3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7A1F2D] font-semibold">
              // DEVOTEE INQUIRIES
            </span>
            <h2 className="mt-1.5 sm:mt-2 font-serif-heading text-2xl sm:text-3xl font-bold text-[#1C1817]">
              Frequently Answered Questions
            </h2>
          </div>

          <div className="space-y-3 font-sans">
            {[
              {
                q: "What is the construction timeline for the temple?",
                a: "Phase 1 civil groundworks and access roads are currently underway at 110 Vaggs Rd. Master hand-carved stone elements are concurrently in artisan production, with initial sanctum consecration planned following completion of the primary infrastructure.",
              },
              {
                q: "Can interstate or Melbourne devotees sponsor specific pillars or stone carvings?",
                a: "Yes. Devotees may sponsor individual sanctum pillars, threshold stones, or permanent brass lamps. Please contact info@ballarathindutemple.org.au with your chosen dedication reference.",
              },
              {
                q: "Is BHTCC affiliated with any single denomination or regional group?",
                a: "No. BHTCC is a non-denominational, pan-Hindu cultural sanctuary welcoming devotees of Lord Shiva, Vishnu, Ganesha, Murugan, Devi, and all Hindu philosophical traditions across regional Victoria.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-[#E5DACD] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-5 py-4 sm:px-6 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#1C1817] hover:text-[#7A1F2D] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7A1F2D] shrink-0 transition-transform duration-300 ${
                      activeFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === i && (
                  <div className="px-5 pb-4 sm:px-6 text-xs sm:text-sm text-[#554D46] leading-relaxed border-t border-[#F2EAE0] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FULLSCREEN LIGHTBOX MODAL */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4">
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-[#D4A359] p-2.5 focus:outline-none rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <div className="max-w-6xl w-full">
            <img
              src={lightboxImage}
              alt="Full resolution inspection view"
              className="w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl"
            />
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-white/90 bg-black/60 px-4 py-2 sm:px-6 sm:py-3 rounded-full backdrop-blur-md text-center">
              <span>BALLARAT HINDU TEMPLE & CULTURAL CENTRE • ASSET INSPECTOR</span>
              <span className="text-[#D4A359] font-bold">110 VAGGS RD, ROSS CREEK VIC 3351</span>
            </div>
          </div>
        </div>
      )}

      {/* SHARED REVERENT FOOTER */}
      <SiteFooter />
    </div>
  );
}
