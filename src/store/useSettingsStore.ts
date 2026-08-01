import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserSettings {
  currentAge: number;
  emergencyFundMonths: number;
  useIdeCo: boolean;
  fireTarget: number;
  nisaAnnualLimit: number;
}

interface SettingsState extends UserSettings {
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: UserSettings = {
  currentAge: 34,
  emergencyFundMonths: 3,
  useIdeCo: false, // 회사 iDeCo 미제공 설정 반영
  fireTarget: 50000000, // 5천만 엔
  nisaAnnualLimit: 3600000, // 360만 엔 (성장 240만 + 적립 120만)
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      updateSettings: (newSettings) =>
        set((state) => ({ ...state, ...newSettings })),
      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: 'financial-os-settings',
    }
  )
);
