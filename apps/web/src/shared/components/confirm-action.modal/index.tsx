import { Popup, type PopupProps } from "@ssok/ui";

type Props = Omit<PopupProps, "children">;

type ConfirmActionModalProps = Props & {
  content: string;
  description: React.ReactNode | null;
  cancelBtnText?: string;
  onCancel?: () => void;
  actionBtnText: string;
  onAction: () => void;
};

const ConfirmActionModal = ({
  content,
  description,
  cancelBtnText = "취소",
  onCancel,
  actionBtnText,
  onAction,
  ...props
}: ConfirmActionModalProps) => {
  return (
    <Popup className="min-w-[39.9rem]" hasHeader={false} {...props}>
      <section className="flex flex-col gap-[3.2rem]">
        {/* 모달 제목 + 본문 */}
        <div className="flex flex-col gap-[1.6rem]">
          <h1 className="text-heading1-semi20 text-neutral-5">{content}</h1>
          {description && (
            <div className="text-body1-medi16 text-neutral-20">
              {description}
            </div>
          )}
        </div>
        {/* 모달버튼 */}
        <div className="flex w-full justify-end gap-[0.8rem]">
          <button
            type="button"
            onClick={onCancel ? onCancel : props.onClose}
            className="rounded-[1.2rem] px-[1.6rem] py-[0.8rem] text-body3-semi15 text-neutral-40"
          >
            {cancelBtnText}
          </button>
          <button
            type="button"
            onClick={onAction}
            className="rounded-[1.2rem] bg-error-60 px-[1.6rem] py-[0.8rem] text-body3-semi15 text-primary-100"
          >
            {actionBtnText}
          </button>
        </div>
      </section>
    </Popup>
  );
};

export default ConfirmActionModal;
