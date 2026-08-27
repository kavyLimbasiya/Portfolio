import React from 'react';
import { Linkedin, Instagram, Github, ArrowUp } from 'lucide-react';
import { PROFILE_CONFIG } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { name: 'LINKEDIN', url: PROFILE_CONFIG.socials.linkedin, icon: Linkedin },
    { name: 'INSTAGRAM', url: PROFILE_CONFIG.socials.instagram, icon: Instagram },
    { name: 'GITHUB', url: PROFILE_CONFIG.socials.github, icon: Github },
  ];

  return (
    <footer className="bg-black border-t border-neutral-900 overflow-hidden select-none">
      {/* Giant Animated Social Marquee matching screenshot */}
      <div className="py-8 sm:py-10 bg-black border-b border-neutral-900 overflow-hidden group">
        <div className="animate-marquee-fast flex items-center whitespace-nowrap">
          {[...Array(4)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center space-x-10 sm:space-x-14 mr-10 sm:mr-14">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={`${loopIdx}-${social.name}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-wider text-white hover:text-[#FF3E14] transition-colors"
                  >
                    <Icon size={36} className="inline-block" />
                    <span>{social.name}</span>
                    <span className="text-2xl sm:text-3xl text-[#FF3E14] ml-6 sm:ml-10">✦</span>
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar matching screenshot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono-code text-neutral-400">
        {/* Copyright */}
        <div>
          <span>© 2026 {PROFILE_CONFIG.name} STUDIO</span>
        </div>

        {/* Direct Social Links */}
        <div className="flex items-center space-x-6">
          <a
            href={PROFILE_CONFIG.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#FF3E14] transition-colors uppercase"
          >
            <Github size={14} />
            <span>GITHUB</span>
          </a>

          <a
            href={PROFILE_CONFIG.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#FF3E14] transition-colors uppercase"
          >
            <Instagram size={14} />
            <span>INSTAGRAM</span>
          </a>

          <a
            href={PROFILE_CONFIG.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#FF3E14] transition-colors uppercase"
          >
            <Linkedin size={14} />
            <span>LINKEDIN</span>
          </a>
        </div>

        {/* Tagline & Back to top */}
        <div className="flex items-center gap-4">
          <span className="text-neutral-500">NO COOKIES · NO TRACKERS · JUST WORK</span>
          <button
            onClick={scrollToTop}
            className="p-2 border border-neutral-800 hover:border-[#FF3E14] hover:text-[#FF3E14] transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
