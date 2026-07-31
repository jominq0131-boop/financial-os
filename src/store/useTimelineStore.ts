import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LifeEvent } from '@/types/timeline';
import { useHistoryStore } from './useHistoryStore';

interface TimelineStore {
  events: LifeEvent[];
  currentAge: number;
  setCurrentAge: (age: number) => void;
  addEvent: (event: Omit<LifeEvent, 'id'>) => void;
  deleteEvent: (id: string) => void;
  getSortedEvents: () => LifeEvent[];
  getTotalRequiredTarget: () => number;
}

const INITIAL_EVENTS: LifeEvent[] = [
  {
    id: 'evt-1',
    title: '내 집 마련 / 주거 안착',
    targetAge: 38,
    targetYear: 2030,
    requiredAmount: 5000000,    // 500만엔 (계약금 및 초기비용)
    category: 'HOUSING',
    priority: 'CRITICAL',
    description: '도쿄/인근 맨션 구매 계약금 및 이사 비용',
  },
  {
    id: 'evt-2',
    title: '1년 안식년 및 해외 재충전',
    targetAge: 42,
    targetYear: 2034,
    requiredAmount: 3000000,    // 300만엔
    category: 'SABBATICAL',
    priority: 'HIGH',
    description: '새로운 도전 및 해외 체류를 위한 안식년 자금',
  },
  {
    id: 'evt-3',
    title: 'Financial Freedom (조기 FIRE 달성)',
    targetAge: 50,
    targetYear: 2042,
    requiredAmount: 50000000,   // 5000만엔 (4% 룰 적용 연 200만엔 인출)
    category: 'RETIREMENT',
    priority: 'CRITICAL',
    description: '배당 및 자산 소득만으로 완전 자립 생활',
  },
];

export const useTimelineStore = create<TimelineStore>()(
  persist(
    (set, get) => ({
      events: INITIAL_EVENTS,
      currentAge: 34,

      setCurrentAge: (age) => set({ currentAge: age }),

      addEvent: (newEvent) => {
        const event: LifeEvent = { ...newEvent, id: `evt-${Date.now()}` };
        set((state) => ({ events: [...state.events, event] }));
        useHistoryStore.getState().addLog({
          type: 'TIMELINE',
          action: 'ADD',
          title: `생애 마일스톤 추가: ${event.title}`,
          detail: `목표연령: ${event.targetAge}세 | 필요자금: ￥${event.requiredAmount.toLocaleString()}`,
        });
      },

      deleteEvent: (id) => {
        const target = get().events.find((e) => e.id === id);
        set((state) => ({ events: state.events.filter((e) => e.id !== id) }));
        if (target) {
          useHistoryStore.getState().addLog({
            type: 'TIMELINE',
            action: 'DELETE',
            title: `마일스톤 삭제: ${target.title}`,
            detail: `목표금액: ￥${target.requiredAmount.toLocaleString()}`,
          });
        }
      },

      getSortedEvents: () =>
        [...get().events].sort((a, b) => a.targetAge - b.targetAge),

      getTotalRequiredTarget: () =>
        get().events.reduce((sum, e) => sum + e.requiredAmount, 0),
    }),
    {
      name: 'financial-os-timeline',
    }
  )
);
