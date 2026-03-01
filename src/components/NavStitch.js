'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * NavStitch
 * ─────────
 * On mount a needle slowly stitches left→right along the navbar bottom edge.
 * The seam remains permanently after the needle finishes.
 *
 * Color logic (inverted contrast):
 *   Light mode → dark thread colors (deep brown / warm dark) so it pops on cream
 *   Dark mode  → light pastel thread colors so it glows on dark background
 */
export default function NavStitch() {
  const svgRef       = useRef(null);
  const rafRef       = useRef(null);
  const [isDark, setIsDark] = useState(false);
  const [width, setWidth]   = useState(1440);

  // Detect theme and viewport width on client
  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains('dark'));

    checkDark();
    setWidth(window.innerWidth);

    // Re-check if theme toggles after mount
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Colors — inverted: light mode gets dark thread, dark mode gets light thread
  const seamColor   = isDark ? '#EDE8E0' : '#2C2420';   // seam dashes
  const tailColor   = isDark ? '#C4B5D4' : '#6B4F3A';   // trailing thread
  const needleFill  = isDark ? '#FAF7F2' : '#1C1410';   // needle shaft
  const needleEye   = isDark ? '#C9837A' : '#8B5E3C';   // eye ring
  const needleTip   = isDark ? '#E8B4B0' : '#5A3820';   // tip
  const eyeThread   = isDark ? '#C9837A' : '#7A4A2A';   // thread into eye

  // Run the animation once (re-runs if theme flips so colors update)
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    cancelAnimationFrame(rafRef.current);

    const startDelay = setTimeout(() => {
      const W = svg.clientWidth || window.innerWidth;

      // ── Geometry ────────────────────────────────────────────────────────
      const DURATION   = 4200;  // ms — slow, deliberate stitching
      const STITCH_LEN = 12;    // px drawn per dash
      const GAP_LEN    = 7;     // px gap between dashes
      const UNIT       = STITCH_LEN + GAP_LEN;
      const SEAM_Y     = 7;     // vertical centre of seam inside SVG

      const needle     = svg.querySelector('#ns-needle');
      const stitchLine = svg.querySelector('#ns-stitch');
      const threadTail = svg.querySelector('#ns-tail');

      let startTs = null;

      const frame = (ts) => {
        if (!startTs) startTs = ts;
        const elapsed = ts - startTs;
        const t = Math.min(elapsed / DURATION, 1);

        // Ease in-out sine — feels like a hand pulling thread
        const eased = -(Math.cos(Math.PI * t) - 1) / 2;
        const x = eased * W;

        // ── Stitch line (dashes that persist) ───────────────────────────
        if (stitchLine) {
          stitchLine.setAttribute('x2', String(W));
          stitchLine.style.strokeDasharray  = `${STITCH_LEN} ${GAP_LEN}`;
          // dashoffset tricks: full offset = W (nothing visible), 0 = all visible
          stitchLine.style.strokeDashoffset = String(W * (1 - eased));
          stitchLine.style.opacity = '1';
        }

        // ── Needle ───────────────────────────────────────────────────────
        if (needle) {
          // Bob up/down with each stitch pierce
          const stitchPhase = (x % UNIT) / UNIT;
          const bob = Math.sin(stitchPhase * Math.PI * 2) * 3.5;
          needle.setAttribute('transform', `translate(${x},${bob})`);
          needle.style.opacity = t < 1 ? '1' : '0';
          needle.style.transition = t < 1 ? 'opacity 0.2s' : 'opacity 0.6s';
        }

        // ── Trailing thread tail ─────────────────────────────────────────
        if (threadTail) {
          if (t < 1) {
            const tailStart = Math.max(0, x - 22);
            threadTail.setAttribute('x1', String(tailStart));
            threadTail.setAttribute('x2', String(x));
            threadTail.setAttribute('y1', String(SEAM_Y));
            threadTail.setAttribute('y2', String(SEAM_Y));
            threadTail.style.opacity = '0.6';
          } else {
            threadTail.style.opacity = '0';
          }
        }

        if (t < 1) {
          rafRef.current = requestAnimationFrame(frame);
        }
      };

      rafRef.current = requestAnimationFrame(frame);
    }, 400);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(rafRef.current);
    };
  // Re-run if theme or width changes so the SVG element colors are fresh
  }, [isDark, width]);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[16px] pointer-events-none overflow-visible"
      style={{ zIndex: 60 }}
    >
      <svg
        ref={svgRef}
        className="w-full h-full overflow-visible"
        viewBox={`0 0 ${width} 16`}
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="ns-needle-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="ns-seam-glow" x="-5%" y="-300%" width="110%" height="700%">
            <feGaussianBlur stdDeviation="0.7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Permanent stitch seam — rendered below needle ── */}
        <line
          id="ns-stitch"
          x1="0"
          y1="7"
          x2={width}
          y2="7"
          stroke={seamColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{ opacity: 0 }}
          filter="url(#ns-seam-glow)"
        />

        {/* ── Trailing thread (ephemeral) ── */}
        <line
          id="ns-tail"
          x1="0"
          y1="7"
          x2="0"
          y2="7"
          stroke={tailColor}
          strokeWidth="1.1"
          strokeLinecap="round"
          style={{ opacity: 0 }}
        />

        {/* ── Needle — starts off-screen left ── */}
        <g
          id="ns-needle"
          transform="translate(-30, 0)"
          style={{ opacity: 0 }}
          filter="url(#ns-needle-glow)"
        >
          {/* Shaft — vertical, needle points downward (tip at bottom) */}
          <rect x="-1.2" y="0" width="2.4" height="10" rx="1.2" fill={needleFill} />
          {/* Eye hole near top */}
          <ellipse cx="0" cy="2" rx="0.8" ry="1.2" fill="none" stroke={needleEye} strokeWidth="0.6" />
          {/* Pointed tip at bottom */}
          <path d={`M-1.2 10 L0 14 L1.2 10Z`} fill={needleTip} />
          {/* Thread trailing from eye toward left */}
          <path
            d="M0 2 Q-5 -1 -11 1"
            stroke={eyeThread}
            strokeWidth="0.75"
            strokeOpacity="0.65"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}