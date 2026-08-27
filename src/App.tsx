import React, { useState, useEffect } from 'react';
import { AudioProvider } from './context/AudioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { SelectedWork } from './components/SelectedWork';
import { AboutSection } from './components/AboutSection';
import { RulesSection } from './components/RulesSection';
import { ServicesSection } from './components/ServicesSection';
import { ToolsSection } from './components/ToolsSection';
import { FeaturedProjects } from './components/FeaturedProjects';
import { CertificatesSection } from './components/CertificatesSection';
import { PersonalSection } from './components/PersonalSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { VideoReelModal } from './components/VideoReelModal';
import { CertificateModal } from './components/CertificateModal';
import { ArtworkModal } from './components/ArtworkModal';
import { ShowcaseModal } from './components/ShowcaseModal';
import { AudioPlayerHUD } from './components/AudioPlayerHUD';
import { CustomCursor } from './components/CustomCursor';
import { IntroLoader } from './components/IntroLoader';
import { Project, Certificate, PersonalWork, ShowcaseItem } from './data/portfolioData';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isReelOpen, setIsReelOpen] = useState<boolean>(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<PersonalWork | null>(null);
  const [selectedShowcaseItem, setSelectedShowcaseItem] = useState<ShowcaseItem | null>(null);

  // Auto-dismiss loader safeguard after 1.5 seconds so it can never block page view
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AudioProvider>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF3E14] selection:text-black relative w-full overflow-x-hidden">
        {/* Animated Cybernetic Cursor */}
        <CustomCursor />

        {/* Intro Preloader with Percentage Counter & Diagnostics */}
        <AnimatePresence>
          {showLoader && (
            <IntroLoader onComplete={() => setShowLoader(false)} />
          )}
        </AnimatePresence>

        {/* Main Application Container - Always visible */}
        <div className="w-full relative z-10 transition-opacity duration-700 ease-out">
          {/* Top Fixed Navigation with Sound Toggle */}
          <Navbar />

          <main className="w-full">
            {/* 01: Hero with 3D Interactive WebGL Wireframe Cage & Ribbon */}
            <Hero onOpenReel={() => setIsReelOpen(true)} />

            {/* High-Impact Red Ticker Ribbon */}
            <Ticker />

            {/* 02: Selected Work Gallery with live video previews */}
            <SelectedWork
              onSelectProject={(project) => setSelectedProject(project)}
              onOpenReel={() => setIsReelOpen(true)}
            />

            {/* 03: About Section with Interactive Cursor Hover Lens on User Photo */}
            <AboutSection />

            {/* 04: Three Rules Philosophy */}
            <RulesSection />

            {/* 05: What I Do For A Living / Services */}
            <ServicesSection />

            {/* 06: Toolkit Section (CapCut, Photoshop, After Effects) */}
            <ToolsSection />

            {/* 07: Featured Projects Spotlight with video player */}
            <FeaturedProjects
              onSelectProject={(project) => setSelectedProject(project)}
              onOpenReel={() => setIsReelOpen(true)}
            />

            {/* 08: Certificates & Receipts */}
            <CertificatesSection
              onSelectCertificate={(cert) => setSelectedCert(cert)}
            />

            {/* 09: Personal Sketchbook & Hand Drawn */}
            <PersonalSection
              onSelectWork={(work) => setSelectedArtwork(work)}
            />

            {/* 10: Videos & Stills Showcase (Directly under Hand Drawn section) */}
            <ShowcaseSection
              onSelectMedia={(item) => setSelectedShowcaseItem(item)}
            />

            {/* 11: Voices & Testimonials */}
            <TestimonialsSection />

            {/* 12: Contact Form & Coordinates */}
            <ContactSection />
          </main>

          {/* Footer with Giant Social Marquee */}
          <Footer />

          {/* Floating Ambient Audio HUD */}
          <AudioPlayerHUD />
        </div>

        {/* Interactive Modals */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <VideoReelModal
          isOpen={isReelOpen}
          onClose={() => setIsReelOpen(false)}
        />

        <CertificateModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />

        <ArtworkModal
          work={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />

        <ShowcaseModal
          item={selectedShowcaseItem}
          onClose={() => setSelectedShowcaseItem(null)}
        />
      </div>
    </AudioProvider>
  );
}