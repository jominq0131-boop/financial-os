'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  title?: string;
}

export default function Tooltip({ content, title }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      top: rect.top + window.scrollY - 8, // 8px above the button
      left: rect.left + rect.width / 2 + window.scrollX,
    });
  };

  const handleOpen = () => {
    updatePosition();
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const tooltipEl = isOpen && mounted ? (
    <div
      className="pointer-events-none animate-fade-in"
      style={{
        position: 'absolute',
        top: coords.top,
        left: coords.left,
        transform: 'translate(-50%, -100%)',
        zIndex: 99999,
        width: '288px',
      }}
    >
      <div className="bg-zinc-900 border border-zinc-700/90 text-zinc-200 text-xs rounded-2xl shadow-2xl p-3.5 backdrop-blur-2xl space-y-1">
        {title && (
          <div className="font-bold text-white text-[13px] border-b border-zinc-800 pb-1">
            {title}
          </div>
        )}
        <p className="leading-relaxed text-zinc-300 font-normal text-[11px]">{content}</p>
        {/* Caret */}
        <div
          className="absolute border-4 border-transparent border-t-zinc-900"
          style={{
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </div>
    </div>
  ) : null;

  return (
    <div className="relative inline-flex items-center">
      <button
        ref={buttonRef}
        type="button"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
        className="text-zinc-400 hover:text-zinc-200 transition focus:outline-none ml-1 p-0.5 rounded-full hover:bg-zinc-800"
        aria-label="도움말 설명"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {mounted && tooltipEl && createPortal(tooltipEl, document.body)}
    </div>
  );
}
