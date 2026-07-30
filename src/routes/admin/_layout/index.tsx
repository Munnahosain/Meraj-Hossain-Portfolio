import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Briefcase, Code2, Download, Eye, Layers, Users } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/")({
  component: AdminDashboard,
});

interface DashboardStats {
  totalProjects: number;
  featuredProjects: number;
  hiddenProjects: number;
  totalCategories: number;
  totalSkills: number;
  totalServices: number;
  visitors: number;
  messages: number;
  resumeDownloads: number;
}

function AdminDashboard() {
  const [token] = useLocalStorage("admin_token", "");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Build an auth header only when a token exists
        const authHeader = token ? { Authorization: "Bearer " + token } : {};

        const [projectsRes, categoriesRes, skillsRes] = await Promise.all([
          fetch("/api/projects?limit=1000", { headers: authHeader }),
          fetch("/api/categories", { headers: authHeader }),
          fetch("/api/skills?limit=1000", { headers: authHeader }),
        ]);

        const projectsData = await projectsRes.json();
        const categoriesData = await categoriesRes.json();
        const skillsData = await skillsRes.json();

        const projects = projectsData.data || [];
        const featured = projects.filter((p: any) => p.featured).length;
        const hidden = projects.filter((p: any) => p.hidden).length;

        setStats({
          totalProjects: projectsData.total || projects.length,
          featuredProjects: featured,
          hiddenProjects: hidden,
          totalCategories: categoriesData.data?.length || 0,
          totalSkills: skillsData.total || skillsData.data?.length || 0,
          totalServices: 0,
          visitors: 0,
          messages: 0,
          resumeDownloads: 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const StatCard = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: number;
  }) => (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">{label}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-500">Welcome to your admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<Briefcase size={24} className="text-blue-500" />}
          label="Total Projects"
          value={stats?.totalProjects || 0}
        />
        <StatCard
          icon={<Eye size={24} className="text-green-500" />}
          label="Featured Projects"
          value={stats?.featuredProjects || 0}
        />
        <StatCard
          icon={<Layers size={24} className="text-purple-500" />}
          label="Categories"
          value={stats?.totalCategories || 0}
        />
        <StatCard
          icon={<Code2 size={24} className="text-orange-500" />}
          label="Skills"
          value={stats?.totalSkills || 0}
        />
        <StatCard
          icon={<Users size={24} className="text-pink-500" />}
          label="Visitors"
          value={stats?.visitors || 0}
        />
        <StatCard
          icon={<Download size={24} className="text-cyan-500" />}
          label="Resume Downloads"
          value={stats?.resumeDownloads || 0}
        />
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Edit Settings", href: "/admin/settings" },
            { label: "Add Project", href: "/admin/portfolio" },
            { label: "Manage Skills", href: "/admin/skills" },
            { label: "View Messages", href: "/admin/messages" },
          ].map((action) => (
            <Link
              key={action.href}
              to={action.href}
              className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
