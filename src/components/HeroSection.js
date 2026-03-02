'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const items = heroRef.current?.querySelectorAll('.hero-reveal');
    items?.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, 200 + i * 150);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-cream dark:bg-dark-warm"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #E8B4B0 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #B8D4E0 0%, transparent 40%),
                            radial-gradient(circle at 60% 80%, #C4B5D4 0%, transparent 35%)`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="reveal hero-reveal">
              {/* <p className="font-body text-xs tracking-[0.3em] uppercase text-dusty-rose mb-6">
                Est. 1994 Artisan Atelier
              </p> */}
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-[#2C2420] dark:text-[#E8DDD8]">
                Handmade Is The
                <br />
                <em className="text-dusty-rose font-light italic">New Luxury</em>
              </h1>
            </div>

            <p className="reveal hero-reveal font-body text-base leading-relaxed text-warm-taupe dark:text-[#A89990] max-w-md reveal-delay-1">
              Experience the elegance of artisanal craftsmanship with our exclusive crochet collection. Every stitch tells a story of heritage, patience, and modern sophistication.
            </p>

            <div className="reveal hero-reveal flex flex-wrap gap-4 reveal-delay-2">
              <a
                href="#collections"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-dusty-rose text-white font-body text-xs tracking-widest uppercase hover:bg-muted-rose transition-all duration-300 shadow-lg shadow-dusty-rose/20"
              >
                Discover Collection
              </a>
              <a
                href="#story"
                className="inline-flex items-center px-7 py-3.5 rounded-full border border-warm-taupe/30 dark:border-[#A89990]/30 text-warm-taupe dark:text-[#A89990] font-body text-xs tracking-widest uppercase hover:border-dusty-rose hover:text-dusty-rose transition-all duration-300"
              >
                View Lookbook
              </a>
            </div>

            {/* Stats */}
            {/* <div className="reveal hero-reveal flex gap-10 pt-4 reveal-delay-3">
              {[
                { num: '2,400+', label: 'Pieces Crafted' },
                { num: '30 yrs', label: 'of Artistry' },
                { num: '100%', label: 'Handmade' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="font-display text-2xl text-[#2C2420] dark:text-[#E8DDD8]">{num}</p>
                  <p className="font-body text-xs tracking-wider text-warm-taupe dark:text-[#A89990] mt-0.5">{label}</p>
                </div>
              ))}
            </div> */}
          </div>

          {/* Right image composition */}
          <div className="relative reveal hero-reveal reveal-delay-2">
            {/* Main product image */}
            <div className="relative ml-auto w-full max-w-sm lg:max-w-none">
              <div className="relative bg-pastel-pink/20 dark:bg-dark-card rounded-3xl overflow-hidden aspect-[4/5] flex items-center justify-center shadow-2xl shadow-dusty-rose/10">
                {/* Decorative placeholder for product image */}
                <img
                  src="/assets/hero.jpeg"
                  alt="Hero product"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pastel-pink/30 dark:from-dark-card/60 to-transparent" />
              </div>

              {/* Floating tag */}
              {/* <div className="absolute -top-4 -right-4 bg-white dark:bg-dark-card rounded-2xl px-4 py-3 shadow-lg shadow-warm-taupe/10">
                <p className="font-body text-xs tracking-wider text-warm-taupe dark:text-[#A89990] uppercase">New Arrival</p>
                <p className="font-display text-sm text-[#2C2420] dark:text-[#E8DDD8] mt-0.5">Autumn Winter 2024</p>
              </div> */}

              {/* Floating material badge */}
              {/* <div className="absolute -bottom-4 -left-4 bg-white dark:bg-dark-card rounded-2xl px-4 py-3 shadow-lg shadow-warm-taupe/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-soft-lavender flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#7C6B8A" strokeWidth="1.5" className="w-4 h-4">
                    <path d="M12 2a10 10 0 1 0 10 10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div>
                  <p className="font-body text-xs font-medium text-[#2C2420] dark:text-[#E8DDD8]">Pure Merino Wool</p>
                  <p className="font-body text-xs text-warm-taupe dark:text-[#A89990]">Ethically sourced</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <p className="font-body text-xs tracking-widest uppercase text-warm-taupe/60 dark:text-[#A89990]/60">Scroll</p>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-warm-taupe/60 dark:text-[#A89990]/60">
          <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div> */}
    </section>
  );
}
