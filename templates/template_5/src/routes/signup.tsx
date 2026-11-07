import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import { supabase } from "@/integrations/supabase/client";
import {
  User,
  Mail,
  Lock,
  Phone,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred during registration.");
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
              New Community Member
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1817] mt-1">
              Create an Account
            </h1>
            <p className="text-xs text-[#554D46] mt-2">
              Register to receive official member notices, manage volunteer seva, and access temple records.
            </p>
          </div>

          {/* Success Screen */}
          {success ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif font-bold text-xl text-emerald-900">
                Registration Initiated
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                Thank you, <strong>{fullName}</strong>. A verification email has been dispatched to <strong>{email}</strong>.
              </p>
              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 text-xs font-mono text-emerald-900 text-left space-y-1">
                <div className="font-bold">Next Steps:</div>
                <div>1. Open your inbox and locate the BHTCC confirmation email.</div>
                <div>2. Click the verification link to confirm your email.</div>
                <div>3. Sign in using your credentials.</div>
              </div>
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

              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Gayatri Pillai"
                      className="w-full px-4 py-2.5 pl-10 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                    <User className="w-4 h-4 text-[#554D46] absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="gayatri@example.com"
                      className="w-full px-4 py-2.5 pl-10 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                    <Mail className="w-4 h-4 text-[#554D46] absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0412 345 678"
                      className="w-full px-4 py-2.5 pl-10 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                    <Phone className="w-4 h-4 text-[#554D46] absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                    Password (Min. 6 Characters) *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-2.5 pl-10 pr-10 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
                    />
                    <Lock className="w-4 h-4 text-[#554D46] absolute left-3.5 top-3.5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-[#554D46] hover:text-[#1C1817]"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5DACD] text-[11px] text-[#554D46] leading-relaxed">
                  <strong>Notice on Email Confirmation:</strong> In compliance with security standards, a verification link will be sent to confirm your email before full sign-in is enabled.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-[#7A1F2D] hover:bg-[#5E1521] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.01] disabled:opacity-50 mt-2"
                >
                  {loading ? "Registering..." : "Create Account"}
                </button>
              </form>

              <div className="mt-6 text-center text-xs font-mono text-[#554D46]">
                Already have an account?{" "}
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
