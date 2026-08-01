# 📝 Financial OS - Changelog

---

## [1.8.0] - 2026-08-01

### Added
- **게이밍 재정 성장 랭킹 & FIRE 퀘스트 업적 시스템 (`FinancialLevelCard.tsx`)**:
  - 총 자산 및 월 저축률 기반 **재정 레벨(Lv. 1 ~ Lv. 99)**, **경험치(XP)** 바 및 칭호(`Lv. 14 에이스 자본가` 등) 연산
  - **4대 FIRE 메인 퀘스트 배지**: 🛡️ `3개월 비상금 수호자`, 📈 `신NISA 파이어니어`, 🚀 `8자리 자본가`, 👑 `FIRE 쿼터 백`
- **월 지출 세부 카테고리별 비중 분석 도넛 차트 (`RunwaySection.tsx`)**:
  - 지출 항목을 **주거(월세/공과금), 식비(장보기/외식), 고정비, 여가, 투자(NISA/적립), 기타**로 세분화
  - 월 총 지출 중 카테고리별 점유율을 시각적 도넛 차트(Recharts PieChart)로 분석

---

## [1.7.0] - 2026-08-01

### Added
- **GitHub Pages 100% 무료 자동 웹 배포 환경 구축**:
  - `next.config.ts` — `output: 'export'`, `images: { unoptimized: true }`, `basePath: '/financial-os'` 정적 빌드 옵션 적용
  - `.github/workflows/deploy.yml` — `main` 브랜치 푸시 시 자동 정적 빌드 및 배포

---

## [1.6.0] - 2026-08-01

### Added
- **스냅샷 정산년월(YYYY-MM) 수동 지정 기능 및 편집 모달 (`EditSnapshotModal.tsx`)**
