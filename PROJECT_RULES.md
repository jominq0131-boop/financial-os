# 📜 Financial OS - Project Rules & Development Workflow

이 문서는 AI(Antigravity)와 사용자 간의 협업 규칙 및 개발 프로세스를 정의합니다.  
새로운 세션/대화를 시작할 때 항상 이 문서를 가장 먼저 확인합니다.

---

## 🔁 표준 개발 프로세스 (Cycle)

모든 작업은 아래의 7단계를 엄격히 순서대로 준수합니다.

```
① 기능(Issue) 하나 선택
       ↓
② Antigravity에게 설계 요청
       ↓
③ 구현 요청
       ↓
④ 코드 리뷰 요청 (개선점 및 리팩토링 검토)
       ↓
⑤ Git Commit
       ↓
⑥ Git Push
       ↓
⑦ 다음 기능(Issue) 진행
```

---

## ⚠️ 핵심 개발 원칙
1. **단일 이슈 집중 (One Issue at a Time)**:
   - 절대로 여러 개의 이슈를 동시에 진행하지 않습니다. 항상 지정된 1개 이슈만 완결합니다.
2. **코드 퀄리티 & 리팩토링**:
   - 구현 후 반드시 코드 리뷰 과정을 거쳐 미니멀한 디자인과 clean code 기준을 충족시킵니다.
3. **기억 유지 문서 관리 (Memory Preservation)**:
   - 작업 완료 시마다 `ROADMAP.md`, `CHANGELOG.md`, `TODO.md`를 즉시 업데이트합니다.
4. **Local-First & Minimal Design**:
   - 외부 서버 호출 없이 로컬 상태 및 파일 저장소 중심 작성.
   - Apple Health 스타일의 깔끔하고 직관적인 미니멀 컴포넌트 UI 적용.
