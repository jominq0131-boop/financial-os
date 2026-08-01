import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NetWorthSnapshot {
  id: string;
  date: string; // YYYY-MM 형식 또는 YYYY-MM-DD
  netWorth: number;
  totalCash: number;
  totalInvestments: number;
  note?: string;
}

interface SnapshotState {
  snapshots: NetWorthSnapshot[];
  addSnapshot: (snapshot: Omit<NetWorthSnapshot, 'id'>) => void;
  deleteSnapshot: (id: string) => void;
  updateSnapshot: (id: string, updatedFields: Partial<NetWorthSnapshot>) => void;
  resetSnapshots: () => void;
}

const DEFAULT_SNAPSHOTS: NetWorthSnapshot[] = [
  {
    id: 'snap-2026-05',
    date: '2026-05',
    netWorth: 22800000,
    totalCash: 7500000,
    totalInvestments: 15300000,
    note: '5월 정기 저축 & 주식 매수',
  },
  {
    id: 'snap-2026-06',
    date: '2026-06',
    netWorth: 24100000,
    totalCash: 8000000,
    totalInvestments: 16100000,
    note: '6월 보너스 정산 & 배당금 재투자',
  },
  {
    id: 'snap-2026-07',
    date: '2026-07',
    netWorth: 25300000,
    totalCash: 8500000,
    totalInvestments: 16800000,
    note: '7월 평가익 상승 및 월 정기 납입',
  },
];

export const useSnapshotStore = create<SnapshotState>()(
  persist(
    (set) => ({
      snapshots: DEFAULT_SNAPSHOTS,
      addSnapshot: (snapshotData) =>
        set((state) => {
          const newSnapshot: NetWorthSnapshot = {
            ...snapshotData,
            id: `snap-${Date.now()}`,
          };
          // 같은 날짜/월 스냅샷이 이미 있으면 덮어쓰거나 최신순 정렬
          const filtered = state.snapshots.filter((s) => s.date !== snapshotData.date);
          const updated = [...filtered, newSnapshot].sort((a, b) => a.date.localeCompare(b.date));
          return { snapshots: updated };
        }),
      deleteSnapshot: (id) =>
        set((state) => ({
          snapshots: state.snapshots.filter((s) => s.id !== id),
        })),
      updateSnapshot: (id, updatedFields) =>
        set((state) => {
          const updated = state.snapshots.map((s) =>
            s.id === id ? { ...s, ...updatedFields } : s
          );
          return { snapshots: updated.sort((a, b) => a.date.localeCompare(b.date)) };
        }),
      resetSnapshots: () => set({ snapshots: DEFAULT_SNAPSHOTS }),
    }),
    {
      name: 'financial-os-snapshots',
    }
  )
);
