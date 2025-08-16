"use client";

import { Popup, type PopupProps } from "@ssok/ui";
import Link from "next/link";
import LogoLarge from "@/shared/assets/logo-large.svg";
import SocialKakao from "@/shared/assets/social-kakao.svg";

export interface LoginPopupProps extends Omit<PopupProps, "children"> {}

const LoginPopup = ({ className, ...props }: LoginPopupProps) => {
  return (
    <Popup className="w-full max-w-[40rem]" {...props}>
      <div className="flex flex-col items-center">
        <LogoLarge className="mb-[3.2rem] h-[7.6rem] w-[12rem]" />

        <div className="mb-[4.8rem] flex flex-col gap-[0.8rem] text-center">
          <h2 className="text-heading2-semi18 text-neutral-25">
            이 기능을 사용하려면 로그인이 필요해요
          </h2>
          <p className="text-body2-medi14 text-neutral-50">
            복잡한 숙소 정보, 한 눈에 쏙 ! 비교해보세요
          </p>
        </div>

        <Link
          href="/api/auth/login"
          className="flex h-[4.8rem] w-full items-center justify-center gap-[0.8rem] rounded-[1.2rem] bg-[#FEE500] px-[1.4rem] transition-opacity hover:opacity-70"
        >
          <SocialKakao className="h-[1.8rem] w-[1.8rem]" />
          <span className="text-[rgba(0,0,0,0.85)] text-body3-semi15">
            카카오 로그인
          </span>
        </Link>
      </div>
    </Popup>
  );
};

export default LoginPopup;
