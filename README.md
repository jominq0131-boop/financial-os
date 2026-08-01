# 🚀 Financial OS · Japan Edition (v1.4)

> **"Financial OS는 일본에 거주하는 한국인이 자산(엔화 ￥ 기준), 현금흐름, 신NISA, 50년 생애 주기를 4대 도메인 특화 뷰와 사이드바 네비게이션으로 총괄 제어하는 프로덕션 레벨 개인 재정 관제 시스템입니다."**

---

## 📌 핵심 특징

### 📐 사이드바 & 4대 도메인 네비게이션 아키텍처 (New in v1.4)
- **`🚀 관제 요약 (Overview)`**: 4종 KPI 카드 + 3개월 비상금 카드 + 신NISA 한도 + 50년 자산 시뮬레이션
- **`💼 자산 & 현금흐름 (Assets & Cashflow)`**: 자산 포트폴리오 + 월 현금흐름 탱크 + 3-Tier 자본 배치
- **`🎯 세제 & FIRE 플래너 (Intelligence & Milestones)`**: 신NISA 트래커 + 세후 실수익 시뮬레이터 + 목표 저축률 플래너 + 생애 마일스톤
- **`📊 성장이력 & 데이터 보안 (Snapshots & Security)`**: 월간 순자산 스냅샷 차트 + 위기 스트레스 테스트 + 4단계 유동성 매트릭스 + JSON 백업/이력

### 🌏 일본 거주 한국인 완전 맞춤형
- 모든 화면 메뉴, 카드, 모달, 안내 문구는 **한국어**로 제공됩니다.
- 모든 금액 연산은 **일본 엔화(JPY ￥)** 기준으로 일관 처리됩니다.
- **신NISA (新NISA)**: 연간 360만엔 비과세 및 1,800만엔 생애한도 자동 집계
- **3개월 치 생활비 비상금 전략**: 비상금 미달성 시 "저축 100%", 달성 완료 시 "NISA/투자 100%" 자동 지침 제공
- **iDeCo 옵션 설정**: 회사 iDeCo 미제공 시 UI에서 비활성화 토글 지원

### 🔒 Privacy-First & 영구 로컬 저장
- 브라우저 `localStorage`에 데이터 **영구 보존**
- 금액 마스킹(Privacy Mode 👁️/🙈) 원터치 토글
- JSON **백업 내보내기(Export) & 복원(Import)**

---

## 🛠️ 기술 스택

| 구분 | 사용 기술 |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (Strict Mode) |
| Architecture | Modular Component Driven Architecture |
| Styling | Tailwind CSS + Glassmorphism |
| State & Storage | Zustand + `persist` middleware (`localStorage`) |
| Visualization | Recharts (Area Chart, Composed Chart) |
| Icons | Lucide React |

---

## 📁 주요 폴더 구조

```
src/
├── app/
│   └── page.tsx                   # 메인 탭 네비게이션 앱
├── components/
│   ├── navigation/
│   │   ├── Sidebar.tsx            # 접이식 데스크톱/모바일 사이드바
│   │   └── Header.tsx             # Sticky 상단 네비게이션 바
│   └── dashboard/
│       ├── AssetSection.tsx       # 자산 포트폴리오
│       ├── RunwaySection.tsx      # 현금흐름 탱크
│       ├── EmergencyFundCard.tsx  # 3개월 비상금 전략
│       ├── BucketSection.tsx      # 3-Tier 자본배치
│       ├── SnapshotGrowthChart.tsx# 월간 스냅샷 차트
│       ├── NisaTrackerCard.tsx    # 신NISA 트래커
│       ├── TaxReturnSection.tsx   # 세후 실수익 계산기
│       ├── SavingsPlannerSection.tsx # FIRE 저축률 플래너
│       ├── LifeEventSection.tsx   # 생애 타임라인
│       ├── ForecastChart.tsx      # 50년 시뮬레이션
│       ├── StressTestSection.tsx  # 스트레스 테스트
│       └── HistorySection.tsx     # 백업 & 변동 이력
```

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
