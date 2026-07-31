# 🗺️ Financial OS - Product Roadmap

일본 거주 한국인을 위한 로컬라이징, 데이터 영구 저장, 변경 이력 누적 트래킹 기능이 포함된 구현 로드맵입니다.

---

### 🟢 Phase 1: MVP Core Foundation & Minimal Dashboard (완료)
- [x] **Issue #1**: Next.js 16 App Router, TypeScript, Tailwind CSS 프로젝트 환경 구축
- [x] **Issue #2**: Dashboard UI - Apple Health 스타일 미니멀 카드 4종 (총 자산, FIRE 진행률, 예상 월 자가배당, NISA 진행률)
- [x] **Issue #3**: Asset Model & Management UI - 자산 항목(현금, 주식, 부동산, NISA, iDeCo) 등록/마스킹 및 뷰 컴포넌트

---

### 🟡 Phase 2: Runway Engine & Capital Allocation (완료)
- [x] **Issue #4**: Financial Runway & Surplus Engine - 월 수입/지출 및 소득 중단 시 생존 가능 기간 연산 모듈
- [x] **Issue #5**: 3-Tier Capital Allocation Manager - 안전망(Tier 1), 성장(Tier 2), 미션(Tier 3) 버킷 배분 슬라이더

---

### 🔵 Phase 3: Life Financial Timeline & Simulation (완료)
- [x] **Issue #6**: Life Event Milestone System - 주택 구매, 안식년, 은퇴 등 생애 이벤트 노드 관리 및 타임라인 모듈
- [x] **Issue #7**: Timeline Asset Forecast Chart - 50년 자산 추이 시각화 그래프 (Recharts)
- [x] **Issue #8**: Stress Test Simulator - 시장 하락장(Market Crash -30%), 인플레이션 급등 시나리오 조율기

---

### 🟣 Phase 4: Persistence, History & Localization (완료)
- [x] **Issue #9**: Local Storage Persistence - Zustand `persist` 미들웨어 적용 (새로고침 시 데이터 완벽 보존)
- [x] **Issue #10**: Cumulative History Tracking & Data Backup - 자산 변동 이력 누적 트래킹 (`HistorySection`) 및 JSON 백업/복원
- [x] **Issue #11**: Korean UI + JPY (엔화 ￥) Full Localization - 일본 거주 한국인 맞춤 전면 완결

---

## 🔮 Phase 5: Future Enhancements (예정)
- [ ] **Issue #12**: 환율 동적 변환 엔진 (KRW/USD/EUR ↔ JPY 실시간 환율 연동)
- [ ] **Issue #13**: 월별 자산 추이 비교 히스토리 리포트 (Monthly Balance Sheet Snapshot)
