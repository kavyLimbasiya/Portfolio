import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Target, Shield, Eye } from 'lucide-react';

interface InteractivePortraitProps {
  normalImage?: string;
  scannerImage?: string;
  normalLabel?: string;
  scannerLabel?: string;
  className?: string;
}

export const InteractivePortrait: React.FC<InteractivePortraitProps> = ({
  normalImage = '/assets/myimage.jpg',
  scannerImage = '/assets/spiderman.jpg',
  normalLabel = 'NORMAL: PORTRAIT',
  scannerLabel = 'SCANNER: REVEAL',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTouchActive, setIsTouchActive] = useState<boolean>(false);

  // Position coordinates in percentage (0 to 100)
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [lensSize, setLensSize] = useState<number>(190);

  // Fallback state if asset path fails
  const [normalSrc, setNormalSrc] = useState(normalImage);
  const [scannerSrc, setScannerSrc] = useState(scannerImage);

  useEffect(() => {
    if (normalImage) setNormalSrc(normalImage);
  }, [normalImage]);

  useEffect(() => {
    if (scannerImage) setScannerSrc(scannerImage);
  }, [scannerImage]);

  // Smooth lerp animation loop
  const animFrameRef = useRef<number | null>(null);

  const updatePosition = useCallback(() => {
    setCurrentPos((prev) => {
      const dx = targetPos.x - prev.x;
      const dy = targetPos.y - prev.y;
      // Damped spring factor for ultra smooth gliding
      const factor = isHovered || isTouchActive ? 0.14 : 0.04;
      return {
        x: prev.x + dx * factor,
        y: prev.y + dy * factor,
      };
    });

    animFrameRef.current = requestAnimationFrame(updatePosition);
  }, [targetPos, isHovered, isTouchActive]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(updatePosition);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [updatePosition]);

  // Idle gentle float when not hovered
  useEffect(() => {
    if (!isHovered && !isTouchActive) {
      const interval = setInterval(() => {
        const time = Date.now() * 0.001;
        setTargetPos({
          x: 50 + Math.sin(time * 0.8) * 16,
          y: 45 + Math.cos(time * 0.6) * 14,
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHovered, isTouchActive]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setTargetPos({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100));
    setTargetPos({ x, y });
  };

  const radius = isHovered || isTouchActive ? lensSize / 2 : 80;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        setIsHovered(true);
        setLensSize(200);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsTouchActive(true)}
      onTouchEnd={() => setIsTouchActive(false)}
      onTouchMove={handleTouchMove}
      className={`relative aspect-[4/5] w-full max-w-md mx-auto bg-neutral-950 border border-neutral-800 overflow-hidden select-none cursor-crosshair group ${className}`}
    >
      {/* 1. BASE LAYER: Normal Image in full original color */}
      <img
        src={normalSrc}
        alt="Normal Portrait"
        referrerPolicy="no-referrer"
        onError={() => {
          if (normalSrc !== '/assets/profile.jpg') {
            setNormalSrc('/assets/profile.jpg');
          }
        }}
        className="w-full h-full object-cover object-center transition-transform duration-700"
        loading="eager"
      />

      {/* Subtle ambient border shading */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10"></div>

      {/* 2. REVEAL LAYER: Spider-Man Image clipped strictly to cursor lens scanner */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          clipPath: `circle(${radius}px at ${currentPos.x}% ${currentPos.y}%)`,
          WebkitClipPath: `circle(${radius}px at ${currentPos.x}% ${currentPos.y}%)`,
        }}
      >
        {/* Scanner reveal of Spider-Man */}
        <img
          src={scannerSrc}
          alt="Spider-Man Scanner Reveal"
          referrerPolicy="no-referrer"
          onError={() => {
            if (scannerSrc !== '/assets/spiderman.jpg') {
              setScannerSrc('/assets/spiderman.jpg');
            }
          }}
          className="w-full h-full object-cover object-center transform scale-105 brightness-110 contrast-110"
        />

        {/* Subtle red tech-glow grading wash inside lens */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF3E14]/25 via-transparent to-red-500/10 mix-blend-overlay"></div>
      </div>

      {/* 3. OPTICAL SCANNER RETICLE & HUD TRACKING CURSOR */}
      <div
        className="absolute pointer-events-none transition-transform duration-75 ease-out"
        style={{
          left: `${currentPos.x}%`,
          top: `${currentPos.y}%`,
          transform: 'translate(-50%, -50%)',
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
        }}
      >
        {/* Lens Border Ring */}
        <div className={`w-full h-full rounded-full border-2 transition-all duration-300 relative ${isHovered || isTouchActive
          ? 'border-[#FF3E14] shadow-[0_0_25px_rgba(255,62,20,0.6)] ring-1 ring-[#FF3E14]/30'
          : 'border-white/50 border-dashed opacity-60'
          }`}>

          {/* Target Crosshairs in Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-[1px] bg-[#FF3E14]"></div>
            <div className="h-4 w-[1px] bg-[#FF3E14] absolute"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF3E14] absolute animate-ping"></div>
          </div>

          {/* 4 Precision Corner Brackets around lens */}
          <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-white"></div>
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-white"></div>
          <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-white"></div>
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-white"></div>

          {/* Dynamic Telemetry Badge attached to lens */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/90 border border-[#FF3E14] px-2 py-0.5 whitespace-nowrap flex items-center gap-1.5 text-[9px] font-mono-code font-bold text-white shadow-lg">
            <span className="w-1.5 h-1.5 bg-[#FF3E14] animate-pulse"></span>
            <span>SCANNER // X:{Math.round(currentPos.x)}% Y:{Math.round(currentPos.y)}%</span>
          </div>

          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/90 px-2 py-0.5 text-[8px] font-mono-code text-[#FF3E14] tracking-widest uppercase border border-neutral-800 whitespace-nowrap">
            {scannerLabel}
          </div>
        </div>
      </div>

      {/* Top Header Tag */}
      <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
        <span className="text-[10px] font-mono-code font-bold tracking-widest text-neutral-300 uppercase bg-black/90 px-3 py-1 border border-neutral-800 flex items-center gap-1.5">
          <Target size={11} className="text-[#FF3E14]" />
          LIMBASIYA KAVY · 2026
        </span>
      </div>

      {/* Top Right Live Cursor Guide */}
      <div className="absolute top-3 right-3 z-20">
        <span className={`text-[9px] font-mono-code tracking-widest uppercase px-2.5 py-1 border transition-colors ${isHovered ? 'bg-[#FF3E14] text-white border-[#FF3E14]' : 'bg-black/80 text-neutral-400 border-neutral-800'
          }`}>
          {isHovered ? 'SCANNER ACTIVE' : 'MOVE CURSOR TO SCAN'}
        </span>
      </div>

      {/* Bottom telemetry overlay */}
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-[10px] font-mono-code text-neutral-400 z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#FF3E14]"></span>
          <span className="text-white font-bold">{normalLabel}</span>
        </div>
        <span className="text-neutral-400 font-mono-code">{scannerLabel}</span>
      </div>
    </div>
  );
};
