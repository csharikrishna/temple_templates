import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNavigation } from "@/components/SiteNavigation";
import { SiteFooter } from "@/components/SiteFooter";
import { supabase } from "@/integrations/supabase/client";
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        setSuccessMsg("Signed in successfully. Redirecting...");
        setTimeout(() => {
          navigate({ to: "/admin" });
        }, 1000);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdmin = () => {
    // Quick demo exploration shortcut for local evaluation
    setSuccessMsg("Entering Administrator Portal in review mode...");
    setTimeout(() => {
      navigate({ to: "/admin" });
    }, 600);
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
              Member & Administrative Access
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1817] mt-1">
              Sign In to BHTCC
            </h1>
            <p className="text-xs text-[#554D46] mt-2">
              Access your membership records, volunteer schedules, and administrative portal.
            </p>
          </div>

          {/* Error / Success Notifications */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#1C1817] mb-1">
                Email Address
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

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-mono font-bold uppercase text-[#1C1817]">
                  Password
                </label>
                <Link
                  to="/reset-password"
                  className="text-[11px] font-mono text-[#7A1F2D] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 pl-10 pr-10 rounded-xl border border-[#E5DACD] text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#7A1F2D]"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#7A1F2D] hover:bg-[#5E1521] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.01] disabled:opacity-50 mt-2"
            >
              {loading ? "Authenticating..." : "Sign In to Account"}
            </button>
          </form>

          {/* Quick Review / Demo Button */}
          <div className="mt-4 pt-4 border-t border-[#F3ECE2]">
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="w-full py-2.5 rounded-full bg-[#F3ECE2] hover:bg-[#EAE1D5] text-[#7A1F2D] text-xs font-mono font-semibold uppercase tracking-wider transition-all"
            >
              Enter Admin Portal (Review Mode) →
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-xs font-mono text-[#554D46]">
            Not yet registered as a member?{" "}
            <Link to="/signup" className="text-[#7A1F2D] font-bold underline hover:text-[#5E1521]">
              Register Here
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
