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

### Phase 5: Gamified FIRE Super Dashboard & Bug Fixes (완료 — 2026-08-01)
- [x] **#18** 월간 순자산 스냅샷 — 매월 자산 현황 자동 기록 및 월별 증감 추이 차트
- [x] **#18-2** 월간 재정 성과 브리핑 센터 — 전월 대비 자산 변화액(+￥), 흑자/적자 % & 원터치 월말 정산 마감
- [x] **#18-3** 정산년월 수동 선택 및 스냅샷 수정 모달 (`EditSnapshotModal`) — 8월에 7월 데이터 정산 가능
- [x] **#18-4** 버그 3종 긴급 수정 — 버전 동적 반영(`v1.8`), 금액 입력창 '0' 고정 UX 개선, 관제 요약 MoM 연산 정상화
- [x] **#19** 게이밍 재정 성장 랭킹 & FIRE 퀘스트 업적 카드 (`FinancialLevelCard.tsx`) — Lv.1~99 XP 바 및 4대 배지
- [x] **#20** 지출 세부 카테고리별 비중 분석 도넛 차트 (`RunwaySection.tsx`) — 주거/식비/고정비/여가/투자
- [x] **#21** 신NISA 상세 관리 — 성장투자틀(240만엔)/적립틀(120만엔) 및 생애 한도(1800만엔) 집계
- [x] **#22** 3개월 치 생활비 비상금 전략 카드 (`EmergencyFundCard.tsx`)
- [x] **#22-2** 사이드바 & 탭 네비게이션 — 4대 도메인 뷰(Overview, Assets, Intelligence, Security) 분리

### Phase 6: 100% Free GitHub Pages Deployment (완료 — 2026-08-01)
- [x] **#23** Next.js static export (`output: 'export'`) & `.github/workflows/deploy.yml` 자동 배포 연동
- [x] **#24** 브라우저 전용 `localStorage` 개인 재정 정보 보안 호환성 검증

---

## 🌟 Next Recommended Tasks (다음 추천 작업 후보)

- [ ] **#25** 자산 카테고리별 목표 비중(Target Allocation %) 지정 및 리밸런싱 가이드 기능
- [ ] **#26** 50년 은퇴 자산 추이 시뮬레이션 내 인플레이션 변수(연 1~3%) 조절 슬라이더
- [ ] **#27** 월간 저축 성과 달성 시 폭죽/레벨업 애니메이션 효과
