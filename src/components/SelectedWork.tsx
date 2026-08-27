import React, { useRef } from 'react';
import { PROJECTS, Project } from '../data/portfolioData';
import { ArrowUpRight, Play } from 'lucide-react';

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
  return (
    <section id="work" className="bg-black py-20 md:py-28 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between text-xs font-mono-code tracking-widest text-neutral-400 select-none">
          <div>
            <span>[ </span>
            <span className="text-neutral-300">02 / SELECTED WORK</span>
            <span> ]</span>
          </div>
          <div className="text-neutral-300">
            {PROJECTS.length.toString().padStart(2, '0')} PROJECTS
          </div>
        </div>

        {/* Section Headline */}
        <div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight uppercase leading-[0.9]">
            <span className="text-white">SELECTED </span>
            <span className="text-[#FF3E14]">WORK </span>
            <span className="text-white block sm:inline">& PROJECTS.</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {PROJECTS.map((project) => {
            const isVideo = project.isReel && project.videoUrl;
            const mediaSrc = resolveMediaUrl(project.image);

            return (
              <div
                key={project.id}
                className="group relative bg-[#0A0A0A] border border-neutral-900 overflow-hidden cursor-pointer hover:border-neutral-700 transition-all duration-300"
                onClick={() => {
                  if (project.isReel) {
                    onOpenReel();
                  } else {
                    onSelectProject(project);
                  }
                }}
              >
                {/* Media Thumbnail */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-950">
                  {isVideo ? (
                    <video
                      src={resolveMediaUrl(project.videoUrl)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      muted
                      loop
                      playsInline
                      onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                      onMouseLeave={(e) => {
                        const v = e.currentTarget as HTMLVideoElement;
                        v.pause();
                        v.currentTime = 0;
                      }}
                    />
                  ) : mediaSrc ? (
                    <img
                      src={mediaSrc}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.opacity = '0.3';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                      <span className="text-neutral-600 font-mono-code text-xs tracking-widest">NO PREVIEW</span>
                    </div>
                  )}

                  {/* Video Play Overlay */}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-[#FF3E14] flex items-center justify-center">
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Tag pill */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono-code text-white bg-black/70 border border-neutral-700 px-2 py-1 uppercase tracking-wider">
                      {project.tag}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <p className="text-[10px] font-mono-code text-neutral-500 tracking-widest">{project.number} / {project.year}</p>
                    <h3 className="text-base sm:text-lg font-black font-display tracking-wide text-white uppercase truncate group-hover:text-[#FF3E14] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono-code text-neutral-500 uppercase tracking-wider">{project.category}</p>
                  </div>
                  <div className="shrink-0 mt-1">
                    <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-[#FF3E14] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
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
