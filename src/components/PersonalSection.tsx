import React, { useState } from 'react';
import { PersonalWork, PERSONAL_WORKS } from '../data/portfolioData';
import { ZoomIn } from 'lucide-react';

interface PersonalSectionProps {
  onSelectWork: (work: PersonalWork) => void;
}

export const PersonalSection: React.FC<PersonalSectionProps> = ({ onSelectWork }) => {
  return (
    <section id="personal" className="bg-black py-20 md:py-28 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* Top Meta Bar matching screenshot */}
        <div className="flex items-center justify-between text-xs font-mono-code tracking-widest text-neutral-400 select-none">
          <div>
            <span>[ </span>
            <span className="text-neutral-300">09 / PERSONAL</span>
            <span> ]</span>
          </div>
          <div className="text-neutral-300">
            SKETCHBOOK — OFF THE CLOCK
          </div>
        </div>

        {/* Section Headline & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end justify-between">
          <div className="lg:col-span-6">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight uppercase leading-[0.9]">
              <span className="text-white block">HAND </span>
              <span className="text-[#FF3E14] block">DRAWN.</span>
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-xs sm:text-sm md:text-base font-mono-code text-neutral-400 leading-relaxed max-w-lg">
              Personal drawings, sketchbook pages and quick studies. Not for clients — just for the love of making marks.
            </p>
          </div>
        </div>

        {/* Artwork Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-8 [column-fill:_balance]">
          {PERSONAL_WORKS.map((work, idx) => {
            const aspectRatios = [
              'aspect-[3/4]',
              'aspect-[4/5]',
              'aspect-[16/12]',
              'aspect-[3/4]',
              'aspect-[4/5]'
            ];
            const aspectClass = aspectRatios[idx % aspectRatios.length];

            return (
              <div
                key={work.id}
                onClick={() => onSelectWork(work)}
                className="break-inside-avoid mb-6 lg:mb-8 group bg-[#0A0A0A] border border-neutral-900 overflow-hidden cursor-pointer hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Thumbnail */}
                <div className={`relative ${aspectClass} w-full overflow-hidden bg-neutral-950`}>
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black font-mono-code font-bold text-[11px] px-3.5 py-1.5 flex items-center gap-1.5 uppercase">
                      <ZoomIn size={12} />
                      EXPAND ARTWORK
                    </span>
                  </div>
                </div>

                {/* Footer specs matching screenshot */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-t border-neutral-900 bg-[#0A0A0A] text-xs font-mono-code">
                  <span className="text-white font-bold tracking-wider uppercase group-hover:text-[#FF3E14] transition-colors">
                    {work.title}
                  </span>
                  <span className="text-[#FF3E14] font-bold uppercase tracking-wider">
                    {work.medium} · {work.size}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
