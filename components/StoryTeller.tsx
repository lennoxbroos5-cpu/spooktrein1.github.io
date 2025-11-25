import React, { useState } from 'react';
import { generateGhostStory } from '../services/gemini';
import { Ghost, Loader2 } from 'lucide-react';

export const StoryTeller: React.FC = () => {
  const [story, setStory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSummon = async () => {
    setLoading(true);
    const newStory = await generateGhostStory();
    setStory(newStory);
    setLoading(false);
  };

  return (
    <div className="my-12 p-1 relative group">
      {/* Decorative border gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-red-900 to-purple-900 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
      
      <div className="relative bg-black p-8 rounded-lg border border-red-900/30 text-center">
        <h2 className="text-3xl text-purple-400 mb-4 creepster-font text-shadow-sm">De Geestenfluisteraar (AI)</h2>
        <p className="text-gray-400 mb-6">Durf jij te luisteren naar wat de geesten vandaag te vertellen hebben?</p>

        {!story && !loading && (
          <button 
            onClick={handleSummon}
            className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-purple-900 font-lg rounded hover:bg-purple-800 hover:scale-105 focus:outline-none ring-offset-2 focus:ring-2 ring-purple-500"
          >
            <Ghost className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Roep een Geest op
          </button>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-8 text-purple-300">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="animate-pulse">Contact maken met het hiernamaals...</p>
          </div>
        )}

        {story && (
          <div className="mt-6 text-left animate-fade-in">
            <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-gray-200 font-serif italic border-l-4 border-purple-800 pl-4 py-2 bg-purple-900/10 rounded-r">
                    "{story}"
                </p>
            </div>
            <button 
                onClick={handleSummon}
                className="mt-6 text-sm text-gray-500 hover:text-purple-400 underline decoration-dotted underline-offset-4"
            >
                Luister naar een andere geest...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};