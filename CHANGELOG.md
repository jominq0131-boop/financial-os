# 📝 Financial OS - Changelog

---

## [1.5.0] - 2026-08-01

### Added
- **월간 재정 성과 브리핑 센터 (`MonthlyBriefingCard.tsx`)**:
  - `🚀 관제 요약 (Overview)` 최상단에 배치하여 월 1회 접속 시 첫 화면에서 **전월 대비 순자산 변화액(MoM JPY)** 및 **성장률(% 흑자/적자)**을 브리핑
  - 이번 달 실수령 잉여 여력 및 저축/투자 성과율을 한눈에 파악
  - **원터치 `[📸 이번 달 재정 마감 & 스냅샷 기록]` 버튼**: 클릭 한 번으로 이번 달 순자산/현금/투자 상태를 스냅샷 및 역사 기록으로 자동 저장

---

## [1.4.0] - 2026-08-01

### Added
- **사이드바 & 탭 네비게이션 아키텍처 (Option A)**:
  - `Sidebar.tsx` — 접이식(Collapsible) 데스크톱 사이드바 & 모바일 슬라이드아웃 드로어
  - `Header.tsx` — 고정 상단 네비게이션 바 (모바일 햄버거 토글, 실시간 순자산, 마스킹/설정 빠른 버튼)
  - **4대 도메인 뷰(Domain Views) 분리**: `Overview`, `Assets & Cashflow`, `Intelligence & Milestones`, `Snapshots & Security`

---

## [1.3.0] - 2026-08-01

### Added
- **월간 순자산 스냅샷 & 성장 트래커 (#18)**: 매월 순자산을 기록하고 전월 대비 증감액(MoM)을 시각화하는 `SnapshotGrowthChart.tsx` 및 `useSnapshotStore.ts`
- **3개월 치 생활비 비상금 전략 카드 (#20)**: `EmergencyFundCard.tsx`
- **신NISA 상세 한도 트래커 (#19)**: `NisaTrackerCard.tsx`
- **세후 실수익 비교 시뮬레이터 (#21)**: `TaxReturnSection.tsx`
- **목표 저축률 & FIRE 플래너 (#22)**: `SavingsPlannerSection.tsx`
- **인라인 수정(Edit) 모달**: `EditAssetModal.tsx`, `EditCashflowModal.tsx`, `EditEventModal.tsx`
- **개인 재정 관제 설정 모달**: `SettingsModal.tsx` 및 `useSettingsStore.ts`
