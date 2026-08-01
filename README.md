# 🚀 Financial OS · Japan Edition (v1.5)

> **"Financial OS는 일본에 거주하는 한국인이 자산(엔화 ￥ 기준), 현금흐름, 신NISA, 50년 생애 주기를 월간 성과 브리핑과 사이드바 네비게이션으로 총괄 제어하는 개인 재정 관제 시스템입니다."**

---

## 📌 핵심 특징

### 📊 월간 재정 성과 브리핑 센터 (New in v1.5)
- 월초/월말 월 1회 접속 시 **`🚀 관제 요약 (Overview)`** 최상단에서 첫 화면 브리핑 제공
- **전월 대비 자산 변화액 (MoM JPY)**: `+￥350,000` / `+1.4% 흑자 🎉`
- **원터치 `[📸 이번 달 재정 마감 & 스냅샷 기록]` 버튼**: 클릭 한 번으로 당 월 순자산 자동 스냅샷 & 마감 로그 남김

### 📐 사이드바 & 4대 도메인 네비게이션 아키텍처
- **`🚀 관제 요약 (Overview)`**: 월간 성과 브리핑 + 4종 KPI 카드 + 3개월 비상금 카드 + 신NISA 한도 + 50년 시뮬레이션
- **`💼 자산 & 현금흐름 (Assets & Cashflow)`**: 자산 포트폴리오 + 월 현금흐름 탱크 + 3-Tier 자본 배치
- **`🎯 세제 & FIRE 플래너 (Intelligence & Milestones)`**: 신NISA 트래커 + 세후 실수익 시뮬레이터 + 목표 저축률 플래너 + 생애 마일스톤
- **`📊 성장이력 & 데이터 보안 (Snapshots & Security)`**: 월간 순자산 스냅샷 차트 + 위기 스트레스 테스트 + 4단계 유동성 매트릭스 + JSON 백업/이력

### 🌏 일본 거주 한국인 완전 맞춤형
- 모든 화면 메뉴, 카드, 모달, 안내 문구는 **한국어**로 제공됩니다.
- 모든 금액 연산은 **일본 엔화(JPY ￥)** 기준으로 일관 처리됩니다.
- **신NISA (新NISA)**: 연간 360만엔 비과세 및 1,800만엔 생애한도 자동 집계
- **3개월 치 생활비 비상금 전략**: 비상금 미달성 시 "저축 100%", 달성 완료 시 "NISA/투자 100%" 자동 지침 제공
- **iDeCo 옵션 설정**: 회사 iDeCo 미제공 시 UI에서 비활성화 토글 지원

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
