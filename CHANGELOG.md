# 📝 Financial OS - Changelog

---

## [1.6.0] - 2026-08-01

### Added
- **스냅샷 정산년월(YYYY-MM) 수동 지정 기능**:
  - 8월 1일에 접속해서 지난 7월 데이터(`2026-07`)를 입력하거나 과거 정산년월을 지정할 수 있는 년월 선택 폼 추가 (`MonthlyBriefingCard.tsx`, `SnapshotGrowthChart.tsx`)
- **스냅샷 수정(Edit) 모달 (`EditSnapshotModal.tsx`)**:
  - 이미 기록된 스냅샷 항목의 정산년월(Date), 평가액(Net Worth), 메모(Note) 수정 가능
  - 정산년월 수정 시 차트 날짜 오름차순 자동 재정렬 로직 적용 (`useSnapshotStore.ts`)

---

## [1.5.0] - 2026-08-01

### Added
- **월간 재정 성과 브리핑 센터 (`MonthlyBriefingCard.tsx`)**:
  - `🚀 관제 요약 (Overview)` 최상단에서 첫 화면 전월 대비 순자산 변화액(MoM JPY) 및 성장률(% 흑자/적자) 브리핑
  - 원터치 재정 마감 버튼

---

## [1.4.0] - 2026-08-01

### Added
- **사이드바 & 탭 네비게이션 아키텍처 (Option A)**:
  - `Sidebar.tsx`, `Header.tsx`
  - 4대 도메인 뷰(Domain Views) 분리: `Overview`, `Assets & Cashflow`, `Intelligence & Milestones`, `Snapshots & Security`
