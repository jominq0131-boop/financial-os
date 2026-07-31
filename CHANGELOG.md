# 📝 Financial OS - Changelog

프로젝트의 주요 변경사항 및 버전 기록입니다.

---

## [1.1.0] - 2026-08-01

### Added
- **Data Persistence (영구 저장 모듈)**: Zustand `persist` 미들웨어 적용 (`useAssetStore`, `useCashflowStore`, `useTimelineStore`). 새로고침이나 재방문 시에도 사용자가 입력한 자산 및 현금흐름 데이터가 브라우저 `localStorage`에 자동 영구 보존됨.
- **Cumulative History Tracking (누적 변동 이력 기록)**:
  - `useHistoryStore` 및 `HistorySection` 대시보드 컴포넌트 추가.
  - 자산/현금흐름/생애 이벤트의 추가, 수정, 삭제 활동 시 타임라인과 함께 시각, 변경 상세 내역이 자동 누적 기록됨.
- **Data Backup & Restore (JSON Export / Import)**:
  - 현재 전체 재정 상태 및 히스토리를 JSON 파일로 저장 및 복원하는 기능 구현.
- **Korean UI & JPY (엔화 ￥) Full Localization**:
  - 일본 거주 한국인을 위한 한국어 UI 메뉴 및 일본 엔화(￥ / 만엔) 기준 통화 연산 완결.
  - 신NISA, iDeCo, 일본 거주 맞춤 설명 탑재 및 샘플 리셋 기능 제공.
- **Automated Documentation & Git Sync**:
  - `README.md`, `ROADMAP.md`, `TODO.md`, `PROJECT_RULES.md`, `CHANGELOG.md` 문서 최신화 및 원격 GitHub 푸시 자동화.

---

## [1.0.0] - 2026-07-31

### Added
- **Issue #1 ~ #8 MVP Core Release**:
  - Next.js 16 App Router, TypeScript, Tailwind CSS 기반 구축
  - Apple Health 스타일 미니멀 대시보드 카드 4종
  - 자산 관리 및 마스킹 (Privacy Mode)
  - Financial Runway & Cashflow Engine
  - 3-Tier 자본 배치 버킷 관리자
  - 生涯 Lifecycle Financial Timeline & 50년 자산 Forecast Chart (Recharts)
  - 위기 대응 스트레스 테스트 시뮬레이터 (Market Crash -30%, 인플레이션)
