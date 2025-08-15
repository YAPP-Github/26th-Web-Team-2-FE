"use client";

import { useGetUserInfo } from "@ssok/api";
import { AvatarProfile, cn } from "@ssok/ui";
import Link from "next/link";
import { useRef, useState } from "react";
import { useOutsideClick } from "@/domains/list/hooks/use-outside-click";
import LogoSymbol from "@/shared/assets/logo-symbol.svg";
import useNavigationMenus from "@/shared/components/side-navigation/use-navigation-menus";
import { useSession } from "@/shared/hooks/use-session";

const SideNavigation = () => {
  const menus = useNavigationMenus();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { accessToken } = useSession({ required: true });
  const menuRef = useRef<HTMLDivElement>(null);

  const { data: userInfo } = useGetUserInfo({
    query: {
      enabled: !!accessToken,
    },
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const onOpenMenu = () => setIsMenuOpen(true);
  const onCloseMenu = () => setIsMenuOpen(false);
  const onToggleMenu = () => setIsMenuOpen((prev) => !prev);

  useOutsideClick(menuRef, () => {
    if (isMenuOpen) {
      onCloseMenu();
    }
  });

  return (
    <nav
      className={cn(
        "flex h-screen w-[8rem] flex-col justify-between px-[1.6rem] py-[2.4rem]",
        "border-neutral-90 border-r bg-neutral-95",
      )}
    >
      {/* 사이드바_상단 */}
      <section className="flex flex-col items-center gap-[4rem]">
        {/* 사이드바_상단_로고 */}
        <Link href="/" className="flex items-center justify-center">
          <LogoSymbol className="h-[4.8rem] w-[4.8rem]" />
        </Link>
        {/* 사이드바_상단_메뉴 */}
        <div className="flex flex-col gap-[2.4rem]">
          {menus.map(({ type, icon, label, href, active }) => (
            <Link
              key={type}
              href={href}
              className="group flex cursor-pointer flex-col items-center gap-[0.4rem]"
            >
              <div
                className={cn(
                  "flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-[0.4rem] transition-colors duration-200",
                  active
                    ? "bg-neutral-variant-90 text-secondary-60"
                    : "text-neutral-variant-70 group-hover:bg-neutral-90 group-hover:text-neutral-variant-60",
                )}
              >
                {icon}
              </div>
              <span
                className={cn(
                  "text-body1-medi16 transition-colors duration-200",
                  active
                    ? "text-body1-semi16 text-secondary-40"
                    : "text-neutral-variant-70 group-hover:text-body1-semi16 group-hover:text-neutral-variant-60",
                )}
              >
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>
      {/* 사이드바_하단_프로필 */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={onToggleMenu}
          onMouseEnter={onOpenMenu}
          className="flex items-center justify-center"
        >
          <AvatarProfile
            size={48}
            imgUrl={userInfo?.data.result?.profileImageUrl}
          />
        </button>
        {/* 사이드바_하단_토글메뉴 */}
        {isMenuOpen && (
          <section
            className={cn(
              "absolute bottom-0 left-[150%] z-[1] flex w-[30.2rem] flex-col gap-[2rem] rounded-[1.6rem] border border-neutral-90",
              "bg-neutral-100 px-[0.8rem] py-[2.4rem] shadow-[4px_4px_8px_0_rgba(0,0,0,0.15)]",
            )}
          >
            <header className="flex flex-col gap-[0.4rem] px-[1.6rem]">
              <p className="text-caption1-medi12 text-neutral-10">
                현재 로그인한 계정
              </p>
              <p className="text-body1-semi16 text-neutral-10">
                ssokssok@gmail.com
              </p>
            </header>
            {/* 회원관리 버튼 */}
            <ul className="flex flex-col gap-[0.8rem]">
              <li
                key="로그아웃"
                className={cn(
                  "rounded-[1.2rem] px-[1.6rem] py-[0.8rem] text-body2-semi14 text-neutral-60",
                  "hover:bg-neutral-95 focus:bg-neutral-90",
                )}
              >
                <button type="button">로그아웃</button>
              </li>
              <li
                key="회원탈퇴"
                className={cn(
                  "rounded-[1.2rem] px-[1.6rem] py-[0.8rem] text-body2-semi14 text-neutral-60",
                  "hover:bg-neutral-95 focus:bg-neutral-90",
                )}
              >
                <button type="button">회원탈퇴</button>
              </li>
            </ul>
          </section>
        )}
      </div>
    </nav>
  );
};

export default SideNavigation;
