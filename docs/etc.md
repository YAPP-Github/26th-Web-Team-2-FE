7. 컴포넌트와 함수는 **화살표 함수** 이용

9. `암시적 반환`과 `조기반환`을 최대한 활용 
    
    ```jsx
    // 암시적 반환 
    const add = (a, b) => a + b; // 암시적으로 (return) a + b 
    
    **// 조기반환** 
    function processUser(user) {
      if (!user || !user.isActive) return; // **조건이 맞지 않으면 일찍 반환**
      // 나머지 처리 코드...
    }
    ```
