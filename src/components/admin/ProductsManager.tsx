"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import type { Product } from "@/lib/types";
import Image from "next/image";

const CATEGORIES = ["Carved Engravings", "Islamic Calligraphy", "Quote Wall Art", "Clocks & 3D Art"];

type FormState = Omit<Product, "featured"> & { featured: boolean };

const empty: FormState = {
  id: "", name: "", category: CATEGORIES[0], description: "", image: "", tag: null, featured: false, sort_order: 0,
};

export default function ProductsManager({ products: initial }: { products: Product[] }) {
  const router = useRouter();
  const [products, setProducts] = useState(initial);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  function openAdd() {
    setEditing({ ...empty });
    setIsNew(true);
  }

  function openEdit(p: Product) {
    setEditing({ ...p, featured: Boolean(p.featured) });
    setIsNew(false);
  }

  function close() {
    setEditing(null);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "products");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json() as { path?: string; error?: string };
    if (data.path) {
      setEditing((prev) => prev ? { ...prev, image: data.path! } : prev);
    }
    setUploading(false);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const payload = { ...editing, featured: editing.featured ? 1 : 0 };

    if (isNew) {
      await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`/api/admin/products/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setSaving(false);
    close();
    router.refresh();
    // Optimistic update
    if (isNew) {
      setProducts((prev) => [...prev, { ...payload, featured: payload.featured as unknown as number }]);
    } else {
      setProducts((prev) => prev.map((p) => p.id === editing.id ? { ...payload, featured: payload.featured as unknown as number } : p));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product permanently?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
    router.refresh();
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Products</h1>
          <p className="text-gray-500 text-sm">{products.length} product{products.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#C8862A] text-white text-sm font-medium px-4 py-2.5 rounded hover:bg-[#E0A44A] transition-colors"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2">
                  <div className="w-12 h-12 relative bg-gray-100 rounded overflow-hidden">
                    <Image src={p.image} alt={p.name} fill className="object-cover" unoptimized />
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{p.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                <td className="px-4 py-3 text-gray-600">{p.category}</td>
                <td className="px-4 py-3 text-gray-500">{p.tag ?? "—"}</td>
                <td className="px-4 py-3">
                  {Boolean(p.featured) && (
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded">Yes</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-500">{p.sort_order}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(p)} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">{isNew ? "Add Product" : "Edit Product"}</h2>
              <button onClick={close} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <Field label="Product ID" required>
                <input
                  value={editing.id}
                  onChange={(e) => setEditing({ ...editing, id: e.target.value })}
                  disabled={!isNew}
                  placeholder="KAF-001"
                  className="input"
                />
              </Field>
              <Field label="Name" required>
                <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="input" />
              </Field>
              <Field label="Category" required>
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="input">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
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
                <Field label="Sort Order">
                  <input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="input" />
                </Field>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="rounded" />
                Featured product
              </label>
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
