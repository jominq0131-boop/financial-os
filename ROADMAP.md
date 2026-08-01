# 🗺️ Financial OS - Product Roadmap

일본 거주 한국인을 위한 개인 재정 관제 시스템의 전체 로드맵입니다.  
모든 통화는 **엔화(JPY ￥)** 기준이며, UI는 **한국어**로 제공됩니다.

---

## ✅ Phase 1: MVP Core Foundation (완료 — 2026-07-31)

| 이슈 | 기능 | 상태 |
|---|---|:---:|
| #1 | Next.js 16 App Router, TypeScript, Tailwind CSS 프로젝트 환경 구축 | ✅ |
| #2 | Dashboard UI — Apple Health 스타일 KPI 카드 4종 (총자산, FIRE 진척도, 월 배당, 신NISA 한도) | ✅ |
| #3 | Asset Model & Management — 자산 항목(현금, 주식, 신NISA, iDeCo, 부동산) 등록·마스킹 | ✅ |

---

## ✅ Phase 2: Runway Engine & Capital Allocation (완료 — 2026-07-31)

| 이슈 | 기능 | 상태 |
|---|---|:---:|
| #4 | Financial Runway & Surplus Engine — 소득 중단 시 생존 가능 기간(Runway) 연산 | ✅ |
| #5 | 3-Tier Capital Allocation Manager — 안전망/성장/미션 버킷 배분 슬라이더 및 리밸런싱 가이드 | ✅ |

---

## ✅ Phase 3: Life Financial Timeline & Simulation (완료 — 2026-07-31)

| 이슈 | 기능 | 상태 |
|---|---|:---:|
| #6 | Life Event Milestone System — 주택 구매, 안식년, 은퇴 등 생애 이벤트 타임라인 | ✅ |
| #7 | Timeline Asset Forecast Chart — 50년 자산 추이 시각화 (Recharts) | ✅ |
| #8 | Stress Test Simulator — Market Crash(-30%), 인플레이션(+25%), Black Swan 시나리오 | ✅ |
| #9 | Time-Price Expenditure Calculator — 노동 시간 환산 지출 가치 평가기 | ✅ |
| #10 | Liquidity Matrix & Safety Net — 유동성 4단계 매트릭스 및 비상금 달성도 | ✅ |

---

## ✅ Phase 4: Persistence, History & Full Localization (완료 — 2026-08-01)

| 이슈 | 기능 | 상태 |
|---|---|:---:|
| #11 | Local Storage Persistence — Zustand `persist` 미들웨어, 새로고침 후에도 데이터 영구 보존 | ✅ |
| #12 | Cumulative History Tracking — 자산 변동 이력 자동 누적 타임라인 (`useHistoryStore`) | ✅ |
| #13 | JSON Backup & Restore — 전체 재정 데이터 내보내기/가져오기 | ✅ |
| #14 | Korean UI + JPY Full Localization — 전면 한국어 화면 · 엔화 ￥ 기준 완결 | ✅ |
| #15 | Tooltip 설명 시스템 — 모든 항목에 무엇을 의미하는지 설명 팝업 적용 | ✅ |
| #16 | Hydration Error 해결 — `useHydrated()` 훅으로 SSR/CSR 불일치 완전 제거 | ✅ |
| #17 | Auto Git Push 규칙화 — 작업 완료 시 자동 커밋 및 원격 푸시 규칙 적용 | ✅ |

---

## ✅ Phase 5: Gamified FIRE Super Dashboard, Bug Fixes & Navigation (완료 — 2026-08-01)

| 이슈 | 기능 | 상태 |
|---|---|:---:|
| #18 | **월간 순자산 스냅샷 & 성장 트래커** — 매월 자산 현황 스냅샷 및 MoM 성장률 차트 | ✅ |
| #18-2 | **월간 재정 성과 브리핑 센터** — 접속 시 전월 대비 자산 변화액(+￥), 흑자/적자 % & 원터치 월말 정산 마감 | ✅ |
| #18-3 | **정산년월 수동 선택 & 스냅샷 편집 모달** — 8월 1일에 7월 정산 지정 가능 및 `EditSnapshotModal` 추가 | ✅ |
| #18-4 | **버그 3종 긴급 조치 완결** — 버전 동적 반영(`v1.8`), 금액 입력창 '0' 고정 UX 개선, 관제 요약 MoM 연산 정상화 | ✅ |
| #19 | **게이밍 재정 성장 랭킹 & FIRE 퀘스트 업적 시스템** — Lv.1~99 경험치(XP) 바 및 4대 퀘스트 배지 (`FinancialLevelCard.tsx`) | ✅ |
| #20 | **지출 세부 카테고리별 비중 분석 도넛 차트** — 주거비, 식비, 고정비, 여가, 투자 적립 시각화 (`RunwaySection.tsx`) | ✅ |
| #21 | **신NISA 연간/생애 한도 트래커** — 성장투자틀/적립틀 소진율 및 생애 한도(1800만엔) 집계 | ✅ |
| #22 | **3개월 치 생활비 비상금 전략 카드** — 비상금 미달성 시 저축 100%, 달성 시 NISA/투자 100% 가이드 | ✅ |
| #22-2 | **사이드바 & 탭 네비게이션 아키텍처** — 4대 도메인 뷰(Overview, Assets, Intelligence, Security) 분리 | ✅ |

---

## ✅ Phase 6: 100% Free GitHub Pages Deployment (완료 — 2026-08-01)

| 이슈 | 기능 | 상태 |
|---|---|:---:|
| #23 | **GitHub Pages 100% 무료 자동 웹 배포** — `output: 'export'` 정적 빌드 및 `.github/workflows/deploy.yml` | ✅ |
| #24 | **브라우저 100% 로컬 데이터 보안 증명** — 백엔드/서버 0%, `localStorage` 전용 개인재정 보호 완결 | ✅ |

---

## 💡 개선 완료 사항 (Completed Improvements)

| 항목 | 이전 상태 | 개선 결과 | 상태 |
|---|---|---|:---:|
| 입력 창 UX | 백스페이스 시 '0' 남아있음 | 지웠을 때 빈칸(`""`) 처리되어 수치 입력이 매우 자유로움 | ✅ |
| 관제 요약 MoM | 0엔 고정 버그 | 전월 스냅샷 정밀 탐색 연산으로 `+5만엔` 등 정상 수치 표기 | ✅ |
| 버전 표기 | v1.3 하드코딩 | `APP_VERSION = 'v1.8'` 전역 상수로 동적 변경 완결 | ✅ |
| 대시보드 경험 | 단조로운 숫자 나열 | Lv.1~99 재정 레벨, XP 바 & 4대 FIRE 퀘스트 배지 시스템 신설 | ✅ |
| 월 지출 분석 | 단순 필수/변동 구분 | 주거/식비/고정비/여가/투자 세부 카테고리화 & 도넛 차트 시각화 | ✅ |
| 웹 접속 방법 | `npm run dev` 필요 | GitHub Pages 100% 무료 웹 상시 접속 (`output: export`) | ✅ |
