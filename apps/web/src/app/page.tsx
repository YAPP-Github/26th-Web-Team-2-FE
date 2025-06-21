"use client";

import { InterimButton } from "@yapp-github/26th-web-team-2-fe-ui/interim-button";
import { InterimDescription } from "@yapp-github/26th-web-team-2-fe-ui/interim-description";
import { InterimTitle } from "@yapp-github/26th-web-team-2-fe-ui/interim-title";
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
        <InterimDescription>
          Edit <code>src/app/page.tsx</code> and save to test HMR
        </InterimDescription>
      </div>
      <InterimDescription className="text-center text-gray-400">
        Click on the Next.js logo to learn more
      </InterimDescription>
    </main>
  );
}
