'use client';

import { useEffect, useRef, useState } from 'react';

export default function NavStitch() {
  const svgRef       = useRef(null);
  const rafRef       = useRef(null);
  const completedRef = useRef(false);   // true once the needle finishes — never restart
  const [isDark, setIsDark] = useState(false);
  const [width, setWidth]   = useState(1440);

  // ── Detect theme + width (client only) ──────────────────────────────────
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains('dark'));

    check();
    setWidth(window.innerWidth);

    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => obs.disconnect();
  }, []);

  // ── Colors — inverted contrast ───────────────────────────────────────────
  // Light mode → dark thread (pops on cream bg)
  // Dark mode  → pale thread (glows on dark bg)
  const seamColor  = isDark ? '#EDE8E0' : '#2C2420';
  const tailColor  = isDark ? '#C4B5D4' : '#6B4F3A';
  const shaftColor = isDark ? '#FAF7F2' : '#1C1410';
  const eyeColor   = isDark ? '#C9837A' : '#8B5E3C';
  const tipColor   = isDark ? '#E8B4B0' : '#5A3820';
  const eyeThread  = isDark ? '#C9837A' : '#7A4A2A';

  // ── Update seam stroke color live when theme toggles (after completion) ─
  useEffect(() => {
    if (!completedRef.current) return;
    const stitchLine = svgRef.current?.querySelector('#ns-stitch');
    if (stitchLine) stitchLine.setAttribute('stroke', seamColor);
  }, [seamColor]);

  // ── Run animation once on mount ─────────────────────────────────────────
  useEffect(() => {
    // Don't restart if already done (e.g. theme toggle fires this effect again)
    if (completedRef.current) return;

    const svg = svgRef.current;
    if (!svg) return;

    const startDelay = setTimeout(() => {
      if (completedRef.current) return;   // guard against double-fire

      const W          = svg.clientWidth || window.innerWidth;
      const DURATION   = 4500;            // ms — slow, hand-stitching pace
      const STITCH_LEN = 12;
      const GAP_LEN    = 7;
      const UNIT       = STITCH_LEN + GAP_LEN;
      const SEAM_Y     = 7;

      const needle     = svg.querySelector('#ns-needle');
      const stitchLine = svg.querySelector('#ns-stitch');
      const threadTail = svg.querySelector('#ns-tail');

      // Make sure the stitch line spans the full width from the start
      if (stitchLine) {
        stitchLine.setAttribute('x2', String(W));
        stitchLine.style.strokeDasharray  = `${STITCH_LEN} ${GAP_LEN}`;
        stitchLine.style.strokeDashoffset = String(W);   // fully hidden initially
        stitchLine.style.opacity          = '1';
      }

      let startTs = null;

      const frame = (ts) => {
        if (!startTs) startTs = ts;
        const elapsed = ts - startTs;
        const t       = Math.min(elapsed / DURATION, 1);

        // Sine ease-in-out — smooth, natural hand motion
        const eased = -(Math.cos(Math.PI * t) - 1) / 2;
        const x     = eased * W;

        // 1. Advance the stitch seam
        if (stitchLine) {
          stitchLine.style.strokeDashoffset = String(W * (1 - eased));
        }

        // 2. Move needle with vertical pierce-bob
        if (needle) {
          const phase = (x % UNIT) / UNIT;
          const bob   = Math.sin(phase * Math.PI * 2) * 3.5;
          needle.setAttribute('transform', `translate(${x},${bob})`);
          needle.style.opacity = '1';
        }

        // 3. Trailing thread tail
        if (threadTail) {
          threadTail.setAttribute('x1', String(Math.max(0, x - 24)));
          threadTail.setAttribute('x2', String(x));
          threadTail.setAttribute('y1', String(SEAM_Y));
          threadTail.setAttribute('y2', String(SEAM_Y));
          threadTail.style.opacity = '0.55';
        }

        if (t < 1) {
          rafRef.current = requestAnimationFrame(frame);
          return;
        }

        // ── Animation complete ──────────────────────────────────────────
        completedRef.current = true;

        // Ensure seam is fully drawn (dashoffset = 0)
        if (stitchLine) {
          stitchLine.style.strokeDashoffset = '0';
          stitchLine.style.opacity          = '1';   // stays visible forever
        }

        // Fade out needle + tail
        if (needle)     { needle.style.transition = 'opacity 0.7s ease'; needle.style.opacity = '0'; }
        if (threadTail) { threadTail.style.transition = 'opacity 0.4s ease'; threadTail.style.opacity = '0'; }
      };

      rafRef.current = requestAnimationFrame(frame);
    }, 350);

    return () => {
      clearTimeout(startDelay);
      // Only cancel RAF if not yet complete — preserve seam after unmount/remount
      if (!completedRef.current) cancelAnimationFrame(rafRef.current);
    };
  // Empty deps — run exactly once on mount, never re-run
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        {/* Permanent stitch seam */}
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

        {/* Trailing thread tail (ephemeral) */}
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

        {/* Needle */}
        <g
          id="ns-needle"
          transform="translate(-30,0)"
          style={{ opacity: 0 }}
          filter="url(#ns-needle-glow)"
        >
          <rect x="-1.2" y="0" width="2.4" height="10" rx="1.2" fill={shaftColor} />
          <ellipse cx="0" cy="2" rx="0.8" ry="1.2" fill="none" stroke={eyeColor} strokeWidth="0.6" />
          <path d="M-1.2 10 L0 14 L1.2 10Z" fill={tipColor} />
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