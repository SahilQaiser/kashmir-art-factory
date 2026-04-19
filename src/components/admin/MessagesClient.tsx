"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
}

export default function MessagesClient({ messages: initial }: { messages: ContactMessage[] }) {
  const router = useRouter();
  const [messages, setMessages] = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this message permanently?")) return;
    setDeleting(id);
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setDeleting(null);
    router.refresh();
  }

  if (messages.length === 0) {
    return <p className="text-gray-500 text-sm">No messages yet.</p>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
      <table className="w-full text-sm min-w-[900px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {messages.map((msg) => (
            <>
              <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {new Date(msg.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{msg.name}</td>
                <td className="px-4 py-3 text-gray-600">
                  <a href={`mailto:${msg.email}`} className="hover:text-blue-600">{msg.email}</a>
                </td>
                <td className="px-4 py-3 text-gray-500">{msg.phone ?? "—"}</td>
                <td className="px-4 py-3 max-w-xs">
                  <button
                    onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-left"
                  >
                    <span className="truncate max-w-[200px]">{msg.message}</span>
                    {expanded === msg.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(msg.id)}
                    disabled={deleting === msg.id}
                    className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
              {expanded === msg.id && (
                <tr key={`${msg.id}-expanded`} className="bg-blue-50">
                  <td colSpan={6} className="px-4 py-3 text-sm text-gray-700 whitespace-pre-wrap">{msg.message}</td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
