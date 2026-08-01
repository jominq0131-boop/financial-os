# 🚀 Financial OS · Japan Edition (v1.7)

> **"Financial OS는 일본에 거주하는 한국인이 자산(엔화 ￥ 기준), 현금흐름, 신NISA, 50년 생애 주기를 100% 무료 GitHub Pages와 브라우저 로컬 보안으로 총괄 제어하는 개인 재정 관제 시스템입니다."**

---

## 📌 핵심 특징

### 🌐 100% 무료 GitHub Pages 자동 웹 배포 (New in v1.7)
- `npm run dev` 없이 스마트폰/PC 웹 브라우저에서 상시 접속 (`https://jominq0131-boop.github.io/financial-os/`)
- 백엔드 서버 없이 브라우저 `localStorage`에만 데이터가 저장되어 **서버 비용 0원 + 개인정보 유출 위험 0%** 완벽 보장

### 📅 정산년월 수동 지정 & 스냅샷 편집 (v1.6)
- **과거 정산년월 지정 가능**: 8월 1일에 접속해서 지난 7월 데이터(`2026-07`)를 지정하여 스냅샷 기록 가능
- **스냅샷 수정(Edit ✏️) 모달**: 이미 찍은 스냅샷의 날짜, 금액, 메모를 언제든지 수정 가능 (`EditSnapshotModal.tsx`)

### 📊 월간 재정 성과 브리핑 센터
- 월초/월말 월 1회 접속 시 **`🚀 관제 요약 (Overview)`** 최상단에서 첫 화면 브리핑 제공
- **전월 대비 자산 변화액 (MoM JPY)**: `+￥350,000` / `+1.4% 흑자 🎉`

### 📐 사이드바 & 4대 도메인 네비게이션 아키텍처
- **`🚀 관제 요약 (Overview)`**: 월간 성과 브리핑 + 4종 KPI 카드 + 3개월 비상금 카드 + 신NISA 한도 + 50년 시뮬레이션
- **`💼 자산 & 현금흐름 (Assets & Cashflow)`**: 자산 포트폴리오 + 월 현금흐름 탱크 + 3-Tier 자본 배치
- **`🎯 세제 & FIRE 플래너 (Intelligence & Milestones)`**: 신NISA 트래커 + 세후 실수익 시뮬레이터 + 목표 저축률 플래너 + 생애 마일스톤
- **`📊 성장이력 & 데이터 보안 (Snapshots & Security)`**: 월간 순자산 스냅샷 차트 + 위기 스트레스 테스트 + 4단계 유동성 매트릭스 + JSON 백업/이력

---

## 🛠️ 기술 스택

| 구분 | 사용 기술 |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, Static Export) |
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`) |
| Deployment | GitHub Pages (100% Free Hosting) |
| Language | TypeScript (Strict Mode) |
| Architecture | Modular Component Driven Architecture |
| Styling | Tailwind CSS + Glassmorphism |
| State & Storage | Zustand + `persist` middleware (`localStorage`) |
| Visualization | Recharts (Area Chart, Composed Chart) |
| Icons | Lucide React |
