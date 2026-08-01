'use client';

import React, { useState, useEffect } from 'react';
import { LifeEvent, EventCategory, EventPriority } from '@/types/timeline';
import { useTimelineStore } from '@/store/useTimelineStore';
import { X } from 'lucide-react';

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: LifeEvent | null;
}

export default function EditEventModal({ isOpen, onClose, event }: EditEventModalProps) {
  const { updateEvent } = useTimelineStore();

  const [title, setTitle] = useState('');
  const [targetAge, setTargetAge] = useState<string>('35');
  const [requiredAmount, setRequiredAmount] = useState<string>('0');
  const [category, setCategory] = useState<EventCategory>('DREAM');
  const [priority, setPriority] = useState<EventPriority>('MEDIUM');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setTargetAge(String(event.targetAge));
      setRequiredAmount(String(event.requiredAmount));
      setCategory(event.category);
      setPriority(event.priority);
      setDescription(event.description || '');
    }
  }, [event]);

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    updateEvent(event.id, {
      title,
      targetAge: Number(targetAge) || 35,
      requiredAmount: Number(requiredAmount) || 0,
      category,
      priority,
      description,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          ✏️ 생애 이벤트 마일스톤 수정
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">이벤트명</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">목표 연령 (세)</label>
              <input
                type="number"
                value={targetAge}
                onChange={(e) => setTargetAge(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                min={18}
                max={100}
                required
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">필요 자금 (엔 ￥)</label>
              <input
                type="number"
                value={requiredAmount}
                onChange={(e) => setRequiredAmount(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                min={0}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="HOUSING">주택 / 부동산</option>
                <option value="EDUCATION">자녀 / 교육</option>
                <option value="SABBATICAL">안식년 / 여행</option>
                <option value="RETIREMENT">은퇴 / 노후</option>
                <option value="DREAM">꿈 / 창업 / 기타</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">우선순위</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as EventPriority)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="CRITICAL">필수 (Critical)</option>
                <option value="HIGH">높음 (High)</option>
                <option value="MEDIUM">보통 (Medium)</option>
                <option value="OPTIONAL">선택 (Optional)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1">상세 설명 / 메모</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              placeholder="예: 도쿄 맨션 구매 초기 비용"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition text-xs"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition text-xs shadow-lg shadow-emerald-900/30"
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
