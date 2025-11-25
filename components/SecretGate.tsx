import React, { useState } from 'react';
import { Lock, Unlock, Skull } from 'lucide-react';

export const SecretGate: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const SECRET_CODE = "#teeringleider=NOAH";

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === SECRET_CODE) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setInput('');
      setTimeout(() => setError(false), 2000);
    }
  };

  if (isUnlocked) {
    return (
      <div className="mt-8 p-6 bg-red-950/30 border-2 border-red-600 rounded-lg animate-fade-in">
        <div className="flex items-center gap-3 mb-4 text-red-500">
          <Unlock className="w-8 h-8" />
          <h2 className="text-3xl creepster-font">De Geheime Coupé</h2>
        </div>
        <div className="text-gray-300 space-y-4">
          <p className="text-lg">Je hebt toegang gekregen tot de verboden archieven...</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-black/50 p-4 rounded border border-red-900/50">
                <h4 className="text-red-400 font-bold mb-2">Gevangene 992</h4>
                <p className="text-sm italic">"Hij zit hier nog steeds, wachtend op de conducteur die nooit komt..."</p>
             </div>
             <div className="bg-black/50 p-4 rounded border border-red-900/50">
                <h4 className="text-red-400 font-bold mb-2">Het Verloren Spoor</h4>
                <p className="text-sm italic">"Kaartjes zijn enkel enkele reis. Terugkeer is niet gegarandeerd."</p>
             </div>
          </div>
          <div className="flex justify-center mt-4">
             <Skull className="w-16 h-16 text-red-700 animate-bounce opacity-50" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 text-center p-8 bg-black/40 rounded-xl border border-gray-800">
      <h2 className="text-2xl text-gray-400 mb-4 creepster-font">Geheime Toegang</h2>
      <p className="text-gray-500 mb-6">Alleen voor de dappere reizigers die de code kennen.</p>
      
      <form onSubmit={handleUnlock} className="max-w-md mx-auto relative">
        <div className="flex gap-2">
            <div className="relative flex-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                    type="password"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Wachtwoord..."
                    className={`w-full bg-gray-900 border ${error ? 'border-red-500 animate-pulse' : 'border-gray-700'} text-white px-10 py-3 rounded focus:outline-none focus:border-red-500 transition-colors`}
                />
            </div>
            <button 
                type="submit"
                className="bg-red-900 hover:bg-red-700 text-white px-6 py-3 rounded font-bold transition-colors"
            >
                OPEN
            </button>
        </div>
        {error && <p className="text-red-500 mt-2 text-sm font-bold animate-pulse">VERBODEN TOEGANG!</p>}
      </form>
    </div>
  );
};