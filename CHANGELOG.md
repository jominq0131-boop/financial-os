# 📝 Financial OS - Changelog

---

## [1.3.0] - 2026-08-01

### Added
- **멀티 컬럼 반응형 관제 대시보드 (Redesign)**: `max-w-7xl` 넓은 화면을 활용한 2컬럼/3컬럼 관제 센터 그리드 배치 개편
- **월간 순자산 스냅샷 & 성장 트래커 (#18)**: 매월 순자산을 기록하고 전월 대비 증감액(MoM)을 시각화하는 `SnapshotGrowthChart.tsx` 및 `useSnapshotStore.ts`
- **3개월 치 생활비 비상금 전략 카드 (#20)**: 월 지출 x 3개월 비상금 달성 현황 점검 및 "100% 저축" vs "100% NISA/주식 투자" 자동 지침 제공 카드 (`EmergencyFundCard.tsx`)
- **신NISA 상세 한도 트래커 (#19)**: 실제 등록된 NISA 자산을 동적 자동 집계하여 연간한도(360만엔) 및 생애한도(1800만엔) 소진율 표시 카드 (`NisaTrackerCard.tsx`)
- **세후 실수익 비교 시뮬레이터 (#21)**: 일본 과세 계좌(20.315%) vs 신NISA 비과세 계좌 수익률 및 절세 이득액 비교 (`TaxReturnSection.tsx`)
- **목표 저축률 & FIRE 플래너 (#22)**: 목표 은퇴 연령 기준 복리 역산 필요 월 저축액 및 저축률 연산 (`SavingsPlannerSection.tsx`)
- **인라인 수정(Edit) 모달**:
  - `EditAssetModal.tsx` — 기존 자산 항목명, 금액, 기대수익률, 비고 수정
  - `EditCashflowModal.tsx` — 현금흐름 수입/지출 항목명, 금액, 필수여부 수정
  - `EditEventModal.tsx` — 생애 이벤트 연령, 필요자금, 카테고리 수정
- **개인 재정 관제 설정 모달**: `SettingsModal.tsx` 및 `useSettingsStore.ts` — 사용자 연령(34세 등 동적 변경), 비상금 개월 수(3개월), iDeCo 미사용자용 온/오프 토글, FIRE 목표금액 설정

### Changed
- **ForecastChart**: 자산 규모에 따라 축 단위가 `만 엔` ↔ `억 엔`으로 자동 전환되도록 로직 개선
- **AssetSection / RunwaySection / LifeEventSection**: 각 카드 우측 상단 호버 시 수정(Edit ✏️) 버튼 연동

---

## [1.2.0] - 2026-08-01

### Added
- **Tooltip 설명 시스템**: 자산 카테고리, 버킷 Tier, 모든 주요 지표 항목에 `?` 도움말 팝업 추가 (`Tooltip.tsx` 공통 컴포넌트)
- **Hydration Error 해결**: `useHydrated()` 훅 도입으로 Zustand persist + Next.js App Router 환경에서의 SSR/CSR 불일치 에러 완전 제거
- **Git 자동 커밋/푸시 의무화**: `PROJECT_RULES.md`에 빌드 성공 후 자동 `git push origin main` 규칙 명시화
- **한국어 전면화 (2차 전수 검사)**: `LiquidityMatrix`, `TimePriceCalculator` 등 잔존 일본어 텍스트 완전 제거
- **엔화(JPY ￥) 통화 표기 통일**: `₩`, `KRW` 표기를 `formatJPY()` / `formatJPYShort()` 함수로 전체 일괄 교체
- `useHydrated.ts` — 마운트 이후에만 `localStorage` 데이터를 사용하도록 처리하는 클라이언트 전용 훅

---

## [1.1.0] - 2026-08-01

### Added
- **Data Persistence**: Zustand `persist` 미들웨어 적용 (useAssetStore, useCashflowStore, useTimelineStore, useHistoryStore)
- **Cumulative History Tracking**: `useHistoryStore` + `HistorySection.tsx` — 자산/현금흐름 변동 이력 자동 누적 기록
- **JSON Backup & Restore**: 전체 재정 데이터 Export/Import 기능
- **Korean UI + JPY Localization (1차)**: 대시보드 및 모달 한국어 전환, 엔화 ￥ 기준 통화 처리

---

## [1.0.0] - 2026-07-31

### Added
- **Phase 1**: Next.js 16, TypeScript, Tailwind CSS 기반 프로젝트 초기 구축
- **Phase 2**: Apple Health 스타일 KPI 대시보드 카드 4종
- **Phase 3**: Asset Model — 자산 카테고리 관리 및 Privacy Mode 마스킹
- **Phase 4**: Financial Runway Engine + Cashflow 현금흐름 관리
- **Phase 5**: 3-Tier Capital Allocation 버킷 배분 슬라이더
- **Phase 6**: Life Event Milestone System 타임라인
- **Phase 7**: 50년 자산 추이 Recharts 시뮬레이션 차트
- **Phase 8**: Stress Test Simulator (Market Crash, 인플레이션, Black Swan)
- **Phase 9**: Time-Price Expenditure Calculator (노동 시간 환산)
- **Phase 10**: Liquidity Matrix & Safety Net 비상금 달성도
