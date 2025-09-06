'use client';
import { useEffect, useState } from 'react';

export default function VpnOverlay() {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setShowOverlay(false);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleSkip = () => {
    setShowOverlay(false);
  };

  if (!showOverlay) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center text-white transition-opacity duration-500 ease-in-out sm:ml-60">
      <h1 className="text-3xl font-bold mb-4">🌐 Use a VPN</h1>
      <p className="text-lg text-center max-w-md mb-6 px-4">
        This website uses an external API that may be blocked by some internet providers.
        To ensure proper functionality, please use a VPN.
      </p>

      <p className="text-xl font-semibold mb-6">
        Website will load in <span className="text-yellow-400">{secondsLeft}</span> seconds...
      </p>

      <button
        onClick={handleSkip}
        className="mt-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded transition"
      >
        Skip
      </button>
    </div>
  );
}