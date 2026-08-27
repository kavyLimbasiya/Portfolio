import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { AUDIO_CONFIG, AudioTrackConfig } from '../data/portfolioData';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTrackTitle: string;
  currentTrack: AudioTrackConfig;
  isPausedByVideo: boolean;
  audioError: string | null;
  toggleMusic: () => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  pauseMusicForVideo: () => void;
  resumeMusicAfterVideo: () => void;
}

const AudioStateContext = createContext<AudioContextType | undefined>(undefined);

// Web Audio generative synthesizer for rich cinematic kinetic background sound
class SynthAmbientEngine {
  private ctx: InstanceType<typeof window.AudioContext> | null = null;
  private masterGain: GainNode | null = null;
  private nodes: (OscillatorNode | GainNode | BiquadFilterNode)[] = [];
  private isRunning = false;
  private stepInterval: number | null = null;

  init() {
    if (this.ctx) return;
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxClass) return;
    this.ctx = new AudioCtxClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  async resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch {
        // ignore
      }
    }
  }

  start(volume = 0.35) {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => { });
    }

    if (this.isRunning) {
      this.setVolume(volume);
      return;
    }
    this.isRunning = true;

    const now = this.ctx.currentTime;
    const nodesList: (OscillatorNode | GainNode | BiquadFilterNode)[] = [];

    // Master lowpass filter for deep cinematic dark vibe
    const mainFilter = this.ctx.createBiquadFilter();
    mainFilter.type = 'lowpass';
    mainFilter.frequency.setValueAtTime(450, now);
    mainFilter.Q.setValueAtTime(3.0, now);
    mainFilter.connect(this.masterGain);
    nodesList.push(mainFilter);

    // Subtle Filter Sweep LFO
    const filterLfo = this.ctx.createOscillator();
    const filterLfoGain = this.ctx.createGain();
    filterLfo.frequency.setValueAtTime(0.12, now);
    filterLfoGain.gain.setValueAtTime(180, now);
    filterLfo.connect(filterLfoGain);
    filterLfoGain.connect(mainFilter.frequency);
    filterLfo.start(now);
    nodesList.push(filterLfo, filterLfoGain);

    // Cinematic Chord Layers: Sub C2 (65.4Hz), G2 (98Hz), C3 (130.8Hz), D#3 (155.6Hz), G3 (196Hz)
    const chordNotes = [
      { freq: 65.4, type: 'sine' as OscillatorType, vol: 0.35 },
      { freq: 98.0, type: 'triangle' as OscillatorType, vol: 0.22 },
      { freq: 130.81, type: 'sawtooth' as OscillatorType, vol: 0.15 },
      { freq: 155.56, type: 'triangle' as OscillatorType, vol: 0.18 },
      { freq: 196.0, type: 'sine' as OscillatorType, vol: 0.16 },
    ];

    chordNotes.forEach(({ freq, type, vol }, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      // Subtle detune for rich analog chorus
      if (i > 0) {
        osc.detune.setValueAtTime((i % 2 === 0 ? 1 : -1) * (4 + i * 2), now);
      }

      gain.gain.setValueAtTime(vol, now);
      osc.connect(gain);
      gain.connect(mainFilter);
      osc.start(now);

      nodesList.push(osc, gain);
    });

    // Rhythmic pulse generator (120 BPM kinetic cadence)
    const tempo = 120;
    const intervalMs = (60 / tempo) * 1000;
    let step = 0;

    const pulseNotes = [130.81, 130.81, 155.56, 174.61, 196.0, 155.56, 130.81, 116.54];

    this.stepInterval = window.setInterval(() => {
      if (!this.isRunning || !this.ctx || !this.masterGain) return;
      try {
        const t = this.ctx.currentTime;
        const noteFreq = pulseNotes[step % pulseNotes.length];
        step++;

        // Pluck oscillator
        const pOsc = this.ctx.createOscillator();
        const pGain = this.ctx.createGain();
        const pFilter = this.ctx.createBiquadFilter();

        pOsc.type = 'sawtooth';
        pOsc.frequency.setValueAtTime(noteFreq * 2, t);

        pFilter.type = 'lowpass';
        pFilter.frequency.setValueAtTime(600, t);
        pFilter.frequency.exponentialRampToValueAtTime(100, t + 0.25);

        pGain.gain.setValueAtTime(0.12, t);
        pGain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

        pOsc.connect(pFilter);
        pFilter.connect(pGain);
        pGain.connect(this.masterGain);

        pOsc.start(t);
        pOsc.stop(t + 0.3);
      } catch {
        // ignore
      }
    }, intervalMs);

    this.nodes = nodesList;

    // Smooth fade in
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(Math.max(0, Math.min(1, volume)), now + 0.6);
  }

  stop() {
    if (this.stepInterval !== null) {
      clearInterval(this.stepInterval);
      this.stepInterval = null;
    }

    if (!this.ctx || !this.masterGain || !this.isRunning) {
      this.isRunning = false;
      return;
    }

    const now = this.ctx.currentTime;
    try {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.08);
    } catch {
      // ignore
    }

    setTimeout(() => {
      this.nodes.forEach((node) => {
        try {
          if ('stop' in node) {
            (node as OscillatorNode).stop();
          }
          node.disconnect();
        } catch {
          // ignore
        }
      });
      this.nodes = [];
      this.isRunning = false;
    }, 100);
  }

  setVolume(vol: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const target = Math.max(0, Math.min(1, vol));
    try {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(target, now + 0.1);
    } catch {
      // ignore
    }
  }
}

const resolveAudioUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url;
  }
  return `/${url}`;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.4);
  const [isPausedByVideo, setIsPausedByVideo] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SynthAmbientEngine | null>(null);
  const savedPositionRef = useRef<number>(0);
  const activeVideosCountRef = useRef<number>(0);
  const userWantsAudioRef = useRef<boolean>(true);

  // Initialize synth engine once
  useEffect(() => {
    synthRef.current = new SynthAmbientEngine();
    return () => {
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  const playSound = async () => {
    if (!userWantsAudioRef.current || activeVideosCountRef.current > 0) return;

    if (synthRef.current) {
      await synthRef.current.resume();
    }

    const audio = audioRef.current;
    const targetVol = isMuted ? 0 : volume;

    if (audio && audio.src && !audio.src.endsWith('/')) {
      try {
        audio.volume = targetVol;
        if (savedPositionRef.current > 0) {
          audio.currentTime = savedPositionRef.current;
        }
        await audio.play();
        setIsPlaying(true);
        setAudioError(null);
        return;
      } catch {
        // Fall back to Synth if HTML audio fails or cannot load
      }
    }

    if (synthRef.current && userWantsAudioRef.current && activeVideosCountRef.current === 0) {
      synthRef.current.start(targetVol);
      setIsPlaying(true);
    }
  };

  const pauseSound = () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        savedPositionRef.current = audio.currentTime;
        audio.pause();
      } catch {
        // ignore
      }
    }
    if (synthRef.current) {
      synthRef.current.stop();
    }
    setIsPlaying(false);
  };

  // Update or instantiate Audio element when track URL changes
  useEffect(() => {
    setAudioError(null);
    const resolvedUrl = resolveAudioUrl(AUDIO_CONFIG.url);
    const audio = new Audio();
    audio.src = resolvedUrl;
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = isMuted ? 0 : volume;

    audio.onerror = () => {
      setAudioError('STREAM OFFLINE');
      if (userWantsAudioRef.current && activeVideosCountRef.current === 0 && synthRef.current) {
        synthRef.current.start(isMuted ? 0 : volume);
        setIsPlaying(true);
      }
    };

    audioRef.current = audio;

    // Try direct play on mount
    playSound();

    // Multi-gesture listeners ensure unmuted playback starts on the very first user interaction
    const gestureEvents = ['pointerdown', 'mousedown', 'touchstart', 'touchend', 'click', 'keydown', 'scroll', 'wheel'];
    const handleInitialUserGesture = () => {
      if (userWantsAudioRef.current && activeVideosCountRef.current === 0) {
        playSound();
      }
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleInitialUserGesture);
      });
    };

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, handleInitialUserGesture, { once: true, passive: true });
    });

    return () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleInitialUserGesture);
      });
      try {
        audio.pause();
        audio.src = '';
      } catch {
        // ignore
      }
    };
  }, [AUDIO_CONFIG.url, isMuted, volume]);

  const toggleMusic = () => {
    if (isPlaying) {
      userWantsAudioRef.current = false;
      pauseSound();
    } else {
      userWantsAudioRef.current = true;
      playSound();
    }
  };

  const setVolume = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);
    const target = isMuted ? 0 : clamped;
    if (audioRef.current) {
      audioRef.current.volume = target;
    }
    if (synthRef.current) {
      synthRef.current.setVolume(target);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    const target = nextMuted ? 0 : volume;
    if (audioRef.current) {
      audioRef.current.volume = target;
    }
    if (synthRef.current) {
      synthRef.current.setVolume(target);
    }
  };

  // When ANY video starts playing, immediately pause background music and synth
  const pauseMusicForVideo = () => {
    activeVideosCountRef.current += 1;
    setIsPausedByVideo(true);
    pauseSound();
  };

  // When video preview closes or ends, resume music
  const resumeMusicAfterVideo = () => {
    activeVideosCountRef.current = Math.max(0, activeVideosCountRef.current - 1);
    if (activeVideosCountRef.current === 0 && userWantsAudioRef.current) {
      setIsPausedByVideo(false);
      playSound();
    }
  };

  return (
    <AudioStateContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        currentTrackTitle: `${AUDIO_CONFIG.title} // ${AUDIO_CONFIG.artist}`,
        currentTrack: AUDIO_CONFIG,
        isPausedByVideo,
        audioError,
        toggleMusic,
        setVolume,
        toggleMute,
        pauseMusicForVideo,
        resumeMusicAfterVideo,
      }}
    >
      {children}
    </AudioStateContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioStateContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
