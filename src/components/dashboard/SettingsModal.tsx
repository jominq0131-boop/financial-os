'use client';

import React, { useState, useEffect } from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { X, Sliders, ShieldCheck } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { currentAge, emergencyFundMonths, useIdeCo, fireTarget, updateSettings } = useSettingsStore();

  const [ageInput, setAgeInput] = useState(currentAge);
  const [monthsInput, setMonthsInput] = useState(emergencyFundMonths);
  const [idecoInput, setIdecoInput] = useState(useIdeCo);
  const [fireInput, setFireInput] = useState(fireTarget);

  useEffect(() => {
    setAgeInput(currentAge);
    setMonthsInput(emergencyFundMonths);
    setIdecoInput(useIdeCo);
    setFireInput(fireTarget);
  }, [currentAge, emergencyFundMonths, useIdeCo, fireTarget, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      currentAge: Number(ageInput),
      emergencyFundMonths: Number(monthsInput),
      useIdeCo: Boolean(idecoInput),
      fireTarget: Number(fireInput),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-emerald-400" /> 개인 재정 관제 설정
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 현재 연령 */}
          <div>
            <label className="block text-xs text-zinc-400 mb-1 font-medium">현재 연령 (세)</label>
            <input
              type="number"
              value={ageInput}
              onChange={(e) => setAgeInput(Number(e.target.value))}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              min={18}
              max={99}
              required
            />
            <p className="text-[11px] text-zinc-400 mt-1">시뮬레이션 및 생애 이벤트 시작 시점 연령</p>
          </div>

          {/* 비상금 목표 개월 수 */}
          <div>
            <label className="block text-xs text-zinc-400 mb-1 font-medium">비상금 목표 (개월 치 생활비)</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={monthsInput}
                onChange={(e) => setMonthsInput(Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                min={1}
                max={24}
                required
              />
              <span className="text-xs text-zinc-300 font-mono whitespace-nowrap">개월</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">기본 3개월 권장 (달성 전 100% 저축 ➔ 달성 후 100% 투자)</p>
          </div>

          {/* FIRE 목표 금액 */}
          <div>
            <label className="block text-xs text-zinc-400 mb-1 font-medium">FIRE 은퇴 목표 금액 (엔 ￥)</label>
            <input
              type="number"
              value={fireInput}
              onChange={(e) => setFireInput(Number(e.target.value))}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              step={1000000}
              min={10000000}
              required
            />
            <p className="text-[11px] text-zinc-400 mt-1">연 4% 인출 규칙 기준 은퇴 목표 총자산</p>
          </div>

          {/* iDeCo 사용 여부 */}
          <div className="bg-zinc-800/60 border border-zinc-700/60 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" /> iDeCo 연금계좌 활성화
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                회사 iDeCo 제도가 없거나 미사용 시 비활성화
              </p>
            </div>
            <input
              type="checkbox"
              checked={idecoInput}
              onChange={(e) => setIdecoInput(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-0 cursor-pointer"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-zinc-800">
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
              설정 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
