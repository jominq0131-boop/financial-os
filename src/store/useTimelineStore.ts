import { create } from 'zustand';
import { LifeEvent } from '@/types/timeline';

interface TimelineStore {
  events: LifeEvent[];
  currentAge: number;
  
  // Actions
  setCurrentAge: (age: number) => void;
  addEvent: (event: Omit<LifeEvent, 'id'>) => void;
  deleteEvent: (id: string) => void;
  
  // Computed
  getSortedEvents: () => LifeEvent[];
  getTotalRequiredTarget: () => number;
}

const INITIAL_EVENTS: LifeEvent[] = [
  {
    id: 'evt-1',
    title: '내 집 마련 & 정주 공간 확충',
    targetAge: 38,
    targetYear: 2030,
    requiredAmount: 200000000,
    category: 'HOUSING',
    priority: 'CRITICAL',
    description: '실물 보증금 증액 및 대출 상환 목돈',
  },
  {
    id: 'evt-2',
    title: '1년 해외 안식년 & 탐험',
    targetAge: 42,
    targetYear: 2034,
    requiredAmount: 50000000,
    category: 'SABBATICAL',
    priority: 'HIGH',
    description: '가족 세계 여행 및 배움의 시간',
  },
  {
    id: 'evt-3',
    title: 'Financial Freedom & 완전 조기 은퇴',
    targetAge: 50,
    targetYear: 2042,
    requiredAmount: 500000000,
    category: 'RETIREMENT',
    priority: 'CRITICAL',
    description: '자가배당으로 완벽한 자립 달성',
  },
];

export const useTimelineStore = create<TimelineStore>((set, get) => ({
  events: INITIAL_EVENTS,
  currentAge: 34,

  setCurrentAge: (age) => set({ currentAge: age }),

  addEvent: (newEvent) => {
    const event: LifeEvent = {
      ...newEvent,
      id: `evt-${Date.now()}`,
    };
    set((state) => ({ events: [...state.events, event] }));
  },

  deleteEvent: (id) => {
    set((state) => ({ events: state.events.filter((e) => e.id !== id) }));
  },

  getSortedEvents: () => {
    return [...get().events].sort((a, b) => a.targetAge - b.targetAge);
  },

  getTotalRequiredTarget: () => {
    return get().events.reduce((sum, e) => sum + e.requiredAmount, 0);
  },
}));
