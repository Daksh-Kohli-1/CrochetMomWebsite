'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';
import { generateWhatsAppLink } from '../lib/whatsapp';
 
const colorMap = {
  'frosty-blue': 'bg-frosty-blue/20 dark:bg-[#1A3040]',
  'pastel-pink': 'bg-pastel-pink/20 dark:bg-[#3A1E1C]',
  'soft-lavender': 'bg-soft-lavender/20 dark:bg-[#2A2035]',
  'warm-cream': 'bg-[#F5EFE6] dark:bg-dark-card',
};

// ─── Canvas knitting animation that lives INSIDE the button ────────────────
function ButtonKnitCanvas({ running }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!running) {
      cancelAnimationFrame(rafRef.current);
      startRef.current = null;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * window.devicePixelRatio;
    canvas.height = H * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const COLORS = ['#C9837A', '#E8B4B0', '#C4B5D4', '#B8D4E0'];
    const cx = W / 2;
    const cy = H / 2;

    const draw = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const t = ((ts - startRef.current) % 2000) / 2000;

      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < 4; i++) {
        const phase = (i / 4) * Math.PI * 2;
        const color = COLORS[i];
        const prog = (t + i * 0.15) % 1;

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.4;
        ctx.lineCap = 'round';
        ctx.globalAlpha = 0.85;

        const STEPS = 60;
        for (let s = 0; s <= STEPS; s++) {
          const pct = s / STEPS;
          const r = Math.abs(Math.sin((pct + prog) * Math.PI)) * (W * 0.46);
          const angle = phase + pct * Math.PI * 5 + prog * Math.PI * 2;
          const weave = 4 * Math.sin(pct * Math.PI * 10 + phase + prog * Math.PI * 4);
          const x = cx + r * Math.cos(angle) + weave * Math.cos(angle + Math.PI / 2);
          const y = cy + r * Math.sin(angle) + weave * Math.sin(angle + Math.PI / 2);
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      const knotR = 5 + 2 * Math.sin(t * Math.PI * 4);
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, knotR * 2.5);
      grd.addColorStop(0, 'rgba(201,131,122,0.55)');
      grd.addColorStop(1, 'rgba(201,131,122,0)');
      ctx.beginPath();
      ctx.fillStyle = grd;
      ctx.arc(cx, cy, knotR * 2.5, 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full rounded-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

// ─── ProductCard ────────────────────────────────────────────────────────────
export default function ProductCard({
  name,
  price,
  material,
  tagLabel,
  colorScheme = 'pastel-pink',
  imageUrl,
  delay = 0,
}) {
  const [phase, setPhase] = useState('idle'); // idle | stitching | done
  const timerRef = useRef(null);

  // Fix: Reset phase when user returns to the tab
  useEffect(() => {
    const reset = () => {
      if (document.visibilityState === 'visible') setPhase('idle');
    };
    document.addEventListener('visibilitychange', reset);
    return () => document.removeEventListener('visibilitychange', reset);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleStitch = () => {
    if (phase !== 'idle') return;
    setPhase('stitching');
    timerRef.current = setTimeout(() => {
      setPhase('done');
      const link = generateWhatsAppLink(name);
      window.open(link, '_blank', 'noopener,noreferrer');
      // Fix: Reset immediately instead of with a delay
      setPhase('idle');
    }, 2000);
  };

  const isStitching = phase === 'stitching';

  return (
    <div
      className="product-card reveal group rounded-3xl overflow-hidden flex flex-col"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* ── Image area ── */}
      <div
        className={`relative ${colorMap[colorScheme] || colorMap['pastel-pink']} aspect-[3/4] flex items-center justify-center overflow-hidden rounded-3xl`}
      >
        {tagLabel && (
          <span className="absolute top-4 left-4 font-body text-[10px] tracking-widest uppercase bg-white/70 dark:bg-dark-card/70 backdrop-blur-sm px-3 py-1 rounded-full text-warm-taupe dark:text-[#A89990] z-10">
            {tagLabel}
          </span>
        )}

        {/* Image or fallback SVG */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <svg
            viewBox="0 0 120 160"
            fill="none"
            className="w-28 h-36 text-dusty-rose opacity-20 dark:opacity-15 group-hover:scale-105 transition-transform duration-500"
          >
            <path
              d="M60 20 C30 40 20 80 30 120 C40 150 60 160 60 160 C60 160 80 150 90 120 C100 80 90 40 60 20Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M40 ${50 + i * 20} Q60 ${40 + i * 20} 80 ${50 + i * 20}`}
                stroke="currentColor"
                strokeWidth="1.5"
              />
            ))}
          </svg>
        )}

        <div className="absolute inset-0 bg-dusty-rose/0 group-hover:bg-dusty-rose/5 transition-colors duration-500" />
      </div>

      {/* ── Card info ── */}
      <div className="pt-4 pb-2 px-1 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-body text-sm font-medium text-[#2C2420] dark:text-[#E8DDD8]">
              {name}
            </h3>
            {material && (
              <p className="font-body text-xs text-warm-taupe dark:text-[#A89990] mt-0.5">
                {material}
              </p>
            )}
          </div>
          {/* Fix: Rupees symbol instead of $ */}
          {price && (
            <span className="font-display text-base text-dusty-rose shrink-0">₹{price}</span>
          )}
        </div>

        {/* ── Stitch button ── */}
        <button
          onClick={handleStitch}
          disabled={isStitching}
          className={`
            mt-2 w-full relative overflow-hidden h-10 rounded-full
            font-body text-xs tracking-widest uppercase
            transition-all duration-300 select-none
            ${isStitching
              ? 'bg-[#1C1714] border border-[#1C1714] cursor-wait'
              : 'border border-soft-pink/40 dark:border-muted-rose/30 bg-transparent hover:bg-dusty-rose hover:border-dusty-rose dark:hover:border-dusty-rose'
            }
          `}
        >
          <ButtonKnitCanvas running={isStitching} />

          {/* Idle label — Fix: changed hover text to dark brown for contrast */}
          <span
            className={`
              absolute inset-0 flex items-center justify-center gap-2
              transition-all duration-300
              ${isStitching ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}
              text-warm-taupe dark:text-[#A89990]
              group-hover:text-[#2C2420]
            `}
          >
            <MessageCircle size={13} strokeWidth={1.5} />
            Stitch One For Me
          </span>

          {/* Stitching label */}
          <span
            className={`
              relative z-10 flex items-center justify-center gap-2
              transition-all duration-300 text-[#E8B4B0]
              ${isStitching ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
            `}
          >
            <Loader2 size={13} strokeWidth={1.5} className="animate-spin" />
            Stitching…
          </span>
        </button>
      </div>
    </div>
  );
}