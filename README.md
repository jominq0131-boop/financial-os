# 🚀 Financial OS · Japan Edition (v1.8)

> **"Financial OS는 일본에 거주하는 한국인이 자산(엔화 ￥ 기준), 현금흐름, 게이밍 재정 레벨, 신NISA, 50년 생애 주기를 100% 무료 GitHub Pages와 브라우저 로컬 보안으로 총괄 제어하는 개인 재정 관제 슈퍼 대시보드입니다."**

---

## 📌 핵심 특징

### 🎮 게이밍 재정 랭킹 & FIRE 퀘스트 업적 시스템 (New in v1.8)
- **재정 레벨 & 경험치 (Lv. 1 ~ Lv. 99)**: 내 순자산 크기 및 저축률에 따라 실시간 경험치(XP) 바 및 칭호(`Lv. 14 에이스 자본가`) 상승
- **4대 FIRE 메인 퀘스트 배지**:
  - 🛡️ `3개월 비상금 수호자`: 3개월 치 필수 생활비 비상금 100% 완료
  - 📈 `신NISA 파이어니어`: 신NISA 연간 한도 50% 이상 달성
  - 🚀 `8자리 자본가`: 순자산 1,000만 엔 (10M JPY) 돌파
  - 👑 `FIRE 쿼터 백`: FIRE 은퇴 목표 자금 25% 돌파

### 📊 월 지출 세부 카테고리화 & 도넛 차트 (New in v1.8)
- 월 지출을 **주거비(월세/공과금), 식비(장보기/외식), 통신·고정비, 여가·취미, 투자·저축 적립**으로 분류
- 지출 카테고리별 비중을 **도넛 차트(Donut Chart)**로 시각화 분석

### 🌐 100% 무료 GitHub Pages 자동 웹 배포
- `npm run dev` 없이 스마트폰/PC 웹 브라우저에서 상시 접속 (`https://jominq0131-boop.github.io/financial-os/`)
- 백엔드 서버 없이 브라우저 `localStorage`에만 데이터가 저장되어 **서버 비용 0원 + 개인정보 유출 위험 0%** 완벽 보장

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
| Visualization | Recharts (Area Chart, Donut Chart, Composed Chart) |
| Icons | Lucide React |
