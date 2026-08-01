import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RoutineItem {
  id: string;
  label: string;
  description: string;
  emoji: string;
  xp: number; // XP points on completion
}

export const FIRE_ROUTINES: RoutineItem[] = [
  {
    id: 'routine-savings-transfer',
    label: '저축 이체 완료',
    description: '이번 달 저축/비상금 계좌로 자동/수동 이체 완료 확인',
    emoji: '🏦',
    xp: 30,
  },
  {
    id: 'routine-nisa-invest',
    label: '신NISA 적립 납입 확인',
    description: '이번 달 신NISA 월 적립 납입이 정상 처리되었는지 확인',
    emoji: '📈',
    xp: 30,
  },
  {
    id: 'routine-spending-log',
    label: '월간 지출 온도계 기록',
    description: '지출 온도계 카드에서 이번 달 카테고리별 실제 지출액 기록 완료',
    emoji: '🌡️',
    xp: 20,
  },
  {
    id: 'routine-snapshot',
    label: '월간 총자산 스냅샷 저장',
    description: '성장이력 탭에서 이번 달 총자산 스냅샷을 기록하고 저장 완료',
    emoji: '📸',
    xp: 20,
  },
  {
    id: 'routine-portfolio-check',
    label: '포트폴리오 현황 점검',
    description: '자산 현황 탭에서 주식/채권/현금 비중을 확인하고 리밸런싱 필요 여부 검토',
    emoji: '⚖️',
    xp: 20,
  },
  {
    id: 'routine-fire-progress',
    label: 'FIRE 목표 달성률 확인',
    description: '이번 달 FIRE 목표 달성률 및 예상 달성 날짜를 확인',
    emoji: '🔥',
    xp: 10,
  },
  {
    id: 'routine-nisa-limit',
    label: '연간 NISA 한도 잔여 확인',
    description: '올해 남은 신NISA 연간 투자 한도를 확인하고 추가 납입 여력 파악',
    emoji: '🎯',
    xp: 10,
  },
];

export const MAX_XP_PER_MONTH = FIRE_ROUTINES.reduce((s, r) => s + r.xp, 0);

export interface MonthlyRoutineRecord {
  month: string; // "2026-07"
  completedIds: string[];
}

interface RoutineStore {
  records: MonthlyRoutineRecord[];
  getRecord: (month: string) => MonthlyRoutineRecord | undefined;
  toggleRoutine: (month: string, routineId: string) => void;
  getMonthXP: (month: string) => number;
  getCompletionRate: (month: string) => number;
}

export const useRoutineStore = create<RoutineStore>()(
  persist(
    (set, get) => ({
      records: [],

      getRecord: (month) => get().records.find((r) => r.month === month),

      toggleRoutine: (month, routineId) => {
        set((state) => {
          const existing = state.records.find((r) => r.month === month);
          if (existing) {
            const alreadyDone = existing.completedIds.includes(routineId);
            return {
              records: state.records.map((r) =>
                r.month === month
                  ? {
                      ...r,
                      completedIds: alreadyDone
                        ? r.completedIds.filter((id) => id !== routineId)
                        : [...r.completedIds, routineId],
                    }
                  : r
              ),
            };
          }
          return {
            records: [
              ...state.records,
              { month, completedIds: [routineId] },
            ],
          };
        });
      },

      getMonthXP: (month) => {
        const record = get().getRecord(month);
        if (!record) return 0;
        return FIRE_ROUTINES.filter((r) => record.completedIds.includes(r.id)).reduce(
          (s, r) => s + r.xp,
          0
        );
      },

      getCompletionRate: (month) => {
        const record = get().getRecord(month);
        if (!record) return 0;
        return Math.round((record.completedIds.length / FIRE_ROUTINES.length) * 100);
      },
    }),
    { name: 'financial-os-routines' }
  )
);
