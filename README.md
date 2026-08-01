# 🚀 Financial OS · Japan Edition (v1.3)

> **"Financial OS는 일본에 거주하는 한국인이 자산(엔화 ￥ 기준), 현금흐름, 신NISA, 50년 생애 주기를 단 하나의 멀티 컬럼 관제 앱에서 총괄 제어하는 개인 재정 관제 시스템입니다."**

---

## 📌 핵심 특징

### 🌏 일본 거주 한국인 완전 맞춤형
- 모든 화면 메뉴, 카드, 모달, 안내 문구는 **한국어**로 제공됩니다.
- 모든 금액 연산은 **일본 엔화(JPY ￥)** 기준으로 일관 처리됩니다.
- **신NISA (新NISA)**: 성장투자틀(240만엔) + 적립틀(120만엔) = 연간 360만엔 비과세 및 1,800만엔 생애한도 자동 집계
- **3개월 치 생활비 비상금 전략**: 비상금 미달성 시 "저축 100%", 달성 완료 시 "NISA/투자 100%" 자동 지침 제공
- **iDeCo 옵션 설정**: 회사 iDeCo 미제공 시 UI에서 비활성화 토글 지원

### 📱 멀티 컬럼 관제 대시보드 (Redesign)
- 세로 나열 방식에서 2컬럼/3컬럼 모듈형 관제 대시보드 레이아웃(`max-w-7xl`)으로 개편하여 한눈에 조망 가능
- **좌측 관제 레이어**: 자산 포트폴리오, 현금흐름 탱크, 3개월 비상금 전략, 3-Tier 자본 배치
- **우측 인텔리전스 레이어**: 월간 순자산 스냅샷, 신NISA 한도, 세후 실수익 시뮬레이터, 목표 저축률 플래너, 50년 전망 차트, 스트레스 테스트

### 📸 월간 순자산 스냅샷 & 성장 트래커
- 매월 자산 현황을 스냅샷으로 저장하여 월별 증감액(MoM) 및 성장률 차트 제공

### ✏️ 자산 · 현금흐름 · 생애 이벤트 인라인 수정 (Edit) 모달
- 기존 자산, 수입/지출 항목, 생애 마일스톤 이벤트를 언제든지 인라인 모달로 즉시 수정 가능

### 🔒 Privacy-First & 영구 로컬 저장
- 외부 서버 없이 브라우저 `localStorage`에 자산·현금흐름·이벤트 데이터를 **영구 보존**합니다.
- 새로고침하거나 브라우저를 닫아도 입력한 모든 데이터가 자동 복원됩니다.
- 금액 마스킹(Privacy Mode 👁️/🙈)으로 민감한 숫자를 원터치로 숨깁니다.
- JSON **백업 내보내기(Export) & 복원(Import)** 기능으로 데이터를 안전하게 이동·보관합니다.

---

## 🛠️ 기술 스택

| 구분 | 사용 기술 |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (Strict Mode) |
| Styling | Tailwind CSS + Glassmorphism |
| State & Storage | Zustand + `persist` middleware (`localStorage`) |
| Visualization | Recharts (Area Chart, Composed Chart) |
| Icons | Lucide React |

---

## 🚀 빠른 시작

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드 검증
npm run build
```

브라우저에서 `http://localhost:3000` 접속.

---

## 📋 현재 진행 현황

**Phase 1 ~ Phase 5 완료 (이슈 #1 ~ #22)**  
→ 자세한 상세 내역은 [ROADMAP.md](./ROADMAP.md) 및 [CHANGELOG.md](./CHANGELOG.md) 참조
