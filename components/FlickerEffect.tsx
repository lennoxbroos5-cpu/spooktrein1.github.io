import React, { useEffect, useState } from 'react';

interface FlickerEffectProps {
  active: boolean;
  children: React.ReactNode;
}

export const FlickerEffect: React.FC<FlickerEffectProps> = ({ active, children }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!active) {
      setOpacity(1);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    const flicker = () => {
      // Random opacity between 0.1 and 1
      const randomOpacity = Math.random() > 0.5 ? 1 : Math.random() * 0.4;
      setOpacity(randomOpacity);

      // Random delay for next flicker (chaotic rhythm)
      const nextDelay = Math.random() * 200; 
      timeoutId = setTimeout(flicker, nextDelay);
    };

    flicker();

    return () => clearTimeout(timeoutId);
  }, [active]);

  return (
    <div style={{ opacity: opacity, transition: 'opacity 0.05s ease-out' }} className="w-full h-full">
      {children}
    </div>
  );
};