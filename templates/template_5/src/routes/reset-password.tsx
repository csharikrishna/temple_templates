import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import { supabase } from "@/integrations/supabase/client";
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Lock,
} from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/login`
          : undefined;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err?.message || "An error occurred while dispatching the password reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1817] flex flex-col">
      <SiteNavigation />

      <section className="flex-1 py-16 sm:py-24 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#E5DACD] shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#7A1F2D] text-[#C49A45] flex items-center justify-center font-serif text-2xl mx-auto mb-4 shadow-md">
              ॐ
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1F2D]">
              Security & Recovery
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1817] mt-1">
              Reset Password
            </h1>
            <p className="text-xs text-[#554D46] mt-2">
              Enter your registered BHTCC email address to receive a secure recovery link.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif font-bold text-xl text-emerald-900">
                Recovery Link Dispatched
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                If an account exists for <strong>{email}</strong>, a secure password reset link has been dispatched to your inbox.
              </p>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="inline-block px-6 py-2.5 rounded-full bg-[#7A1F2D] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-md"
                >
                  Return to Sign In →
                </Link>
              </div>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleReset} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                    Registered Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                    <Mail className="w-4 h-4 text-[#554D46] absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-[#7A1F2D] hover:bg-[#5E1521] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.01] disabled:opacity-50 mt-2"
                >
                  {loading ? "Sending..." : "Send Recovery Link"}
                </button>
              </form>

              <div className="mt-6 text-center text-xs font-mono text-[#554D46]">
                Remember your password?{" "}
                <Link to="/login" className="text-[#7A1F2D] font-bold underline hover:text-[#5E1521]">
                  Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
