'use client';

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  title?: string;
}

export default function Tooltip({ content, title }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center group">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-zinc-400 hover:text-zinc-200 transition focus:outline-none ml-1 p-0.5 rounded-full hover:bg-zinc-800"
        aria-label="도움말 설명"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 md:w-72 p-3.5 bg-zinc-900 border border-zinc-700/90 text-zinc-200 text-xs rounded-2xl shadow-2xl z-[9999] pointer-events-none backdrop-blur-2xl animate-fade-in space-y-1">
          {title && <div className="font-bold text-white text-[13px] border-b border-zinc-800 pb-1">{title}</div>}
          <p className="leading-relaxed text-zinc-300 font-normal text-[11px]">{content}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
        </div>
      )}
    </div>
  );
}
