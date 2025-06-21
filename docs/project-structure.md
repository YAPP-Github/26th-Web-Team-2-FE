# 프로젝트 구조

```sh
src/
├── app/
│   ├── {route}/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   └── global-error.tsx
├── domains/
│   └── {domain}/
│       ├── components/
│       └── .../
├── shared/
│   ├── components/
│   ├── configs/
│   ├── constants/
│   ├── providers/
│   ├── hooks/
│   ├── types/
│   └── utils/
├── instrumentation-client.ts
└── instrumentation.ts
```

- 배럴 익스포트는 하지 않는다 (index.ts 사용 지양)

- 네이밍 컨벤션
    
    파일명은 대쉬로 구분 (소문자만 사용하기)
    
    | 목적 | 예시 | 컨벤션 |
    | --- | --- | --- |
    | 컴포넌트 | `nav-bar/index.tsx`, `user-card/index.tsx`, `todo-item/index.tsx` | `kebab-case` |
    | 훅 | `use-auth`, `use-user-data`, `use-scroll` | `use-` + `kebab-case`  |
    | 유틸 | `format-date.ts`, `capitalize.ts` | `kebab-case` |
    | 상수 | `routes.ts`, `default-theme.ts` | `kebab-case` |
    | 타입 | `user.ts`, `post-response.ts`, `login-params.ts` | `kebab-case` |
    | API 모듈 | `user-api.ts`, `auth-api.ts` | `kebab-case` |
    | query 모듈 | `use-data-query`, `use-post-list-query` | `kebab-case`  |
    | context | `auth-context`, `theme-context` | `kebab-case` + `-context`  |
    | 폴더 구조 | `components/`, `pages/`, `hooks/`, `utils/`, `constants/`, `apis/` | `kebab-case`  |

- components/tooltip/index.tsx
