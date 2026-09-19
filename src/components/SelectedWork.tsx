import React, { useState } from 'react';
import { Project, PROJECTS } from '../data/portfolioData';
import { Play, ArrowUpRight, Maximize2, Film, Globe } from 'lucide-react';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
  onOpenReel: () => void;
}

const resolveMediaUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url;
  }
  return `/${url}`;
};

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject, onOpenReel }) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <section id="work" className="relative bg-black py-20 md:py-28 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-14">
        {/* Section Meta Bar */}
        <div className="flex items-center justify-between text-xs font-mono-code tracking-widest text-neutral-400 select-none">
          <div>
            <span>[ </span>
            <span className="text-neutral-300">02 / WORK</span>
            <span> ]</span>
          </div>
          <div className="text-neutral-300">
            {PROJECTS.length} PROJECTS &amp; SHOWCASE
          </div>
        </div>

        {/* Section Headline */}
        <div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight uppercase leading-none">
            <span className="text-white">SELECTED </span>
            <span className="text-[#FF3E14]">WORK.</span>
          </h2>
        </div>

        {/* Projects Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-8 [column-fill:_balance]">
          {PROJECTS.map((project) => {
            const isHovered = hoveredProjectId === project.id;
            // Match aspect ratio directly to media type so posters and reels are shown in full
            const aspectClass = project.isReel
              ? 'aspect-[9/16] sm:aspect-[4/5]'
              : 'aspect-[4/5]';

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => {
                  if (project.isReel) {
                    onOpenReel();
                  } else {
                    onSelectProject(project);
                  }
                }}
                className="break-inside-avoid mb-6 lg:mb-8 group relative bg-[#0A0A0A] border border-neutral-900 overflow-hidden cursor-pointer flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 shadow-lg"
              >
                {/* Media Container with live hover video or thumbnail */}
                <div className={`relative ${aspectClass} w-full overflow-hidden bg-neutral-950`}>
                  {project.videoUrl ? (
                    <video
                      src={resolveMediaUrl(project.videoUrl)}
                      autoPlay={isHovered}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={project.image && !project.image.endsWith('.mp4') ? resolveMediaUrl(project.image) : undefined}
                      className={`w-full h-full object-cover object-center transition-all duration-500 ${isHovered ? 'scale-105 grayscale-0 brightness-100' : 'grayscale contrast-125 brightness-90'
                        }`}
                    />
                  ) : project.image ? (
                    <img
                      src={resolveMediaUrl(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover object-center grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-600 font-mono-code text-xs">
                      [ VIDEO / MEDIA ]
                    </div>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity"></div>

                  {/* Video / Reel Badge */}
                  {project.isReel ? (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="flex items-center gap-1.5 bg-[#FF3E14] text-white text-[10px] font-mono-code font-bold px-2.5 py-1 tracking-wider uppercase shadow-md">
                        <Play size={10} className="fill-current" />
                        4K REEL
                      </span>
                    </div>
                  ) : project.videoUrl ? (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="flex items-center gap-1.5 bg-black/80 border border-neutral-700 text-neutral-300 text-[10px] font-mono-code font-bold px-2 py-0.5 tracking-wider uppercase">
                        <Film size={10} className="text-[#FF3E14]" />
                        VIDEO
                      </span>
                    </div>
                  ) : null}

                  {/* Top Left Project Number */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-mono-code text-neutral-400 bg-black/80 px-2 py-0.5 border border-neutral-800">
                      {project.number}
                    </span>
                  </div>

                  {/* Quick Action Hover Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <div className="bg-white text-black font-mono-code font-bold text-xs px-4 py-2 flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      {project.isReel ? (
                        <>
                          <Play size={12} className="fill-current text-[#FF3E14]" />
                          <span>PLAY REEL</span>
                        </>
                      ) : project.videoUrl ? (
                        <>
                          <Play size={12} className="fill-current text-[#FF3E14]" />
                          <span>WATCH &amp; DETAILS</span>
                        </>
                      ) : (
                        <>
                          <Maximize2 size={12} />
                          <span>VIEW DETAILS</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Info Bar */}
                <div className="p-4 sm:p-5 flex flex-col justify-between space-y-2.5 border-t border-neutral-900 bg-[#0A0A0A]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-bold font-mono-code text-white tracking-wider uppercase group-hover:text-[#FF3E14] transition-colors truncate">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono-code font-bold text-[#FF3E14] ml-2 shrink-0">
                      {project.year}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono-code text-neutral-400 uppercase">
                    <span className="truncate">{project.category}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-[#FF3E14] text-black text-[10px] font-mono-code font-bold px-2 py-0.5 hover:bg-white transition-colors flex items-center gap-1"
                          title="Open project website in new tab"
                        >
                          <Globe size={10} />
                          <span>LIVE</span>
                        </a>
                      )}
                      <ArrowUpRight size={14} className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

