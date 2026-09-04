import { Link, useNavigate } from "@tanstack/react-router";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  LayoutDashboard,
  Settings,
  Briefcase,
  Layers,
  Code2,
  Zap,
  Award,
  BookOpen,
  MessageSquare,
  Image,
  Search,
  Mail,
  BarChart3,
  Lock,
  HardDrive,
  LogOut,
  Globe,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Settings, label: "Website Settings", path: "/admin/settings" },
  { icon: Briefcase, label: "Portfolio", path: "/admin/portfolio" },
  { icon: Layers, label: "Categories", path: "/admin/categories" },
  { icon: Code2, label: "Skills", path: "/admin/skills" },
  { icon: Zap, label: "Services", path: "/admin/services" },
  { icon: Award, label: "Experience", path: "/admin/experience" },
  { icon: BookOpen, label: "Education", path: "/admin/education" },
  { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials" },
  { icon: Image, label: "Media Library", path: "/admin/media" },
  { icon: Search, label: "SEO", path: "/admin/seo" },
  { icon: Mail, label: "Contact Messages", path: "/admin/messages" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: Lock, label: "Security", path: "/admin/security" },
  { icon: HardDrive, label: "Backup", path: "/admin/backup" },
];

export function AdminSidebar() {
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage("admin_token", "");

  const handleLogout = () => {
    setToken("");
    navigate({ to: "/admin/login" });
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-gray-950 border-r border-gray-800 p-6 overflow-y-auto">
      {/* Logo */}
      <div className="mb-8 pb-8 border-b border-gray-800">
        <Link to="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white hover:text-emerald-400 transition-colors">
          <img src="/MCU-LOGO-0.2V-1.png" alt="MCU Logo" className="h-11 w-auto object-contain" />
          <h1 className="text-xl font-bold leading-tight">Admin Panel</h1>
        </Link>
        <p className="text-xs text-gray-500 mt-1">Creative Canvas Hub</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              activeProps={{
                className: "bg-gray-900 text-white",
              }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-800 pt-6 space-y-2">
        <Link
          to="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
        >
          <Globe size={18} />
          <span className="text-sm font-medium">View Website</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
