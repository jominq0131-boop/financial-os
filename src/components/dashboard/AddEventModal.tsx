'use client';

import React, { useState } from 'react';
import { useTimelineStore } from '@/store/useTimelineStore';
import { EventCategory, EVENT_CATEGORY_LABELS, EventPriority } from '@/types/timeline';
import { X } from 'lucide-react';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddEventModal({ isOpen, onClose }: AddEventModalProps) {
  const { addEvent, currentAge } = useTimelineStore();

  const [title, setTitle] = useState('');
  const [targetAge, setTargetAge] = useState(currentAge + 5);
  const [requiredAmount, setRequiredAmount] = useState('');
  const [category, setCategory] = useState<EventCategory>('HOUSING');
  const [priority, setPriority] = useState<EventPriority>('HIGH');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const currentYear = new Date().getFullYear();
  const calculatedYear = currentYear + (targetAge - currentAge);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !requiredAmount) return;

    addEvent({
      title,
      targetAge: Number(targetAge),
      targetYear: calculatedYear,
      requiredAmount: Number(requiredAmount),
      category,
      priority,
      description,
    });

    setTitle('');
    setRequiredAmount('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h2 className="text-xl font-bold text-white">인생 미션 이벤트 추가</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-zinc-400 mb-1 font-medium">이벤트 명칭</label>
            <input
              type="text"
              placeholder="예: 내 집 마련, 안식년 여행, 은퇴"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">목표 연령 (세)</label>
              <input
                type="number"
                value={targetAge}
                onChange={(e) => setTargetAge(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-medium">예상 연도</label>
              <div className="w-full bg-zinc-800/60 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-300 font-mono">
                {calculatedYear}년
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none"
              >
                {Object.entries(EVENT_CATEGORY_LABELS).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.icon} {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-medium">우선순위</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as EventPriority)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none"
              >
                <option value="CRITICAL">Critical (필수)</option>
                <option value="HIGH">High (높음)</option>
                <option value="MEDIUM">Medium (보통)</option>
                <option value="OPTIONAL">Optional (선택)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1 font-medium">필요 예상 자금 (원)</label>
            <input
              type="number"
              placeholder="0"
              value={requiredAmount}
              onChange={(e) => setRequiredAmount(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none"
              required
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:bg-zinc-800 transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
            >
              이벤트 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
