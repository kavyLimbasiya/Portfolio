import React from 'react';
import { InteractivePortrait } from './InteractivePortrait';
import { PROFILE_CONFIG } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative bg-black py-20 md:py-28 border-b border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header Meta */}
        <div className="flex items-center justify-between text-xs font-mono-code tracking-widest text-neutral-400 select-none mb-12">
          <div>
            <span>[ </span>
            <span className="text-neutral-300">03 / ABOUT &amp; IDENTITY</span>
            <span> ]</span>
          </div>
          <div className="text-neutral-300">
            DIRECTOR &amp; EDITOR
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Interactive Portrait with Cursor Selection Lens */}
          <div className="lg:col-span-5 relative">
            <InteractivePortrait
              normalImage={PROFILE_CONFIG.portraitImage || "/assets/myimage.jpg"}
              scannerImage={PROFILE_CONFIG.scannerImage || "/assets/spiderman.jpg"}
            />

            {/* Guide hint beneath image */}
            <div className="mt-4 flex items-center justify-between text-[11px] font-mono-code text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#FF3E14] inline-block animate-pulse"></span>
                <span>MOVE CURSOR TO SCAN &amp; REVEAL SPIDER-MAN</span>
              </span>
              <span className="text-neutral-500 font-mono-code tracking-wider">
                OPTICAL RETICLE
              </span>
            </div>
          </div>

          {/* Right Column: Statement & Credentials Grid */}
          <div className="lg:col-span-7 space-y-8 md:space-y-10">
            {/* Headline matching Screenshot 4 */}
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-black font-display tracking-tight uppercase leading-[0.88]">
                <span className="text-white block">I DESIGN</span>
                <span className="text-[#FF3E14] block">WHAT MOVES</span>
                <span className="text-white block">AND WHAT</span>
                <span className="text-white block">REFUSES TO.</span>
              </h2>
            </div>

            {/* Statement text matching Screenshot 4 */}
            <p className="text-xs sm:text-sm md:text-[15px] font-mono-code text-neutral-400 leading-relaxed max-w-xl">
              10+ years of building brand systems, editorial layouts, motion reels and film cuts. Clients range from indie record labels to Fortune 500 launches. I obsess over typography, cadence and the split second before an idea breaks.
            </p>

            {/* 4-Item Credentials Matrix matching Screenshot 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-neutral-900">
              {/* Location */}
              <div className="space-y-1.5 pb-4 sm:pb-0 border-b sm:border-b-0 border-neutral-900">
                <span className="text-[11px] font-mono-code text-neutral-500 tracking-widest uppercase block">
                  LOCATION
                </span>
                <p className="text-xs sm:text-sm font-mono-code font-bold text-white tracking-wider uppercase">
                  {PROFILE_CONFIG.location || "India, Gujarat, Rajkot"}
                </p>
              </div>

              {/* Clients */}
              <div className="space-y-1.5 pb-4 sm:pb-0 border-b sm:border-b-0 border-neutral-900">
                <span className="text-[11px] font-mono-code text-neutral-500 tracking-widest uppercase block">
                  CLIENTS
                </span>
                <p className="text-xs sm:text-sm font-mono-code font-bold text-white tracking-wider uppercase">
                  A24 · NIKE · SONOS · OFF-WHITE
                </p>
              </div>

              {/* Awards */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono-code text-neutral-500 tracking-widest uppercase block">
                  AWARDS
                </span>
                <p className="text-xs sm:text-sm font-mono-code font-bold text-white tracking-wider uppercase">
                  AWWWARDS · FWA · CSSDA
                </p>
              </div>

              {/* Stack */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono-code text-neutral-500 tracking-widest uppercase block">
                  STACK
                </span>
                <p className="text-xs sm:text-sm font-mono-code font-bold text-white tracking-wider uppercase">
                  CAPCUT · PS · AE · PR · DAVINCI
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
