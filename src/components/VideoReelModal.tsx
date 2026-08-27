import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

interface VideoReelModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
}

export const VideoReelModal: React.FC<VideoReelModalProps> = ({
  isOpen,
  onClose,
  videoSrc = 'https://assets.mixkit.co/videos/preview/mixkit-glitch-digital-animation-41484-large.mp4',
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { pauseMusicForVideo, resumeMusicAfterVideo } = useAudio();

  useEffect(() => {
    if (isOpen) {
      // Pause background music immediately when video modal opens
      pauseMusicForVideo();
      setIsPlaying(true);
    } else {
      // Resume background music when modal is closed
      resumeMusicAfterVideo();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVideoPlay = () => {
    setIsPlaying(true);
    pauseMusicForVideo();
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    resumeMusicAfterVideo();
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    // Song continues right where it was paused!
    resumeMusicAfterVideo();
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
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
    resumeMusicAfterVideo();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#0A0A0A] border border-neutral-800 overflow-hidden shadow-2xl">
        {/* Header Bar */}
        <div className="bg-neutral-950 border-b border-neutral-800 px-5 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-[#FF3E14] animate-pulse"></span>
            <span className="text-xs font-mono-code font-bold text-white tracking-widest uppercase truncate max-w-[200px] sm:max-w-none">
              MOTION REEL 2026 — 4K MASTER CUT
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 border border-neutral-800 hover:border-[#FF3E14] hover:text-[#FF3E14] text-neutral-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video w-full bg-black group overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            poster="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop"
            autoPlay
            playsInline
            muted={isMuted}
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover"
          />

          {/* Center Play/Pause button on hover */}
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-[#FF3E14] text-white flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform shadow-xl">
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1 fill-current" />}
            </div>
          </div>

          {/* On-screen controls bar */}
          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black via-black/70 to-transparent flex items-center justify-between text-white text-xs font-mono-code">
            <div className="flex items-center space-x-4">
              <button onClick={togglePlay} className="hover:text-[#FF3E14] transition-colors">
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button onClick={toggleMute} className="hover:text-[#FF3E14] transition-colors">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <span className="text-neutral-400 text-[11px] sm:text-xs">4K AUDIO-SYNC MASTER</span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 text-neutral-400">
              <span className="text-[9px] sm:text-[10px] bg-neutral-900 border border-neutral-700 px-2 py-0.5 uppercase">4K 60FPS</span>
              <span className="text-[9px] sm:text-[10px] bg-[#FF3E14] text-white font-bold px-2 py-0.5 uppercase">PRORES HQ</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 sm:p-6 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-code text-neutral-400">
          <span className="text-[11px] sm:text-xs text-center sm:text-left">
            BACKGROUND SONG AUTOMATICALLY PAUSED · RESUMES ON CLOSE
          </span>
          <button
            onClick={handleClose}
            className="bg-[#FF3E14] text-black font-bold uppercase px-6 py-2 hover:bg-white transition-colors w-full sm:w-auto text-center"
          >
            CLOSE PLAYER
          </button>
        </div>
      </div>
    </div>
  );
};
