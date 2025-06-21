
2. Props 타입 → `컴포넌트명+Props`
    - 예시
        
        ```jsx
        interface PostPageProps {
            title: string | undefined;
            setTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
            tempContent: string;
            editContent: string;
            setEditorContent: (content: string) => void;
            setContentWithoutTag: (content: string) => void;
        }
        
        const PostPage = (props: PostPageProps) => {
            const {title, setTitle, tempContent, editContent, setEditorContent, 
            setContentWithoutTag
            ...
        }
        ```

## 3. 스타일 (Style)
1. 컴포넌트 네이밍 규칙 : `Wrapper` → `Container` → `Item` → `Box`
2. 시멘틱 태그는 적극 활용한다.

## 4. 함수

1. 이벤트 핸들러 네이밍 **`on + 기능 + 이벤트`**
    - 예시
        
        ```jsx
        const onBtnClick = () => {};
        const onTabChange = () => {};
        ```
        
2. 유틸(utils) 함수 네이밍 **`동사(기능) + 명사(대상)`**
   -`bool`값을 반환하는 경우 has 로 시작

    ```jsx
    const hasToken = () => {
        return isLogin ? true : false
    }

    const formatDate =() => {
        //
    }
    ```
3. 값이 boolean일 경우는 **`is + 상태`** 또는 **`has + 상태`**
    - 예시
        
        ```tsx
        const [isLogined, setIsLogined] = useState(false);
        ```

## 4. 기타
1. assets (Icon이나 Img)의 경우 피그마 네이밍을 적극 활용
    
     **→ `피그마 네이밍 + Icon`** or **`Img`**

     ```jsx
    // assets/icon/index.ts
    export { default as LogoIcon } from "./btn_logo.svg"
    export { default as SearchIcon } from './ic_search.svg';

    // assets/image/index.ts
    export { default as BrandNameListImg } from './btn_brand_name_list.svg';
    export { default as BuyGiftImg } from './btn_buy/gift.svg';
    ```
    
2. `API`, `URL`, `HTML` 같은 범용적인 대문자 약어는 대문자 그대로 사용
3. 변수/최대한 직관적으로 작성하여 네이밍을 보고도 무슨 데이터, 행위인지 바로 유추할 수 있도록 함
    - 주석이 필요한 경우에는 어떤 역할을 하는지 다른 사람이 이해할 수 있도록 작성
    - 변수/함수명은 20자 미만, 주석으로 변수 설명
4. 주석은 작성하려고 하는 대상 바로 위에 작성
