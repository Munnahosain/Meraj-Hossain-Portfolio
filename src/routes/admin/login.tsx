import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("admin_token", "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to dashboard
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

  const handlePasswordLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setInfo("");
    setIsSubmitting(true);

    // Abort after 15 seconds so the page never freezes
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || result.error || "Invalid email or password.");
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
        setError("Unable to login. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    setError("");
    setInfo("Forgot password? Ask the site owner/developer to reset the admin password.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-500">Sign in to manage your portfolio</p>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-8">
          <form onSubmit={handlePasswordLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2" htmlFor="admin-email">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none focus:border-white"
                placeholder="your-admin-email@gmail.com"
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
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-gray-800 bg-black px-4 py-3 text-white outline-none focus:border-white"
                autoComplete="current-password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--brand-red)] text-white font-semibold py-3 rounded-lg hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 transition-all"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gray-800" />
            <span className="text-xs uppercase tracking-widest text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-800" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Only authorized admin email can access this panel
            </p>
            {error && (
              <p className="mt-4 text-sm text-red-400">
                {error}
              </p>
            )}
            {info && (
              <p className="mt-4 text-sm text-gray-300">
                {info}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
