import ReactDOM from "react-dom/client";
import "./app.css";

import WalkerIcon from "./assets/icons/ic_walker.svg?react";

const App = () => (
  <div className="m-0 flex h-screen flex-col items-center justify-center gap-2 bg-gray-900 p-0 font-sans text-gray-300">
    <h1>
      👋 <strong>ssok packages/ui</strong>에 오신 걸 환영합니다! ✈️
    </h1>
    <p>
      이곳은 26기 웹 2팀 프로젝트의 <strong>공용 UI 컴포넌트 라이브러리</strong>
      입니다.
    </p>
    <p>
      재사용 가능한 컴포넌트를 개발하고 테스트하며 문서화하기 위해 이
      워크스페이스를 사용하세요.
    </p>
    <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
      <code>pnpm dev:storybook</code> 명령어로 시작해보세요!
      <WalkerIcon width="30px" height="30px" />
    </p>
  </div>
);

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(<App />);
} else {
  console.error("Root element not found.");
}
