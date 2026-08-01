# 📝 Financial OS - Changelog

---

## [1.2.0] - 2026-08-01

### Added
- **Tooltip 설명 시스템**: 자산 카테고리, 버킷 Tier, 모든 주요 지표 항목에 `?` 도움말 팝업 추가 (`Tooltip.tsx` 공통 컴포넌트)
- **Hydration Error 해결**: `useHydrated()` 훅 도입으로 Zustand persist + Next.js App Router 환경에서의 SSR/CSR 불일치 에러 완전 제거
- **Git 자동 커밋/푸시 의무화**: `PROJECT_RULES.md`에 빌드 성공 후 자동 `git push origin main` 규칙 명시화
- **한국어 전면화 (2차 전수 검사)**: `LiquidityMatrix`, `TimePriceCalculator` 등 잔존 일본어 텍스트 완전 제거
- **엔화(JPY ￥) 통화 표기 통일**: `₩`, `KRW` 표기를 `formatJPY()` / `formatJPYShort()` 함수로 전체 일괄 교체
- `useHydrated.ts` — 마운트 이후에만 `localStorage` 데이터를 사용하도록 처리하는 클라이언트 전용 훅

### Changed
- `asset.ts` — `CATEGORY_LABELS` 및 `TIER_LABELS`에 한국어 description 필드 추가 (Tooltip에 활용)
- `AddAssetModal.tsx` — 평가 금액 입력 라벨을 `(원)` → `(엔 / JPY)`로 수정
- `RunwaySection.tsx` — 현금흐름 입력 placeholder를 `(원)` → `(엔화 금액)` 으로 수정
- `page.tsx` — `useHydrated` 적용, 초기 렌더 시 KPI 카드 값을 안전한 기본값으로 표시

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
