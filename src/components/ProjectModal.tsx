import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { X, ArrowUpRight, Check, Play, Pause, Volume2, VolumeX, Video } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const resolveMediaUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url;
  }
  return `/${url}`;
};

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { pauseMusicForVideo, resumeMusicAfterVideo } = useAudio();

  useEffect(() => {
    if (project?.videoUrl) {
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }
    setIsVideoPlaying(false);
  }, [project]);

  if (!project) return null;

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    pauseMusicForVideo();
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
    resumeMusicAfterVideo();
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    resumeMusicAfterVideo();
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (isVideoPlaying) {
      resumeMusicAfterVideo();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0A0A] border border-neutral-800 overflow-y-auto flex flex-col justify-between shadow-2xl">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-[#0A0A0A]/95 backdrop-blur border-b border-neutral-800 px-5 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono-code font-bold text-[#FF3E14]">{project.number}</span>
            <span className="text-xs font-mono-code text-neutral-400">/</span>
            <span className="text-xs font-mono-code text-neutral-300 uppercase truncate max-w-[150px] sm:max-w-none">{project.category}</span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 border border-neutral-800 hover:border-[#FF3E14] hover:text-[#FF3E14] text-neutral-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 space-y-8">

          {/* Main Media Player / Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950 border border-neutral-800 group">
            {project.videoUrl && showVideo ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  src={resolveMediaUrl(project.videoUrl)}
                  poster={project.image && !project.image.endsWith('.mp4') ? resolveMediaUrl(project.image) : undefined}
                  preload="metadata"
                  playsInline
                  muted={isMuted}
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  onEnded={handleVideoEnded}
                  className="w-full h-full object-cover"
                />

                {/* Big Center Play/Pause button */}
                <div
                  onClick={toggleVideoPlay}
                  className={`absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity ${isVideoPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                    }`}
                >
                  <div className="w-16 h-16 rounded-full bg-[#FF3E14] text-white flex items-center justify-center shadow-xl">
                    {isVideoPlaying ? <Pause size={26} /> : <Play size={26} className="ml-1 fill-current" />}
                  </div>
                </div>

                {/* Video controls bottom bar */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-white text-xs font-mono-code">
                  <div className="flex items-center space-x-3">
                    <button onClick={toggleVideoPlay} className="hover:text-[#FF3E14]">
                      {isVideoPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button onClick={toggleMute} className="hover:text-[#FF3E14]">
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <span className="text-[11px] text-neutral-400">
                      {isVideoPlaying ? 'PLAYING (BGM PAUSED)' : 'SHOWCASE VIDEO'}
                    </span>
                  </div>

                  <span className="text-[10px] bg-[#FF3E14] text-white px-2 py-0.5 font-bold uppercase">
                    SHOWCASE CUT
                  </span>
                </div>
              </div>
            ) : project.image && !project.image.endsWith('.mp4') ? (
              <img
                src={resolveMediaUrl(project.image)}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-600 font-mono-code text-xs">
                [ MEDIA PREVIEW ]
              </div>
            )}
          </div>

          {/* Title & Year */}
          <div className="space-y-3">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
                {project.title}
              </h2>
              <span className="text-sm font-mono-code font-bold text-[#FF3E14]">
                RELEASED: {project.year}
              </span>
            </div>

            <p className="text-xs sm:text-base font-mono-code text-neutral-300 leading-relaxed pt-2">
              {project.description}
            </p>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-neutral-900">
            {project.client && (
              <div className="space-y-1">
                <span className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-widest block">CLIENT</span>
                <p className="text-sm font-mono-code font-bold text-white uppercase">{project.client}</p>
              </div>
            )}

            <div className="space-y-1">
              <span className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-widest block">ROLE</span>
              <p className="text-sm font-mono-code font-bold text-white uppercase">DIRECTOR &amp; LEAD DESIGNER</p>
            </div>
          </div>

          {/* Deliverables */}
          {project.deliverables && (
            <div className="space-y-3 pt-4 border-t border-neutral-900">
              <span className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-widest block">DELIVERABLES &amp; SPECS</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.deliverables.map((item) => (
                  <div key={item} className="flex items-center space-x-2 text-xs font-mono-code text-neutral-300">
                    <Check size={14} className="text-[#FF3E14]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-[11px] font-mono-code text-neutral-500">LIMBASIYA KAVY ARCHIVE</span>
          <button
            onClick={handleClose}
            className="bg-[#FF3E14] text-black font-mono-code font-bold text-xs uppercase px-6 py-2.5 hover:bg-white transition-colors"
          >
            CLOSE CASE STUDY
          </button>
        </div>
      </div>
    </div>
  );
};
