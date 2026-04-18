"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json() as { error?: string };
        setError(data.error ?? "Login failed.");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-kashmir-walnut flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-2">
            Kashmir Art Factory
          </p>
          <h1 className="font-serif text-3xl text-kashmir-cream">Admin Panel</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-kashmir-walnut-mid p-8 border border-kashmir-cream/10">
          <label className="block text-kashmir-cream/70 text-xs font-sans uppercase tracking-wider mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="w-full bg-kashmir-walnut border border-kashmir-cream/20 text-kashmir-cream px-4 py-3 text-sm font-sans focus:outline-none focus:border-kashmir-saffron transition-colors"
            placeholder="Enter admin password"
          />

          {error && (
            <p className="mt-3 text-red-400 text-sm font-sans">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-kashmir-saffron text-white text-sm font-medium py-3 hover:bg-kashmir-saffron-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
