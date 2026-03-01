import '../styles/globals.css';
import ScrollAnimations from '../components/ScrollAnimations';

export const metadata = {
  title: 'Aurelia Crochet — Handmade Is The New Luxury',
  description: 'Experience the elegance of artisanal craftsmanship with our exclusive crochet collection. Every stitch tells a story of heritage, patience, and modern sophistication.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-cream dark:bg-dark-warm text-[#2C2420] dark:text-[#E8DDD8] font-body">
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}