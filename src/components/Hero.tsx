import React from 'react';
import { ThreeCanvas } from './ThreeCanvas';
import { Play, ArrowDownRight, Sparkles } from 'lucide-react';
import { PROFILE_CONFIG } from '../data/portfolioData';

interface HeroProps {
  onOpenReel?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReel }) => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] md:min-h-screen bg-black pt-20 md:pt-24 pb-8 md:pb-12 flex flex-col justify-between overflow-hidden border-b border-neutral-900 select-none"
    >
      {/* Top Meta Headers matching design */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex items-start justify-between text-xs sm:text-[13px] font-mono-code tracking-widest text-neutral-400 z-20">
        <div className="flex items-center gap-1.5">
          <span>[ </span>
          <span className="text-neutral-300">EST. 2016 — PORTFOLIO NO. 07</span>
          <span> ]</span>
        </div>

        <div className="text-right leading-snug uppercase tracking-wider text-xs sm:text-[13px] font-mono-code text-neutral-400">
          <p className="text-white font-bold">BASED / EVERYWHERE</p>
          <p className="text-neutral-400">WORK / GLOBAL</p>
        </div>
      </div>

      {/* Center/Right 3D Interactive WebGL Wireframe Polyhedron & Ribbon */}
      <div className="absolute inset-0 z-10 flex items-center justify-center lg:justify-end lg:pr-12 xl:pr-24 pointer-events-auto opacity-80 lg:opacity-100">
        <div className="w-full h-full max-w-[750px] lg:max-w-[900px] max-h-[800px] flex items-center justify-center">
          <ThreeCanvas />
        </div>
      </div>

      {/* Bottom Left Typography Block */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 z-20 pointer-events-none mb-4 sm:mb-8 mt-12 lg:mt-0">
        <div className="max-w-2xl space-y-3 sm:space-y-4 pointer-events-auto">
          {/* Main Giant Headline */}
          <div className="space-y-0 leading-[0.82] tracking-tighter">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] xl:text-[11.25rem] font-black font-display text-white uppercase transform -translate-x-0.5">
              DIRECTOR
            </h1>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] xl:text-[11.25rem] font-black font-display text-[#FF3E14] uppercase transform -translate-x-0.5">
              / EDITOR
            </h1>
          </div>

          {/* Bio text directly below headline */}
          <p className="text-xs sm:text-sm md:text-[15px] font-mono-code text-neutral-400 max-w-lg leading-relaxed pt-1">
            <span className="text-white font-bold">{PROFILE_CONFIG.name}</span> — {PROFILE_CONFIG.bio.replace(/^.*? — /, '')}
          </p>
        </div>
      </div>
    </section>
  );
};
