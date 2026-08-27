import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative bg-black py-24 md:py-32 border-b border-neutral-900 overflow-hidden">
      {/* Giant Outline Typography in Background matching screenshot */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-20">
        <span
          className="text-8xl sm:text-9xl md:text-[14rem] lg:text-[18rem] font-black font-display tracking-tighter whitespace-nowrap text-transparent"
          style={{
            WebkitTextStroke: '2px #333333',
          }}
        >
          RS _ CLIENTS / P
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16 z-10">
        {/* Top Meta Bar matching screenshot */}
        <div className="flex items-center justify-between text-xs font-mono-code tracking-widest text-neutral-400 select-none">
          <div>
            <span>[ </span>
            <span className="text-neutral-300">04 / VOICES</span>
            <span> ]</span>
          </div>
          <div className="text-neutral-300">
            SIGNAL — FROM THE FIELD
          </div>
        </div>

        {/* 3 Testimonial Cards with distinct Red bottom-right accent shadow matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pt-4">
          {TESTIMONIALS.map((testimonial) => {
            return (
              <div
                key={testimonial.id}
                className="relative bg-black border border-neutral-800 p-8 sm:p-9 flex flex-col justify-between space-y-8 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  boxShadow: '6px 6px 0px 0px #FF3E14',
                }}
              >
                {/* Quote text */}
                <p className="text-sm sm:text-base font-mono-code text-neutral-200 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author & Role */}
                <div className="pt-4 border-t border-neutral-900 text-xs font-mono-code">
                  <span className="text-[#FF3E14] font-bold tracking-wider uppercase block">
                    — {testimonial.author}, {testimonial.company}
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
