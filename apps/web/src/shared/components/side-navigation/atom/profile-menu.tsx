import { useGetUserInfo } from "@ssok/api";
import { AvatarProfile, cn, useToggle } from "@ssok/ui";
import { useRef, useState } from "react";
import { useOutsideClick } from "@/domains/list/hooks/use-outside-click";
import { useSession } from "@/shared/hooks/use-session";
import ConfirmActionModal from "../../confirm-action.modal";

export const ModalConfig = {
  logout: {
    content: "로그아웃 하시겠어요?",
    description: null,
    actionBtnText: "로그아웃",
    onAction: () => {
      // 로그아웃
    },
  },
  withdraw: {
    content: "탈퇴를 진행하시겠어요?",
    description: (
      <>
        함께 만든 여행 정보가 사라져요. <br />
        숙소 링크나 반응은 그대로 남을 수 있어요. 원하신다면, <br />
        탈퇴전 미리 정리해주세요.
      </>
    ),
    actionBtnText: "탈퇴하기",
    onAction: () => {
      // 회원 탈퇴 로직
    },
  },
};

const ProfileMenu = () => {
  const { accessToken } = useSession({ required: true });
  const { data: userInfo } = useGetUserInfo({
    query: {
      enabled: !!accessToken,
    },
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
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
      <ConfirmActionModal
        active={active}
        onClose={deactivate}
        {...ModalConfig[modalConfig ?? "logout"]}
      />
    </>
  );
};

export default ProfileMenu;
