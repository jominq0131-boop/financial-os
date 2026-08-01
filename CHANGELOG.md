# 📝 Financial OS - Changelog

---

## [1.7.0] - 2026-08-01

### Added
- **GitHub Pages 100% 무료 자동 웹 배포 환경 구축**:
  - `next.config.ts` — `output: 'export'`, `images: { unoptimized: true }`, `basePath: '/financial-os'` 정적 빌드 옵션 적용
  - `.github/workflows/deploy.yml` — `main` 브랜치 푸시 시 자동으로 빌드 및 GitHub Pages 배포 연동
- **100% 브라우저 Local Storage 보안 아키텍처 완결**:
  - 서버 및 데이터베이스 0%, 사용자 브라우저 `localStorage`에만 데이터 안전 보존

---

## [1.6.0] - 2026-08-01

### Added
- **스냅샷 정산년월(YYYY-MM) 수동 지정 기능**:
  - 8월 1일에 접속해서 지난 7월 데이터(`2026-07`)를 지정하여 스냅샷 마감
- **스냅샷 수정(Edit) 모달 (`EditSnapshotModal.tsx`)**:
  - 이미 기록된 스냅샷의 날짜/평가액/메모 수정 및 날짜 오름차순 자동 정렬

---

## [1.5.0] - 2026-08-01

### Added
- **월간 재정 성과 브리핑 센터 (`MonthlyBriefingCard.tsx`)**:
  - `🚀 관제 요약 (Overview)` 최상단 전월 대비 자산 변화액(MoM JPY) 및 성장률(% 흑자/적자) 브리핑
