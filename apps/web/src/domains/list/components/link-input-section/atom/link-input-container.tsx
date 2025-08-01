import { IcLink, TextField } from "@ssok/ui";
import type { UseFormRegister, UseFormWatch } from "react-hook-form";

type FormData = {
  link: string;
  memo?: string;
};

type LinkInputSectionProps = {
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
};

const LinkInputContainer = ({ register, watch }: LinkInputSectionProps) => {
  return (
    <div>
      <TextField
        placeholder="숙소의 상세 페이지 링크를 복사해서 붙여넣거나, 드래그해 추가해 주세요"
        icon={<IcLink width="24" height="24" />}
        value={watch("link")}
        // TODO: zod validation 추가
        {...register("link", { required: "URL을 입력해주세요" })}
      />
    </div>
  );
};

export default LinkInputContainer;
