import "./app.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import MazeUs from "@/shared/components/maze-us";
import Providers from "@/shared/providers";

const Pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  adjustFontFallback: false,
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "쏙 | 여행 숙소 비교는 SSOK",
  description: "3일 걸리던 숙소 정하기, 쏙과 함께 3분만에 끝내보세요",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <MazeUs />
      </head>
      <body className={Pretendard.variable}>
        <Providers>
          {children}
          {/* TODO: fallback UI 수정 */}
          {/* <Suspense fallback={null}>
            <DialogProvider />
          </Suspense> */}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
