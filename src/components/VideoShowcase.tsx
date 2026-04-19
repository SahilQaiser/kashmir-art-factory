import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Video } from "@/lib/types";

export default async function VideoShowcase() {
  const { env } = await getCloudflareContext({ async: true });
  const { results } = await env.DB
    .prepare("SELECT * FROM videos ORDER BY sort_order")
    .all<Video>();

  if (results.length === 0) return null;

  return (
    <section className="bg-kashmir-walnut py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-3">
            The Craft
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-kashmir-cream">
            Watch It Come to Life
          </h2>
        </div>

        {/* Video grid */}
        <div className={`grid gap-6 ${results.length === 1 ? "grid-cols-1 max-w-3xl" : "grid-cols-1 md:grid-cols-2"}`}>
          {results.map((v) => (
            <div key={v.id} className="group">
              <div className="relative overflow-hidden rounded-sm bg-black aspect-video">
                <video
                  src={v.video_path}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-xl text-kashmir-cream mb-1">
                  {v.title}
                </h3>
                <p className="text-kashmir-cream/50 text-sm font-sans leading-relaxed">
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
