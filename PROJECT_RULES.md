# 📜 Financial OS - Project Rules & Development Workflow

이 문서는 AI(Antigravity)와 사용자 간의 협업 규칙 및 개발 프로세스를 정의합니다.  
새로운 세션/대화를 시작하거나 작업 시 항상 이 문서를 준수합니다.

---

## 🔁 표준 개발 프로세스 (Cycle)

모든 작업은 아래의 7단계를 엄격히 준수합니다.

```
① 작업 요구사항/이슈 확인
       ↓
② Antigravity 설계 및 구현 (TypeScript, Clean Architecture)
       ↓
③ 빌드 및 타입 검증 (cmd /c npm run build)
       ↓
④ 문서 최신화 (README, ROADMAP, TODO, CHANGELOG)
       ↓
⑤ Git Commit (자동 수행)
       ↓
⑥ Git Push (자동 수행)
```

---

## ⚠️ 핵심 개발 원칙

1. **일본 거주 한국인 맞춤형 로컬라이징**:
   - UI 텍스트는 전면 **한국어**로 작성합니다.
   - 통화 및 화폐 연산은 **일본 엔화(JPY ￥)** 기준으로 일관되게 적용합니다.
2. **Local-First & Data Persistence (영구 저장 및 누적 이력)**:
   - 데이터는 브라우저 `localStorage`에 영구 보존됩니다.
   - 자산/현금흐름 추가·수정·삭제 시 변경 내역이 누적 이력(`HistoryLog`)으로 자동 기록되어야 합니다.
   - JSON 백업 내보내기/불러오기 기능을 항상 지원합니다.
3. **기억 유지 문서 및 Git 자동화 (Memory Preservation & Auto Push)**:
   - 작업 완료 시마다 `README.md`, `ROADMAP.md`, `TODO.md`, `CHANGELOG.md` 문서를 최신화합니다.
   - 작업 완료 후 Git 커밋과 원격 푸시(`git push origin main`)를 직접 자동 완료합니다.
4. **Apple Health 스타일 미니멀 & 프리미엄 UI**:
   - 다크 모드 glassmorphism, 수치 마스킹(Privacy Mode) 기능을 기본 탑재합니다.
