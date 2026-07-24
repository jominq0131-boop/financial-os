# 📝 Financial OS - Changelog

프로젝트의 주요 변경사항 및 버전 기록입니다.

---

## [Unreleased]

### Added
- **Issue #1**: Next.js 15+ App Router, TypeScript, Tailwind CSS, ESLint 기반 프로젝트 초기 세팅
- **Issue #2**: Apple Health 스타일의 미니멀 대시보드 UI (총 자산, FIRE 진행률, 예상 월 자가배당, NISA 진행률 더미 카드 4개 구현)
- **Issue #3**: Asset Model 및 Zustand 전역 자산 스토어 (`useAssetStore`), 자산 카테고리별 관리 UI (`AssetSection`), 자산 추가 모달 (`AddAssetModal`), 금액 마스킹(Privacy Toggle `👁️`/`🙈`) 구현
- **Issue #4**: Financial Runway 연산 엔진 (`runwayEngine.ts`), 월 현금흐름 스토어 (`useCashflowStore`), 생존 가능 기간 게이지 & 수입/지출 관리 카드 (`RunwaySection`) 구현
- **Issue #5**: 3-Tier 자본 배치 버킷 관리자 (`BucketSection`), 목표 비중 조율 슬라이더, 실시간 자산 비중 연산 및 스마트 리밸런싱 스마트 가이드 뱃지 구현
- **Project Memory System**: `README.md`, `PROJECT_RULES.md`, `ROADMAP.md`, `CHANGELOG.md`, `TODO.md` 메모리 파일 구축
