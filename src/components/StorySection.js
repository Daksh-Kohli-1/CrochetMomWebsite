'use client';

import { useEffect, useRef } from 'react';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Quality Fibers',
    desc: 'Sourced from ethical and premium suppliers.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
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
          <div className="reveal reveal-delay-1 relative flex justify-center items-center">

            {/* Orbit area */}
            <div className="relative w-[500px] h-[500px]">

              {/* Orbit path */}
              <div className="absolute inset-0 orbit">


                {/* Image 1 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2">

                  <div className="counter-orbit w-60 h-72 rounded-3xl overflow-hidden shadow-xl">

                    <img
                      src="/assets/1.jpeg"
                      alt="Product 1"
                      className="w-full h-full object-cover"
                    />

                  </div>

                </div>


                {/* Image 2 */}
                <div className="absolute bottom-4 left-4">

                  <div className="counter-orbit w-50 h-60 rounded-3xl overflow-hidden shadow-xl">

                    <img
                      src="/assets/2.jpeg"
                      alt="Product 2"
                      className="w-full h-full object-cover"
                    />

                  </div>

                </div>


                {/* Image 3 */}
                <div className="absolute bottom-4 right-4">

                  <div className="counter-orbit w-40 h-50 rounded-3xl overflow-hidden shadow-xl">

                    <img
                      src="/assets/3.jpeg"
                      alt="Product 3"
                      className="w-full h-full object-cover"
                    />

                  </div>

                </div>


              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
