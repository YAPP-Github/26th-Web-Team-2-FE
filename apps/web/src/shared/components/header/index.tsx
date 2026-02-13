"use client";

import { useGetUserInfo } from "@ssok/api";
import { AvatarProfile, Button, cn } from "@ssok/ui";
import Link from "next/link";
import SsokLogo from "@/shared/assets/ssok-logo.svg";
import useSession from "@/shared/hooks/use-session";

export interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const { accessToken } = useSession();
  const { data: userInfo } = useGetUserInfo({
    query: { enabled: !!accessToken },
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const profileImageUrl = userInfo?.data.result?.profileImageUrl;

  const navItems = [
    { label: "홈", href: "/" },
    { label: "나의 여행", href: "/boards" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-header flex h-[6.5rem] w-full items-center justify-between border-neutral-90 border-b bg-white px-[10.4rem]",
        "max-xl:h-auto max-xl:px-[1.6rem] max-xl:py-[1.2rem]",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center",
          "max-xl:gap-[2.4rem] xl:gap-[6.4rem]",
        )}
      >
        <Link href="/" className="flex items-center">
          <div className={cn("max-xl:w-[6.4rem] xl:w-[8rem]")}>
            <SsokLogo className="h-auto w-full" />
          </div>
        </Link>
        <nav
          className={cn(
            "flex items-center",
            "max-xl:gap-[2.4rem] xl:gap-[4rem]",
          )}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-body3-semi15 text-neutral-20 transition-colors hover:text-primary-60",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {profileImageUrl && <AvatarProfile imgUrl={profileImageUrl} size={32} />}
      {!profileImageUrl && (
        <Link href="/api/auth/login?to=/boards">
          <Button
            variant="primary"
            size="xs"
            className="rounded-[0.8rem] bg-neutral-20 px-[1.6rem] py-[0.8rem] text-body1-semi16 text-white hover:bg-neutral-30 focus:bg-neutral-30 active:bg-neutral-30"
          >
            가입하기
          </Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
