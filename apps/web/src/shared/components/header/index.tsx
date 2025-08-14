"use client";

import { Button, cn } from "@ssok/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SsokLogo from "@/shared/assets/ssok-logo.svg";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const _pathname = usePathname();

  const navItems = [
    { label: "홈", href: "/" },
    { label: "나의 여행", href: "/boards" },
  ];

  return (
    <header
      className={cn("w-full border-neutral-90 border-b bg-white", className)}
    >
      <div className="mx-auto flex max-w-[123.2rem] items-center justify-between px-[2.4rem] py-[1.6rem]">
        <div className="flex items-center gap-[6.4rem]">
          <Link href="/" className="flex items-center">
            <SsokLogo className="h-[3.2rem] w-[8rem]" />
          </Link>

          <nav className="flex items-center gap-[4rem]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-body3-semi15 text-neutral-20 transition-colors hover:text-neutral-10"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Button
          variant="primary"
          size="xs"
          className="rounded-[0.8rem] bg-neutral-20 px-[1.6rem] py-[0.8rem] text-body1-semi16 text-white hover:bg-neutral-30 focus:bg-neutral-30 active:bg-neutral-30"
        >
          가입하기
        </Button>
      </div>
    </header>
  );
};

export default Header;
