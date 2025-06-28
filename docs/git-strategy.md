# Git 전략

이 문서는 Git 브랜치 전략, 브랜치 네이밍 규칙, 커밋 메시지 작성 컨벤션에 대해 정의합니다.
일관된 협업을 위해 `Trunk-based` 개발 방식을 따르며, 티켓 기반 브랜치 네이밍과 명확한 커밋 타입을 통해 가독성 높고 추적 가능한 Git 이력을 유지하는 것이 목적입니다.

[[toc]]

##  브랜치 전략
> Trunk-based Development

- main 브랜치에서 파생된, 짧은 수명의 feature 브랜치를 생성해 작업한다. 
- squash merge를 기본으로 하며, PR 병합 후 작업한 feature 브랜치는 삭제한다. 


## feature 브랜치 네이밍 

- 형식 : feature/Y26W2-`<티켓번호>`-`<상세기능>`
- 예시 : `feature/Y26W2-5-login`, `feature/Y26W2-32-dashboard-error`


## 커밋 메시지 컨벤션

- pnpm commit을 사용하여 commit 메시지를 prompt에 따라 구성하거나,

- spr을 활용할 경우, 하단의 컨벤션을 준수하여 커밋 메시지를 작성한다. 


형식: `[Y26W2-000] <type>(optional scope): <description>`


**커밋 타입**
| 타입 | 설명 |
| --- | --- |
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 (README 등) |
| `style` | 코드 스타일 수정 (세미콜론, 공백 등) |
| `refactor` | 코드 리팩토링 (기능 변화 없음) |
| `test` | 테스트 코드 추가/수정 |
| `chore` | 빌드, 설정, 패키지 등 기타 작업 |
| `perf` | 성능 개선 |
| `ci` | CI 관련 변경 |
