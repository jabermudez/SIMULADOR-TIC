import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0d9488', '#0284c7', '#f59e0b', '#8b5cf6', '#10b981'],
    });
  } catch {
    // Graceful fallback if canvas is not ready
  }
};
