import React from 'react';
import { Certificate } from '../data/portfolioData';
import { X, Award, CheckCircle2, ShieldCheck, ExternalLink, Download } from 'lucide-react';

interface CertificateModalProps {
  cert: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  if (!cert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0A0A0A] border border-neutral-800 shadow-2xl overflow-hidden flex flex-col justify-between">
        {/* Header */}
        <div className="bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck size={16} className="text-[#FF3E14]" />
            <span className="text-xs font-mono-code font-bold text-white tracking-wider uppercase">
              CREDENTIAL VERIFICATION
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 border border-neutral-800 hover:border-[#FF3E14] hover:text-[#FF3E14] text-neutral-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Certificate Display Certificate Box */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {cert.image && (
            <div className="border border-neutral-800 bg-black overflow-hidden relative group">
              <img
                src={cert.image}
                alt={cert.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[420px] object-contain mx-auto bg-black"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="border-2 border-neutral-800 p-6 sm:p-8 bg-gradient-to-b from-[#120604] to-black relative space-y-6 text-center">
            {/* Top Ribbon & ID */}
            <div className="flex items-center justify-between text-xs font-mono-code text-neutral-400 border-b border-neutral-800 pb-4">
              <span>{cert.number}</span>
              <span className="text-[#FF3E14] font-bold">ISSUED: {cert.year}</span>
              <span>{cert.credentialId}</span>
            </div>

            {/* Emblem */}
            <div className="w-14 h-14 rounded-full bg-black border border-[#FF3E14] mx-auto flex items-center justify-center text-[#FF3E14]">
              <Award size={28} />
            </div>

            {/* Certificate Title */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono-code text-neutral-400 uppercase tracking-widest block">
                THIS CERTIFIES THAT LIMBASIYA KAVY HAS SUCCESSFULLY COMPLETED
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display tracking-wide text-white uppercase">
                {cert.title}
              </h3>
              <p className="text-xs font-mono-code font-bold text-[#FF3E14] uppercase tracking-wider">
                ISSUING BODY: {cert.issuer}
              </p>
            </div>

            {/* Skills Verified */}
            <div className="pt-4 border-t border-neutral-800 flex flex-wrap justify-center gap-2">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] font-mono-code text-neutral-300 bg-black border border-neutral-800 px-2.5 py-1 uppercase"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-6 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs font-mono-code">
          <span className="text-neutral-500">DIGITALLY SIGNED &amp; VERIFIED</span>
          <button
            onClick={onClose}
            className="bg-[#FF3E14] text-black font-bold uppercase px-6 py-2 hover:bg-white transition-colors"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};
