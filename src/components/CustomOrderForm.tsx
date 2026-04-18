"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

const productTypes = [
  "Islamic Calligraphy",
  "Quote / Text Wall Art",
  "Carved Engraving",
  "Wall Clock",
  "3D Sculpture",
  "Gift Set",
  "Something else",
];

type FormState = "idle" | "loading" | "success" | "error";

export default function CustomOrderForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    product_type: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState("success");
    } catch (err: unknown) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CheckCircle2 size={48} className="text-kashmir-saffron mb-5" />
        <h3 className="font-serif text-3xl text-kashmir-walnut mb-3">
          We got your order!
        </h3>
        <p className="text-kashmir-muted text-base font-sans max-w-sm leading-relaxed">
          Thanks {form.name.split(" ")[0]}! We&apos;ll review your request and
          get back to you within a few hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium text-kashmir-walnut tracking-wide uppercase font-sans mb-2">
            Your Name <span className="text-kashmir-saffron">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Aisha Khan"
            className="w-full bg-white border border-kashmir-border text-kashmir-walnut text-sm font-sans px-4 py-3 rounded-sm placeholder:text-kashmir-muted/50 focus:outline-none focus:border-kashmir-saffron transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-kashmir-walnut tracking-wide uppercase font-sans mb-2">
            Email <span className="text-kashmir-saffron">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full bg-white border border-kashmir-border text-kashmir-walnut text-sm font-sans px-4 py-3 rounded-sm placeholder:text-kashmir-muted/50 focus:outline-none focus:border-kashmir-saffron transition-colors"
          />
        </div>
      </div>

      {/* Phone + Product type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium text-kashmir-walnut tracking-wide uppercase font-sans mb-2">
            WhatsApp / Phone{" "}
            <span className="text-kashmir-muted normal-case font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full bg-white border border-kashmir-border text-kashmir-walnut text-sm font-sans px-4 py-3 rounded-sm placeholder:text-kashmir-muted/50 focus:outline-none focus:border-kashmir-saffron transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-kashmir-walnut tracking-wide uppercase font-sans mb-2">
            Type of Piece <span className="text-kashmir-saffron">*</span>
          </label>
          <select
            name="product_type"
            required
            value={form.product_type}
            onChange={handleChange}
            className="w-full bg-white border border-kashmir-border text-kashmir-walnut text-sm font-sans px-4 py-3 rounded-sm focus:outline-none focus:border-kashmir-saffron transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled>
              Select a category
            </option>
            {productTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-medium text-kashmir-walnut tracking-wide uppercase font-sans mb-2">
          Tell us what you want <span className="text-kashmir-saffron">*</span>
        </label>
        <textarea
          name="description"
          required
          value={form.description}
          onChange={handleChange}
          rows={5}
          placeholder="Describe your idea — the text, design, size, occasion, or anything else you have in mind. The more you share, the better we can help."
          className="w-full bg-white border border-kashmir-border text-kashmir-walnut text-sm font-sans px-4 py-3 rounded-sm placeholder:text-kashmir-muted/50 focus:outline-none focus:border-kashmir-saffron transition-colors resize-none"
        />
      </div>

      {/* Error */}
      {state === "error" && (
        <p className="text-red-600 text-sm font-sans">{errorMsg}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex items-center gap-2 bg-kashmir-saffron text-white text-sm font-medium px-8 py-3.5 rounded-sm hover:bg-kashmir-saffron-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "loading" ? (
          <>
            <Loader2 size={15} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={15} /> Send My Order Request
          </>
        )}
      </button>
    </form>
  );
}
