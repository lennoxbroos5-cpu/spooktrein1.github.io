import React, { useState } from 'react';
import { FlickerEffect } from './components/FlickerEffect';
import { AudioPlayer } from './components/AudioPlayer';
import { SecretGate } from './components/SecretGate';
import { StoryTeller } from './components/StoryTeller';
import { Zap } from 'lucide-react';

export default function App() {
  const [isFlickering, setIsFlickering] = useState(false);

  const toggleFlicker = () => {
    setIsFlickering(true);
    // Auto stop after 10 seconds like original, but safer cleanup
    setTimeout(() => setIsFlickering(false), 10000);
  };

  return (
    <FlickerEffect active={isFlickering}>
      <div className="min-h-screen bg-black text-gray-200 overflow-x-hidden selection:bg-red-900 selection:text-white">
        
        {/* Header Section */}
        <header className="py-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black pointer-events-none"></div>
          <h1 className="text-6xl md:text-8xl text-red-600 mb-2 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] creepster-font animate-pulse">
            De Spooktrein
          </h1>
          <p className="text-xl text-gray-400 font-light tracking-[0.3em] uppercase opacity-80">
            Durf jij aan boord?
          </p>
        </header>

        <main className="container mx-auto px-4 max-w-4xl pb-24">
          
          {/* Controls Section */}
          <section className="mb-16 flex flex-col md:flex-row justify-center items-center gap-6">
            <button 
              onClick={toggleFlicker}
              disabled={isFlickering}
              className={`
                flex items-center gap-2 px-8 py-4 rounded bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-yellow-900/50 
                hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all transform hover:-translate-y-1
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <Zap className={`w-6 h-6 ${isFlickering ? 'text-yellow-400' : 'text-gray-500'}`} />
              <span className="font-bold text-yellow-100 uppercase tracking-wider">
                {isFlickering ? 'Kortsluiting...' : 'Start Licht-Effect'}
              </span>
            </button>
            
            <AudioPlayer />
          </section>

          {/* AI Story Section */}
          <StoryTeller />

          {/* Gallery Section */}
          <section className="mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px bg-red-900 w-16"></div>
              <h2 className="text-4xl text-red-500 creepster-font text-center">De Galerij</h2>
              <div className="h-px bg-red-900 w-16"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative group overflow-hidden rounded-lg border-2 border-red-900/30 transform hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none mix-blend-overlay"></div>
                  <img 
                    src={`https://picsum.photos/seed/spook${i}/400/300`} 
                    alt={`Spookbeeld ${i}`}
                    className="w-full h-64 object-cover filter sepia-[0.5] contrast-125 group-hover:sepia-0 transition-all duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <p className="text-red-200 text-sm font-bold tracking-widest text-center">BEWIJSMATERIAAL #{i}0{i}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Secret Section */}
          <SecretGate />

        </main>

        <footer className="text-center py-8 border-t border-red-900/20 bg-black text-gray-600 text-sm">
          <p>© 2025 De Spooktrein — <span className="text-red-900">Kijk uit in het donker…</span></p>
        </footer>
      </div>
    </FlickerEffect>
  );
}