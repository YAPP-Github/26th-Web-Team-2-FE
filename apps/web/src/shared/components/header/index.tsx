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
        "flex h-[6.5rem] w-full items-center justify-between border-neutral-90 border-b bg-white px-[10.4rem]",
        className,
      )}
    >
      <div className="flex items-center gap-[6.4rem]">
        <Link href="/" className="flex items-center">
          <SsokLogo className="h-[3.2rem] w-[8rem]" />
        </Link>
        <nav className="flex items-center gap-[4rem]">
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
