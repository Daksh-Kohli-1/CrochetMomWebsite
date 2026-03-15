'use client';

import { useState, useRef, useEffect } from 'react';
import { Plus, Minus, Trash2, MessageCircle, Sparkles } from 'lucide-react';
import { BOUQUET_FLOWERS } from '../lib/catalog';
import { generateBouquetWhatsAppLink } from '../lib/whatsapp';

// ─── Tiny animated stem/petal SVG for empty state ────────────────────────────
function EmptyVase() {
  return (
    <svg viewBox="0 0 80 100" fill="none" className="w-16 h-20 mx-auto opacity-30">
      <path d="M35 70 Q40 40 40 20" stroke="#C9837A" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="40" cy="85" rx="16" ry="10" stroke="#C9837A" strokeWidth="1.5"/>
      <path d="M24 85 Q28 70 40 70 Q52 70 56 85" stroke="#C9837A" strokeWidth="1.5"/>
      <circle cx="40" cy="20" r="7" stroke="#E8B4B0" strokeWidth="1.5" strokeDasharray="3 2"/>
    </svg>
  );
}

// ─── Flower card (picker side) ────────────────────────────────────────────────
function FlowerPickerCard({ flower, qty, onAdd, onRemove }) {
  return (
    <div className="group relative bg-white rounded-2xl border border-[#EDE5DF] hover:border-[#C9837A]/40 transition-all duration-300 hover:shadow-md hover:shadow-[#C9837A]/10 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#FAF7F4]">
        {flower.imageUrl ? (
          <img src={flower.imageUrl} alt={flower.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">{flower.emoji}</div>
        )}
        {/* Qty badge */}
        {qty > 0 && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#C9837A] flex items-center justify-center">
            <span className="font-body text-[11px] font-medium text-white">{qty}</span>
          </div>
        )}
      </div>

      <div className="p-3">
        <p className="font-body text-[11px] font-medium text-[#2C2420] leading-tight">{flower.name}</p>
        <p className="font-body text-[10px] text-[#A89888] mt-0.5 leading-tight">{flower.description}</p>

        <div className="flex items-center justify-between mt-3">
          {/* Price comes from catalog */}
          <span className="font-display text-sm text-[#C9837A]">₹{flower.price}</span>

          <div className="flex items-center gap-1">
            {qty > 0 && (
              <button
                onClick={onRemove}
                className="w-6 h-6 rounded-full border border-[#EDE5DF] hover:border-[#C9837A] hover:bg-[#FDF0EE] flex items-center justify-center transition-all"
              >
                <Minus size={10} strokeWidth={2} className="text-[#C9837A]"/>
              </button>
            )}
            <button
              onClick={onAdd}
              className="w-6 h-6 rounded-full bg-[#C9837A] hover:bg-[#b8726a] flex items-center justify-center transition-colors shadow-sm shadow-[#C9837A]/30"
            >
              <Plus size={10} strokeWidth={2.5} className="text-white"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Bouquet summary row ──────────────────────────────────────────────────────
function BouquetRow({ flower, qty, onAdd, onRemove, onDelete }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-[#EDE5DF]/60 last:border-0 group">
      <span className="text-xl w-7 text-center">{flower.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="font-body text-xs font-medium text-[#2C2420] truncate">{flower.name}</p>
        <p className="font-body text-[10px] text-[#A89888]">₹{flower.price} × {qty}</p>
      </div>
      <span className="font-display text-sm text-[#2C2420] shrink-0">₹{flower.price * qty}</span>
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={onRemove} className="w-5 h-5 rounded-full border border-[#EDE5DF] hover:border-[#C9837A] flex items-center justify-center transition-all">
          <Minus size={8} strokeWidth={2} className="text-[#C9837A]"/>
        </button>
        <button onClick={onAdd} className="w-5 h-5 rounded-full bg-[#C9837A] hover:bg-[#b8726a] flex items-center justify-center transition-colors">
          <Plus size={8} strokeWidth={2.5} className="text-white"/>
        </button>
        <button onClick={onDelete} className="w-5 h-5 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
          <Trash2 size={8} strokeWidth={2} className="text-red-300"/>
        </button>
      </div>
    </div>
  );
}

// ─── Main BouquetBuilder ──────────────────────────────────────────────────────
export default function BouquetBuilder() {
  const [basket, setBasket] = useState({});
  const sectionRef = useRef(null);

  const add    = (id) => setBasket(b => ({ ...b, [id]: (b[id] || 0) + 1 }));
  const remove = (id) => setBasket(b => {
    const next = { ...b, [id]: (b[id] || 1) - 1 };
    if (next[id] <= 0) delete next[id];
    return next;
  });
  const del    = (id) => setBasket(b => { const n = { ...b }; delete n[id]; return n; });

  const totalItems = Object.values(basket).reduce((s, q) => s + q, 0);

  // Prices are read directly from BOUQUET_FLOWERS in catalog.js
  const totalPrice = BOUQUET_FLOWERS.reduce(
    (s, f) => s + (basket[f.id] || 0) * f.price,
    0
  );

  const inBasket = BOUQUET_FLOWERS.filter(f => basket[f.id] > 0);

  // WhatsApp order — phone number comes from NEXT_PUBLIC_WHATSAPP_NUMBER via whatsapp.js
  const handleOrder = () => {
    if (totalItems === 0) return;
    const items = inBasket.map(f => ({ name: f.name, qty: basket[f.id], price: f.price }));
    const link = generateBouquetWhatsAppLink(items, totalPrice);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#F5EFE6] dark:bg-dark-warm overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-14 reveal">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-[#C9837A] mb-3">Personalise Your Gift</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl text-[#2C2420] dark:text-[#E8DDD8] leading-none">
              Build Your<br/>
              <em className="text-[#C9837A]">Own Bouquet</em>
            </h2>
            <p className="font-body text-sm text-[#8A7060] dark:text-[#A89990] max-w-xs leading-relaxed">
              Pick your favourite blooms, choose your quantity, and we'll hand-stitch every stem just for you.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* ── Flower picker grid ── */}
          <div className="flex-1 reveal">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {BOUQUET_FLOWERS.map(flower => (
                <FlowerPickerCard
                  key={flower.id}
                  flower={flower}
                  qty={basket[flower.id] || 0}
                  onAdd={() => add(flower.id)}
                  onRemove={() => remove(flower.id)}
                />
              ))}
            </div>
          </div>

          {/* ── Bouquet summary panel ── */}
          <div className="w-full lg:w-80 reveal sticky top-24">
            <div className="bg-white dark:bg-dark-card rounded-3xl border border-[#EDE5DF] dark:border-[#3A2E2A] overflow-hidden shadow-lg shadow-[#C9837A]/5">

              {/* Panel header */}
              <div className="px-6 pt-6 pb-4 border-b border-[#EDE5DF]/60 dark:border-[#3A2E2A]">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={14} className="text-[#C9837A]" strokeWidth={1.5}/>
                  <p className="font-body text-[10px] tracking-widest uppercase text-[#C9837A]">Your Bouquet</p>
                </div>
                <p className="font-display text-2xl text-[#2C2420] dark:text-[#E8DDD8]">
                  {totalItems === 0 ? 'Empty vase' : `${totalItems} bloom${totalItems > 1 ? 's' : ''}`}
                </p>
              </div>

              {/* Items list */}
              <div className="px-6 py-4 min-h-[160px]">
                {inBasket.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-4 gap-3">
                    <EmptyVase/>
                    <p className="font-body text-xs text-[#A89888] text-center">Add flowers from the left to start building your bouquet.</p>
                  </div>
                ) : (
                  inBasket.map(f => (
                    <BouquetRow
                      key={f.id}
                      flower={f}
                      qty={basket[f.id]}
                      onAdd={() => add(f.id)}
                      onRemove={() => remove(f.id)}
                      onDelete={() => del(f.id)}
                    />
                  ))
                )}
              </div>

              {/* Total & CTA */}
              <div className="px-6 pb-6 pt-2">
                {totalItems > 0 && (
                  <div className="flex items-center justify-between mb-4 pt-3 border-t border-[#EDE5DF]/60">
                    <p className="font-body text-xs tracking-widest uppercase text-[#8A7060]">Total</p>
                    <p className="font-display text-2xl text-[#C9837A]">₹{totalPrice}</p>
                  </div>
                )}

                <button
                  onClick={handleOrder}
                  disabled={totalItems === 0}
                  className={`w-full h-11 rounded-full font-body text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300
                    ${totalItems === 0
                      ? 'bg-[#EDE5DF] text-[#A89888] cursor-not-allowed'
                      : 'bg-[#2C2420] text-[#FAF7F4] hover:bg-[#C9837A] shadow-md shadow-[#C9837A]/20'
                    }`}
                >
                  <MessageCircle size={13} strokeWidth={1.5}/>
                  {totalItems === 0 ? 'Add blooms to order' : 'Order via WhatsApp'}
                </button>

                {totalItems > 0 && (
                  <button
                    onClick={() => setBasket({})}
                    className="w-full mt-2 text-center font-body text-[10px] text-[#A89888] hover:text-[#C9837A] transition-colors tracking-wide"
                  >
                    Clear bouquet
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}