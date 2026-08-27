import React, { useState, useRef } from 'react';
import { FEATURED_PROJECT, Project } from '../data/portfolioData';
import { ArrowUpRight, Play, Pause, Eye, Film, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
  onOpenReel: () => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onSelectProject, onOpenReel }) => {
  const [isPlayingInline, setIsPlayingInline] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { pauseMusicForVideo, resumeMusicAfterVideo } = useAudio();

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlayingInline) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoPlay = () => {
    setIsPlayingInline(true);
    pauseMusicForVideo();
  };

  const handleVideoPause = () => {
    setIsPlayingInline(false);
    resumeMusicAfterVideo();
  };

  const handleVideoEnded = () => {
    setIsPlayingInline(false);
    resumeMusicAfterVideo();
  };

  return (
    <section id="projects" className="bg-black py-20 md:py-28 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between text-xs font-mono-code tracking-widest text-neutral-400 select-none">
          <div>
            <span>[ </span>
            <span className="text-neutral-300">08 / PROJECTS</span>
            <span> ]</span>
          </div>
          <div className="text-neutral-300">
            FEATURED SPOTLIGHT
          </div>
        </div>

        {/* Headline */}
        <div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight uppercase leading-[0.9]">
            <span className="text-white">FEATURED </span>
            <span className="text-[#FF3E14]">PROJECTS.</span>
          </h2>
        </div>

        {/* Featured Large Showcase Banner */}
        <div
          onClick={() => onSelectProject(FEATURED_PROJECT)}
          className="group relative bg-[#0A0A0A] border border-neutral-900 grid grid-cols-1 lg:grid-cols-12 overflow-hidden cursor-pointer hover:border-neutral-700 transition-all duration-300 shadow-2xl"
        >
          {/* Left Media Area: Interactive Video or Image */}
          <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto overflow-hidden bg-neutral-950">
            {/* Corner Tag */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="text-xs font-mono-code font-bold text-neutral-300 bg-black/80 px-3 py-1 border border-neutral-800 uppercase">
                {FEATURED_PROJECT.number}
              </span>
              <span className="text-xs font-mono-code font-bold text-[#FF3E14] bg-black/80 px-3 py-1 border border-neutral-800 uppercase flex items-center gap-1.5">
                <Film size={12} />
                MOTION + PRINT
              </span>
            </div>

            {/* Video or Image with direct controls */}
            {FEATURED_PROJECT.videoUrl ? (
              <div className="w-full h-full relative">
                <video
                  ref={videoRef}
                  src={FEATURED_PROJECT.videoUrl}
                  poster={FEATURED_PROJECT.image}
                  playsInline
                  loop
                  muted={isMuted}
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  onEnded={handleVideoEnded}
                  className="w-full h-full object-cover grayscale contrast-110 brightness-95 group-hover:grayscale-0 transition-all duration-500"
                />

                {/* Video controls toggle button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none group-hover:bg-black/40 transition-colors">
                  <button
                    onClick={togglePlay}
                    className="pointer-events-auto w-14 h-14 rounded-full bg-[#FF3E14] text-white flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform"
                    title={isPlayingInline ? 'Pause preview' : 'Play video'}
                  >
                    {isPlayingInline ? <Pause size={24} /> : <Play size={24} className="ml-0.5 fill-current" />}
                  </button>
                </div>

                {/* Bottom video status */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/70 to-transparent flex items-center justify-between text-[11px] font-mono-code text-white">
                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="pointer-events-auto p-1 bg-black/60 border border-neutral-700 hover:text-[#FF3E14]">
                      {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                    <span className="text-neutral-400">
                      {isPlayingInline ? 'PREVIEW PLAYING (BGM PAUSED)' : 'CLICK TO PREVIEW VIDEO'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={FEATURED_PROJECT.image}
                alt={FEATURED_PROJECT.title}
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              />
            )}

            {/* Hover Case Study Prompt */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-white text-black font-mono-code font-bold text-xs px-3.5 py-1.5 flex items-center gap-1.5 shadow-lg">
                <Eye size={13} />
                FULL CASE STUDY
              </span>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 bg-[#0A0A0A] border-t lg:border-t-0 lg:border-l border-neutral-900">
            <div className="space-y-4">
              <span className="text-xs font-mono-code font-bold tracking-widest text-[#FF3E14] uppercase block">
                {FEATURED_PROJECT.category}
              </span>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase group-hover:text-[#FF3E14] transition-colors leading-[0.95]">
                {FEATURED_PROJECT.title}
              </h3>

              <p className="text-xs sm:text-sm font-mono-code text-neutral-400 leading-relaxed pt-2">
                {FEATURED_PROJECT.description}
              </p>
            </div>

            {/* Deliverables tags & Action */}
            <div className="space-y-6 pt-4 border-t border-neutral-900">
              <div className="flex flex-wrap gap-2">
                {FEATURED_PROJECT.deliverables?.map((item) => (
                  <span
                    key={item}
                    className="text-[10px] font-mono-code text-neutral-400 bg-neutral-950 border border-neutral-800 px-2.5 py-1 uppercase"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-mono-code font-bold text-white uppercase group-hover:text-[#FF3E14]">
                <span>VIEW CASE STUDY &amp; ASSETS</span>
                <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
