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

## 🔮 Phase 5: Financial Intelligence Layer (예정 — 2026 Q3)

> 현재 Phase 4까지 완성된 기반 위에 실질적인 재정 인텔리전스를 추가하는 단계

| 이슈 | 기능 | 우선순위 |
|---|---|:---:|
| #18 | **월간 순자산 스냅샷** — 매월 자산 현황을 자동으로 기록해 월별 증감 추이 비교 차트 제공 | 🔴 High |
| #19 | **신NISA 연간 한도 관리** — 성장투자틀(240만엔) · 적립틀(120만엔) 소진 현황 및 잔여 한도 계산 | 🔴 High |
| #20 | **iDeCo 납입 한도 트래커** — 직장인/자영업자 구분 월납입 한도 및 소득공제 혜택 금액 계산 | 🟡 Medium |
| #21 | **세후 실수익 계산기** — 신NISA/iDeCo/일반 계좌별 세금(20.315%) 차감 후 실질 수익률 표시 | 🟡 Medium |
| #22 | **목표 저축률 플래너** — FIRE 목표 달성을 위한 월별 목표 저축액 · 투자액 자동 역산 | 🟡 Medium |

---

## 🌟 Phase 6: Multi-Currency & Integration (예정 — 2026 Q4)

| 이슈 | 기능 | 우선순위 |
|---|---|:---:|
| #23 | **환율 변환 엔진** — KRW/USD/EUR ↔ JPY 수동 환율 입력으로 해외 자산 엔화 환산 | 🟡 Medium |
| #24 | **한국 자산 연동** — 한국 주식/부동산/예금도 엔화 환산하여 전체 글로벌 포트폴리오 관리 | 🟢 Low |
| #25 | **QR 코드 & 공유 기능** — 개인 재정 요약 리포트를 이미지/PDF로 내보내기 | 🟢 Low |

---

## 💡 개선 제안 사항 (Known Improvements)

| 항목 | 현재 상태 | 개선 방향 |
|---|---|---|
| 자산 수정 기능 | 추가/삭제만 가능 | 인라인 편집(Edit) 모달 추가 |
| 현금흐름 수정 기능 | 추가/삭제만 가능 | 항목별 금액 편집 기능 추가 |
| 생애 이벤트 수정 | 추가/삭제만 가능 | 이벤트 수정 모달 추가 |
| 현재 연령 설정 | 고정값(34) | 설정 페이지 또는 인라인 편집 |
| NISA 적립액 | 하드코딩(295만엔) | 실제 자산 데이터 자동 집계 연동 |
| 차트 축 단위 | 억엔 고정 | 자산 규모에 따라 만엔/억엔 자동 전환 |
