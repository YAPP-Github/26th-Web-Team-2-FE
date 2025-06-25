[[toc]]

#  ETC (기타 코드 스타일 규칙)

## 컴포넌트와 함수는 화살표 함수(Arrow Function) 사용

- 일관된 함수 선언 방식을 위해 일반 함수(function)보다 화살표 함수(`const fn = () => {}`) 를 기본으로 사용합니다.

:: tip 권장방식 
```jsx
const UserCard = ({ user }) => {
  return <div>{user.name}</div>;
};
```
::

## `암시적 반환`과 `조기반환`을 최대한 활용
    
- `암시적 반환 (Implicit Return)`
  - 한 줄짜리 함수는 return 키워드 없이 암시적 반환을 활용합니다.
  ```jsx
  // 암시적 반환 
  const add = (a, b) => a + b; // 암시적으로 (return) a + b 
  ```

- `조기 반환 (Early Return)`
  - 조건이 맞지 않으면 로직의 시작 부분에서 빠르게 종료합니다.
  - 불필요한 중첩을 줄여 가독성을 높일 수 있도록 합니다.
  
  ```jsx
    // 조기반환
    function processUser(user) {
      if (!user || !user.isActive) return; // 조건이 맞지 않으면 일찍 반환
      // 나머지 처리 코드...
    }
    ```
