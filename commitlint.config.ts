import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    "subject-max-length": [2, "always", 72],
    "subject-min-length": [2, "always", 1],
    "body-max-line-length": [2, "always", 100],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "chore",
        "perf",
        "ci",
      ],
    ],
    "subject-case": [0],
    "subject-full-stop": [2, "never", "."],
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
  },

  prompt: {
    messages: {
      skip: "건너뛰기",
      max: "최대 %d자까지 입력 가능합니다",
      min: "최소 %d자 이상 입력해주세요",
      emptyWarning: "필수 입력 항목입니다",
      upperLimitWarning: "입력 길이가 제한을 초과했습니다",
      lowerLimitWarning: "입력 길이가 최소 요구사항을 충족하지 않습니다",
    },
    questions: {
      type: {
        description: "변경 사항의 타입을 선택하세요",
        enum: {
          feat: { description: "새로운 기능 추가", title: "Features" },
          fix: { description: "버그 수정", title: "Bug Fixes" },
          docs: {
            description: "문서 수정 (README 등)",
            title: "Documentation",
          },
          style: {
            description: "코드 스타일 수정 (세미콜론, 공백 등)",
            title: "Styles",
          },
          refactor: {
            description: "코드 리팩토링 (기능 변화 없음)",
            title: "Code Refactoring",
          },
          test: { description: "테스트 코드 추가/수정", title: "Tests" },
          chore: {
            description: "빌드, 설정, 패키지 등 기타 작업",
            title: "Chores",
          },
          perf: { description: "성능 개선", title: "Performance Improvements" },
          ci: { description: "CI 관련 변경", title: "Continuous Integrations" },
        },
      },
      scope: {
        description: "스코프를 입력하세요 (예: root, login, user 등)",
      },
      subject: {
        description: "변경 사항에 대한 간단한 설명을 작성하세요",
      },
      body: {
        description: "변경 사항에 대한 자세한 설명을 작성하세요 (선택사항)",
      },
      isBreaking: {
        description: "호환성을 깨뜨리는 변경사항인가요?",
      },
      breakingBody: {
        description: "호환성을 깨뜨리는 변경사항에 대한 설명을 작성하세요",
      },
      breaking: {
        description: "호환성을 깨뜨리는 변경사항을 설명하세요",
      },
      isIssueAffected: {
        description: "연결된 Jira의 티켓 정보가 있습니까?",
      },
      issuesBody: {
        description: "해당 티켓에서 수행되는 작업에 대해서 설명해주세요",
      },
      issues: {
        description: "[Y26W2-num]에서 num에 해당하는 티켓 넘버를 작성해주세요!",
      },
    },
  },
};

export default config;
