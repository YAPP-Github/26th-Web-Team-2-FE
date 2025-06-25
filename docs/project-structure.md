[[toc]]

# 프로젝트 구조

## 전반적인 프로젝트 구조
```sh
src/
├── app/
│   ├── {route}/
│   │   ├── layout.tsx         # 해당 라우트 전용 레이아웃
│   │   └── page.tsx           # 해당 라우트 페이지 컴포넌트
│   ├── globals.css            # 전역 CSS
│   ├── layout.tsx             # 전체 앱 레이아웃
│   ├── loading.tsx            # 글로벌 로딩 UI
│   ├── error.tsx              # 글로벌 에러 UI
│   ├── not-found.tsx          # 404 페이지
│   └── global-error.tsx       # 에러 바운더리 처리
│
├── domains/
│   └── {domain}/
│       ├── components/        # 도메인 전용 컴포넌트
│       └── .../               # 도메인 관련 모듈들
│
├── shared/
│   ├── components/            # 공통 컴포넌트
│   ├── configs/               # 환경설정 관련 파일
│   ├── constants/             # 상수 모음
│   ├── providers/             # 전역 Provider
│   ├── hooks/                 # 커스텀 훅
│   ├── types/                 # 전역 타입 정의
│   └── utils/                 # 유틸 함수
│
├── instrumentation-client.ts # 클라이언트 사이드 로깅 설정
└── instrumentation.ts        # 서버 사이드 로깅 설정
```

::: warning
배럴 익스포트는 하지 않는다 (index.ts 사용 지양)
:::


## 파일명 네이밍 컨벤션 
    
파일명은 대쉬로 구분한다 (소문자만 사용하기)
    
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

### 구조 예시 

::: tip 올바른 구조
```sh
shared/
└── components/
    └── tooltip/
        └── index.tsx
```
:::

::: danger 피해야 할 구조
```sh
shared/
└── components/
    └── Tooltip/
        └── Tooltip.tsx   # PascalCase 사용 금지
```
:::
