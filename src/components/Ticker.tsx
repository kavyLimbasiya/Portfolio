import React from 'react';

export const Ticker: React.FC = () => {
  const words = ['DIRECT', 'COMPOSE', 'GRADE', 'ANIMATE', 'DESIGN', 'EDIT'];
  
  return (
    <div className="relative w-full bg-[#FF3E14] text-black overflow-hidden py-3 sm:py-4 border-y border-[#FF3E14] select-none z-20">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {[...Array(4)].map((_, loopIndex) => (
          <div key={loopIndex} className="flex items-center space-x-6 sm:space-x-8 mr-6 sm:mr-8">
            {words.map((word, index) => (
              <React.Fragment key={`${loopIndex}-${index}`}>
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-wider text-black">
                  {word}
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl text-black">✦</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
