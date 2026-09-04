import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useState, type FormEvent } from "react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

const demoEmail = "merajhossain.mcu@gmail.com";
const demoPassword = "Admin@123";

type AuthMode = "signin" | "signup";

function AdminLogin() {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("admin_token", "");
  const [mode, setMode] = useState<AuthMode>("signin");
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState(demoEmail);
  const [password, setPassword] = useState(demoPassword);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasGoogleLogin = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);

  useEffect(() => {
    if (token) {
      navigate({ to: "/admin" });
    }
  }, [token, navigate]);

  const handleGoogleLogin = async () => {
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

      if (!clientId) {
        setError("Google Client ID missing. Add VITE_GOOGLE_CLIENT_ID to your .env file.");
        return;
      }

      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: `${window.location.origin}/admin/google-callback`,
        response_type: "code",
        scope: "openid email profile",
        prompt: "select_account",
      });

      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to start Google login. Please try again.");
    }
  };

  const handlePasswordLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setInfo("");
    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const payload =
        mode === "signup"
          ? { name, email, password }
          : { email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || result.error || "Unable to complete this request.");
        return;
      }

      if (mode === "signup") {
        setInfo("Account created successfully. You can sign in now.");
        setMode("signin");
        setPassword("");
        setEmail(result.user?.email || email);
        return;
      }

      setToken(result.token);
      navigate({ to: "/admin" });
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        setError("Request timed out. Server is taking too long — please try again.");
      } else {
        console.error("Password login error:", error);
        setError("Unable to complete the request. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    setError("");
    setInfo("Contact the site owner to reset the authorized admin access.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050a07] px-4 py-12 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 items-center justify-center">
            <img
              src="/MCU-LOGO-0.2V-1.png"
              alt="MCU Logo"
              className="h-full w-auto object-contain"
            />
          </div>
          <h1 className="mb-2 text-3xl font-black tracking-tight text-white">Admin Panel</h1>
          <p className="text-sm text-gray-400">Sign in to manage the portfolio securely</p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-950/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="mb-5 flex rounded-xl border border-gray-800 bg-black/30 p-1">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                mode === "signin" ? "bg-emerald-500 text-black" : "text-gray-300"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                mode === "signup" ? "bg-emerald-500 text-black" : "text-gray-300"
              }`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handlePasswordLogin} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="mb-2 block text-sm text-gray-400" htmlFor="admin-name">
                  Full name
                </label>
                <input
                  id="admin-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm text-gray-400" htmlFor="admin-email">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="admin@creativecanvashub.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label className="block text-sm text-gray-400" htmlFor="admin-password">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-gray-400 transition-colors hover:text-white"
                >
                  Reset access
                </button>
              </div>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-4 py-3 font-semibold text-black shadow-lg shadow-emerald-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? mode === "signup"
                  ? "Creating account..."
                  : "Signing in..."
                : mode === "signup"
                  ? "Create account"
                  : "Sign in"}
            </button>
          </form>

          {hasGoogleLogin && (
            <>
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-800" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-gray-500">or</span>
                <div className="h-px flex-1 bg-gray-800" />
              </div>

              <button
                onClick={handleGoogleLogin}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-gray-100"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>
            </>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Only the authorized admin account can access this panel.</p>
            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
            {info && <p className="mt-4 text-sm text-emerald-300">{info}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
