import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  url: string;
  memo?: string;
};

const useRegisterUrlInput = () => {
  const maxChars = 50; // 최대 글자 수;
  const [isMemoInputVisible, setIsMemoInputVisible] = useState(false);

  const handleMemoInputToggle = () => {
    setIsMemoInputVisible(!isMemoInputVisible);
  };

  const { register, handleSubmit, watch } = useForm<FormData>();

  const memoText = watch("memo") || "";

  return {
    isMemoInputVisible,
    handleMemoInputToggle,
    maxChars,
    register,
    handleSubmit,
    memoText,
  };
};

export default useRegisterUrlInput;
