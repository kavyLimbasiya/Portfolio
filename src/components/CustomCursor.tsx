import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverType, setHoverType] = useState<'none' | 'clickable' | 'media' | 'image'>('none');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const rippleIdCounter = useRef(0);

  // Direct mouse coordinate motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring-damped motion values for the trailing reticle
  const springConfig = { damping: 24, stiffness: 260, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate on non-touch pointer devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        if (target.closest('video, [data-cursor="media"], .media-preview')) {
          setHoverType('media');
        } else if (target.closest('img, [data-cursor="image"], .image-expand')) {
          setHoverType('image');
        } else if (target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-clickable="true"]')) {
          setHoverType('clickable');
        } else {
          setHoverType('none');
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      const newRipple = {
        id: ++rippleIdCounter.current,
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Clean up finished ripples after animation duration
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (!isVisible) return null;

  const isExpanded = hoverType !== 'none';

  return (
    <>
      {/* Click Expanding Shockwave Ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0.2, opacity: 0.8, borderWidth: '2px' }}
          animate={{ scale: 2.8, opacity: 0, borderWidth: '1px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="pointer-events-none fixed z-[9998] rounded-none border border-[#FF3E14] -translate-x-1/2 -translate-y-1/2 w-8 h-8 hidden md:block"
          style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
        />
      ))}

      {/* Trailing Animated Reticle Frame */}
      <motion.div
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center"
        style={{
          left: smoothX,
          top: smoothY,
        }}
      >
        <motion.div
          animate={{
            width: hoverType === 'media' || hoverType === 'image' ? 52 : isExpanded ? 36 : 20,
            height: hoverType === 'media' || hoverType === 'image' ? 52 : isExpanded ? 36 : 20,
            rotate: isExpanded ? 45 : 0,
            scale: isMouseDown ? 0.8 : 1,
            borderColor: isExpanded ? '#FF3E14' : 'rgba(255, 255, 255, 0.75)',
            backgroundColor: isExpanded ? 'rgba(255, 62, 20, 0.12)' : 'rgba(255, 255, 255, 0.02)',
          }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 24,
            mass: 0.3,
          }}
          className="relative border backdrop-blur-[1px] flex items-center justify-center transition-colors"
        >
          {/* 4 Animated Precision Corner Markers */}
          <motion.span
            animate={{ opacity: isExpanded ? 1 : 0.4 }}
            className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-[#FF3E14]"
          />
          <motion.span
            animate={{ opacity: isExpanded ? 1 : 0.4 }}
            className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r border-[#FF3E14]"
          />
          <motion.span
            animate={{ opacity: isExpanded ? 1 : 0.4 }}
            className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l border-[#FF3E14]"
          />
          <motion.span
            animate={{ opacity: isExpanded ? 1 : 0.4 }}
            className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-[#FF3E14]"
          />

          {/* Hover Label for Media & Images */}
          {hoverType === 'media' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, rotate: -45 }}
              exit={{ opacity: 0 }}
              className="text-[8px] font-mono-code font-bold text-[#FF3E14] tracking-widest uppercase select-none"
            >
              PLAY
            </motion.span>
          )}

          {hoverType === 'image' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, rotate: -45 }}
              exit={{ opacity: 0 }}
              className="text-[8px] font-mono-code font-bold text-white tracking-widest uppercase select-none"
            >
              VIEW
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Immediate Sharp Precision Center Dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: mouseX,
          top: mouseY,
        }}
      >
        <motion.div
          animate={{
            scale: isMouseDown ? 1.6 : isExpanded ? 0 : 1,
            backgroundColor: isExpanded ? '#FF3E14' : '#FFFFFF',
          }}
          transition={{ duration: 0.1 }}
          className="w-1.5 h-1.5"
        />
      </motion.div>
    </>
  );
};
