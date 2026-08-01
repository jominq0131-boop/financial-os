# 📜 Financial OS - Project Rules & Development Workflow

이 문서는 AI(Antigravity)와 사용자 간의 협업 규칙 및 개발 프로세스를 정의합니다.  
새로운 세션/대화를 시작하거나 작업 시 항상 이 문서를 가장 먼저 확인하고 모든 규칙을 준수합니다.

---

## 🔁 표준 개발 프로세스 (Standard Development Cycle)

모든 작업은 아래 단계를 예외 없이 순서대로 완수합니다.

① 요구사항 파악 및 관련 파일/모듈만 집중 조사 (프로젝트 전체 검색 자제)
       ↓
② 설계 및 구현 (TypeScript · Clean Architecture · 한국어 UI · 엔화 JPY)
       ↓
③ 빌드 및 타입 검증 (cmd /c npm run build) — 오류 없을 때까지 반복
       ↓
④ 핵심 문서 최신화 (TODO.md, CHANGELOG.md 중심으로 필요한 항목만 작성)
       ↓
⑤ git add . → git commit → git push origin main (자동 수행)
       ↓
⑥ [필수] 작업 결과 보고 및 다음 추천 활동 옵션 2~4개 제시

> **⚠️ 중요**: 작업 완료 시 반드시 `git add . && git commit && git push origin main`을 자동으로 실행합니다.

---

## 📋 Git 자동화 필수 규칙 (Auto Git Push)

```bash
cmd /c git add .
cmd /c git commit -m "feat: [작업 요약]"
cmd /c git push origin main
```
**커밋 메시지 규칙:** `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`

---

## ⚠️ 핵심 개발 원칙 (Core Principles)

1. **일본 거주 한국인 전용 로컬라이징**
   - 모든 UI 텍스트는 완전한 한국어로 작성합니다.
   - 통화는 일본 엔화(JPY ￥) 기준만 사용하며, `formatJPY()`, `formatJPYShort()`를 활용합니다. (`₩`, `KRW` 사용 금지)

2. **Local-First & 영구 데이터 저장**
   - Zustand `persist` 미들웨어로 `localStorage` 저장 및 JSON 백업/복원 유지.
   - 데이터 변경 시 `useHistoryStore` 자동 기록.

3. **Hydration 에러 방지**
   - Client-side 불일치 가능 영역에는 반드시 `useHydrated()` 훅 사용.

4. **항목 설명 (Tooltip) 필수화**
   - 주요 지표 및 카테고리에 `src/components/common/Tooltip.tsx` 적용.

5. **프로덕션 수준 클린 아키텍처 & UI**
   - 모듈화된 폴더 구조 및 Glassmorphism 다크 UI 기준. Privacy Mode(`👁️`/`🙈`) 적용.

6. **[토큰 절약 규칙] 효율적 Context 유지**
   - 불필요하게 전체 파일을 읽지 않고, 수정이 필요한 파일 및 연관 파일만 지정하여 작업합니다.
   - 매 작업마다 5개 문서를 전부 수정하지 않고, `TODO.md` 및 `CHANGELOG.md` 위주로 간결하게 업데이트합니다.

7. **[강제] 다음 활동 의무 추천**
   - 작업 완료 후 다음에 개선할 수 있는 옵션(2~4개)을 제시합니다.

---

## 💡 바이브 코딩할 때 토큰 아끼는 3대 프롬프트 요령

1. **타겟 파일을 명확히 찍어주기 (가장 중요! ⭐)**
2. **한 번에 하나의 기능(단위)씩 요청하기**
3. **대화(세션)가 너무 길어지면 "새 대화" 열기**
을 자동 기록합니다.
   - JSON 백업(Export) 및 복원(Import) 기능을 항상 유지합니다.

4. **Hydration 에러 방지**
   - `localStorage` 또는 `Date`, `Math.random()` 등 SSR-Client 불일치가 발생할 수 있는 영역에는 **반드시 `useHydrated()` 훅**을 사용합니다.
   - 초기 렌더링 시 `isHydrated`가 `false`이면 기본값(0 또는 빈 배열)을 반환합니다.

5. **항목 설명 (Tooltip) 필수화**
   - 모든 자산 카테고리, 버킷 Tier, 주요 지표 옆에는 `<Tooltip>` 컴포넌트를 배치하여 무엇을 의미하는지 설명합니다.
   - `Tooltip`은 `src/components/common/Tooltip.tsx`를 공통 컴포넌트로 사용합니다.

6. **프로덕션 수준 클린 아키텍처 & 프리미엄 UI**
   - 개발자 사용자가 아키텍처 수준을 검증할 수 있도록 모듈화된 폴더 구조(`domain components`, `store`, `engine`, `hooks`, `types`)와 Clean Architecture 관례를 준수합니다.
   - Apple Health 스타일의 glassmorphism 다크 UI를 기준으로 합니다.
   - 금액 마스킹(Privacy Mode `👁️`/`🙈`) 기능을 전 컴포넌트에 일관 적용합니다.

7. **[강제] 작업 완결 시 다음 활동 의무 추천 (Mandatory Next Activity Recommendation)**
   - **모든 작업 완료 후 항상 사용자에게 다음에 추가하거나 개선할 수 있는 구체적인 기능/개선점 추천 목록(옵션 2~4개)을 제시하여 컨펌을 받습니다.**

---

## 📝 문서 자동 최신화 규칙 (Auto-update Docs)

작업 완료 후 아래 파일들을 현재 상태에 맞게 업데이트합니다.

| 파일 | 업데이트 내용 |
|---|---|
| `README.md` | 기능 목록, 기술 스택, 사용법 |
| `ROADMAP.md` | 완료된 이슈 체크, 다음 Phase 계획 |
| `TODO.md` | 완료된 이슈 체크, 다음 추천 작업 |
| `CHANGELOG.md` | 버전 기록, 변경 사항 요약 |
| `PROJECT_RULES.md` | 규칙 변경 사항 반영 |
