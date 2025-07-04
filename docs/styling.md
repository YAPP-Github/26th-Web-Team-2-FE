# 스타일링 & Props 컨벤션

해당 문서는 프로젝트에서의 스타일링과 Props 작성에 대한 컨벤션을 정의합니다.
일관된 코드 스타일과 협업 효율성을 높이기 위해, CSS 단위 사용 방식과 컴포넌트 Props 작성 순서에 대한 명확한 기준을 제공합니다.

[[toc]]


## 단위는 `rem`만 사용한다.
  - 모든 길이, 여백, 폰트 사이즈 등의 단위는 `rem` 단위를 기본으로 사용한다.

  - 예외적으로 다른 단위(px, %, vh, vw 등)가 필요한 경우, 사전에 팀 내에서 명확히 기준을 정한 후 사용한다.


## Props 중 `class`, `style`을 선언할 때는 제일 뒷부분에 선언한다.

  - 컴포넌트에 props를 작성할 때는 className 또는 style과 같은 스타일 관련 props는 가장 끝에 위치시킨다.

  - 이는 가독성을 높이고 코드 일관성을 유지하기 위함이다.


::: tip 올바른 구조
```jsx
<MyComponent
  title="예시"
  type="primary"
  disabled={false}
  className="my-style"  // 항상 마지막
/>
```
:::

::: danger 피해야 할 구조
```jsx
<MyComponent
  className="my-style"  // 중간에 위치하면 가독성 저하
  title="예시"
  type="primary"
/>
```
:::
