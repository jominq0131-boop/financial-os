# 📝 Financial OS - Changelog

---

## [1.4.0] - 2026-08-01

### Added
- **사이드바 & 탭 네비게이션 아키텍처 (Option A)**:
  - `Sidebar.tsx` — 접이식(Collapsible) 데스크톱 사이드바 & 모바일 슬라이드아웃 드로어
  - `Header.tsx` — 고정 상단 네비게이션 바 (모바일 햄버거 토글, 실시간 순자산, 마스킹/설정 빠른 버튼)
  - **4대 도메인 뷰(Domain Views) 분리**:
    1. `🚀 관제 요약 (Overview)`: 4종 KPI + 3개월 비상금 카드 + 신NISA 한도 + 50년 자산 시뮬레이션
    2. `💼 자산 & 현금흐름 (Assets & Cashflow)`: 자산 포트폴리오 + 현금흐름 탱크 + 3-Tier 자본 배치
    3. `🎯 세제 & FIRE 플래너 (Intelligence & Milestones)`: 세후 실수익 시뮬레이터 + 신NISA 트래커 + 목표 저축률 플래너 + 생애 마일스톤
    4. `📊 성장이력 & 데이터 보안 (Snapshots & Security)`: 월간 순자산 스냅샷 차트 + 위기 스트레스 테스트 + 4단계 유동성 매트릭스 + JSON 백업/이력

### Changed
- `page.tsx` — 탭 기반 뷰 분리로 정보 밀도를 대폭 낮추어 1초 만에 필요한 정보에 직관적으로 접근하도록 가독성 극대화

---

## [1.3.0] - 2026-08-01

### Added
- **월간 순자산 스냅샷 & 성장 트래커 (#18)**: 매월 순자산을 기록하고 전월 대비 증감액(MoM)을 시각화하는 `SnapshotGrowthChart.tsx` 및 `useSnapshotStore.ts`
- **3개월 치 생활비 비상금 전략 카드 (#20)**: 월 지출 x 3개월 비상금 달성 현황 점검 및 "100% 저축" vs "100% NISA/주식 투자" 자동 지침 제공 카드 (`EmergencyFundCard.tsx`)
- **신NISA 상세 한도 트래커 (#19)**: 실제 등록된 NISA 자산을 동적 자동 집계하여 연간한도(360만엔) 및 생애한도(1800만엔) 소진율 표시 카드 (`NisaTrackerCard.tsx`)
- **세후 실수익 비교 시뮬레이터 (#21)**: 일본 과세 계좌(20.315%) vs 신NISA 비과세 계좌 수익률 및 절세 이득액 비교 (`TaxReturnSection.tsx`)
- **목표 저축률 & FIRE 플래너 (#22)**: 목표 은퇴 연령 기준 복리 역산 필요 월 저축액 및 저축률 연산 (`SavingsPlannerSection.tsx`)
- **인라인 수정(Edit) 모달**: `EditAssetModal.tsx`, `EditCashflowModal.tsx`, `EditEventModal.tsx`
- **개인 재정 관제 설정 모달**: `SettingsModal.tsx` 및 `useSettingsStore.ts`

---

## [1.2.0] - 2026-08-01

### Added
- **Tooltip 설명 시스템**: 자산 카테고리, 버킷 Tier, 모든 주요 지표 항목에 `?` 도움말 팝업 추가 (`Tooltip.tsx` 공통 컴포넌트)
- **Hydration Error 해결**: `useHydrated()` 훅 도입으로 Zustand persist + Next.js App Router 환경에서의 SSR/CSR 불일치 에러 완전 제거
- **Git 자동 커밋/푸시 의무화**: `PROJECT_RULES.md`에 빌드 성공 후 자동 `git push origin main` 규칙 명시화
