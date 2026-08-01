# 📌 Financial OS - Current TODO Status

현재까지 완료된 작업 및 다음에 진행할 작업 목록입니다.

---

## ✅ Sprint History (완료된 전체 이슈 목록)

### Phase 1: MVP Core
- [x] **#1** Next.js 16 App Router, TypeScript, Tailwind CSS, ESLint 프로젝트 구축
- [x] **#2** KPI 대시보드 카드 4종 (총자산, FIRE 진척도, 월 배당, 신NISA 한도)
- [x] **#3** 자산 포트폴리오 (현금/주식/신NISA/iDeCo/부동산) 등록·삭제·마스킹

### Phase 2: Runway & Capital
- [x] **#4** Financial Runway Engine (소득 중단 시 생존 가능 기간 연산)
- [x] **#5** 3-Tier 자본 배치 버킷 슬라이더 및 리밸런싱 가이드

### Phase 3: Simulation & Defense
- [x] **#6** 생애 주기 이정표 타임라인 (주택 구매, 안식년, FIRE 은퇴)
- [x] **#7** 50년 자산 추이 Recharts 시각화 차트 (복리 시뮬레이션)
- [x] **#8** 위기 대응 스트레스 테스트 (Market Crash, 인플레이션, Black Swan)
- [x] **#9** 시간-가격 지출 가치 평가기 (Time-Price Calculator)
- [x] **#10** 유동성 매트릭스 & 비상금 방어망 달성도

### Phase 4: Persistence & Localization
- [x] **#11** Zustand persist → localStorage 영구 저장 적용 (전체 스토어)
- [x] **#12** 누적 변동 이력 트래킹 (`useHistoryStore` + `HistorySection`)
- [x] **#13** JSON 백업 내보내기(Export) & 복원(Import)
- [x] **#14** 전면 한국어 UI + 일본 엔화(JPY ￥) 기준 통화 완결 (모든 컴포넌트)
- [x] **#15** Tooltip 설명 시스템 (모든 항목에 도움말 팝업 적용)
- [x] **#16** Hydration 에러 해결 (`useHydrated()` 훅 도입)
- [x] **#17** Git 자동 커밋 & 푸시 의무화 (PROJECT_RULES.md에 강제 규칙화)

---

## 🔮 Phase 5: Financial Intelligence Layer (다음 예정)

> **우선순위 High:**
- [ ] **#18** 월간 순자산 스냅샷 — 매월 자산 현황 자동 기록 및 월별 증감 추이 차트
- [ ] **#19** 신NISA 상세 관리 — 성장투자틀(240만엔)/적립틀(120만엔) 소진 현황 및 잔여 한도 계산

> **우선순위 Medium:**
- [ ] **#20** iDeCo 납입 한도 트래커 — 직장인/자영업자 구분, 소득공제 혜택 금액 계산
- [ ] **#21** 세후 실수익 계산기 — 신NISA/iDeCo/일반 계좌별 세금(20.315%) 차감 실질 수익률
- [ ] **#22** 목표 저축률 플래너 — FIRE 목표 달성을 위한 월별 필요 저축액 자동 역산

---

## 🐛 알려진 개선 필요 항목

- [ ] 자산 수정(Edit) 기능 — 현재 추가/삭제만 가능, 인라인 편집 모달 필요
- [ ] 현금흐름 항목 수정 기능 — 현재 추가/삭제만 가능
- [ ] 생애 이벤트 수정 기능 — 현재 추가/삭제만 가능
- [ ] 현재 연령 설정 — 하드코딩(34) → 사용자 편집 가능하게 변경
- [ ] 신NISA 적립액 — 하드코딩(295만엔) → 실제 자산 데이터에서 자동 집계
