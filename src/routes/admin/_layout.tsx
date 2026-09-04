import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { fetchWithAuth } from "@/lib/admin-api";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const Route = createFileRoute("/admin/_layout")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("admin_token", "");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        navigate({ to: "/admin/login", replace: true });
        setIsLoading(false);
        return;
      }

      try {
        await fetchWithAuth(token, "/api/auth/check");
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        setToken("");
        navigate({ to: "/admin/login", replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [token, navigate, setToken]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-800 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p>Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

