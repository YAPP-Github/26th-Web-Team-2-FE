import { IcLink, Popup, useToast } from "@ssok/ui";

type CompareShareModalProps = {
  active: boolean;
  deactivate: () => void;
  shareCode?: string;
};

const CompareShareModal = ({
  active,
  deactivate,
  shareCode,
}: CompareShareModalProps) => {
  const { toast } = useToast();
  const onClick = async () => {
    if (!shareCode) return;
    try {
      const url = `${window.location.href}?shareCode=${shareCode}`;
      await navigator.clipboard.writeText(url);
      toast.success("링크가 복사되었어요");
    } catch (error) {
      console.error("링크 복사에 실패했어요", error);
      toast.success("링크 복사에 실패했어요");
    }
  };
  return (
    <Popup
      title="비교표 내용을 친구에게 공유해보세요"
      active={active}
      onClose={deactivate}
      className="min-w-[55.9rem]"
    >
      <ul className="flex items-center justify-center pt-[2rem] pb-[3.6rem]">
        <li className="flex w-fit rounded-full border-[0.2rem] border-neutral-95 p-[0.5rem]">
          <button type="button" onClick={onClick}>
            <IcLink width={41} height={41} className="text-neutral-50" />
          </button>
        </li>
      </ul>
    </Popup>
  );
};

export default CompareShareModal;
