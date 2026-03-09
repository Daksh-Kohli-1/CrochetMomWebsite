'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Loader2, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { generateWhatsAppLink } from '../../lib/whatsapp';

// ─── All products ────────────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  // Signature Series
  { id: 1, name: 'The Azure Drift Wrap', price: 240, material: 'Fine merino wool blend', tagLabel: 'Frosty Blue', colorScheme: 'frosty-blue', imageUrl: '/assets/4.jpeg', category: 'Wraps', series: 'Signature' },
  { id: 2, name: 'Petal Cardigan', price: 380, material: 'Hand-dyed organic cotton', tagLabel: 'Blush Rose', colorScheme: 'pastel-pink', imageUrl: '/assets/5.jpeg', category: 'Cardigans', series: 'Signature' },
  { id: 3, name: 'Eclipse Throw', price: 520, material: 'Weighted luxury alpaca yarn', tagLabel: 'Slate Charcoal', colorScheme: 'soft-lavender', imageUrl: '/assets/6.jpeg', category: 'Throws', series: 'Signature' },
  // Additional products — add your own imageUrls
  { id: 4, name: 'Rose Garden Shawl', price: 310, material: 'Organic pima cotton', tagLabel: 'Heritage', colorScheme: 'warm-cream', imageUrl: '/assets/1.jpeg', category: 'Shawls', series: 'Seasonal' },
  { id: 5, name: 'Morning Mist Poncho', price: 450, material: 'Silk & mohair blend', tagLabel: 'New Season', colorScheme: 'soft-lavender', imageUrl: '/assets/2.jpeg', category: 'Wraps', series: 'Seasonal' },
  { id: 6, name: 'Bloom Clutch', price: 195, material: 'Hand-spun wool', tagLabel: 'Limited', colorScheme: 'pastel-pink', imageUrl: '/assets/3.jpeg', category: 'Accessories', series: 'Seasonal' },
];

const CATEGORIES = [];
const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

const colorMap = {
  'frosty-blue':   'bg-[#D6EAF4]',
  'pastel-pink':   'bg-[#F9E4E2]',
  'soft-lavender': 'bg-[#E8E0F0]',
  'warm-cream':    'bg-[#F5EFE6]',
};

// ─── Knit canvas animation (reused from ProductCard) ─────────────────────────
function ButtonKnitCanvas({ running }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const startRef  = useRef(null);

  useEffect(() => {
    if (!running) { cancelAnimationFrame(rafRef.current); startRef.current = null; return; }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width  = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    const COLORS = ['#C9837A','#E8B4B0','#C4B5D4','#B8D4E0'];
    const cx = W / 2, cy = H / 2;
    const draw = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const t = ((ts - startRef.current) % 2000) / 2000;
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < 4; i++) {
        const phase = (i / 4) * Math.PI * 2;
        const prog  = (t + i * 0.15) % 1;
        ctx.beginPath(); ctx.strokeStyle = COLORS[i]; ctx.lineWidth = 1.4;
        ctx.lineCap = 'round'; ctx.globalAlpha = 0.85;
        const STEPS = 60;
        for (let s = 0; s <= STEPS; s++) {
          const pct = s / STEPS;
          const r   = Math.abs(Math.sin((pct + prog) * Math.PI)) * (W * 0.46);
          const angle = phase + pct * Math.PI * 5 + prog * Math.PI * 2;
          const weave = 4 * Math.sin(pct * Math.PI * 10 + phase + prog * Math.PI * 4);
          const x = cx + r * Math.cos(angle) + weave * Math.cos(angle + Math.PI / 2);
          const y = cy + r * Math.sin(angle) + weave * Math.sin(angle + Math.PI / 2);
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke(); ctx.globalAlpha = 1;
      }
      const knotR = 5 + 2 * Math.sin(t * Math.PI * 4);
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, knotR * 2.5);
      grd.addColorStop(0, 'rgba(201,131,122,0.55)'); grd.addColorStop(1, 'rgba(201,131,122,0)');
      ctx.beginPath(); ctx.fillStyle = grd; ctx.arc(cx, cy, knotR * 2.5, 0, Math.PI * 2); ctx.fill();
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-full pointer-events-none" aria-hidden="true" />;
}

// ─── Single product card ──────────────────────────────────────────────────────
function ProductCard({ name, price, material, tagLabel, colorScheme = 'pastel-pink', imageUrl, delay = 0 }) {
  const [phase, setPhase] = useState('idle');
  const timerRef = useRef(null);
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleStitch = () => {
    if (phase !== 'idle') return;
    setPhase('stitching');
    timerRef.current = setTimeout(() => {
      setPhase('done');
      const link = generateWhatsAppLink(name);
      window.open(link, '_blank', 'noopener,noreferrer');
      setPhase('idle');
    }, 2000);
  };

  const isStitching = phase === 'stitching';

  return (
    <div
      className="group rounded-3xl overflow-hidden flex flex-col animate-fadeUp"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {/* Image */}
      <div className={`relative ${colorMap[colorScheme] || colorMap['pastel-pink']} aspect-[3/4] flex items-center justify-center overflow-hidden rounded-3xl`}>
        {tagLabel && (
          <span className="absolute top-4 left-4 font-body text-[10px] tracking-widest uppercase bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full text-[#8A7060] z-10">
            {tagLabel}
          </span>
        )}
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        ) : (
          <svg viewBox="0 0 120 160" fill="none" className="w-28 h-36 text-[#C9837A] opacity-20 group-hover:scale-105 transition-transform duration-500">
            <path d="M60 20 C30 40 20 80 30 120 C40 150 60 160 60 160 C60 160 80 150 90 120 C100 80 90 40 60 20Z" stroke="currentColor" strokeWidth="2"/>
            {[0,1,2,3].map(i => <path key={i} d={`M40 ${50+i*20} Q60 ${40+i*20} 80 ${50+i*20}`} stroke="currentColor" strokeWidth="1.5"/>)}
          </svg>
        )}
        <div className="absolute inset-0 bg-[#C9837A]/0 group-hover:bg-[#C9837A]/5 transition-colors duration-500" />
      </div>

      {/* Info */}
      <div className="pt-4 pb-2 px-1 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-body text-sm font-medium text-[#2C2420]">{name}</h3>
            {material && <p className="font-body text-xs text-[#8A7060] mt-0.5">{material}</p>}
          </div>
          {price && <span className="font-display text-base text-[#C9837A] shrink-0">₹{price}</span>}
        </div>

        <button
          onClick={handleStitch}
          disabled={isStitching}
          className={`mt-2 w-full relative overflow-hidden h-10 rounded-full font-body text-xs tracking-widest uppercase transition-all duration-300 select-none
            ${isStitching
              ? 'bg-[#1C1714] border border-[#1C1714] cursor-wait'
              : 'border border-[#E8C4BF]/60 bg-transparent hover:bg-[#C9837A] hover:border-[#C9837A]'
            }`}
        >
          <ButtonKnitCanvas running={isStitching} />
          <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${isStitching ? 'opacity-0 scale-90' : 'opacity-100 scale-100'} text-[#8A7060] group-hover:text-[#2C2420]`}>
            <MessageCircle size={13} strokeWidth={1.5} />
            Stitch One For Me
          </span>
          <span className={`relative z-10 flex items-center justify-center gap-2 transition-all duration-300 text-[#E8B4B0] ${isStitching ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
            <Loader2 size={13} strokeWidth={1.5} className="animate-spin" />
            Stitching…
          </span>
        </button>
      </div>
    </div>
  );
}

// ─── Main Collections Page ────────────────────────────────────────────────────
export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy]                 = useState('Featured');
  const [showSort, setShowSort]             = useState(false);
  const [showFilter, setShowFilter]         = useState(false);

  const filtered = ALL_PRODUCTS
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High')  return a.price - b.price;
      if (sortBy === 'Price: High to Low')  return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#FAF7F4]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body    { font-family: 'Jost', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.6s ease-out; }
        .animate-spin   { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .filter-pill {
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
      `}</style>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-[#FAF7F4]/90 backdrop-blur-md border-b border-[#E8DDD8]/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <a href="/" className="font-display text-xl text-[#2C2420] tracking-wide hover:text-[#C9837A] transition-colors">
            ← Back
          </a>
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#8A7060]">All Collections</p>
          <div className="w-16" />
        </div>
      </header>

      {/* ── Hero Banner ── */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="animate-fadeUp">
          <p className="font-body text-[10px] tracking-[0.35em] uppercase text-[#C9837A] mb-3">Every Stitch, a Story</p>
          <h1 className="font-display text-5xl md:text-7xl text-[#2C2420] leading-none mb-4">
            The Collection
          </h1>
          <p className="font-body text-sm text-[#8A7060] max-w-md leading-relaxed">
            Handcrafted with intention. Each piece is made to order, carrying the warmth of the hands that made it.
          </p>
        </div>
      </section>

      {/* ── Filter / Sort Bar ── */}
      <div className="sticky top-16 z-30 bg-[#FAF7F4]/90 backdrop-blur-md border-b border-[#E8DDD8]/40 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">

          {/* Category pills — scrollable on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar flex-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-pill shrink-0 px-4 py-1.5 rounded-full font-body text-[11px] tracking-widest uppercase border
                  ${activeCategory === cat
                    ? 'bg-[#2C2420] text-[#FAF7F4] border-[#2C2420]'
                    : 'bg-transparent text-[#8A7060] border-[#E8C4BF]/60 hover:border-[#C9837A] hover:text-[#2C2420]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowSort(v => !v)}
              className="flex items-center gap-2 font-body text-[11px] tracking-widest uppercase text-[#8A7060] hover:text-[#2C2420] transition-colors border border-[#E8C4BF]/60 hover:border-[#C9837A] rounded-full px-4 py-1.5"
            >
              <SlidersHorizontal size={12} />
              {sortBy}
              <ChevronDown size={11} className={`transition-transform ${showSort ? 'rotate-180' : ''}`} />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#E8DDD8] overflow-hidden z-50">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(opt); setShowSort(false); }}
                    className={`w-full text-left px-5 py-3 font-body text-xs tracking-wide hover:bg-[#FAF7F4] transition-colors
                      ${sortBy === opt ? 'text-[#C9837A] font-medium' : 'text-[#2C2420]'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Product Count ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-2">
        <p className="font-body text-xs text-[#8A7060] tracking-wide">
          {filtered.length} piece{filtered.length !== 1 ? 's' : ''} {activeCategory !== 'All' ? `in ${activeCategory}` : ''}
        </p>
      </div>

      {/* ── Product Grid ── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-8 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl text-[#2C2420] mb-3">Nothing here yet</p>
            <p className="font-body text-sm text-[#8A7060]">Try a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} {...product} delay={i * 80} />
            ))}
          </div>
        )}
      </main>

      {/* ── Footer strip ── */}
      <footer className="border-t border-[#E8DDD8]/60 py-10 bg-[#F5EFE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-lg text-[#2C2420]">Luxury Crochet</p>
          <p className="font-body text-[10px] tracking-widest uppercase text-[#8A7060]">Made with love, one stitch at a time</p>
        </div>
      </footer>
    </div>
  );
}