[[toc]]

# 스타일링 & Props 컨벤션

- 단위는 rem만 사용합니다.
  - 모든 길이, 여백, 폰트 사이즈 등의 단위는 rem 단위를 기본으로 사용합니다.

  - 예외적으로 다른 단위(px, %, vh, vw 등)가 필요한 경우, 사전에 팀 내에서 명확히 기준을 정한 후 사용합니다.


- Props 중 `class`, `style`을 선언할 때는 제일 뒷부분에 선언합니다.

  - 컴포넌트에 props를 작성할 때는 className 또는 style과 같은 스타일 관련 props는 가장 끝에 위치시킵니다.

  - 이는 가독성을 높이고 코드 일관성을 유지하기 위함입니다.


::: tip 올바른 구조
```jsx
<MyComponent
  title="예시"
  type="primary"
  disabled={false}
  className="my-style"  // :white_check_mark  항상 마지막
/>
```
:::

::: danger 피해야 할 구조
```jsx
<MyComponent
  className="my-style"  // :no_entry 중간에 위치하면 가독성 저하
  title="예시"
  type="primary"
/>
```
:::
