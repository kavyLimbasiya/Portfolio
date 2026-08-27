import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Disc, Sliders, ChevronDown, ChevronUp, Music, AlertCircle } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const AudioPlayerHUD: React.FC = () => {
  const {
    isPlaying,
    isMuted,
    volume,
    currentTrackTitle,
    isPausedByVideo,
    audioError,
    toggleMusic,
    toggleMute,
    setVolume,
  } = useAudio();
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-40 select-none">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-black/90 border border-neutral-700 hover:border-[#FF3E14] text-white p-2.5 shadow-2xl flex items-center gap-2 backdrop-blur-md group"
          title="Expand Studio Audio Player"
        >
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3 w-3">
              <span className="w-[2px] bg-[#FF3E14] animate-[bounce_0.6s_infinite_ease-in-out_0.1s] h-full"></span>
              <span className="w-[2px] bg-[#FF3E14] animate-[bounce_0.8s_infinite_ease-in-out_0.3s] h-2/3"></span>
              <span className="w-[2px] bg-[#FF3E14] animate-[bounce_0.5s_infinite_ease-in-out_0.2s] h-4/5"></span>
            </div>
          ) : (
            <Music size={14} className="text-[#FF3E14]" />
          )}
          <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-neutral-300">AUDIO</span>
          <ChevronUp size={12} className="text-neutral-500 group-hover:text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 sm:bottom-5 left-4 sm:left-5 z-40 select-none max-w-[calc(100vw-2rem)]">
      <div className="relative group bg-[#0A0A0A]/95 border border-neutral-800 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2.5 sm:gap-3 shadow-2xl transition-all hover:border-neutral-600">
        
        {/* Animated Equalizer or Spinning Disc / Play button */}
        <button
          onClick={toggleMusic}
          className="relative w-8 h-8 rounded-none bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white hover:bg-[#FF3E14] hover:border-[#FF3E14] hover:text-black transition-colors shrink-0"
          title={isPlaying ? 'Pause Background Track' : 'Play Background Track'}
        >
          {isPlaying ? (
            <div className="flex items-end justify-center gap-[2px] h-3.5 w-3.5">
              <span className="w-[2px] bg-white group-hover:bg-black animate-[bounce_0.6s_infinite_ease-in-out_0.1s] h-full"></span>
              <span className="w-[2px] bg-white group-hover:bg-black animate-[bounce_0.8s_infinite_ease-in-out_0.3s] h-2/3"></span>
              <span className="w-[2px] bg-white group-hover:bg-black animate-[bounce_0.5s_infinite_ease-in-out_0.2s] h-4/5"></span>
              <span className="w-[2px] bg-white group-hover:bg-black animate-[bounce_0.7s_infinite_ease-in-out_0.4s] h-1/2"></span>
            </div>
          ) : isPausedByVideo ? (
            <Disc size={15} className="text-[#FF3E14] animate-spin" />
          ) : (
            <Play size={13} className="ml-0.5 fill-current" />
          )}
        </button>

        {/* Track Title & Video Pause Notification */}
        <div className="flex flex-col cursor-pointer min-w-0" onClick={toggleMusic}>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isPlaying ? 'bg-[#FF3E14] animate-ping' : isPausedByVideo ? 'bg-amber-400' : 'bg-neutral-600'}`}></span>
            <span className="text-[9px] sm:text-[10px] font-mono-code font-bold uppercase tracking-wider text-neutral-200 truncate">
              {isPlaying ? 'AUDIO ON' : isPausedByVideo ? 'PAUSED FOR VIDEO' : 'AUDIO OFF'}
            </span>
            {audioError && (
              <span className="text-[8px] font-mono-code text-amber-400 bg-amber-950/60 px-1 border border-amber-800/60 flex items-center gap-1">
                <AlertCircle size={9} />
                SYNTH
              </span>
            )}
          </div>
          <span className="text-[8px] sm:text-[9px] font-mono-code text-neutral-400 max-w-[120px] sm:max-w-[180px] truncate">
            {isPausedByVideo ? 'Auto-resumes after video' : currentTrackTitle}
          </span>
        </div>

        {/* Volume controls & Minimize */}
        <div className="flex items-center gap-1 pl-1.5 border-l border-neutral-800 shrink-0">
          <button
            onClick={toggleMute}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? <VolumeX size={14} className="text-[#FF3E14]" /> : <Volume2 size={14} />}
          </button>

          <button
            onClick={() => setShowSlider(!showSlider)}
            className={`p-1 transition-colors ${showSlider ? 'text-[#FF3E14]' : 'text-neutral-400 hover:text-white'}`}
            title="Adjust volume"
          >
            <Sliders size={13} />
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 text-neutral-500 hover:text-white transition-colors ml-0.5"
            title="Minimize audio HUD"
          >
            <ChevronDown size={13} />
          </button>
        </div>

        {/* Floating Volume Slider popup */}
        {showSlider && (
          <div className="absolute bottom-full left-0 mb-2 p-3 bg-black border border-neutral-800 shadow-xl w-40 animate-fadeIn z-50">
            <div className="flex justify-between text-[10px] font-mono-code text-neutral-400 mb-1.5">
              <span>MASTER VOL</span>
              <span className="text-white font-bold">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1 bg-neutral-800 accent-[#FF3E14] cursor-pointer"
            />
          </div>
        )}

      </div>
    </div>
  );
};
