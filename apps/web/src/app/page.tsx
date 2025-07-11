"use client";

import { InterimButton, InterimDescription, InterimTitle } from "@ssok/ui";
import { useAtom } from "jotai";
import IcCheckBlack from "@/shared/assets/svg/ic_check_black_22.svg";
import { counterAtom } from "@/shared/atoms/counter";

export default function Home() {
  const [count, setCount] = useAtom(counterAtom);

  return (
    <main className="flex h-screen flex-col justify-center">
      <div className="text-center">
        <a
          className="flex justify-center"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener"
        >
          <IcCheckBlack className="text-red-500" width="150px" height="150px" />
        </a>
      </div>
      <InterimTitle className="text-center">Next.js</InterimTitle>
      <div className="p-8 text-center">
        <InterimButton
          type="button"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </InterimButton>
        <InterimDescription className="text-caption1-medi12">
          Edit <code>src/app/page.tsx</code> and save to test HMR
        </InterimDescription>
      </div>
      <InterimDescription className="text-center text-caption2-regular11 text-gray-400">
        Click on the Next.js logo to learn more
      </InterimDescription>
    </main>
  );
}
