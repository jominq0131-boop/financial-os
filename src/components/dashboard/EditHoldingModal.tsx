'use client';

import React, { useState, useEffect } from 'react';
import { useHoldingStore } from '@/store/useHoldingStore';
import { Holding } from '@/types/holding';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  holding: Holding | null;
}

export default function EditHoldingModal({ isOpen, onClose, holding }: Props) {
  const { updateHolding } = useHoldingStore();

  const [ticker, setTicker] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState<Holding['accountType']>('NISA_GROWTH');
  const [quantity, setQuantity] = useState('');
  const [avgCostPrice, setAvgCostPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [currency, setCurrency] = useState<'JPY' | 'USD'>('JPY');
  const [exchangeRate, setExchangeRate] = useState('155');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (holding) {
      setTicker(holding.ticker);
      setName(holding.name);
      setAccountType(holding.accountType);
      setQuantity(holding.quantity.toString());
      setAvgCostPrice(holding.avgCostPrice.toString());
      setCurrentPrice(holding.currentPrice.toString());
      setCurrency(holding.currency);
      setExchangeRate((holding.exchangeRate || 155).toString());
      setNotes(holding.notes || '');
    }
  }, [holding]);

  if (!isOpen || !holding) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker || !name || !quantity || !avgCostPrice || !currentPrice) return;

    updateHolding(holding.id, {
      ticker: ticker.toUpperCase(),
      name,
      accountType,
      quantity: Number(quantity),
      avgCostPrice: Number(avgCostPrice),
      currentPrice: Number(currentPrice),
      currency,
      exchangeRate: currency === 'USD' ? Number(exchangeRate) : undefined,
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-7 max-w-lg w-full space-y-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h3 className="text-lg font-bold text-white">주식 / ETF 종목 수정</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 font-medium mb-1">티커 Symbol *</label>
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-zinc-400 font-medium mb-1">통화 선택 *</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'JPY' | 'USD')}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="JPY">JPY (일본 엔화 ￥)</option>
                <option value="USD">USD (미국 달러 $)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 font-medium mb-1">종목명 *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 font-medium mb-1">계좌 유형 *</label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value as Holding['accountType'])}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="NISA_GROWTH">신NISA 성장투자형</option>
                <option value="NISA_TSUMITATE">신NISA 적립투자형</option>
                <option value="SPECIFIC">특정계좌(과세)</option>
                <option value="GENERAL">일반계좌</option>
                <option value="IDECO">iDeCo</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-400 font-medium mb-1">보유 수량 (주) *</label>
              <input
                type="number"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 font-medium mb-1">평균 매입가 ({currency}) *</label>
              <input
                type="number"
                step="any"
                value={avgCostPrice}
                onChange={(e) => setAvgCostPrice(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-medium mb-1">현재가 ({currency}) *</label>
              <input
                type="number"
                step="any"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          {currency === 'USD' && (
            <div>
              <label className="block text-zinc-400 font-medium mb-1">USD/JPY 적용 환율 (엔화) *</label>
              <input
                type="number"
                step="any"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          )}

          <div>
            <label className="block text-zinc-400 font-medium mb-1">비고 / 메모 (선택)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 font-medium hover:bg-zinc-700 transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition"
            >
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
