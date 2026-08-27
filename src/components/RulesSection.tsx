import React, { useState } from 'react';
import { RULES } from '../data/portfolioData';

export const RulesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-black py-20 md:py-28 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* Section Headline matching screenshot */}
        <div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight uppercase leading-[0.9]">
            <span className="text-white">THREE RULES </span>
            <span className="text-[#FF3E14]">I NEVER </span>
            <span className="text-white">BREAK.</span>
          </h2>
        </div>

        {/* 3 Interactive Rules Rows */}
        <div className="divide-y divide-neutral-900 border-y border-neutral-900">
          {RULES.map((rule, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={rule.number}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start transition-all duration-300 ${
                  isHovered ? 'bg-neutral-950/80 px-4 -mx-4' : ''
                }`}
              >
                {/* Number */}
                <div className="lg:col-span-2">
                  <span className={`text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-wider transition-colors duration-200 ${
                    isHovered ? 'text-[#FF3E14]' : 'text-neutral-700'
                  }`}>
                    {rule.number}
                  </span>
                </div>

                {/* Title */}
                <div className="lg:col-span-5">
                  <h3 className={`text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-wide uppercase transition-colors duration-200 ${
                    isHovered ? 'text-white translate-x-1' : 'text-neutral-200'
                  }`}>
                    {rule.title}
                  </h3>
                </div>

                {/* Body paragraph */}
                <div className="lg:col-span-5">
                  <p className="text-xs sm:text-sm md:text-base font-mono-code text-neutral-400 leading-relaxed">
                    {rule.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
