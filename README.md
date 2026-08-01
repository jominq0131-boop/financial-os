# 🚀 Financial OS · Japan Edition

> **"Financial OS는 일본에 거주하는 한국인이 자산(엔화 ￥ 기준), 현금흐름, 신NISA/iDeCo, 50년 생애 주기를 단 하나의 로컬 앱에서 총괄 제어하는 개인 재정 관제 시스템입니다."**

---

## 📌 핵심 특징

### 🌏 일본 거주 한국인 완전 맞춤형
- 모든 화면 메뉴, 카드, 모달, 안내 문구는 **한국어**로 제공됩니다.
- 모든 금액 연산은 **일본 엔화(JPY ￥)** 기준으로 일관 처리됩니다.
- **신NISA (新NISA)**: 성장투자틀(240만엔) + 적립틀(120만엔) = 연간 360만엔 비과세 적립 현황 추적
- **iDeCo**: 개인형 확정출여 연금 — 납입금 전액 소득공제, 60세 인출

### 🔒 Privacy-First & 영구 로컬 저장
- 외부 서버 없이 브라우저 `localStorage`에 자산·현금흐름·이벤트 데이터를 **영구 보존**합니다.
- 새로고침하거나 브라우저를 닫아도 입력한 모든 데이터가 자동 복원됩니다.
- 금액 마스킹(Privacy Mode 👁️/🙈) 으로 민감한 숫자를 원터치로 숨깁니다.
- JSON **백업 내보내기(Export) & 복원(Import)** 기능으로 데이터를 안전하게 이동·보관합니다.

### 📊 누적 변동 이력 관리 (History Tracking)
- 자산 추가, 수정, 삭제, 현금흐름 변경이 발생할 때마다 **시간과 상세 내역이 자동 기록**됩니다.
- 대시보드 하단에서 언제 어떤 자산이 얼마나 변경되었는지 타임라인으로 확인 가능합니다.

### 📈 50년 장기 시뮬레이션 & 위기 대응
- **50년 자산 추이 시뮬레이션**: 투자수익률·물가상승률·생애 이벤트 지출을 반영한 복리 곡선 시각화
- **위기 대응 스트레스 테스트**: 시장 폭락(-30%), 인플레이션 급등(+25%), Black Swan 복합 위기 시나리오
- **Financial Runway**: 소득 중단 시 현금성 자산만으로 버틸 수 있는 생존 가능 기간 실시간 연산

### 🎯 생애 미션 이정표 & 자본 배치
- **Life Event Timeline**: 주택 구매, 안식년, FIRE 은퇴 등 연령대별 필요 자금 목표 등록 및 진척 추적
- **3-Tier Capital Allocation**: 안전망(Tier1) · 성장(Tier2) · 미션(Tier3) 버킷 배분 비율 슬라이더 조율
- **유동성 매트릭스**: 즉시/단기/중기/비유동 자산별 위기 시 현금화 속도 분류

### 💡 항목 설명 Tooltip 시스템
- 자산 카테고리, 버킷 Tier, 주요 지표 옆의 `?` 버튼으로 해당 항목이 무엇을 의미하는지 즉시 확인 가능합니다.

---

## 🛠️ 기술 스택

| 구분 | 사용 기술 |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (Strict Mode) |
| Styling | Tailwind CSS + Glassmorphism |
| State & Storage | Zustand + `persist` middleware (`localStorage`) |
| Visualization | Recharts (Area Chart) |
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

## 📁 주요 파일 구조

```
src/
├── app/
│   └── page.tsx               # 메인 대시보드 페이지
├── components/
│   ├── common/
│   │   └── Tooltip.tsx        # 공통 도움말 툴팁
│   └── dashboard/
│       ├── AssetSection.tsx   # 자산 포트폴리오
│       ├── RunwaySection.tsx  # 현금흐름 & Runway
│       ├── BucketSection.tsx  # 3-Tier 자본 배치
│       ├── LifeEventSection.tsx # 생애 마일스톤
│       ├── ForecastChart.tsx  # 50년 시뮬레이션 차트
│       ├── StressTestSection.tsx # 스트레스 테스트
│       ├── TimePriceCalculator.tsx # 시간-가격 계산기
│       ├── LiquidityMatrix.tsx # 유동성 매트릭스
│       └── HistorySection.tsx # 변동 이력 & 백업
├── store/
│   ├── useAssetStore.ts       # 자산 상태 (persist)
│   ├── useCashflowStore.ts    # 현금흐름 상태 (persist)
│   ├── useTimelineStore.ts    # 생애 이벤트 상태 (persist)
│   └── useHistoryStore.ts     # 변동 이력 상태 (persist)
├── engine/
│   ├── runwayEngine.ts        # Runway 연산
│   ├── simulationEngine.ts    # 50년 시뮬레이션
│   └── stressTestEngine.ts   # 스트레스 테스트
├── hooks/
│   └── useHydrated.ts         # SSR/CSR 불일치 방지 훅
├── types/
│   ├── asset.ts               # 자산 타입 + 한국어 라벨
│   ├── cashflow.ts            # 현금흐름 타입
│   └── timeline.ts            # 생애 이벤트 타입
└── utils/
    └── currency.ts            # 엔화(JPY ￥) 포맷팅 유틸
```

---

## 📋 현재 진행 현황

**Phase 1 ~ Phase 4 완료 (이슈 #1 ~ #17)**  
→ [ROADMAP.md](./ROADMAP.md) 및 [TODO.md](./TODO.md) 참조

**다음 예정 작업: Phase 5 — Financial Intelligence Layer**
- 월간 순자산 스냅샷 및 증감 추이 차트
- 신NISA 성장투자틀/적립틀 소진 현황 상세 관리
- iDeCo 납입 한도 및 소득공제 혜택 금액 계산기
