import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import { supabase } from "@/integrations/supabase/client";
import {
  ShieldCheck,
  Users,
  FileText,
  Building,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  LogOut,
  Send,
  Plus,
  Filter,
  Check,
  X,
  Lock,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"submissions" | "announcements" | "civil">("submissions");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>("Committee Administrator");

  // Simulated & Connected submissions for admin review
  const [inquiries, setInquiries] = useState([
    {
      id: "INQ-104",
      name: "Ramesh & Sunita Patel",
      type: "Pooja Request",
      detail: "Griha Pravesh home consecration ceremony inquiry in Ballarat Central.",
      date: "Nov 5, 2026",
      status: "Pending Response",
    },
    {
      id: "INQ-103",
      name: "Kavita Sundaram",
      type: "Volunteer Seva",
      detail: "Registered for Annadhanam kitchen meal service and festival flower decorating.",
      date: "Nov 4, 2026",
      status: "Responded",
    },
    {
      id: "INQ-102",
      name: "Vikram Malhotra",
      type: "Building Fund EFT",
      detail: "Notified EFT transfer of $501 via CBA with reference 'V. Malhotra'.",
      date: "Nov 2, 2026",
      status: "Receipt Issued",
    },
  ]);

  // Content publication manager with strict safety guardrails
  const [announcements, setAnnouncements] = useState([
    {
      id: "ANN-01",
      title: "Phase 1 Civil Earthworks Drainage Milestone",
      content:
        "Excavation and sub-base compaction for the stormwater detention basin and access crossover connecting Vaggs Road have commenced in accordance with Golden Plains Shire engineering guidelines.",
      status: "Published",
      author: "Civil Sub-Committee",
      date: "Nov 2026",
    },
    {
      id: "ANN-02",
      title: "Annual Panchangam Calendar Calculation in Progress",
      content:
        "Vedic scholars are computing regional celestial coordinates for the upcoming Hindu lunar calendar. Verified holy day dates will be released 4 weeks prior to each festival.",
      status: "Review",
      author: "Purohit Council",
      date: "Nov 2026",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [author, setAuthor] = useState("Management Committee");
  const [validationWarning, setValidationWarning] = useState<string | null>(null);

  useEffect(() => {
    // Check active session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(session.user);
      }
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    navigate({ to: "/login" });
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationWarning(null);

    // Strict editorial validation: Prevent unverified dates, fabricated targets, or false claims
    const lower = newBody.toLowerCase() + " " + newTitle.toLowerCase();
    if (
      lower.includes("guaranteed opening on") ||
      lower.includes("million dollars raised") ||
      lower.includes("official opening date is confirmed")
    ) {
      setValidationWarning(
        "Content Policy Guardrail: In accordance with BHTCC integrity guidelines, unconfirmed operational dates or unpublished fundraising totals cannot be published without formal committee minutes."
      );
      return;
    }

    setAnnouncements([
      {
        id: `ANN-0${announcements.length + 1}`,
        title: newTitle,
        content: newBody,
        status: "Draft",
        author,
        date: "Today",
      },
      ...announcements,
    ]);

    setNewTitle("");
    setNewBody("");
  };

  const togglePublishStatus = (id: string) => {
    setAnnouncements(
      announcements.map((a) => {
        if (a.id === id) {
          const nextStatus =
            a.status === "Draft" ? "Review" : a.status === "Review" ? "Published" : "Draft";
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1817] flex flex-col">
      <SiteNavigation />

      {/* Admin Header */}
      <section className="bg-[#1C1817] text-[#FAF8F5] py-8 px-4 sm:px-6 lg:px-8 border-b border-[#7A1F2D]/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7A1F2D] text-[#C49A45] flex items-center justify-center font-serif text-xl border border-[#C49A45]/30">
              ॐ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg sm:text-xl text-white">
                  BHTCC Administration Foundation
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#7A1F2D] text-[10px] font-mono uppercase tracking-wider text-white">
                  {userRole}
                </span>
              </div>
              <p className="text-xs font-mono text-white/70">
                Ballarat Hindu Temple & Cultural Centre Inc • 110 Vaggs Rd
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <span className="text-[11px] font-mono text-white/60 block">Authenticated as:</span>
              <span className="text-xs font-mono text-[#C49A45]">
                {currentUser?.email || "committee-admin@bhtcc.org.au"}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </section>

      {/* Admin Tab Navigation */}
      <div className="bg-white border-b border-[#E5DACD] sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 py-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab("submissions")}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "submissions"
                ? "bg-[#7A1F2D] text-white shadow-sm"
                : "bg-[#FAF8F5] text-[#554D46] hover:bg-[#F3ECE2]"
            }`}
          >
            Community Submissions ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "announcements"
                ? "bg-[#7A1F2D] text-white shadow-sm"
                : "bg-[#FAF8F5] text-[#554D46] hover:bg-[#F3ECE2]"
            }`}
          >
            Site Publications & Bulletins ({announcements.length})
          </button>
          <button
            onClick={() => setActiveTab("civil")}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === "civil"
                ? "bg-[#7A1F2D] text-white shadow-sm"
                : "bg-[#FAF8F5] text-[#554D46] hover:bg-[#F3ECE2]"
            }`}
          >
            Phase 1 Civil Site Log
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* TAB 1: COMMUNITY SUBMISSIONS */}
        {activeTab === "submissions" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1817]">
                  Community Inquiries & Submissions
                </h2>
                <p className="text-xs text-[#554D46] mt-0.5">
                  Review and action devotee inquiries, volunteer registrations, and EFT remittance notifications.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#E5DACD] overflow-hidden shadow-sm divide-y divide-[#F3ECE2]">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#7A1F2D]">{inq.id}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F3ECE2] text-[#554D46]">
                        {inq.type}
                      </span>
                      <span className="text-[10px] font-mono text-[#554D46]">• {inq.date}</span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-[#1C1817]">{inq.name}</h3>
                    <p className="text-xs text-[#554D46] max-w-2xl">{inq.detail}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-xs font-mono px-3 py-1 rounded-full font-semibold ${
                        inq.status === "Responded" || inq.status === "Receipt Issued"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {inq.status}
                    </span>
                    <button
                      onClick={() => {
                        setInquiries(
                          inquiries.map((i) =>
                            i.id === inq.id ? { ...i, status: "Responded" } : i
                          )
                        );
                      }}
                      className="px-3 py-1.5 rounded-xl border border-[#DED4C7] bg-[#FAF8F5] hover:bg-[#F3ECE2] text-xs font-mono text-[#1C1817] transition-all"
                    >
                      Mark Actioned
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SITE ANNOUNCEMENTS WITH SAFETY VALIDATION */}
        {activeTab === "announcements" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1817]">
                Site Content & Announcements Publisher
              </h2>
              <p className="text-xs text-[#554D46] mt-0.5">
                Manage circulars with safe editorial review states (Draft → Committee Review → Published).
              </p>
            </div>

            {/* Safety Alert Banner */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <strong>Editorial Truth Policy:</strong> Do not create or publish unconfirmed fundraising figures, membership fees, operational schedules, or unratified governance documents. All public releases must reflect verified committee minutes.
              </div>
            </div>

            {/* Create Announcement Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DACD] shadow-sm">
              <h3 className="font-serif font-bold text-lg text-[#1C1817] mb-4">
                Draft New Community Notice
              </h3>

              {validationWarning && (
                <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{validationWarning}</span>
                </div>
              )}

              <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Bulletin Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Civil Stormwater Detention Progress"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Author Sub-Committee *
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                    Announcement Body (Factual & Verified) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    placeholder="Enter factual summary of active site works, community gatherings, or administrative notices..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#7A1F2D] hover:bg-[#5E1521] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Safe Draft Bulletin</span>
                </button>
              </form>
            </div>

            {/* List of Announcements */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#1C1817]">
                Existing Bulletins & Publication Pipeline
              </h3>
              <div className="space-y-3">
                {announcements.map((a) => (
                  <div
                    key={a.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DACD] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#7A1F2D]">{a.id}</span>
                        <span className="text-[10px] font-mono text-[#554D46]">• {a.author}</span>
                        <span className="text-[10px] font-mono text-[#554D46]">• {a.date}</span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#1C1817]">{a.title}</h4>
                      <p className="text-xs text-[#554D46] max-w-2xl">{a.content}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-xs font-mono px-3 py-1 rounded-full font-bold ${
                          a.status === "Published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : a.status === "Review"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {a.status}
                      </span>
                      <button
                        onClick={() => togglePublishStatus(a.id)}
                        className="px-3 py-1.5 rounded-xl border border-[#DED4C7] bg-[#FAF8F5] hover:bg-[#F3ECE2] text-xs font-mono text-[#1C1817] transition-all"
                      >
                        Toggle Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PHASE 1 CIVIL SITE LOG */}
        {activeTab === "civil" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1817]">
                Phase 1 Civil Works On-Site Engineering Log
              </h2>
              <p className="text-xs text-[#554D46] mt-0.5">
                Current civil status at 110 Vaggs Rd, Ross Creek VIC (Golden Plains Shire).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-[#E5DACD] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-[#1C1817]">
                    Civil Groundworks & Drainage
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    Active
                  </span>
                </div>
                <p className="text-xs text-[#554D46] leading-relaxed">
                  Bulk earthworks, subsoil moisture testing, perimeter swales, and stormwater retention detention pond construction are progressing according to approved site planning permit conditions.
                </p>
                <div className="text-[11px] font-mono text-[#7A1F2D]">
                  Location: Golden Plains Shire • Planning Zone: Place of Worship
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#E5DACD] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-[#1C1817]">
                    Access Crossover & Roadway
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    Active
                  </span>
                </div>
                <p className="text-xs text-[#554D46] leading-relaxed">
                  Construction of the heavy vehicle commercial access crossover connecting Vaggs Road to internal car parks and staging zones.
                </p>
                <div className="text-[11px] font-mono text-[#7A1F2D]">
                  Engineering Spec: VicRoads / Shire standards
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#E5DACD] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-[#1C1817]">
                    Sacred Granite Quarrying & Carving
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                    Underway
                  </span>
                </div>
                <p className="text-xs text-[#554D46] leading-relaxed">
                  Selection of defect-free black granite monoliths for Lord Shiva, Ganesha, and Murugan sanctums. Traditional Sompura and Silpi artisans carving base Adhisthana layers.
                </p>
                <div className="text-[11px] font-mono text-[#7A1F2D]">
                  Shilpa Shastra: Mayamata architectural proportions
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#E5DACD] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-[#1C1817]">
                    Native Flora & Eucalyptus Protection
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    Ongoing
                  </span>
                </div>
                <p className="text-xs text-[#554D46] leading-relaxed">
                  Erection of tree protection zones (TPZ) around mature eucalyptus trees across the 5-acre property to ensure ecological conservation during heavy machinery operations.
                </p>
                <div className="text-[11px] font-mono text-[#7A1F2D]">
                  Ecology: 60%+ native vegetation permanently conserved
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
