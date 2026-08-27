import React, { useState } from 'react';
import { ShowcaseItem, SHOWCASE_ITEMS } from '../data/portfolioData';
import { Play, ZoomIn, Film, Image as ImageIcon, Plus, Sparkles, Video, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShowcaseSectionProps {
  onSelectMedia: (item: ShowcaseItem) => void;
}

const resolveUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('/') || url.startsWith('data:')) return url;
  return `/${url}`;
};

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ onSelectMedia }) => {
  const [items, setItems] = useState<ShowcaseItem[]>(SHOWCASE_ITEMS);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // Custom Media Ingest Form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newType, setNewType] = useState<'video' | 'still'>('video');
  const [newTag, setNewTag] = useState('CUSTOM MEDIA');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    const isVid = newType === 'video';
    const newItem: ShowcaseItem = {
      id: `custom-${Date.now()}`,
      title: newTitle.toUpperCase(),
      category: isVid ? 'video' : 'still',
      tag: newTag.toUpperCase() || 'CUSTOM MEDIA',
      year: '2026',
      thumbnail: isVid ? 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop' : newUrl,
      mediaUrl: newUrl,
      isVideo: isVid,
      duration: isVid ? 'CUSTOM' : undefined,
      resolution: 'HIGH-RES',
      software: ['Custom Ingest'],
      client: 'User Upload',
      description: `Custom ${isVid ? 'video file' : 'high-res image'} embedded into portfolio showcase vault.`
    };

    setItems([newItem, ...items]);
    setNewTitle('');
    setNewUrl('');
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setShowAddForm(false);
    }, 1500);
  };

  return (
    <section id="showcase" className="bg-[#050505] py-20 md:py-28 border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">

        {/* Top Section Meta Bar */}
        <div className="flex items-center justify-between text-xs font-mono-code tracking-widest text-neutral-400 select-none">
          <div>
            <span>[ </span>
            <span className="text-[#FF3E14] font-bold">10 / SHOWCASE</span>
            <span> ]</span>
          </div>
          <div className="text-neutral-300 uppercase">
            VIDEOS &amp; STILLS VAULT · {items.length} ITEMS
          </div>
        </div>

        {/* Headline & Action Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight uppercase leading-[0.88]">
              <span className="text-white block">MOTION &amp;</span>
              <span className="text-[#FF3E14] block">STILLS.</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono-code text-neutral-400 leading-relaxed pt-2">
              Curated kinetic sequences, high-framerate commercial cuts, 3D texturing renders and high-resolution stills.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className={`px-4 py-2 text-xs font-mono-code uppercase font-bold border transition-colors flex items-center gap-1.5 ${showAddForm
                ? 'bg-neutral-900 text-white border-neutral-700'
                : 'bg-black text-[#FF3E14] border-[#FF3E14]/60 hover:bg-[#FF3E14] hover:text-black'
                }`}
            >
              <Plus size={14} className={showAddForm ? 'rotate-45 transition-transform' : ''} />
              <span>{showAddForm ? 'CLOSE INGEST' : 'ADD MEDIA'}</span>
            </button>
          </div>
        </div>

        {/* Quick Add Custom Media Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <form
                onSubmit={handleAddMedia}
                className="bg-[#0A0A0A] border border-[#FF3E14]/40 p-6 sm:p-8 space-y-5"
              >
                <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-white">
                    <Sparkles size={14} className="text-[#FF3E14]" />
                    <span className="font-bold uppercase tracking-wider">DIRECT SHOWCASE INGESTION</span>
                  </div>
                  <span className="text-[10px] font-mono-code text-neutral-400 uppercase">
                    EMBED VIDEO OR IMAGE LINK
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono-code">
                  <div className="space-y-1.5">
                    <label className="text-neutral-400 block uppercase">MEDIA TITLE</label>
                    <input
                      type="text"
                      placeholder="e.g. CYBERPUNK 2026 CUT"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full bg-black border border-neutral-800 focus:border-[#FF3E14] px-3.5 py-2.5 text-white outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-400 block uppercase">MEDIA TYPE</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as 'video' | 'still')}
                      className="w-full bg-black border border-neutral-800 focus:border-[#FF3E14] px-3.5 py-2.5 text-white outline-none cursor-pointer"
                    >
                      <option value="video">VIDEO (.MP4 / STREAM)</option>
                      <option value="still">STILL IMAGE (.JPG / .PNG)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-400 block uppercase">CATEGORY TAG</label>
                    <input
                      type="text"
                      placeholder="e.g. COMMERCIAL REEL"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full bg-black border border-neutral-800 focus:border-[#FF3E14] px-3.5 py-2.5 text-white outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-400 block uppercase">DIRECT URL</label>
                    <input
                      type="url"
                      placeholder="https://.../video.mp4 or image.jpg"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      required
                      className="w-full bg-black border border-neutral-800 focus:border-[#FF3E14] px-3.5 py-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono-code text-neutral-400">
                    Supports direct MP4 links, Unsplash images, or hosted visual assets.
                  </span>
                  <button
                    type="submit"
                    className="bg-[#FF3E14] text-black font-mono-code font-bold text-xs uppercase px-6 py-2.5 hover:bg-white transition-colors flex items-center gap-1.5"
                  >
                    {formSuccess ? <Check size={14} /> : <Plus size={14} />}
                    <span>{formSuccess ? 'ADDED TO VAULT!' : 'INSERT INTO SHOWCASE'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Media Showcase Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance]">
          {items.map((item, idx) => {
            const isHovered = hoveredItemId === item.id;

            // Dynamic aspect ratio according to content archetype
            let aspectClass = 'aspect-[16/10]';
            if (item.aspectRatio === 'tall') aspectClass = 'aspect-[3/4]';
            else if (item.aspectRatio === 'portrait') aspectClass = 'aspect-[9/14]';
            else if (item.aspectRatio === 'square') aspectClass = 'aspect-square';
            else if (item.aspectRatio === 'wide') aspectClass = 'aspect-[16/9]';
            else if (!item.isVideo) aspectClass = 'aspect-[4/5]';

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: (idx % 4) * 0.06 }}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                onClick={() => onSelectMedia(item)}
                className="break-inside-avoid mb-6 group relative bg-[#0A0A0A] border border-neutral-900 overflow-hidden cursor-pointer hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
                data-cursor={item.isVideo ? 'media' : 'image'}
              >
                {/* Media Thumbnail / Video Container */}
                <div className={`relative ${aspectClass} w-full overflow-hidden bg-black`}>
                  {item.isVideo ? (
                    <>
                      {/* Active Video Preview or Poster */}
                      <video
                        src={resolveUrl(item.mediaUrl)}
                        poster={item.thumbnail ? resolveUrl(item.thumbnail) : undefined}
                        muted
                        loop
                        playsInline
                        autoPlay={isHovered}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Video Indicator Stamp */}
                      <div className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur-sm border border-neutral-800 px-2 py-1 flex items-center gap-1.5 text-[10px] font-mono-code text-white">
                        <Film size={11} className="text-[#FF3E14]" />
                        <span>{item.duration || 'VIDEO'}</span>
                      </div>

                      {/* Floating Play Button */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                        <span className="w-12 h-12 rounded-none bg-[#FF3E14] text-black flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          <Play size={18} fill="currentColor" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={resolveUrl(item.thumbnail || item.mediaUrl)}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to neutral dark display if image path isn't loaded yet
                          const target = e.currentTarget;
                          target.style.opacity = '0.3';
                        }}
                      />
                      {/* Still / 3D Tag */}
                      <div className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur-sm border border-neutral-800 px-2 py-1 flex items-center gap-1.5 text-[10px] font-mono-code text-white">
                        <ImageIcon size={11} className="text-neutral-400" />
                        <span>{item.resolution || (item.category === '3d' ? '3D RENDER' : 'STILL')}</span>
                      </div>

                      {/* Expand Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                        <span className="bg-white text-black font-mono-code font-bold text-[11px] px-3 py-1.5 flex items-center gap-1.5 uppercase">
                          <ZoomIn size={12} />
                          INSPECT
                        </span>
                      </div>
                    </>
                  )}

                  {/* High-Tech Corner Bracket Accents */}
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/40 pointer-events-none"></div>
                  <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/40 pointer-events-none"></div>
                </div>

                {/* Footer Metadata Specs */}
                <div className="p-4 bg-[#0A0A0A] border-t border-neutral-900 flex flex-col justify-between flex-1 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono-code">
                    <span className="text-[#FF3E14] font-bold uppercase tracking-wider">{item.tag}</span>
                    <span className="text-neutral-400">{item.year}</span>
                  </div>

                  <h3 className="text-sm font-mono-code font-bold text-white uppercase tracking-wider line-clamp-2 group-hover:text-[#FF3E14] transition-colors">
                    {item.title}
                  </h3>

                  {item.software && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.software.slice(0, 3).map((sw, i) => (
                        <span key={i} className="text-[9px] font-mono-code text-neutral-400 bg-neutral-900/90 px-1.5 py-0.5">
                          {sw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
