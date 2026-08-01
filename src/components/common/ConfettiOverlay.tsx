'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ConfettiOverlayProps {
  isVisible: boolean;
  onComplete?: () => void;
  message?: string;
}

// Generate deterministic confetti particle positions/colors
const COLORS = [
  '#22c55e', '#10b981', '#f59e0b', '#f97316', '#8b5cf6',
  '#06b6d4', '#ec4899', '#84cc16', '#facc15', '#60a5fa',
];

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  color: COLORS[i % COLORS.length],
  left: (i * 1.6807 * 100) % 100, // pseudo-random spread
  delay: (i * 0.05) % 1.5,
  duration: 1.5 + ((i * 0.037) % 1.0),
  size: 6 + (i % 5),
  rotation: (i * 47) % 360,
  drift: -60 + ((i * 2.3) % 120), // horizontal drift in px
}));

export default function ConfettiOverlay({ isVisible, onComplete, message }: ConfettiOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!mounted || !show) return null;

  const overlay = (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Celebration message */}
      {message && (
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 99999,
            textAlign: 'center',
            animation: 'confetti-message 3s ease-out forwards',
          }}
        >
          <div
            style={{
              background: 'rgba(0,0,0,0.85)',
              border: '1px solid rgba(34,197,94,0.4)',
              borderRadius: '24px',
              padding: '20px 32px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 40px rgba(34,197,94,0.2)',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</div>
            <div style={{ color: '#22c55e', fontWeight: 800, fontSize: '18px', fontFamily: 'monospace' }}>
              {message}
            </div>
          </div>
        </div>
      )}

      {/* Confetti particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: '-20px',
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            borderRadius: '2px',
            animationName: 'confetti-fall',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animationFillMode: 'forwards',
            transform: `rotate(${p.rotation}deg)`,
            opacity: 0,
            '--drift': `${p.drift}px`,
          } as React.CSSProperties}
        />
      ))}

      <style>{`
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) translateX(var(--drift)) rotate(720deg);
          }
        }
        @keyframes confetti-message {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          15% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
          25% { transform: translate(-50%, -50%) scale(1.0); }
          75% { opacity: 1; transform: translate(-50%, -50%) scale(1.0); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        }
      `}</style>
    </div>
  );

  return createPortal(overlay, document.body);
}
