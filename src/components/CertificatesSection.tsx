import React from 'react';
import { Certificate, CERTIFICATES } from '../data/portfolioData';
import { Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface CertificatesSectionProps {
  onSelectCertificate: (cert: Certificate) => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ onSelectCertificate }) => {
  return (
    <section id="certs" className="bg-black py-20 md:py-28 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* Top Meta Bar matching screenshot */}
        <div className="flex items-center justify-between text-xs font-mono-code tracking-widest text-neutral-400 select-none">
          <div>
            <span>[ </span>
            <span className="text-neutral-300">07 / CREDENTIALS</span>
            <span> ]</span>
          </div>
          <div className="text-neutral-300">
            03 CERTIFICATES
          </div>
        </div>

        {/* Section Headline matching screenshot */}
        <div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight uppercase leading-[0.9]">
            <span className="text-white">RECEIPTS </span>
            <span className="text-[#FF3E14]">&amp; PROOF.</span>
          </h2>
        </div>

        {/* 3 Certificate Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CERTIFICATES.map((cert) => {
            return (
              <div
                key={cert.id}
                onClick={() => onSelectCertificate(cert)}
                className="group bg-[#0A0A0A] border border-neutral-900 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-neutral-700 transition-all duration-300"
              >
                {/* Upper Certificate Visual Box */}
                <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-neutral-950 via-[#100604] to-neutral-950 border-b border-neutral-900 overflow-hidden group">
                  {cert.image ? (
                    <div className="w-full h-full relative">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        onError={(e) => {
                          // If local image fails to load, gracefully show fallback
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      {/* Dark gradient overlay for typography readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"></div>

                      {/* Hidden fallback if image fails to load */}
                      <div className="w-full h-full hidden flex-col items-center justify-center p-6 bg-gradient-to-br from-neutral-950 via-[#100604] to-neutral-950">
                        <div className="w-12 h-12 rounded-full bg-black/60 border border-[#FF3E14]/40 flex items-center justify-center text-[#FF3E14] mb-2">
                          <Award size={26} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-mono-code tracking-widest text-neutral-400 uppercase">
                          {cert.title}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6">
                      <div className="w-12 h-12 rounded-full bg-black/60 border border-[#FF3E14]/40 flex items-center justify-center text-[#FF3E14] mb-2">
                        <Award size={26} strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-mono-code tracking-widest text-neutral-400 uppercase">
                        CERTIFICATE
                      </span>
                    </div>
                  )}

                  {/* Top Identifier & Year Badge */}
                  <div className="absolute top-3.5 left-4 z-10 text-[11px] font-mono-code text-white bg-black/80 px-2 py-0.5 border border-neutral-800">
                    {cert.number}
                  </div>
                  <div className="absolute top-3.5 right-4 z-10 bg-[#FF3E14] text-white text-[10px] font-mono-code font-bold px-2 py-0.5 uppercase shadow-md">
                    {cert.year}
                  </div>
                </div>

                {/* Lower Information Area matching screenshot */}
                <div className="p-6 sm:p-7 space-y-4 bg-[#0A0A0A]">
                  <div className="space-y-1.5 min-h-[56px]">
                    <h3 className="text-base sm:text-lg font-black font-display tracking-wider text-white uppercase group-hover:text-[#FF3E14] transition-colors leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Bottom Credentials Code and Preview Action */}
                  <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono-code">
                    <span className="text-neutral-500 uppercase">{cert.credentialId}</span>
                    <span className="text-white font-bold group-hover:text-[#FF3E14] flex items-center gap-1 uppercase transition-colors">
                      PREVIEW ↗
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
