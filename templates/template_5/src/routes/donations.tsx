import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Heart,
  Copy,
  Check,
  ShieldCheck,
  Building,
  Info,
  CheckCircle2,
  Lock,
  ArrowRight,
  FileText,
  Mail,
  AlertCircle,
} from "lucide-react";

export const Route = createFileRoute("/donations")({
  component: DonationsPage,
});

function DonationsPage() {
  const [copiedBsb, setCopiedBsb] = useState(false);
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [selectedPledge, setSelectedPledge] = useState<number | null>(251);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [receiptForm, setReceiptForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "251",
    date: "",
    refNumber: "",
    address: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleReceiptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const sponsorshipCategories = [
    {
      title: "Sacred Granite Stone Offering",
      amount: "$101 / $251 / $501",
      desc: "Sponsors hand-carved south-Indian black granite blocks for the Garbhagriha sanctum walls and plinth.",
      tag: "Sanctum Stone",
    },
    {
      title: "Maha Mandapam Pillar Dedication",
      amount: "$1,001+",
      desc: "Supports the carving and erection of acoustic structural columns in the main congregation prayer hall.",
      tag: "Mandapa Pillar",
    },
    {
      title: "Annadhanam Kitchen Endowment",
      amount: "Any Amount",
      desc: "Funds commercial stainless steel cooking cauldrons and refrigeration for the free vegetarian community kitchen.",
      tag: "Food Seva",
    },
    {
      title: "Native Parkland & Tree Seva",
      amount: "$51+",
      desc: "Sponsors the planting and perpetual watering of native eucalyptus and sacred flora across the 5-acre grounds.",
      tag: "Vastu Parkland",
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
              <Heart className="w-3.5 h-3.5 text-[#C49A45] fill-current" />
              100% Direct to Temple Construction
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1817] tracking-tight leading-tight">
              Temple <span className="text-maroon-gradient">Building Fund</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#554D46] leading-relaxed">
              Help carve permanent granite sanctums and establish Regional Victoria's sacred spiritual heartland at 110 Vaggs Rd, Ross Creek.
            </p>
          </div>
        </div>
      </section>

      {/* Statutory Informational Notice on Payment Method */}
      <section className="bg-amber-50 border-b border-amber-200 py-4 px-4 text-xs font-mono text-amber-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-amber-800 shrink-0" />
            <span>
              <strong>Online Credit Card Checkout Deferred:</strong> To eliminate costly 2%–3% credit card merchant gateway fees, all building fund donations are accepted exclusively via direct Commonwealth Bank of Australia (CBA) bank transfer (EFT).
            </span>
          </div>
          <span className="font-bold shrink-0">Zero Merchant Fees Deducted</span>
        </div>
      </section>

      {/* Bank Account Direct Transfer Box */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#7A1F2D]/20 shadow-2xl relative overflow-hidden">
            {/* Background Seal */}
            <div className="absolute top-4 right-4 text-[#F3ECE2] font-serif text-8xl font-bold select-none pointer-events-none opacity-40">
              ॐ
            </div>

            <div className="max-w-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1F2D]">
                Official Commonwealth Bank (CBA) Account
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1817] mt-1">
                Direct Electronic Funds Transfer (EFT)
              </h2>
              <p className="text-xs sm:text-sm text-[#554D46] mt-2 leading-relaxed">
                Log into your Australian bank app (CBA, ANZ, NAB, Westpac, Bendigo Bank, etc.) and transfer directly to the BHTCC Incorporated Building Account using the verified details below:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Account Name */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DACD] md:col-span-2">
                <span className="text-[11px] font-mono text-[#554D46] uppercase block">
                  Official Account Name:
                </span>
                <span className="font-serif font-bold text-base sm:text-lg text-[#1C1817] mt-0.5 block">
                  Ballarat Hindu Temple & Cultural Centre Inc
                </span>
              </div>

              {/* BSB Number */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DACD] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#554D46] uppercase block">
                    Bank State Branch (BSB):
                  </span>
                  <span className="font-mono font-bold text-2xl text-[#7A1F2D] mt-0.5 block">
                    063-500
                  </span>
                  <span className="text-[10px] text-[#554D46]">CBA Ballarat Branch</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard("063-500", "bsb")}
                  className="px-4 py-2 rounded-xl bg-white border border-[#DED4C7] hover:bg-[#F3ECE2] text-xs font-mono font-bold text-[#7A1F2D] flex items-center gap-1.5 transition-all shadow-sm"
                >
                  {copiedBsb ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBsb ? "Copied!" : "Copy BSB"}</span>
                </button>
              </div>

              {/* Account Number */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DACD] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#554D46] uppercase block">
                    Account Number:
                  </span>
                  <span className="font-mono font-bold text-2xl text-[#7A1F2D] mt-0.5 block">
                    1089 4231
                  </span>
                  <span className="text-[10px] text-[#554D46]">Dedicated Building Account</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard("10894231", "acc")}
                  className="px-4 py-2 rounded-xl bg-white border border-[#DED4C7] hover:bg-[#F3ECE2] text-xs font-mono font-bold text-[#7A1F2D] flex items-center gap-1.5 transition-all shadow-sm"
                >
                  {copiedAcc ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAcc ? "Copied!" : "Copy Account"}</span>
                </button>
              </div>
            </div>

            {/* Reference Advice */}
            <div className="mt-4 p-4 rounded-2xl bg-[#F3ECE2] text-xs font-mono text-[#554D46] flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#7A1F2D] shrink-0 mt-0.5" />
              <div>
                <strong>Payment Reference:</strong> Please enter your <strong>Full Name</strong> or <strong>Mobile Phone</strong> in the reference field so our treasurer can identify your transfer and generate your official receipt.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers Guidance */}
      <section className="py-16 bg-[#F3ECE2]/40 border-y border-[#E5DACD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#7A1F2D]">
              Sacred Dedications
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-[#1C1817]">
              Sponsorship & Seva Opportunities
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#554D46]">
              Choose a specific architectural component or make a general building contribution of any amount.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipCategories.map((tier) => (
              <div
                key={tier.title}
                className="bg-white rounded-3xl p-6 border border-[#E5DACD] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#F3ECE2] text-[#7A1F2D] inline-block mb-3">
                    {tier.tag}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#1C1817] mb-1">{tier.title}</h3>
                  <div className="text-sm font-mono font-bold text-[#7A1F2D] mb-3">{tier.amount}</div>
                  <p className="text-xs text-[#554D46] leading-relaxed">{tier.desc}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#F3ECE2] text-[11px] font-mono text-[#554D46]">
                  Transfer via CBA with note "{tier.tag}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EFT Receipt Request Notification Form */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5DACD] shadow-xl">
            <div className="text-center max-w-lg mx-auto mb-8">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1F2D]">
                Treasurer Notification
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1817] mt-1">
                Request an Official Contribution Receipt
              </h2>
              <p className="text-xs sm:text-sm text-[#554D46] mt-2">
                Have you completed your direct bank transfer? Notify our treasury team below to receive your formal tax-deductible BHTCC receipt.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-emerald-900">
                  Notification Received with Gratitude
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800">
                  Thank you, <strong>{receiptForm.name}</strong>. Our volunteer treasurer will reconcile your electronic transfer of ${receiptForm.amount} and email your official BHTCC receipt to <strong>{receiptForm.email}</strong>.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 rounded-full bg-emerald-700 text-white text-xs font-mono"
                >
                  Send Another Remittance Notice
                </button>
              </div>
            ) : (
              <form onSubmit={handleReceiptSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Donor Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={receiptForm.name}
                      onChange={(e) => setReceiptForm({ ...receiptForm, name: e.target.value })}
                      placeholder="e.g. Anand Kumar"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Email Address (for Receipt) *
                    </label>
                    <input
                      type="email"
                      required
                      value={receiptForm.email}
                      onChange={(e) => setReceiptForm({ ...receiptForm, email: e.target.value })}
                      placeholder="e.g. donor@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Amount (AUD) *
                    </label>
                    <input
                      type="number"
                      required
                      value={receiptForm.amount}
                      onChange={(e) => setReceiptForm({ ...receiptForm, amount: e.target.value })}
                      placeholder="e.g. 251"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Transfer Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={receiptForm.date}
                      onChange={(e) => setReceiptForm({ ...receiptForm, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                      Bank Ref / Receipt No
                    </label>
                    <input
                      type="text"
                      value={receiptForm.refNumber}
                      onChange={(e) => setReceiptForm({ ...receiptForm, refNumber: e.target.value })}
                      placeholder="e.g. N10982348"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                    Postal Address (Optional for Postal Receipt)
                  </label>
                  <input
                    type="text"
                    value={receiptForm.address}
                    onChange={(e) => setReceiptForm({ ...receiptForm, address: e.target.value })}
                    placeholder="e.g. 12 Sturt St, Ballarat VIC 3350"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#7A1F2D] hover:bg-[#5E1521] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.01]"
                >
                  Send EFT Remittance Notice to Treasurer
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
