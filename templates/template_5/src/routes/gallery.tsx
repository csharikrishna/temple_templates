import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import templeHeroImage from "@/assets/bhtcc-vision-concept.jpg";
import shivaImage from "@/assets/sanctum-shiva.jpg";
import ganeshaImage from "@/assets/sanctum-ganesha.jpg";
import lampImage from "@/assets/temple-brass-lamp.jpg";
import bellImage from "@/assets/temple-bell-brass.jpg";
import prasadamImage from "@/assets/annadhanam-prasadam.jpg";
import gardensImage from "@/assets/vastu-gardens.jpg";
import {
  Image as ImageIcon,
  Maximize2,
  X,
  Info,
  Layers,
  Sparkles,
  Building,
  Trees,
  LayoutGrid,
  Columns,
  Grid,
} from "lucide-react";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

function GalleryPage() {
  const [filter, setFilter] = useState<string>("all");
  const [galleryLayout, setGalleryLayout] = useState<"insta-grid" | "insta-split" | "journal">("insta-grid");
  const [activeItem, setActiveItem] = useState<{
    id: string;
    title: string;
    category: string;
    src: string;
    tag: string;
    provenance: string;
    description: string;
  } | null>(null);

  const galleryItems = [
    {
      id: "g1",
      title: "Sacred Architectural Concept",
      category: "architecture",
      src: templeHeroImage,
      tag: "Proposed Masterplan",
      provenance: "Conceptual Architectural Rendering • Phase 1 Civil Works Active",
      description:
        "Proposed masterplan visualization of the traditional stone shikhara, entrance Rajagopuram, and pillared mandapa hall at 110 Vaggs Rd, Ross Creek VIC. Conceived strictly along classical Shilpa Shastra axes.",
    },
    {
      id: "g2",
      title: "Consecrated Lord Shiva Sanctum",
      category: "deities",
      src: shivaImage,
      tag: "Presiding Sanctum",
      provenance: "Vedic Sanctum Photography",
      description:
        "Sacred black granite Shivalinga enshrined in the garbhagriha, adorned with freshly harvested Bilva leaves, pure white jasmine garlands, and sacred vibhuti for daily Rudrabhishekam.",
    },
    {
      id: "g3",
      title: "Lord Ganesha Agamic Shrine",
      category: "deities",
      src: ganeshaImage,
      tag: "Vighnaharta",
      provenance: "Agamic Shrine Photography",
      description:
        "Carved south-Indian granite idol of Sri Vighnaharta Ganesha in sanctum niche, adorned with fragrant yellow and orange marigold garlands, red sindoor, and sacred offerings.",
    },
    {
      id: "g4",
      title: "Handcrafted Brass Kuthu Vilakku",
      category: "traditions",
      src: lampImage,
      tag: "Sacred Deepam",
      provenance: "Traditional Artifact Photography",
      description:
        "Multi-tiered South Indian ceremonial bronze oil lamp glowing with pure cotton wicks fed by organic sesame oil and ghee for daily Sandhya Deepa Aarti ceremonies.",
    },
    {
      id: "g5",
      title: "Resonant Bronze Temple Bell (Ghanta)",
      category: "traditions",
      src: bellImage,
      tag: "Sacred Ghanta",
      provenance: "Traditional Artifact Photography",
      description:
        "Traditional heavy brass hanging temple bell with ornate Nandi and lotus reliefs. Its chime produces a deep, harmonically rich 432Hz acoustic tone to clear mental distractions during prayer.",
    },
    {
      id: "g6",
      title: "Satvik Annadhanam Mahaprasadam",
      category: "community",
      src: prasadamImage,
      tag: "Food Seva",
      provenance: "Community Seva Photography",
      description:
        "Pure vegetarian Mahaprasad prepared with sacred mindfulness and served traditionally on fresh banana leaves — fragrant steamed rice, aromatic sambar, vegetable kootu, and payasam.",
    },
    {
      id: "g7",
      title: "5-Acre Vastu Meditation Parkland",
      category: "landscape",
      src: gardensImage,
      tag: "Ross Creek Sanctuary",
      provenance: "Landscape Photography",
      description:
        "The tranquil natural grounds at 110 Vaggs Rd, Ross Creek. Native Australian eucalyptus trees, walking trails, and reflection ponds integrated seamlessly with traditional Vastu geomancy.",
    },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1817] flex flex-col">
      <SiteNavigation />

      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-[#F3ECE2] border-b border-[#E5DACD] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#DED4C7] text-[#7A1F2D] text-xs font-mono uppercase tracking-widest mb-6">
              <ImageIcon className="w-3.5 h-3.5 text-[#C49A45]" />
              Visual Sanctuary Archives
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1817] tracking-tight leading-tight">
              Visual <span className="text-maroon-gradient">Gallery</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#554D46] leading-relaxed">
              Explore the architectural vision, consecrated granite sanctums, sacred brass ceremonial instruments, Annadhanam kitchen seva, and 5-acre native Victorian grounds.
            </p>
          </div>
        </div>
      </section>

      {/* Mandatory Media Provenance Banner */}
      <div className="bg-white border-b border-[#E5DACD] py-3.5 px-4 text-xs font-mono text-[#554D46]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#7A1F2D] shrink-0" />
            <span>
              <strong>Provenance Notice:</strong> The temple exterior perspective is an artist's conceptual architectural rendering. Deities, brassware, prasadam, and native landscapes reflect authentic Sanatana Dharma traditions.
            </span>
          </div>
          <span className="text-[#7A1F2D] font-bold shrink-0">Click Any Image for High-Resolution Lightbox</span>
        </div>
      </div>

      {/* Filter Buttons & Layout Switcher */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E5DACD]">
            {/* Category Filter Pills */}
            <div className="flex overflow-x-auto sm:flex-wrap items-center gap-1.5 sm:gap-2 max-w-full pb-2 sm:pb-0 -mx-3 px-3 sm:mx-0 sm:px-0">
              {[
                { id: "all", label: "All Works" },
                { id: "architecture", label: "Architecture" },
                { id: "deities", label: "Sanctum Deities" },
                { id: "traditions", label: "Traditions" },
                { id: "community", label: "Annadhanam" },
                { id: "landscape", label: "5-Acre Parkland" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`shrink-0 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all ${
                    filter === tab.id
                      ? "bg-[#7A1F2D] text-white shadow-md scale-105 font-bold"
                      : "bg-white text-[#554D46] border border-[#E5DACD] hover:bg-[#F3ECE2]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-white border border-[#E5DACD] shrink-0">
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
                title="Side-by-side Split View"
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
                title="Editorial Journal View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Journal</span>
              </button>
            </div>
          </div>

          {/* LAYOUT 1: SIDE-BY-SIDE GRID (2-UP ON MOBILE) */}
          {galleryLayout === "insta-grid" && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  onClick={() => setActiveItem(item)}
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

                  {/* Square Aspect Image */}
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

                  {/* Caption & Metadata */}
                  <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-[#1C1817] leading-tight line-clamp-1 group-hover:text-[#7A1F2D] transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[10px] sm:text-xs text-[#554D46] leading-relaxed line-clamp-2">
                        {item.description}
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

          {/* LAYOUT 2: SIDE-BY-SIDE SPLIT VIEW */}
          {galleryLayout === "insta-split" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className="group bg-white rounded-3xl border border-[#E5DACD] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#7A1F2D]/50 transition-all duration-300 flex flex-col sm:flex-row cursor-pointer"
                >
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

                  <div className="w-full sm:w-1/2 p-4 sm:p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-[#F3ECE2]">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#7A1F2D] text-[#C49A45] flex items-center justify-center font-serif text-xs border border-[#C49A45]/30">
                            ॐ
                          </div>
                          <div>
                            <div className="text-xs font-mono font-bold text-[#1C1817]">bhtcc.sanctuary</div>
                            <div className="text-[10px] font-mono text-[#554D46]">110 Vaggs Rd, Ross Creek</div>
                          </div>
                        </div>
                      </div>

                      <div className="py-3 space-y-1.5">
                        <h3 className="font-serif font-bold text-base text-[#1C1817] group-hover:text-[#7A1F2D] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#554D46] leading-relaxed">
                          {item.description}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#E5DACD] shadow-sm hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col"
                >
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-[#F3ECE2]">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-[#1C1817] text-xs font-mono font-medium shadow-md">
                        <Maximize2 className="w-3.5 h-3.5 text-[#7A1F2D]" />
                        Expand View
                      </span>
                    </div>
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#7A1F2D] font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {item.tag}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#1C1817] group-hover:text-[#7A1F2D] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#554D46] mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#F3ECE2] text-[10px] font-mono text-[#7A1F2D]">
                      {item.provenance}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}


        </div>
      </section>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[60vh] sm:max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeItem.src}
                alt={activeItem.title}
                className="max-h-[60vh] sm:max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 sm:p-8 bg-white space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[#F3ECE2] text-[#7A1F2D] font-mono text-xs font-bold uppercase tracking-wider">
                  {activeItem.tag}
                </span>
                <span className="text-xs font-mono text-[#554D46]">
                  {activeItem.provenance}
                </span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1C1817]">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#554D46] leading-relaxed">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
