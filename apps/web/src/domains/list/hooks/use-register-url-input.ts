import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  link: string;
  memo?: string;
};

const useRegisterUrlInput = () => {
  const maxChars = 50; // 최대 글자 수;
  const [isMemoInputVisible, setIsMemoInputVisible] = useState(false);

  const handleMemoInputToggle = () => {
    setIsMemoInputVisible(!isMemoInputVisible);
  };

  const { register, handleSubmit, watch, setValue } = useForm<FormData>();

  const memoText = watch("memo") || "";

  return {
    isMemoInputVisible,
    handleMemoInputToggle,
    maxChars,
    register,
    handleSubmit,
    memoText,
    setValue,
    watch,
  };
};

export default useRegisterUrlInput;
