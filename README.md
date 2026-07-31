# 🚀 Financial OS · Japan (일본 거주 한국인 전용 파이낸셜 OS)

> **"Financial OS는 단편적인 가계부나 투자 앱이 아닌, 일본에 거주하는 한국인이 자신의 전체 자산(엔화 ￥ 기준), 현금흐름, 신NISA/iDeCo 절세 계좌, 50년 생애 주기 시뮬레이션을 총괄 제어하는 개인 재정 관제 시스템입니다."**

---

## 📌 핵심 특징

- **일본 거주 한국인 맞춤형 로컬라이징**:
  - 화면 상의 모든 메뉴, 가이드, 라벨은 **완벽한 한국어**로 제공됩니다.
  - 통화 및 화폐 연산은 **일본 엔화(JPY ￥)** 기준으로 일관되게 처리됩니다.
  - **新NISA(성장투자틀/적립틀)** 및 **iDeCo(개인형 확정출여 연금)** 등 일본 세제 혜택 계좌 전용 분류 및 진척도 트래킹 지원.
- **Privacy-First & Persistent Data (로컬 영구 저장)**:
  - 서버나 외부 데이터베이스 없이 브라우저 `localStorage`에 완벽히 영구 저장 및 자동 복원됩니다.
  - 금액 마스킹(Privacy Mode `👁️`/`🙈`) 기능을 기본 제공합니다.
  - JSON 파일 백업(Export) 및 복원(Import)을 지원하여 데이터를 손쉽게 이동/보관 가능합니다.
- **누적 변경 이력 관리 (Cumulative History Tracking)**:
  - 언제 어떤 자산이나 현금흐름이 수정/추가/삭제되었는지 타임라인 및 변경 기록으로 누적 추적합니다.
- **50년 장기 자산 시뮬레이터 & 스트레스 테스트**:
  - 물가상승률, 시장 폭락(-30%), 고물가, 생애 마일스톤(주택 구매, 은퇴, 안식년 등)을 연동한 50년 자산 추이 그래프(Recharts) 및 위기 대응 스트레스 테스트를 제공합니다.
- **3-Tier 자본 배치 & Runway 엔진**:
  - 소득 중단 시 생존 가능 기간(Runway)과 Tier 1(안전망), Tier 2(성장), Tier 3(미션) 버킷 리밸런싱을 실시간 연산합니다.

---

## 🛠️ 기술 스택

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Vanilla CSS Glassmorphism
- **State & Storage**: Zustand + `persist` middleware (`localStorage`)
- **Visualization & Icons**: Recharts, Lucide Icons

---

## 🚀 빠른 시작

```bash
# 개발 서버 실행
npm run dev

# 빌드 및 검증
npm run build
```

브라우저에서 `http://localhost:3000` 접속.
