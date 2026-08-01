# 📜 Financial OS - Project Rules & Development Workflow

이 문서는 AI(Antigravity)와 사용자 간의 협업 규칙 및 개발 프로세스를 정의합니다.  
새로운 세션/대화를 시작하거나 작업 시 항상 이 문서를 **가장 먼저** 확인하고 모든 규칙을 준수합니다.

---

## 🔁 표준 개발 프로세스 (Standard Development Cycle)

모든 작업은 아래 단계를 **예외 없이 순서대로** 완수합니다.

```
① 이슈/요구사항 파악 및 기존 코드 전수 조사
       ↓
② 설계 및 구현 (TypeScript · Clean Architecture · 한국어 UI · 엔화 JPY)
       ↓
③ 빌드 및 타입 검증 (cmd /c npm run build) — 오류 없을 때까지 반복
       ↓
④ 문서 최신화 (README.md / ROADMAP.md / TODO.md / CHANGELOG.md)
       ↓
⑤ git add . → git commit → git push origin main  ← 반드시 자동 수행
```

> **⚠️ 중요**: 빌드 성공 여부와 관계없이 작업을 마칠 때마다 **반드시** `git add . && git commit && git push origin main`을 실행합니다. 사용자가 별도로 요청하지 않아도 매번 자동으로 완료해야 합니다.

---

## 📋 Git 자동화 필수 규칙 (Auto Git Push — MANDATORY)

작업 완료 후 아래 명령어를 **항상 단계적으로 실행**합니다.

```bash
# 1단계: 스테이징
cmd /c git add .

# 2단계: 커밋 (단계별로 실행, 큰따옴표 금지 — 한 줄 메시지 사용)
cmd /c git commit -m "feat: [작업 요약]"

# 3단계: 원격 푸시
cmd /c git push origin main
```

**커밋 메시지 규칙:**
- `feat:` — 신규 기능 추가
- `fix:` — 버그 수정
- `docs:` — 문서 업데이트
- `refactor:` — 코드 리팩토링
- `chore:` — 기타 잡무

---

## ⚠️ 핵심 개발 원칙 (Core Principles)

1. **일본 거주 한국인 전용 로컬라이징**
   - 모든 UI 텍스트(메뉴, 라벨, 설명, 모달, 오류 메시지)는 **완전한 한국어**로 작성합니다.
   - 통화 및 금액 연산은 **일본 엔화(JPY ￥)** 기준으로만 처리합니다. `₩`, `KRW`, `원` 등의 한국 통화 표기는 절대 사용하지 않습니다.
   - 신NISA, iDeCo 등 일본 세제 혜택 계좌는 항상 엔화 기준으로 표시합니다.

2. **통화 표기 일관성 (JPY Only)**
   - 코드 전체에서 `formatJPY()`, `formatJPYShort()` 함수를 사용합니다.
   - 임의로 `₩`, `toLocaleString('ko-KR')` 단독 사용은 금지합니다.

3. **Local-First & 영구 데이터 저장 (Persistence)**
   - Zustand `persist` 미들웨어를 통해 모든 데이터(`assets`, `cashflow`, `timeline`, `history`)를 브라우저 `localStorage`에 영구 보존합니다.
   - 자산/현금흐름/이벤트 추가·수정·삭제 시 `useHistoryStore`를 통해 변경 이력을 자동 기록합니다.
   - JSON 백업(Export) 및 복원(Import) 기능을 항상 유지합니다.

4. **Hydration 에러 방지**
   - `localStorage` 또는 `Date`, `Math.random()` 등 SSR-Client 불일치가 발생할 수 있는 영역에는 **반드시 `useHydrated()` 훅**을 사용합니다.
   - 초기 렌더링 시 `isHydrated`가 `false`이면 기본값(0 또는 빈 배열)을 반환합니다.

5. **항목 설명 (Tooltip) 필수화**
   - 모든 자산 카테고리, 버킷 Tier, 주요 지표 옆에는 `<Tooltip>` 컴포넌트를 배치하여 무엇을 의미하는지 설명합니다.
   - `Tooltip`은 `src/components/common/Tooltip.tsx`를 공통 컴포넌트로 사용합니다.

6. **코드 품질 & 프리미엄 UI**
   - Apple Health 스타일의 glassmorphism 다크 UI를 기준으로 합니다.
   - 금액 마스킹(Privacy Mode `👁️`/`🙈`) 기능을 전 컴포넌트에 일관 적용합니다.
   - 타입 안전성을 위해 TypeScript strict 모드를 준수합니다.

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
