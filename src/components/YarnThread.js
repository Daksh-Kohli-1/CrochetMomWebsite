'use client';

import { useEffect, useRef } from 'react';

const THREAD_PATH =
  'M16 0 C10 75 22 150 16 225 C10 300 22 375 16 450 C10 525 22 600 16 675 C10 750 22 825 16 900';

const NODE_DATA = [
  { cy: 162, color: '#E8B4B0' },
  { cy: 337, color: '#C9837A' },
  { cy: 512, color: '#C4B5D4' },
  { cy: 675, color: '#B8D4E0' },
];
const NODE_THRESHOLDS = [0.18, 0.38, 0.58, 0.78];

export default function YarnThread() {
  const svgRef = useRef(null);
  const progressRef = useRef(0);
  const rafRef = useRef(null);
  const tickRef = useRef(0);
  const lenCache = useRef({});

  // Track scroll progress
  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = docH > 0 ? Math.min(window.scrollY / docH, 1) : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // rAF animation loop
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const getEl = (id) => svg.querySelector(id);
    const getLen = (id) => {
      if (!lenCache.current[id]) {
        const el = getEl(id);
        if (el) lenCache.current[id] = el.getTotalLength();
      }
      return lenCache.current[id] || 900;
    };

    const setDash = (id, p) => {
      const el = getEl(id);
      if (!el) return;
      const len = getLen(id);
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len * (1 - p)}`;
    };

    const loop = () => {
      tickRef.current += 0.013;
      const tick = tickRef.current;
      const p = progressRef.current;

      // Main thread layers
      setDash('#main-thread', p);
      setDash('#shadow-thread', p);
      setDash('#glow-thread', p);
      setDash('#fiber-1', Math.max(0, p - 0.08));
      setDash('#fiber-2', Math.max(0, p - 0.14));

      // Stitch dots — drawn along a straight vertical at x=4
      // We reveal them proportionally via clip-rect on the stitch group
      const stitchClip = getEl('#stitch-clip-rect');
      if (stitchClip) {
        stitchClip.setAttribute('height', `${900 * p}`);
      }

      // Pulsing section nodes
      NODE_DATA.forEach(({ cy }, i) => {
        const outer = getEl(`#node-outer-${i}`);
        const inner = getEl(`#node-inner-${i}`);
        const reached = p >= NODE_THRESHOLDS[i];
        if (outer) {
          outer.style.opacity = reached ? '1' : '0';
          if (reached) {
            const pulse = 1 + 0.22 * Math.sin(tick * 2 + i * 1.3);
            outer.setAttribute('r', (5.5 * pulse).toFixed(2));
          }
        }
        if (inner) inner.style.opacity = reached ? '0.85' : '0';
      });

      // Needle follows thread tip
      const needle = getEl('#needle-group');
      const mainEl = getEl('#main-thread');
      if (needle && mainEl) {
        const len = getLen('#main-thread');
        const safeP = Math.min(Math.max(p, 0.005), 0.985);
        const pos = mainEl.getPointAtLength(len * safeP);
        const ahead = mainEl.getPointAtLength(Math.min(len * safeP + 4, len - 0.1));
        const angle = Math.atan2(ahead.y - pos.y, ahead.x - pos.x) * (180 / Math.PI);
        needle.setAttribute('transform', `translate(${pos.x},${pos.y}) rotate(${angle - 90})`);
        needle.style.opacity = p > 0.015 && p < 0.975 ? '1' : '0';
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Build stitch dashes: alternating dots at x=4, spaced every 22px down the page
  const stitchDots = [];
  for (let y = 8; y < 900; y += 22) {
    stitchDots.push(y);
  }

  return (
    // Pinned to the very left edge of the viewport
    <div
      className="fixed left-0 top-0 bottom-0 w-10 pointer-events-none z-20 hidden lg:block"
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 40 900"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          <filter id="thread-glow" x="-80%" y="-5%" width="260%" height="110%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="node-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="thread-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8B4B0" />
            <stop offset="35%" stopColor="#C9837A" />
            <stop offset="65%" stopColor="#C4B5D4" />
            <stop offset="100%" stopColor="#B8D4E0" />
          </linearGradient>

          {/* Clip mask that reveals stitch dots as scroll progresses */}
          <clipPath id="stitch-clip">
            <rect id="stitch-clip-rect" x="0" y="0" width="40" height="0" />
          </clipPath>
        </defs>

        {/* ── Left-edge seam line — always visible, very faint ── */}
        <line
          x1="4" y1="0" x2="4" y2="900"
          stroke="#C9837A"
          strokeWidth="0.4"
          strokeOpacity="0.1"
        />

        {/* ── Stitch dashes — revealed by clip as thread descends ── */}
        <g clipPath="url(#stitch-clip)">
          {stitchDots.map((y, idx) => (
            <rect
              key={idx}
              x="2.5"
              y={y}
              width="3"
              height="10"
              rx="1.5"
              fill="#C9837A"
              fillOpacity={idx % 2 === 0 ? '0.45' : '0.2'}
            />
          ))}
        </g>

        {/* ── Thread shadow (depth) ── */}
        <path
          id="shadow-thread"
          d="M21 0 C15 75 27 150 21 225 C15 300 27 375 21 450 C15 525 27 600 21 675 C15 750 27 825 21 900"
          stroke="#1C1714"
          strokeWidth="3.5"
          strokeOpacity="0.13"
          strokeLinecap="round"
        />

        {/* ── Faint ghost track ── */}
        <path
          d={THREAD_PATH.replace(/(\d+) /g, (_, n) => `${parseInt(n) + 4} `)}
          stroke="#C9837A"
          strokeWidth="0.5"
          strokeOpacity="0.07"
          strokeLinecap="round"
        />

        {/* ── Left fiber ── */}
        <path
          id="fiber-1"
          d="M17 0 C11 75 23 150 17 225 C11 300 23 375 17 450 C11 525 23 600 17 675 C11 750 23 825 17 900"
          stroke="#E8B4B0"
          strokeWidth="0.9"
          strokeOpacity="0.45"
          strokeLinecap="round"
        />

        {/* ── Right fiber ── */}
        <path
          id="fiber-2"
          d="M23 0 C17 75 29 150 23 225 C17 300 29 375 23 450 C17 525 29 600 23 675 C17 750 29 825 23 900"
          stroke="#C4B5D4"
          strokeWidth="0.9"
          strokeOpacity="0.35"
          strokeLinecap="round"
        />

        {/* ── Main gradient thread ── */}
        <path
          id="main-thread"
          d={THREAD_PATH.replace(/M16/g, 'M20').replace(/C10/g, 'C14').replace(/C22/g, 'C22').replace(/ 16 /g, ' 20 ')}
          stroke="url(#thread-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#thread-glow)"
        />

        {/* ── Shine highlight ── */}
        <path
          id="glow-thread"
          d={THREAD_PATH.replace(/M16/g, 'M20').replace(/C10/g, 'C14').replace(/C22/g, 'C22').replace(/ 16 /g, ' 20 ')}
          stroke="white"
          strokeWidth="0.65"
          strokeOpacity="0.2"
          strokeLinecap="round"
        />

        {/* ── Section nodes ── */}
        {NODE_DATA.map(({ cy, color }, i) => (
          <g key={i}>
            <circle
              id={`node-outer-${i}`}
              cx="20"
              cy={cy}
              r="5.5"
              fill={color}
              fillOpacity="0.2"
              filter="url(#node-glow)"
              style={{ opacity: 0, transition: 'opacity 0.5s ease', transformOrigin: `20px ${cy}px` }}
            />
            <circle
              id={`node-inner-${i}`}
              cx="20"
              cy={cy}
              r="2.3"
              fill={color}
              style={{ opacity: 0, transition: 'opacity 0.5s ease 0.15s' }}
            />
          </g>
        ))}

        {/* ── Traveling needle ── */}
        <g id="needle-group" style={{ opacity: 0, transition: 'opacity 0.3s ease' }}>
          <rect x="-1.3" y="-9" width="2.6" height="11" rx="1.3" fill="#EDE8E0" />
          <ellipse cx="0" cy="-7" rx="0.85" ry="1.3" fill="none" stroke="#A08868" strokeWidth="0.6" />
          <path d="M-1.3 2 L0 6.5 L1.3 2Z" fill="#C9B090" />
          <path d="M0 -7 Q5 -13 9 -18" stroke="#C9837A" strokeWidth="0.75" strokeOpacity="0.5" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}