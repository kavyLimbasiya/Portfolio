import React, { useEffect, useRef, useState } from 'react';
import { ShowcaseItem } from '../data/portfolioData';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film, Image as ImageIcon, Layers, Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '../context/AudioContext';

interface ShowcaseModalProps {
  item: ShowcaseItem | null;
  onClose: () => void;
}

const resolveUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('/') || url.startsWith('data:')) return url;
  return `/${url}`;
};

export const ShowcaseModal: React.FC<ShowcaseModalProps> = ({ item, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { pauseMusicForVideo, resumeMusicAfterVideo } = useAudio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      if (item.isVideo) {
        pauseMusicForVideo();
      }
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
      if (item?.isVideo) {
        resumeMusicAfterVideo();
      }
    };
  }, [item, onClose, pauseMusicForVideo, resumeMusicAfterVideo]);

  useEffect(() => {
    setIsPlaying(true);
    setIsMuted(false);
    if (item?.isVideo && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        // Fallback in case browser blocks unmuted immediate autoplay
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => { });
        }
      });
    }
  }, [item]);

  if (!item) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      pauseMusicForVideo();
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/90 backdrop-blur-xl">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-crosshair"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-6xl max-h-[92vh] bg-[#0A0A0A] border border-neutral-800 flex flex-col z-10 overflow-hidden shadow-2xl"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-neutral-900 bg-black">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#FF3E14] animate-pulse"></span>
              <span className="text-[11px] font-mono-code font-bold text-white tracking-widest uppercase">
                {item.isVideo ? 'CINEMATIC VIDEO THEATER' : 'HIGH-RES STILL INSPECTOR'}
              </span>
              <span className="text-[11px] font-mono-code text-neutral-500 uppercase hidden sm:inline">
                · {item.resolution || '4K ULTRA'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="text-xs font-mono-code text-neutral-400 hover:text-white px-3 py-1.5 border border-neutral-800 hover:border-neutral-700 bg-neutral-950 flex items-center gap-1.5 transition-colors"
                title="Copy Link"
              >
                {copied ? <Check size={13} className="text-[#FF3E14]" /> : <Share2 size={13} />}
                <span className="hidden sm:inline">{copied ? 'COPIED' : 'SHARE'}</span>
              </button>

              <button
                onClick={onClose}
                className="text-white hover:text-[#FF3E14] p-1.5 border border-neutral-800 hover:border-neutral-700 bg-neutral-950 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Media Canvas Area */}
            <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden border-b border-neutral-900">
              {item.isVideo ? (
                <>
                  <video
                    ref={videoRef}
                    src={resolveUrl(item.mediaUrl)}
                    poster={item.thumbnail ? resolveUrl(item.thumbnail) : undefined}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-contain"
                  />
                  {/* Floating Video Controls */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/80 backdrop-blur-md border border-neutral-800 flex items-center justify-between text-xs font-mono-code z-20">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="bg-[#FF3E14] text-black p-2 hover:bg-white transition-colors"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="text-neutral-300 hover:text-white p-2 border border-neutral-800 bg-neutral-900 transition-colors"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                      </button>
                      <span className="text-neutral-400 text-[11px]">
                        {item.duration || '0:45'} · {item.resolution || '4K 60FPS'}
                      </span>
                    </div>

                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider hidden sm:block">
                      AUTONOMOUS MOTION STREAM
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <img
                    src={resolveUrl(item.thumbnail || item.mediaUrl)}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Detailed Metadata Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <span className="text-xs font-mono-code text-[#FF3E14] font-bold tracking-widest uppercase">
                    {item.tag} // {item.year}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white uppercase tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {item.client && (
                  <div className="text-right font-mono-code">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">CLIENT / ORIGIN</span>
                    <span className="text-xs text-white font-bold uppercase">{item.client}</span>
                  </div>
                )}
              </div>

              <p className="text-sm sm:text-base font-mono-code text-neutral-300 leading-relaxed max-w-3xl">
                {item.description}
              </p>

              {/* Technical Specifications Breakdown */}
              {item.software && item.software.length > 0 && (
                <div className="pt-6 border-t border-neutral-900">
                  <span className="text-[11px] font-mono-code text-neutral-500 uppercase tracking-widest block mb-3">
                    TOOLS &amp; PIPELINE
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.software.map((sw, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono-code bg-neutral-900 border border-neutral-800 text-neutral-300 px-3 py-1 uppercase"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
