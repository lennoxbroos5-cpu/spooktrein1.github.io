import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }
    if (lfoRef.current) {
      lfoRef.current.stop();
      lfoRef.current.disconnect();
    }
    setIsPlaying(false);
  };

  const playSound = () => {
    // If already playing, stop first
    if (isPlaying) {
      stopSound();
      return;
    }

    // Initialize Audio Context
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const ctx = audioContextRef.current;

    // Create Oscillators (Drone sound)
    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const gain = ctx.createGain();

    // Main Tone (Low drone)
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(55, ctx.currentTime); // Low A

    // LFO (Wobble effect)
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.5, ctx.currentTime); // Slow wobble
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(10, ctx.currentTime);
    
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    // Filter (Muffled sound)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);

    // Connections
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    // Start
    osc.start();
    lfo.start();

    // Save refs
    oscillatorRef.current = osc;
    lfoRef.current = lfo;
    gainNodeRef.current = gain;

    setIsPlaying(true);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSound();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={playSound}
      className={`
        flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-widest transition-all duration-300
        ${isPlaying 
          ? 'bg-red-900/50 text-red-200 border border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
          : 'bg-gray-900 text-gray-400 border border-gray-700 hover:bg-gray-800'}
      `}
    >
      {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
      {isPlaying ? 'Stop het geluid' : 'Start Griezel Geluid'}
    </button>
  );
};