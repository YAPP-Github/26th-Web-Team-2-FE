import Link from "next/link";
import SsokLogoWithIcon from "@/shared/assets/ssok-logo-with-icon.svg";

const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-between border-neutral-90 border-t bg-white px-[10.4rem] py-[4.8rem]">
      <div className="flex items-center gap-[5.6rem]">
        <SsokLogoWithIcon className="h-[3.3rem] w-[9.7rem]" />

        <div className="flex gap-[5.6rem]">
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
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ssok.contact@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-body3-semi15 text-neutral-15 transition-colors hover:text-neutral-40"
            >
              문의하기
            </a>
            <span className="text-body1-medi16 text-neutral-50">
              ssok.contact@gmail.com
            </span>
          </div>
        </div>
      </div>

      <div className="text-[1.6rem] text-body1-medi16 text-neutral-70">
        Copyright © 2025 SSOK All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
