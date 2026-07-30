import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Mail, Trash2, Calendar, User, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/messages")({
  component: AdminMessages,
});

export function AdminMessages() {
  const [token] = useLocalStorage("admin_token", "");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) setMessages(json.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message inquiry?")) return;
    try {
      const res = await fetch(`/api/messages?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) fetchMessages();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Contact Messages</h1>
        <p className="text-gray-400">View inquiries sent through your website contact form</p>
      </div>

      <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
        {isLoading ? (
          <p className="text-gray-400">Loading messages...</p>
        ) : messages.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <Mail className="mx-auto h-12 w-12 mb-3 text-gray-600" />
            <p className="text-base font-medium">No contact inquiries received yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m._id} className="p-5 bg-black border border-gray-800 rounded-lg space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-[var(--brand-red)]" />
                    <div>
                      <h3 className="font-bold text-white text-base">{m.name}</h3>
                      <a
                        href={`mailto:${m.email}`}
                        className="text-xs text-gray-400 hover:text-white font-mono"
                      >
                        {m.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                      <Calendar size={14} />
                      {new Date(m.createdAt).toLocaleDateString()}{" "}
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-gray-900 transition-colors"
                      title="Delete message"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">
                    Subject: {m.subject}
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {m.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
