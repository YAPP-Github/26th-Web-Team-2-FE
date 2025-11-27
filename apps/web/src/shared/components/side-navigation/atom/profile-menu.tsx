import { useGetUserInfo, useWithdrawUser } from "@ssok/api";
import {
  AvatarProfile,
  Confirm,
  cn,
  LoadingIndicator,
  useToggle,
} from "@ssok/ui";
import { useRef, useState } from "react";
import useOutsideClick from "@/domains/list/hooks/use-outside-click";
import useSession from "@/shared/hooks/use-session";
import { useAnalytics } from "@/shared/providers/modules/analytics-provider";

export const ModalConfig = {
  logout: {
    title: "로그아웃 하시겠어요?",
    description: "",
    cancelText: "취소",
    confirmText: "로그아웃",
  },
  withdraw: {
    title: "탈퇴를 진행하시겠어요?",
    description:
      "함께 만든 여행 정보가 사라져요.\n숙소 링크나 반응은 그대로 남을 수 있어요.\n원하신다면, 탈퇴전 미리 정리해주세요.",
    cancelText: "취소",
    confirmText: "탈퇴하기",
  },
};

const ProfileMenu = () => {
  const { trackEvent } = useAnalytics();
  const { accessToken, isPending: isSessionPending } = useSession();
  const { data: userInfo, isLoading } = useGetUserInfo({
    query: { enabled: !!accessToken },
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
  const { mutate: withdraw, isPending } = useWithdrawUser({
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const logout = async () => {
    trackEvent("LOGOUT", {
      page_referrer: window.location.href,
    });

    setTimeout(() => {
      window.location.href = "/api/auth/logout?to=/";
    }, 200);
  };

  const { active, activate, deactivate } = useToggle(false);
  const [modalConfig, setModalConfig] = useState<
    keyof typeof ModalConfig | null
  >(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onOpenMenu = () => setIsMenuOpen(true);
  const onCloseMenu = () => setIsMenuOpen(false);
  const onToggleMenu = () => setIsMenuOpen((prev) => !prev);

  useOutsideClick(menuRef, () => onCloseMenu());

  if (!accessToken && !isSessionPending) {
    return null;
  }

  return (
    <>
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
              "absolute bottom-0 left-[150%] z-[3] flex w-[30.2rem] flex-col gap-[2rem] rounded-[1.6rem] border border-neutral-90",
              "bg-neutral-100 px-[0.8rem] py-[2.4rem] shadow-[4px_4px_8px_0_rgba(0,0,0,0.15)]",
            )}
          >
            <header className="flex flex-col gap-[0.4rem] px-[1.6rem]">
              <p className="text-caption1-medi12 text-neutral-10">
                현재 로그인한 계정
              </p>
              <p className="text-body1-semi16 text-neutral-10">
                {userInfo?.data.result?.email}
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
                <button
                  type="button"
                  onClick={() => {
                    setModalConfig("logout");
                    activate();
                  }}
                >
                  로그아웃
                </button>
              </li>
              <li
                key="회원탈퇴"
                className={cn(
                  "rounded-[1.2rem] px-[1.6rem] py-[0.8rem] text-body2-semi14 text-neutral-60",
                  "hover:bg-neutral-95 focus:bg-neutral-90",
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    setModalConfig("withdraw");
                    activate();
                  }}
                >
                  회원탈퇴
                </button>
              </li>
            </ul>
          </section>
        )}
      </div>
      <Confirm
        active={active}
        onCancel={deactivate}
        {...ModalConfig[modalConfig ?? "logout"]}
        onConfirm={() => {
          if (modalConfig === "logout") {
            logout();
          } else if (modalConfig === "withdraw") {
            withdraw(undefined, {
              onSuccess: () => {
                trackEvent("SIGNOUT", {
                  // TODO: 탈퇴 시점에 맞는 여행 갯수 전달 필요
                  board_count: 10,
                });
                logout();
              },
            });
          }
        }}
      />
      <LoadingIndicator active={isLoading || isPending} />
    </>
  );
};

export default ProfileMenu;
