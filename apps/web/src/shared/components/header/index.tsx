"use client";

import type { getUserInfoResponse } from "@ssok/api";
import { AvatarProfile, Button, cn } from "@ssok/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SsokLogo from "@/shared/assets/ssok-logo.svg";

export interface HeaderProps {
  className?: string;
  userInfo: getUserInfoResponse["data"]["result"];
}

const Header = ({ className, userInfo }: HeaderProps) => {
  const _pathname = usePathname();

  const navItems = [
    { label: "홈", href: "/" },
    { label: "나의 여행", href: "/boards" },
  ];

  return (
    <header
      className={cn("w-full border-neutral-90 border-b bg-white", className)}
    >
      <div className="mx-auto flex w-full items-center justify-between px-[10.4rem] py-[1.6rem]">
        <div className="flex items-center gap-[6.4rem]">
          <Link href="/" className="flex items-center">
            <SsokLogo className="h-[3.2rem] w-[8rem]" />
          </Link>

          <nav className="flex items-center gap-[4rem]">
            {navItems.map((item) => {
              const isActive = _pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-body3-semi15 transition-colors",
                    isActive ? "text-primary-60" : "text-neutral-20",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {!userInfo && (
          <Button
            variant="primary"
            size="xs"
            className="rounded-[0.8rem] bg-neutral-20 px-[1.6rem] py-[0.8rem] text-body1-semi16 text-white hover:bg-neutral-30 focus:bg-neutral-30 active:bg-neutral-30"
          >
            가입하기
          </Button>
        )}
        {userInfo && (
          <AvatarProfile imgUrl={userInfo?.profileImageUrl} size={32} />
        )}
      </div>
    </header>
  );
};

export default Header;
