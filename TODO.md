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

### Phase 5: Gamified FIRE Super Dashboard, Cashflow Category & Layout Optimization (완료 — 2026-08-01)
- [x] **#18** 월간 총자산 스냅샷 — 매월 자산 현황 자동 기록 및 월별 증감 추이 차트
- [x] **#18-2** 월간 재정 성과 브리핑 센터 — 전월 대비 자산 변화액(+￥), 흑자/적자 % & 원터치 월말 정산 마감
- [x] **#18-3** 정산년월 수동 선택 및 스냅샷 수정 모달 (`EditSnapshotModal`) — 8월에 7월 데이터 정산 가능
- [x] **#18-4** 버그 3종 긴급 수정 — 버전 동적 반영(`v1.8`), 금액 입력창 '0' 고정 UX 개선
- [x] **#18-5** MoM 스냅샷 비교 엔진 전면 재설계 — 8월초 7월/6월 정산 스냅샷 비교 연산 정상화(`+5만엔`)
- [x] **#18-6** '순자산' ➔ '총자산 (Total Assets)' 전면 단어 개편 완료
- [x] **#18-7** 자산 금액 축약 표기(30만엔) 전면 금지 ➔ 100% 실수치(`￥301,000`) 표기 완결
- [x] **#18-8** 게이밍 레벨 난이도 곡선 전면 재조정 (10만~20만엔 점진적 구간으로 30.1만엔 시 Lv.3 즉시 달성!)
- [x] **#18-9** 실전 목표 달성도 & 저축 페이스 예측 센터 신설 (`GoalTrackerSection.tsx`)
- [x] **#18-10** 신규 현금흐름 등록 폼 카테고리(주거/식비/고정비/여가/투자) 선택 드롭다운 탑재
- [x] **#18-11** 현금흐름 리스트 항목별 지출 카테고리 배지(🏠 주거, 🍚 식비 등) 개별 시각 표시
- [x] **#18-12** 중복 지표 정리 및 한눈에 보이는 대시보드 구획 재배치 완결
- [x] **#19** 게이밍 재정 성장 랭킹 & FIRE 퀘스트 업적 카드 (`FinancialLevelCard.tsx`) — Lv.1~99 XP 바 및 4대 배지
- [x] **#20** 지출 세부 카테고리별 비중 분석 도넛 차트 (`RunwaySection.tsx`) — 주거/식비/고정비/여가/투자
- [x] **#21** 신NISA 상세 관리 — 성장투자틀(240만엔)/적립틀(120만엔) 및 생애 한도(1800만엔) 집계
- [x] **#22** 3개월 치 생활비 비상금 전략 카드 (`EmergencyFundCard.tsx`)
- [x] **#22-2** 사이드바 & 탭 네비게이션 — 4대 도메인 뷰(Overview, Assets, Intelligence, Security) 분리

### Phase 6: 100% Free GitHub Pages Deployment (완료 — 2026-08-01)
- [x] **#23** Next.js static export (`output: 'export'`) & `.github/workflows/deploy.yml` 자동 배포 연동
- [x] **#24** 브라우저 전용 `localStorage` 개인 재정 정보 보안 호환성 검증

### Phase 8-2: 주식/ETF 보유 종목 수익률 기록기 (완료 — 2026-08-01)
- [x] **#30** 주식/ETF 보유 종목 수익률 기록기 (`StockPortfolioSection.tsx`) — 티커, 수량, 평균 매입가, 현재가(수기), 통화(JPY/USD) 및 환율 적용 평가손익(%) 자산 탭 연동 및 `useHoldingStore` 탑재

---

## 🌟 Next Recommended Tasks (다음 추천 작업 후보)

- [ ] **#31** 연간 세금/공제 캘린더 (일본 확정신고 3월, 주민세 6월 등 세무 일정 알림 - iDeCo 제외)
- [ ] **#32** 재정 일지 (Financial Journal - 매월 투자 사유, 감정 상태, 특이사항 메모 기능)
