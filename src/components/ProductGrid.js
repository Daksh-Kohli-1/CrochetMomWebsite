'use client';

import { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';

const signatureSeries = [
  { name: 'The Azure Drift Wrap', price: 240, material: 'Fine merino wool blend', tagLabel: 'Frosty Blue', colorScheme: 'frosty-blue' },
  { name: 'Petal Cardigan', price: 380, material: 'Hand-dyed organic cotton', tagLabel: 'Blush Rose', colorScheme: 'pastel-pink' },
  { name: 'Eclipse Throw', price: 520, material: 'Weighted luxury alpaca yarn', tagLabel: 'Slate Charcoal', colorScheme: 'soft-lavender' },
];

const seasonalCurations = [
  { name: 'The Ethereal Wrap', price: 420, material: 'Pure merino wool', tagLabel: 'Heritage', colorScheme: 'warm-cream' },
  { name: 'Lavender Morning Coat', price: 580, material: 'Silk & mohair blend', tagLabel: 'New Season', colorScheme: 'soft-lavender' },
  { name: 'Artisan Bloom Clutch', price: 295, material: 'Organic pima cotton', tagLabel: 'Limited', colorScheme: 'pastel-pink' },
];

export default function ProductGrid() {
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = gridRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef}>
      {/* Signature Series */}
      <section id="collections" className="py-24 lg:py-32 bg-warm-white dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12 reveal">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-dusty-rose mb-3">Curated Selection</p>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C2420] dark:text-[#E8DDD8]">The Signature Series</h2>
              <p className="font-body text-sm text-warm-taupe dark:text-[#A89990] mt-2">Limited edition hand-stitched essentials.</p>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 font-body text-xs tracking-widest uppercase text-dusty-rose hover:gap-3 transition-all duration-300">
              View All
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {signatureSeries.map((product, i) => (
              <ProductCard key={product.name} {...product} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider with yarn thread */}
      <div className="relative py-16 bg-cream dark:bg-dark-warm overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
          <div className="text-6xl font-display text-dusty-rose/20 dark:text-muted-rose/20 leading-none mb-4">&ldquo;</div>
          <blockquote className="font-display text-xl md:text-2xl lg:text-3xl italic text-[#2C2420] dark:text-[#E8DDD8] leading-relaxed">
            There is a soul in something made by hand that a machine can never replicate. It's the energy of the creator woven into the fabric of the piece.
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-dusty-rose/40" />
            <p className="font-body text-xs tracking-widest uppercase text-warm-taupe dark:text-[#A89990]">Elena V., Master Artisan</p>
            <div className="w-8 h-px bg-dusty-rose/40" />
          </div>
        </div>
      </div>

      {/* Seasonal Curations */}
      <section className="py-24 lg:py-32 bg-warm-white dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12 reveal">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-dusty-rose mb-3">Limited Drops</p>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C2420] dark:text-[#E8DDD8]">Seasonal Curations</h2>
              <p className="font-body text-sm text-warm-taupe dark:text-[#A89990] mt-2">Meticulously crafted for the modern individual.</p>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 font-body text-xs tracking-widest uppercase text-dusty-rose hover:gap-3 transition-all duration-300">
              Explore All Pieces
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {seasonalCurations.map((product, i) => (
              <ProductCard key={product.name} {...product} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Custom CTA */}
      <section className="py-20 bg-cream dark:bg-dark-warm">
        <div className="max-w-2xl mx-auto px-6 text-center reveal">
          <h2 className="font-display text-3xl md:text-4xl text-[#2C2420] dark:text-[#E8DDD8] mb-4">Create Your Masterpiece</h2>
          <p className="font-body text-sm leading-relaxed text-warm-taupe dark:text-[#A89990] mb-8">
            Interested in a custom colourway or a bespoke size? Our artisans are ready to bring your vision to life with precision and care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email for updates"
              className="w-full px-5 py-3 rounded-full bg-white dark:bg-dark-card border border-soft-pink/30 dark:border-muted-rose/20 font-body text-sm text-[#2C2420] dark:text-[#E8DDD8] placeholder-warm-taupe/60 dark:placeholder-[#A89990]/60 focus:outline-none focus:border-dusty-rose transition-colors"
            />
            <button className="shrink-0 px-6 py-3 rounded-full bg-dusty-rose text-white font-body text-xs tracking-widest uppercase hover:bg-muted-rose transition-colors duration-300 shadow-lg shadow-dusty-rose/20">
              Inquire Custom
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
