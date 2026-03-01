'use client';

import { useEffect, useRef } from 'react';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Organic Fibers',
    desc: 'Sourced from ethical premium suppliers across the Mediterranean.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Heritage Stitches',
    desc: 'Techniques preserved through generations of artisanal mastery.',
  },
];

export default function StorySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="py-28 lg:py-36 bg-cream dark:bg-dark-warm overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left text */}
          <div className="space-y-8">
            <div className="reveal">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-dusty-rose mb-4">
                Our Philosophy
              </p>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-[#2C2420] dark:text-[#E8DDD8]">
                The Art of Crochet
              </h2>
              <div className="w-12 h-px bg-dusty-rose mt-5" />
            </div>

            <p className="reveal reveal-delay-1 font-body text-base leading-relaxed text-warm-taupe dark:text-[#A89990]">
              Beyond the needle and thread lies a meditative journey. Our process celebrates the slow-fashion movement, ensuring each piece is ethically crafted with souls of its own. We believe true luxury isn't manufactured — it's grown from patience.
            </p>

            <div className="reveal reveal-delay-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="p-5 rounded-2xl bg-warm-white dark:bg-dark-card border border-soft-pink/20 dark:border-muted-rose/10 hover:border-dusty-rose/30 transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-pastel-pink/40 dark:bg-muted-rose/20 flex items-center justify-center text-dusty-rose mb-3">
                    {icon}
                  </div>
                  <h3 className="font-body text-sm font-medium text-[#2C2420] dark:text-[#E8DDD8] mb-1.5">{title}</h3>
                  <p className="font-body text-xs leading-relaxed text-warm-taupe dark:text-[#A89990]">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right image composition */}
          <div className="reveal reveal-delay-1 relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Large image */}
              <div className="col-span-1 row-span-2 bg-frosty-blue/30 dark:bg-dark-card rounded-3xl overflow-hidden aspect-[3/4] flex items-center justify-center">
                <div className="text-frosty-blue dark:text-[#4A7A8A] opacity-60">
                  <svg viewBox="0 0 120 160" fill="none" className="w-24 h-32">
                    {/* Crochet stitch pattern */}
                    {[0,1,2,3,4].map(row =>
                      [0,1,2].map(col => (
                        <ellipse
                          key={`${row}-${col}`}
                          cx={20 + col * 40}
                          cy={20 + row * 28}
                          rx="15"
                          ry="10"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                      ))
                    )}
                  </svg>
                </div>
              </div>

              {/* Stacked small images */}
              <div className="bg-soft-lavender/30 dark:bg-dark-card rounded-3xl overflow-hidden aspect-square flex items-center justify-center">
                <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 text-lavender dark:text-[#6B5F7A] opacity-60">
                  <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="2"/>
                  <path d="M25 40 Q40 20 55 40 Q40 60 25 40Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="bg-pastel-pink/30 dark:bg-dark-card rounded-3xl overflow-hidden aspect-square flex items-center justify-center">
                <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16 text-dusty-rose opacity-50">
                  {[0,1,2,3].map(i => (
                    <path key={i} d={`M${10 + i*5} 15 Q40 ${60 - i*8} ${70 - i*5} 15`} stroke="currentColor" strokeWidth="1.5"/>
                  ))}
                </svg>
              </div>
            </div>

            {/* Floating quote */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-dark-card rounded-2xl p-5 shadow-xl shadow-warm-taupe/10 max-w-xs">
              <p className="font-display text-sm italic text-warm-taupe dark:text-[#A89990] leading-relaxed">
                "Our journey is one of patience, precision, and passion."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
