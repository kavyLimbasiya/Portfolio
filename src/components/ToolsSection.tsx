import React from 'react';
import { TOOLKIT_ITEMS } from '../data/portfolioData';

const resolveMediaUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url;
  }
  return `/${url}`;
};

export const ToolsSection: React.FC = () => {
  return (
    <section id="tools" className="bg-black py-20 md:py-28 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* Top Meta Bar matching screenshot */}
        <div className="flex items-center justify-between text-xs font-mono-code tracking-widest text-neutral-400 select-none">
          <div>
            <span>[ </span>
            <span className="text-neutral-300">06 / TOOLKIT</span>
            <span> ]</span>
          </div>
          <div className="text-neutral-300">
            03 APPS — DAILY USE
          </div>
        </div>

        {/* Section Headline matching screenshot */}
        <div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight uppercase leading-[0.9]">
            <span className="text-white">TOOLS I </span>
            <span className="text-[#FF3E14]">CRAFT </span>
            <span className="text-white block sm:inline">WITH DAILY.</span>
          </h2>
        </div>

        {/* 3 Tool Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TOOLKIT_ITEMS.map((tool) => {
            const customImg = tool.iconImage || tool.image;

            return (
              <div
                key={tool.id}
                className="bg-[#0A0A0A] border border-neutral-900 p-6 sm:p-8 flex flex-col justify-between space-y-8 hover:border-neutral-700 transition-all duration-300 relative group"
              >
                {/* Top Number & Colored Status Dot */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-code text-neutral-500 tracking-wider">
                    {tool.number}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: tool.dotColor }}
                  ></span>
                </div>

                {/* Software Logo / Custom Image Badge */}
                <div className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden border border-neutral-800 bg-neutral-950 group-hover:scale-105 transition-transform">
                  {customImg ? (
                    <img
                      src={resolveMediaUrl(customImg)}
                      alt={tool.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : tool.iconType === 'capcut' ? (
                    <div className="w-full h-full bg-white flex flex-col items-center justify-center p-2">
                      <div className="w-8 h-8 relative flex items-center justify-center">
                        {/* Stylized CapCut emblem */}
                        <div className="w-5 h-5 border-[3px] border-black rotate-45 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-black"></div>
                        </div>
                      </div>
                      <span className="text-[9px] font-black tracking-tight text-black uppercase mt-0.5">CapCut</span>
                    </div>
                  ) : tool.iconType === 'photoshop' ? (
                    <div className="w-full h-full bg-[#001E36] border border-[#00C8FF]/40 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black font-syne text-[#31A8FF] tracking-tight">Ps</span>
                    </div>
                  ) : tool.iconType === 'aftereffects' ? (
                    <div className="w-full h-full bg-[#00005B] border border-[#9999FF]/40 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black font-syne text-[#9999FF] tracking-tight">Ae</span>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                      <span className="text-xl font-black font-mono-code text-white">
                        {tool.name.slice(0, 2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Tool Title & Subtitle */}
                <div className="space-y-1.5">
                  <h3 className="text-2xl sm:text-3xl font-black font-display tracking-wide text-white uppercase group-hover:text-[#FF3E14] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs font-mono-code font-bold tracking-wider text-[#00E5FF] uppercase" style={{ color: tool.dotColor }}>
                    {tool.role}
                  </p>
                </div>

                {/* Description matching user screenshot text */}
                <p className="text-xs sm:text-[13px] font-mono-code text-neutral-400 leading-relaxed">
                  {tool.description}
                </p>

                {/* Pill Chips row matching screenshot */}
                <div className="pt-4 border-t border-neutral-900 flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono-code text-neutral-400 bg-neutral-950 border border-neutral-800 px-2 py-1 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
