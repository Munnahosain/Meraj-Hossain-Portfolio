import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin/google-callback")({
  component: GoogleCallback,
});

function GoogleCallback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Signing you in...");

  useEffect(() => {
    const completeLogin = async () => {
      const search = new URLSearchParams(window.location.search);
      const code = search.get("code");
      const oauthError = search.get("error");

      if (oauthError) {
        setMessage(`Google login failed: ${oauthError}`);
        return;
      }

      if (!code) {
        setMessage("Google login failed: missing authorization code.");
        return;
      }

      try {
        const response = await fetch("/api/auth/google-callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            redirectUri: `${window.location.origin}/admin/google-callback`,
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          setMessage(result.error || "Google login failed.");
          return;
        }

        localStorage.setItem("admin_token", result.token);
        navigate({ to: "/admin" });
      } catch (error) {
        console.error("Google callback error:", error);
        setMessage("Google login failed. Please try again.");
      }
    };

    completeLogin();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-950 p-8 text-center">
        <div className="mx-auto mb-5 h-12 w-12 rounded-full border-4 border-gray-800 border-t-white animate-spin" />
        <h1 className="text-2xl font-bold">Google Login</h1>
        <p className="mt-3 text-sm text-gray-400">{message}</p>
      </div>
    </div>
  );
}
