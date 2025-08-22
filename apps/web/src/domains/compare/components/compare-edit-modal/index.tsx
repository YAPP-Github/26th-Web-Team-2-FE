import { Button, Popup, TextField } from "@ssok/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CompareEditModalProps {
  active: boolean;
  initialName: string;
  onClose: () => void;
  onConfirm: (data: { tableName: string }) => void;
}

const CompareEditModal = ({
  active,
  initialName,
  onClose,
  onConfirm,
}: CompareEditModalProps) => {
  const { register, handleSubmit, watch, reset } = useForm<{
    tableName: string;
  }>({
    defaultValues: { tableName: initialName },
  });

  useEffect(() => {
    reset({ tableName: initialName });
  }, [initialName, reset]);

  const onSubmit = (data: { tableName: string }) => {
    onConfirm({ tableName: data.tableName });
  };
  return (
    <Popup title="표 수정하기" active={active} onClose={onClose}>
      <form className="w-[59.9rem]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[0.8rem] px-[2.4rem] py-[2rem]">
          <p className="text-heading2-semi18 text-neutral-30">
            이 표를 어떻게 부를까요?
          </p>
          <TextField
            value={watch("tableName")}
            maxLength={20}
            placeholder="입력하지 않으면 기존 이름으로 저장돼요."
            {...register("tableName")}
          />
        </div>
        <div className="w-full p-[2.4rem]">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="flex w-full justify-center"
          >
            수정하기
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default CompareEditModal;
