/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        'warm-white': '#FDF9F4',
        'dusty-rose': '#C9837A',
        'soft-pink': '#E8B4B0',
        'pastel-pink': '#F2D4D0',
        'frosty-blue': '#B8D4E0',
        'pale-blue': '#D6E8F0',
        'lavender': '#C4B5D4',
        'soft-lavender': '#DDD4EA',
        'warm-taupe': '#B5A49A',
        'dark-warm': '#1E1714',
        'dark-card': '#2A2320',
        'dark-surface': '#251E1B',
        'muted-rose': '#8B5E5A',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'thread-draw': 'threadDraw 2s ease-in-out forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        threadDraw: {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
