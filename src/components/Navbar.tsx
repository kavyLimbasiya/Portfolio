import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PROFILE_CONFIG } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'TOOLS', href: '#tools' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CERTS', href: '#certs' },
    { label: 'PERSONAL', href: '#personal' },
    { label: 'SHOWCASE', href: '#showcase' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-black/95 backdrop-blur-md ${
        isScrolled ? 'border-b border-neutral-800/80 py-3' : 'py-4 md:py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="brand-logo"
          href="#"
          className="group flex items-center text-xl sm:text-2xl font-black font-syne tracking-tighter text-white hover:text-neutral-200 transition-colors"
        >
          <span className="tracking-tight uppercase">{PROFILE_CONFIG.name}</span>
          <span className="text-[#FF3E14] text-2xl leading-none ml-0.5 group-hover:rotate-45 transition-transform duration-300 inline-block">*</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7 text-[11px] xl:text-xs font-mono-code tracking-widest text-neutral-300">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-[#FF3E14] transition-colors duration-150 uppercase"
            >
              {item.label}
            </a>
          ))}

          {/* Availability Status Badge */}
          <div className="flex items-center gap-2 pl-2 text-neutral-300 font-mono-code text-xs">
            <span className="w-2 h-2 bg-[#FF3E14] inline-block"></span>
            <span className="tracking-wider uppercase text-[11px]">AVAILABLE / 26</span>
          </div>
        </nav>

        {/* Mobile Hamburger button */}
        <div className="lg:hidden flex items-center">
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-b border-neutral-800 px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3 font-mono-code text-sm text-neutral-300">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#FF3E14] py-1.5 transition-colors uppercase flex items-center justify-between border-b border-neutral-900"
              >
                <span>{item.label}</span>
                <ArrowUpRight size={16} className="text-neutral-600" />
              </a>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-2 text-neutral-300 font-mono-code text-xs border-t border-neutral-900">
            <span className="w-2 h-2 bg-[#FF3E14] inline-block"></span>
            <span className="tracking-wider uppercase">AVAILABLE / 26</span>
          </div>
        </div>
      )}
    </header>
  );
};
