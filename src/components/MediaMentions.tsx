import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { MediaMention } from "@/lib/types";

function getEmbedUrl(url: string) {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  
  // Return as is if already an embed or unsupported (can be extended)
  return url;
}

export default async function MediaMentions() {
  const { env } = await getCloudflareContext({ async: true });
  const { results: mentions } = await env.DB
    .prepare("SELECT * FROM media_mentions ORDER BY sort_order ASC")
    .all<MediaMention>();

  if (mentions.length === 0) return null;

  return (
    <section className="bg-white py-24 border-t border-kashmir-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-4">
            In the Spotlight
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-kashmir-walnut mb-4">
            Media & Appreciation
          </h2>
          <div className="w-20 h-px bg-kashmir-saffron/40 mx-auto mb-6" />
          <p className="text-kashmir-muted text-lg font-sans max-w-2xl mx-auto leading-relaxed">
            Our commitment to preserving Kashmiri craftsmanship has been recognized and shared by leading media outlets.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
          {mentions.map((mention) => (
            <div key={mention.id} className="group flex flex-col md:flex-row gap-8 items-center bg-kashmir-cream/30 p-8 rounded-sm border border-kashmir-border/50 hover:border-kashmir-saffron/20 transition-all duration-500">
              <div className="w-full md:w-3/5 shrink-0 relative aspect-video overflow-hidden rounded-sm bg-kashmir-walnut shadow-xl">
                <iframe
                  src={getEmbedUrl(mention.video_url)}
                  title={mention.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                ></iframe>
              </div>
              <div className="flex-1">
                <div className="text-kashmir-saffron text-xs font-semibold tracking-widest uppercase font-sans mb-3 flex items-center gap-2">
                   <span className="w-4 h-4 bg-kashmir-saffron/10 rounded-full flex items-center justify-center text-[10px]">●</span>
                   {mention.source}
                </div>
                <h3 className="font-serif text-2xl text-kashmir-walnut mb-4 leading-snug">
                  {mention.title}
                </h3>
                <p className="text-kashmir-muted text-sm font-sans leading-relaxed mb-6 italic opacity-80">
                  &ldquo;{mention.description}&rdquo;
                </p>
                <div className="flex items-center gap-3 text-xs font-medium text-kashmir-walnut/60 uppercase tracking-tighter">
                   <div className="w-6 h-[1px] bg-kashmir-walnut/20" />
                   Featured Story
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
