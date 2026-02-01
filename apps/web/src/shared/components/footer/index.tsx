import { cn } from "@ssok/ui";
import Link from "next/link";
import SsokLogoWithIcon from "@/shared/assets/ssok-logo-with-icon.svg";

const Footer = () => {
  return (
    <footer
      className={cn(
        "flex w-full border-neutral-90 border-t bg-white",
        "max-xl:flex-col max-xl:items-start max-xl:gap-[3.6rem] max-xl:px-[1.6rem] max-xl:pt-[4.8rem] max-xl:pb-[7.2rem]",
        "xl:items-center xl:justify-between xl:px-[10.4rem] xl:py-[4.8rem]",
      )}
    >
      <div
        className={cn(
          "flex",
          "max-xl:flex-col max-xl:items-start max-xl:gap-[3.6rem]",
          "xl:flex-row xl:items-center xl:gap-[5.6rem]",
        )}
      >
        <div className={cn("w-[8.9rem]", "xl:w-[9.7rem]")}>
          <SsokLogoWithIcon className="h-auto w-full" />
        </div>

        <div
          className={cn(
            "flex",
            "max-xl:flex-col max-xl:gap-[0.8rem]",
            "xl:flex-row xl:gap-[5.6rem]",
          )}
        >
          <Link
            href="https://jisuuuu.notion.site/248ca0b46ff280448723de5730098904?pvs=143"
            className="text-body3-semi15 text-neutral-15 transition-colors hover:text-neutral-40"
          >
            개인정보 처리방침
          </Link>
          <Link
            href="https://jisuuuu.notion.site/247ca0b46ff2805e9102f93a62f7c16d?source=copy_link"
            className="text-body3-semi15 text-neutral-15 transition-colors hover:text-neutral-40"
          >
            서비스 이용약관
          </Link>
          <div className="flex items-center gap-[0.8rem]">
            <Link
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ssok.contact@gmail.com"
              className="text-body3-semi15 text-neutral-15 transition-colors hover:text-neutral-40"
            >
              문의하기
            </Link>
            <span className="text-body1-medi16 text-neutral-50">
              ssok.contact@gmail.com
            </span>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "text-neutral-70",
          "max-xl:text-body2-medi14",
          "xl:text-body1-medi16",
        )}
      >
        Copyright © 2025 SSOK All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
