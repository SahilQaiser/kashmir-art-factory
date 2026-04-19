import { Star } from "lucide-react";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Testimonial } from "@/lib/types";

export default async function Testimonials() {
  const { env } = await getCloudflareContext({ async: true });
  const { results } = await env.DB
    .prepare("SELECT * FROM testimonials ORDER BY sort_order")
    .all<Testimonial>();

  return (
    <section className="bg-kashmir-cream-dark py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-3">
            What Clients Say
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-kashmir-walnut">
            Voices of Appreciation
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {results.map((t) => (
            <div
              key={t.id}
              className="bg-kashmir-cream border border-kashmir-border rounded-sm p-7 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-kashmir-saffron text-kashmir-saffron"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-kashmir-walnut/80 text-sm leading-relaxed font-sans flex-1 mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-kashmir-border">
                <div className="w-10 h-10 rounded-full bg-kashmir-walnut flex items-center justify-center text-kashmir-cream font-serif font-bold text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-serif text-sm font-semibold text-kashmir-walnut">
                    {t.name}
                  </div>
                  <div className="text-kashmir-muted text-xs font-sans">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
