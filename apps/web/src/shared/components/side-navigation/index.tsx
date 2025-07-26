"use client";

import { cn } from "@ssok/ui";
import Link from "next/link";
import Logo from "@/shared/components/Logo";
import useNavigationMenus from "@/shared/components/side-navigation/use-navigation-menus";

const SideNavigation = () => {
  const menus = useNavigationMenus();

  return (
    <nav
      className={cn(
        "flex h-screen w-[8rem] flex-col gap-[4rem] px-[1.6rem] py-[2.4rem]",
        "border-neutral-90 border-r bg-neutral-95",
      )}
    >
      <Logo />

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
    </nav>
  );
};

export default SideNavigation;
