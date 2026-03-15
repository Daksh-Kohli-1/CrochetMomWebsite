'use client';

import { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../lib/catalog';

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
              <h2 className="font-display text-4xl md:text-5xl text-[#2C2420] dark:text-[#E8DDD8]">The Signature Series</h2>
            </div>
            <a href="/showroom" className="hidden md:flex items-center gap-2 font-body text-xs tracking-widest uppercase text-dusty-rose hover:gap-3 transition-all duration-300">
              View All
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </a>
          </div>

          {/* Prices are now driven by PRODUCTS in catalog.js */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} {...product} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider with quote */}
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
    </div>
  );
}