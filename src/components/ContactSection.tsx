import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROFILE_CONFIG } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF3E14', '#FFFFFF', '#FF8A65']
      });
    }, 600);
  };

  return (
    <section id="contact" className="bg-black py-20 md:py-32 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* Top Meta Bar matching screenshot */}
        <div className="flex items-center justify-between text-xs font-mono-code tracking-widest text-neutral-400 select-none">
          <div>
            <span>[ </span>
            <span className="text-neutral-300">05 / CONTACT</span>
            <span> ]</span>
          </div>
          <div className="text-neutral-300">
            OPEN — FOR SELECT PROJECTS 2026
          </div>
        </div>

        {/* 2-Column Layout matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading & Contact Info */}
          <div className="lg:col-span-5 space-y-8 md:space-y-10">
            <div>
              <h2 className="text-6xl sm:text-7xl md:text-8xl font-black font-display tracking-tight uppercase leading-[0.9]">
                <span className="text-white block">LET'S </span>
                <span className="text-[#FF3E14] block">TALK.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base font-mono-code text-neutral-300 leading-relaxed max-w-md">
              Tell me about the brief, the deadline, and the fear. I read everything. No agencies, no crypto.
            </p>

            {/* Direct Contact Coordinates */}
            <div className="space-y-4 pt-4 text-xs sm:text-sm font-mono-code text-neutral-300">
              <a
                href={`mailto:${PROFILE_CONFIG.email}`}
                className="flex items-center space-x-3.5 hover:text-[#FF3E14] transition-colors py-1 group"
              >
                <Mail size={18} className="text-[#FF3E14] group-hover:scale-110 transition-transform" />
                <span className="tracking-wider">{PROFILE_CONFIG.email}</span>
              </a>

              <a
                href={`tel:${PROFILE_CONFIG.phone.replace(/\s+/g, '')}`}
                className="flex items-center space-x-3.5 hover:text-[#FF3E14] transition-colors py-1 group"
              >
                <Phone size={18} className="text-[#FF3E14] group-hover:scale-110 transition-transform" />
                <span className="tracking-wider">{PROFILE_CONFIG.phone}</span>
              </a>

              <div className="flex items-center space-x-3.5 text-neutral-400 py-1">
                <MapPin size={18} className="text-[#FF3E14]" />
                <span className="tracking-wider">{PROFILE_CONFIG.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form matching screenshot styling */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-[#0A0A0A] border border-[#FF3E14] p-8 sm:p-12 space-y-6 text-center">
                <div className="w-16 h-16 bg-[#FF3E14]/10 border border-[#FF3E14] rounded-full mx-auto flex items-center justify-center text-[#FF3E14]">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black font-display tracking-wider text-white uppercase">
                    SIGNAL TRANSMITTED
                  </h3>
                  <p className="text-xs sm:text-sm font-mono-code text-neutral-400">
                    Thank you {formData.name}. Your message has been received. I will reply within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="bg-neutral-900 border border-neutral-700 text-white font-mono-code text-xs px-6 py-2.5 uppercase hover:border-white transition-colors"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono-code text-neutral-400 tracking-widest uppercase block">
                    NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-neutral-800 focus:border-[#FF3E14] text-sm sm:text-base font-mono-code text-white py-2 focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono-code text-neutral-400 tracking-widest uppercase block">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-neutral-800 focus:border-[#FF3E14] text-sm sm:text-base font-mono-code text-white py-2 focus:outline-none transition-colors"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono-code text-neutral-400 tracking-widest uppercase block">
                    SUBJECT (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-transparent border-b border-neutral-800 focus:border-[#FF3E14] text-sm sm:text-base font-mono-code text-white py-2 focus:outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono-code text-neutral-400 tracking-widest uppercase block">
                    MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-neutral-800 focus:border-[#FF3E14] text-sm sm:text-base font-mono-code text-white py-2 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 bg-[#FF3E14] text-black font-mono-code font-bold text-xs uppercase px-8 py-4 hover:bg-white hover:text-black transition-all duration-200"
                  >
                    <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND SIGNAL'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
