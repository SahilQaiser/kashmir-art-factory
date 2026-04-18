const stats = [
  { value: "100%", label: "Customizable" },
  { value: "Fast", label: "Turnaround" },
  { value: "Ships", label: "Worldwide" },
  { value: "Made in", label: "Kashmir" },
];

export default function TrustBar() {
  return (
    <section className="bg-kashmir-walnut text-kashmir-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-kashmir-walnut-mid">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-4">
              <div className="font-serif text-3xl font-bold text-kashmir-saffron-light mb-1">
                {stat.value}
              </div>
              <div className="text-xs tracking-widest uppercase text-kashmir-cream/60 font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
