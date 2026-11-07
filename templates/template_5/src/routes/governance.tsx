import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import {
  ShieldCheck,
  Building,
  FileText,
  Landmark,
  Scale,
  Lock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/governance")({
  component: GovernancePage,
});

function GovernancePage() {
  const statutoryDetails = [
    { label: "Incorporated Legal Name", value: "Ballarat Hindu Temple & Cultural Centre Incorporated" },
    { label: "Entity Type", value: "Incorporated Association (Victoria)" },
    { label: "Victorian Registration No.", value: "A0096238K" },
    { label: "Australian Business No. (ABN)", value: "13 397 829 440" },
    { label: "Governing Legislation", value: "Associations Incorporation Reform Act 2012 (Vic)" },
    { label: "Supervisory Regulator", value: "Consumer Affairs Victoria (CAV)" },
    { label: "Zoning & Planning", value: "Golden Plains Shire • Place of Worship" },
    { label: "Primary Financial Institution", value: "Commonwealth Bank of Australia (Dual Authorization)" },
  ];

  const pillars = [
    {
      title: "Democratic Model Rules Constitution",
      desc: "BHTCC operates under formal Model Rules registered with Consumer Affairs Victoria. Management Committee officers are elected democratically by eligible voting members at the Annual General Meeting (AGM).",
      icon: Scale,
    },
    {
      title: "Fiduciary Financial Dual-Controls",
      desc: "Every expenditure and bank withdrawal from our Commonwealth Bank building fund requires mandatory dual-signatory executive authorization. Financial statements are audited and lodged annually with statutory regulators.",
      icon: ShieldCheck,
    },
    {
      title: "Public Grant Stewardship",
      desc: "Capital grants committed by the Victorian State Government ($900,000+) are held in segregated, audited accounts dedicated strictly to capital infrastructure milestones overseen by the relevant Victorian departments.",
      icon: Landmark,
    },
    {
      title: "Child Safe Standards Compliance",
      desc: "BHTCC strictly adheres to Victoria's 11 Child Safe Standards. All youth educators and Balagokulam mentors must maintain current Working with Children Checks (WWCC) and abide by our Child Safety Code of Conduct.",
      icon: Lock,
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
              Fiduciary Transparency & Public Trust
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1817] tracking-tight leading-tight">
              Governance & <span className="text-maroon-gradient">Disclosures</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#554D46] leading-relaxed">
              Our sacred community institution is built upon strict legal accountability, democratic governance, and transparent stewardship of community contributions and public grants.
            </p>
          </div>
        </div>
      </section>

      {/* Statutory Registry Table */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5DACD] shadow-xl space-y-6">
            <div className="border-b border-[#F3ECE2] pb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1F2D]">
                Statutory Identifiers
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#1C1817] mt-1">
                Official Entity Register
              </h2>
            </div>

            <div className="divide-y divide-[#F3ECE2]">
              {statutoryDetails.map((item) => (
                <div key={item.label} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="font-mono text-[#554D46]">{item.label}</span>
                  <span className="font-serif font-bold text-[#1C1817] sm:text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Governance Pillars Grid */}
      <section className="py-16 sm:py-24 bg-[#F3ECE2]/40 border-y border-[#E5DACD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#7A1F2D]">
              Ethical Standards
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-[#1C1817]">
              The Four Pillars of Institutional Trust
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#554D46]">
              Ensuring the protection of every dollar and the safety of every devotee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-white rounded-3xl p-7 sm:p-8 border border-[#E5DACD] shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#F3ECE2] text-[#7A1F2D] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-[#1C1817] mb-3">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-[#554D46] leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#F3ECE2] flex items-center gap-2 text-xs font-mono text-[#7A1F2D]">
                    <CheckCircle2 className="w-4 h-4 text-[#C49A45]" />
                    <span>Active Regulatory Compliance</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Management Structure Overview */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5DACD] shadow-md space-y-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1F2D]">
                Organizational Structure
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1817] mt-1">
                Management Committee & Subcommittees
              </h3>
              <p className="text-sm text-[#554D46] mt-3 leading-relaxed">
                The operations of BHTCC are overseen by an honorary, volunteer Management Committee elected in accordance with the Association's Model Rules.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DACD]">
                <h4 className="font-serif font-bold text-sm text-[#7A1F2D]">Executive Officers</h4>
                <p className="text-xs text-[#554D46] mt-1">
                  President, Vice President, Secretary, and Treasurer managing daily administration and regulatory reporting.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DACD]">
                <h4 className="font-serif font-bold text-sm text-[#7A1F2D]">Civil & Architecture Advisory</h4>
                <p className="text-xs text-[#554D46] mt-1">
                  Engineers, town planners, and traditional Shilpa Shastra consultants overseeing site civil execution.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DACD]">
                <h4 className="font-serif font-bold text-sm text-[#7A1F2D]">Seva & Annadhanam Guild</h4>
                <p className="text-xs text-[#554D46] mt-1">
                  Dedicated kitchen and food safety certified coordinators supervising free community meals.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DACD]">
                <h4 className="font-serif font-bold text-sm text-[#7A1F2D]">Cultural & Youth Council</h4>
                <p className="text-xs text-[#554D46] mt-1">
                  Educators organizing Balagokulam, language classes, music festivals, and interfaith engagement.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#F3ECE2] flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-[#554D46]">
                Questions regarding governance or official document inspections?
              </div>
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-full bg-[#7A1F2D] hover:bg-[#5E1521] text-white text-xs font-mono font-bold uppercase tracking-wider"
              >
                Contact the Secretary
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
