"use client";

import { Backdrop, Button, cn, IcShare, useToast } from "@ssok/ui";
import IcPC from "@/shared/assets/ic-pc.svg";
import share from "@/shared/utils/share";

type DialogProps = {
  active: boolean;
};

const Dialog = ({ active }: DialogProps) => {
  const { toast } = useToast();
  const onClick = async () => {
    const res = await share({
      url: window.location.href,
      title: "여행을 한번에 Ssok",
      text: "ssok은 데스크탑 화면으로 만나보세요",
    });
    if (res === "copiedToClipboard")
      toast.success(`링크가 클립보드에 복사되었습니다`);
    else if (res === "failed") toast.success(`링크 공유에 실패했습니다.`);
  };

  return (
    <Backdrop active={active}>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: onClick 사용하여 팝업 닫기 구현 */}
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: onClick 사용하여 팝업 닫기 구현 */}
      <div
        className={cn(
          "flex w-full max-w-[33.2rem] flex-col justify-center gap-[2.4rem] p-[1.6rem]",
          "rounded-[2rem] border border-secondary-90 bg-white shadow-[4px_4px_8px_0px_rgba(0,0,0,0.15)]",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <section className="flex w-full flex-col items-center justify-center gap-[0.8rem]">
          <IcPC width={80} height={80} alt="dialog-icon-pc" />
          <h1 className="text-heading1-semi20 text-neutral-20">
            아직은 PC에서만 가능해요
          </h1>
          <p className="text-center text-body1-medi16 text-neutral-20">
            링크를 공유해 PC에서
            <br />
            바로 이용할 수 있어요.
          </p>
        </section>
        <Button
          size="lg"
          variant="primary"
          icon={<IcShare width={20} height={20} />}
          onClick={onClick}
          className="flex w-full justify-center"
        >
          링크 공유
        </Button>
      </div>
    </Backdrop>
  );
};

export default Dialog;
