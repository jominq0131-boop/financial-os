'use client';

import React, { useState } from 'react';
import { useTimelineStore } from '@/store/useTimelineStore';
import { EventCategory, EventPriority, LifeEvent } from '@/types/timeline';
import Tooltip from '@/components/common/Tooltip';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !requiredAmount) return;

    const currentYear = new Date().getFullYear();
    const ageDiff = targetAge - currentAge;
    const targetYear = currentYear + ageDiff;

    const newEvent: Omit<LifeEvent, 'id'> = {
      title,
      targetAge: Number(targetAge),
      targetYear,
      requiredAmount: Number(requiredAmount),
      category,
      priority,
      description: description || undefined,
    };

    addEvent(newEvent);

    // Reset & Close
    setTitle('');
    setRequiredAmount('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h2 className="text-xl font-bold text-white">신규 생애 마일스톤 등록</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-zinc-400 mb-1 font-medium flex items-center">
              이벤트 이름
              <Tooltip content="예: 도쿄 주택 구매, 해외 1년 안식년, 50세 조기 FIRE 등 목표 이름을 입력하세요." />
            </label>
            <input
              type="text"
              placeholder="예: 주택 구매 보증금, 안식년 여행 자금"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 mb-1 font-medium flex items-center">
                목표 연령 (세)
                <Tooltip content="해당 이벤트가 발생할 목표 나이를 입력하세요." />
              </label>
              <input
                type="number"
                min={currentAge}
                max={100}
                value={targetAge}
                onChange={(e) => setTargetAge(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-zinc-600"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-medium flex items-center">
                카테고리
                <Tooltip content="이벤트의 성격(주거, 안식년, 은퇴, 교육, 사업 등)을 분류합니다." />
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-zinc-600"
              >
                <option value="HOUSING">🏠 주거 / 내집 마련</option>
                <option value="SABBATICAL">✈️ 안식년 / 휴식</option>
                <option value="RETIREMENT">🌅 은퇴 / FIRE</option>
                <option value="EDUCATION">📚 교육 / 자기계발</option>
                <option value="BUSINESS">💼 창업 / 사업 자금</option>
                <option value="OTHER">✨ 기타 목표</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 mb-1 font-medium flex items-center">
                필요 예상 자금 (엔 / JPY)
                <Tooltip content="이벤트 달성에 필요한 목표 엔화(JPY ￥) 자금을 입력하세요." />
              </label>
              <input
                type="number"
                placeholder="엔화 금액 (예: 5000000)"
                value={requiredAmount}
                onChange={(e) => setRequiredAmount(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-medium flex items-center">
                우선순위 (Priority)
                <Tooltip content="이벤트의 중요도 (Critical 필수 / High 중요 / Medium 일반)를 설정합니다." />
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as EventPriority)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-zinc-600"
              >
                <option value="CRITICAL">🚨 Critical (필수 목표)</option>
                <option value="HIGH">⚡ High (중요 목표)</option>
                <option value="MEDIUM">🔹 Medium (일반 목표)</option>
                <option value="LOW">🌱 Low (선택 목표)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1 font-medium">상세 설명 (선택)</label>
            <textarea
              rows={2}
              placeholder="이벤트 세부 내용 및 준비 계획"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 resize-none"
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
              마일스톤 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
