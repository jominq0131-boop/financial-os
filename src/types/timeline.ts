export type EventCategory = 'HOUSING' | 'EDUCATION' | 'SABBATICAL' | 'RETIREMENT' | 'DREAM';
export type EventPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'OPTIONAL';

export interface LifeEvent {
  id: string;
  title: string;
  targetAge: number;
  targetYear: number;
  requiredAmount: number; // 필요 자금 (KRW)
  category: EventCategory;
  priority: EventPriority;
  description?: string;
}

export const EVENT_CATEGORY_LABELS: Record<EventCategory, { label: string; color: string; icon: string }> = {
  HOUSING: { label: '주택 / 부동산', color: 'emerald', icon: '🏠' },
  EDUCATION: { label: '교육 / 자녀', color: 'indigo', icon: '🎓' },
  SABBATICAL: { label: '안식년 / 여행', color: 'amber', icon: '✈️' },
  RETIREMENT: { label: '은퇴 / 노후', color: 'cyan', icon: '🌴' },
  DREAM: { label: '꿈 / 창업 / 벤처', color: 'purple', icon: '🚀' },
};
