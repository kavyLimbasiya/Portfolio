import React, { useState } from 'react';
import { SERVICES } from '../data/portfolioData';
import { Minus, Plus, ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>('s01');

  return (
    <section className="bg-black py-20 md:py-28 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* Headline matching screenshot */}
        <div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight uppercase leading-[0.9]">
            <span className="text-white">WHAT I </span>
            <span className="text-[#FF3E14]">DO </span>
            <span className="text-white block sm:inline">FOR A LIVING.</span>
          </h2>
        </div>

        {/* Interactive Accordion / Service Blocks */}
        <div className="space-y-4">
          {SERVICES.map((service) => {
            const isActive = activeServiceId === service.id;

            return (
              <div
                key={service.id}
                className="overflow-hidden border border-neutral-900 transition-all duration-300"
              >
                {/* Header Bar */}
                <button
                  onClick={() => setActiveServiceId(isActive ? '' : service.id)}
                  className={`w-full text-left p-6 sm:p-8 flex items-center justify-between transition-colors duration-200 ${isActive
                    ? 'bg-[#FF3E14] text-black'
                    : 'bg-[#0A0A0A] text-white hover:bg-neutral-900'
                    }`}
                >
                  <div className="flex items-center space-x-6 sm:space-x-8">
                    <span className={`text-xs font-mono-code font-bold tracking-widest ${isActive ? 'text-black/80' : 'text-neutral-500'
                      }`}>
                      {service.number}
                    </span>
                    <h3 className={`text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-wider uppercase ${isActive ? 'text-black' : 'text-white'
                      }`}>
                      {service.title}
                    </h3>
                  </div>

                  <div className={`p-2 rounded-full ${isActive ? 'text-black' : 'text-neutral-400'}`}>
                    {isActive ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                </button>

                {/* Expanded Details Body */}
                {isActive && (
                  <div className="bg-[#0D0D0D] border-t border-neutral-800 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
                    <div className="lg:col-span-6">
                      <p className="text-sm sm:text-base font-mono-code text-neutral-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.skills.map((skill) => (
                        <div
                          key={skill}
                          className="bg-black/90 border border-neutral-800 p-3 flex items-center space-x-2 text-xs font-mono-code text-neutral-200 uppercase"
                        >
                          <ArrowRight size={13} className="text-[#FF3E14]" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;