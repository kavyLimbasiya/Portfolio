import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useAudio } from '../context/AudioContext';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const { toggleMusic, isPlaying } = useAudio();
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const hasFinishedRef = useRef(false);

  const finish = () => {
    if (!hasFinishedRef.current) {
      hasFinishedRef.current = true;
      if (!isPlaying) {
        toggleMusic();
      }
      onCompleteRef.current();
    }
  };

  const statusMessages = [
    'INITIALIZING SYSTEM CORES...',
    'COMPILING 3D WIREFRAME MESHES...',
    'BUFFERING KINETIC MEDIA & TEXTURES...',
    'CALIBRATING OPTICAL RETICLE SENSORS...',
    'LIMBASIYA KAVY READY'
  ];

  useEffect(() => {
    // Fail-safe maximum timeout of 1.4s
    const fallbackTimer = setTimeout(() => {
      finish();
    }, 1400);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(finish, 200);
          return 100;
        }
        const increment = prev < 30 ? 6 : prev < 70 ? 12 : prev < 90 ? 8 : 6;
        const next = Math.min(100, prev + increment);

        if (next > 85) setStatusIndex(4);
        else if (next > 65) setStatusIndex(3);
        else if (next > 40) setStatusIndex(2);
        else if (next > 15) setStatusIndex(1);

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(finish, 200);
        }
        return next;
      });
    }, 35);

    return () => {
      clearInterval(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
      }}
      onClick={finish}
      className="fixed inset-0 z-[99999] bg-black text-white flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden cursor-pointer"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Top Header Information */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono-code tracking-widest text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#FF3E14] animate-pulse"></span>
          <span className="text-white font-bold tracking-wider">LIMBASIYA KAVY / SYSTEM BOOT</span>
        </div>
        <div className="text-neutral-400">
          BUILD 2026.08 // V7.4
        </div>
      </div>

      {/* Center Giant Counter & Status Block */}
      <div className="relative z-10 max-w-2xl mx-auto w-full text-center space-y-6">
        {/* Brand Mark */}
        <div className="space-y-1">
          <span className="text-xs font-mono-code tracking-[0.3em] text-[#FF3E14] uppercase">
            LIMBASIYA KAVY · PORTFOLIO NO. 07
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight uppercase text-white">
            INITIALIZING
          </h1>
        </div>

        {/* Huge Custom Font Counter */}
        <div className="text-7xl sm:text-8xl md:text-9xl font-loader-custom font-bold tracking-tighter text-white">
          <span>{progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : progress}</span>
          <span className="text-[#FF3E14] text-5xl sm:text-6xl md:text-7xl ml-1">%</span>
        </div>

        {/* Real-time Status Message */}
        <div className="h-6">
          <motion.p
            key={statusIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs sm:text-sm font-mono-code text-neutral-300 tracking-wider uppercase"
          >
            &gt; {statusMessages[statusIndex]}
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-900 h-1.5 overflow-hidden relative border border-neutral-800">
          <motion.div
            className="h-full bg-[#FF3E14]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </div>

      {/* Bottom Coordinates & Specs */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono-code text-neutral-400">
        <span className="hidden sm:inline">RAJKOT — INDIA — GLOBAL</span>
        <span>EST. 2016 — MOTION &amp; IDENTITY</span>
        <span className="text-neutral-400">CLICK TO ENTER</span>
      </div>
    </motion.div>
  );
};
