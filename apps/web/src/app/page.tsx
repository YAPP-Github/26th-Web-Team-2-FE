"use client";

import { InterimButton } from "@yapp-github/26th-web-team-2-fe-ui/interim-button";
import { InterimDescription } from "@yapp-github/26th-web-team-2-fe-ui/interim-description";
import { InterimTitle } from "@yapp-github/26th-web-team-2-fe-ui/interim-title";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex h-screen flex-col justify-center">
      <div className="text-center">
        <a href="https://nextjs.org/docs" target="_blank" rel="noopener">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
            className="mx-auto dark:invert"
          />
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
