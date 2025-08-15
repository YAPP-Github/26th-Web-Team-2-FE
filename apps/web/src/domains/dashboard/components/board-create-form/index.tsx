"use client";

import {
  Button,
  IcArrowRight,
  IcCalendar,
  IcCaretDown,
  TextField,
} from "@ssok/ui";
import { useForm } from "react-hook-form";

interface FormData {
  destination: string;
  startDate: string;
  endDate: string;
}

interface BoardCreateFormProps {
  className?: string;
}

const BoardCreateForm = ({ className }: BoardCreateFormProps) => {
  const maxDestinationLength = 20;

  const {
    register,
    handleSubmit,
    watch,
    formState: { _isValid },
  } = useForm<FormData>({
    defaultValues: {
      destination: "",
      startDate: "",
      endDate: "",
    },
    mode: "onChange",
  });

  const destination = watch("destination");

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // TODO: Implement board creation logic
  };

  return (
    <div className={`flex flex-col gap-[5.2rem] ${className}`}>
      {/* Header Section */}
      <div className="flex flex-col gap-[0.4rem]">
        <h1 className="text-neutral-25 text-title1-semi36">
          여행 준비를 시작해볼까요?
        </h1>
        <p className="text-body1-semi16 text-neutral-30">
          여행의 북마크를 모아서 보고 표로 비교해요!
        </p>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[1.2rem]"
      >
        <div className="flex flex-col gap-[4.8rem]">
          {/* Destination Input */}
          <div className="flex flex-col gap-[0.8rem]">
            <span className="text-heading2-semi18 text-neutral-30">
              어디로 떠나시나요?
            </span>
            <TextField
              {...register("destination", {
                required: true,
                maxLength: maxDestinationLength,
              })}
              placeholder="국가 혹은 도시를 입력해주세요."
              maxLength={maxDestinationLength}
              className="w-full"
            />
          </div>

          {/* Date Selection */}
          <div className="flex flex-col gap-[0.8rem]">
            <span className="text-heading2-semi18 text-neutral-30">
              언제 떠나시나요?
            </span>
            <div className="flex flex-col gap-[0.4rem]">
              {/* Date Labels */}
              <div className="flex justify-between">
                <span className="w-[20rem] text-body2-regular14 text-neutral-60">
                  시작일
                </span>
                <span className="w-[20rem] text-body2-regular14 text-neutral-60">
                  종료일
                </span>
              </div>

              {/* Date Inputs */}
              <div className="flex items-center gap-[2.4rem]">
                <button
                  type="button"
                  className="flex h-[5.2rem] w-[20rem] items-center justify-between rounded-[0.8rem] border border-neutral-90 bg-white px-[1.2rem] py-[0.8rem] text-body1-semi16 text-neutral-30"
                >
                  <div className="flex items-center gap-[0.8rem]">
                    <IcCalendar className="h-[2.4rem] w-[2.4rem] text-neutral-50" />
                    <span>2025. 06. 01(월)</span>
                  </div>
                  <IcCaretDown className="h-[1.6rem] w-[1.6rem] text-neutral-50" />
                </button>

                <IcArrowRight className="h-[2.4rem] w-[2.4rem] text-neutral-60" />

                <button
                  type="button"
                  className="flex h-[5.2rem] w-[20rem] items-center justify-between rounded-[0.8rem] border border-neutral-90 bg-white px-[1.2rem] py-[0.8rem] text-body1-semi16 text-neutral-30"
                >
                  <div className="flex items-center gap-[0.8rem]">
                    <IcCalendar className="h-[2.4rem] w-[2.4rem] text-neutral-50" />
                    <span>2025. 06. 01(월)</span>
                  </div>
                  <IcCaretDown className="h-[1.6rem] w-[1.6rem] text-neutral-50" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!destination || destination.length === 0}
          className="w-full"
        >
          보드 생성하기
        </Button>
      </form>
    </div>
  );
};

export default BoardCreateForm;
