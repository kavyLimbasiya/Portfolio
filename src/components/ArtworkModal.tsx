import React from 'react';
import { PersonalWork } from '../data/portfolioData';
import { X, Palette } from 'lucide-react';

interface ArtworkModalProps {
  work: PersonalWork | null;
  onClose: () => void;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({ work, onClose }) => {
  if (!work) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0A0A] border border-neutral-800 shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette size={16} className="text-[#FF3E14]" />
            <span className="text-xs font-mono-code font-bold text-white tracking-wider uppercase">
              SKETCHBOOK LIGHTBOX — {work.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 border border-neutral-800 hover:border-[#FF3E14] hover:text-[#FF3E14] text-neutral-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Artwork Image Container */}
        <div className="relative flex-1 max-h-[65vh] p-6 flex items-center justify-center bg-black overflow-hidden">
          <img
            src={work.image}
            alt={work.title}
            className="max-w-full max-h-[60vh] object-contain border border-neutral-900 shadow-lg"
          />
        </div>

        {/* Info Footer */}
        <div className="p-6 bg-[#0A0A0A] border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-code">
          <div className="space-y-1">
            <h4 className="text-base font-black font-display text-white uppercase">{work.title}</h4>
            <p className="text-neutral-400">{work.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#FF3E14] font-bold uppercase">{work.medium} · {work.size}</span>
            <button
              onClick={onClose}
              className="bg-[#FF3E14] text-black font-bold uppercase px-5 py-2 hover:bg-white transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
