"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { MediaMention } from "@/lib/types";

type FormState = Omit<MediaMention, "id"> & { id?: number };

const empty: FormState = {
  video_url: "", title: "", source: "", description: "", sort_order: 0,
};

export default function MediaMentionsManager({ mentions: initial }: { mentions: MediaMention[] }) {
  const router = useRouter();
  const [mentions, setMentions] = useState(initial);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  function openAdd() { setEditing({ ...empty }); setIsNew(true); }
  function openEdit(m: MediaMention) { setEditing({ ...m }); setIsNew(false); }
  function close() { setEditing(null); }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    if (isNew) {
      await fetch("/api/admin/media-mentions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
    } else {
      await fetch(`/api/admin/media-mentions/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
    }
    setSaving(false);
    close();
    router.refresh();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this media mention permanently?")) return;
    await fetch(`/api/admin/media-mentions/${id}`, { method: "DELETE" });
    setMentions((prev) => prev.filter((m) => m.id !== id));
    router.refresh();
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Media Mentions</h1>
          <p className="text-gray-500 text-sm">{mentions.length} mention{mentions.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#C8862A] text-white text-sm font-medium px-4 py-2.5 rounded hover:bg-[#E0A44A] transition-colors"
        >
          <Plus size={16} /> Add Mention
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mentions.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{m.source}</td>
                <td className="px-4 py-3 text-gray-900">{m.title}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs truncate max-w-[200px]">{m.video_url}</td>
                <td className="px-4 py-3 text-gray-500">{m.sort_order}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(m)} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(m.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">{isNew ? "Add Mention" : "Edit Mention"}</h2>
              <button onClick={close} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <Field label="Video URL" required>
                <input value={editing.video_url} onChange={(e) => setEditing({ ...editing, video_url: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." className="input" />
              </Field>
              <Field label="Source" required>
                <input value={editing.source} onChange={(e) => setEditing({ ...editing, source: e.target.value })} placeholder="The Kashmir Monitor" className="input" />
              </Field>
              <Field label="Title" required>
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input" />
              </Field>
              <Field label="Description" required>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="input resize-none" />
              </Field>
              <Field label="Sort Order">
                <input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="input" />
              </Field>
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <button onClick={close} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">Cancel</button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-[#C8862A] text-white text-sm font-medium rounded hover:bg-[#E0A44A] transition-colors disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
