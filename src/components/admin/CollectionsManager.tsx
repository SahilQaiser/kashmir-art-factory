"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import type { Collection } from "@/lib/types";
import Image from "next/image";

type FormState = Omit<Collection, "id"> & { id?: number };

const empty: FormState = {
  slug: "", title: "", description: "", image: "", tag: null, piece_count: "", sort_order: 0,
};

export default function CollectionsManager({ collections: initial }: { collections: Collection[] }) {
  const router = useRouter();
  const [collections, setCollections] = useState(initial);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  function openAdd() { setEditing({ ...empty }); setIsNew(true); }
  function openEdit(c: Collection) { setEditing({ ...c }); setIsNew(false); }
  function close() { setEditing(null); }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "collections");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json() as { path?: string };
    if (data.path) setEditing((prev) => prev ? { ...prev, image: data.path! } : prev);
    setUploading(false);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    if (isNew) {
      await fetch("/api/admin/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
    } else {
      await fetch(`/api/admin/collections/${editing.id}`, {
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
    if (!confirm("Delete this collection permanently?")) return;
    await fetch(`/api/admin/collections/${id}`, { method: "DELETE" });
    setCollections((prev) => prev.filter((c) => c.id !== id));
    router.refresh();
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Collections</h1>
          <p className="text-gray-500 text-sm">{collections.length} collection{collections.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#C8862A] text-white text-sm font-medium px-4 py-2.5 rounded hover:bg-[#E0A44A] transition-colors"
        >
          <Plus size={16} /> Add Collection
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Pieces</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {collections.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2">
                  <div className="w-12 h-12 relative bg-gray-100 rounded overflow-hidden">
                    <Image src={c.image} alt={c.title} fill className="object-cover" unoptimized />
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{c.slug}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{c.title}</td>
                <td className="px-4 py-3 text-gray-500">{c.tag ?? "—"}</td>
                <td className="px-4 py-3 text-gray-600">{c.piece_count}</td>
                <td className="px-4 py-3 text-gray-500">{c.sort_order}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(c)} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(c.id)} className="text-gray-400 hover:text-red-500 transition-colors">
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
              <h2 className="text-lg font-semibold text-gray-900">{isNew ? "Add Collection" : "Edit Collection"}</h2>
              <button onClick={close} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <Field label="Slug" required>
                <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="carved-engravings" className="input" />
              </Field>
              <Field label="Title" required>
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input" />
              </Field>
              <Field label="Description" required>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="input resize-none" />
              </Field>
              <Field label="Image">
                <div className="space-y-2">
                  <input
                    value={editing.image}
                    onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                    placeholder="/assets/image.jpg"
                    className="input"
                  />
                  <label className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer hover:text-blue-700">
                    <Upload size={14} />
                    {uploading ? "Uploading…" : "Upload new image"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                  {editing.image && (
                    <div className="w-20 h-20 relative bg-gray-100 rounded overflow-hidden">
                      <Image src={editing.image} alt="preview" fill className="object-cover" unoptimized />
                    </div>
                  )}
                </div>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Tag">
                  <input value={editing.tag ?? ""} onChange={(e) => setEditing({ ...editing, tag: e.target.value || null })} placeholder="Bestseller" className="input" />
                </Field>
                <Field label="Piece Count" required>
                  <input value={editing.piece_count} onChange={(e) => setEditing({ ...editing, piece_count: e.target.value })} placeholder="50+ pieces" className="input" />
                </Field>
              </div>
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
