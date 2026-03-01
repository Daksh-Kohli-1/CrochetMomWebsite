'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import NavStitch from './NavStitch';

const navLinks = ['Collections', 'The Art', 'Custom', 'Our Story'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-visible ${
        scrolled
          ? 'bg-warm-white/90 dark:bg-dark-warm/90 backdrop-blur-md shadow-sm shadow-soft-pink/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="relative max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-6 h-6 relative">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" fill="#C9837A" opacity="0.7"/>
              <circle cx="12" cy="9" r="2.5" fill="#C9837A"/>
            </svg>
          </div>
          <span className="font-display text-lg font-medium tracking-widest text-[#2C2420] dark:text-[#E8DDD8] uppercase">
            Aurelia <span className="text-dusty-rose font-light">Crochet</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
              className="font-body text-xs tracking-widest uppercase text-warm-taupe hover:text-dusty-rose dark:text-[#A89990] dark:hover:text-soft-pink transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#collections"
            className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-dusty-rose text-white text-xs tracking-widest uppercase font-body hover:bg-muted-rose transition-colors duration-300"
          >
            Shop Now
          </a>
          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-2 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block h-px w-5 bg-warm-taupe dark:bg-[#A89990] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`block h-px w-5 bg-warm-taupe dark:bg-[#A89990] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </button>
        </div>

        {/* ── Stitch animation along the navbar bottom edge ── */}
        <NavStitch />
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-72' : 'max-h-0'}`}>
        <div className="bg-warm-white dark:bg-dark-warm px-6 pb-6 flex flex-col gap-5 pt-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, '-')}`}
              onClick={() => setMenuOpen(false)}
              className="font-body text-xs tracking-widest uppercase text-warm-taupe hover:text-dusty-rose dark:text-[#A89990] transition-colors"
            >
              {link}
            </a>
          ))}
          <a
            href="#collections"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-dusty-rose text-white text-xs tracking-widest uppercase font-body"
            onClick={() => setMenuOpen(false)}
          >
            Shop Now
          </a>
        </div>
      </div>
    </header>
  );
}