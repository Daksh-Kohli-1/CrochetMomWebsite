export default function Footer() {
  const columns = [
    {
      title: 'Collections',
      links: ['Autumn Winter', 'Home Essentials', 'Artisanal Wraps', 'Gift Cards'],
    },
    {
      title: 'Company',
      links: ['Our Story', 'Sustainability', 'Careers', 'Press'],
    },
    {
      title: 'Connect',
      links: ['Instagram', 'Pinterest'],
    },
  ];

  return (
    <footer className="bg-[#1C1714] dark:bg-[#130F0D] text-[#A89990]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" fill="#C9837A" opacity="0.7"/>
                  <circle cx="12" cy="9" r="2.5" fill="#C9837A"/>
                </svg>
              </div>
              <span className="font-display text-base tracking-widest text-[#E8DDD8] uppercase">
                Luxury <span className="text-dusty-rose font-light">Crochet</span>
              </span>
            </div>
            <p className="font-body text-xs leading-relaxed text-[#7A6860] max-w-[200px]">
              Defining modern elegance through the timeless art of hand-crafted textiles.
            </p>
          </div>

          {/* Links */}
          {columns.map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-body text-xs tracking-widest uppercase text-[#E8DDD8] mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-xs text-[#7A6860] hover:text-dusty-rose transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#2C2420] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[#4A3C36]">
            © 2024 Luxury Crochet. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms'].map((item) => (
              <a key={item} href="#" className="font-body text-xs text-[#4A3C36] hover:text-dusty-rose transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
