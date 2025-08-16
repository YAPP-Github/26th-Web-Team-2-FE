"use client";

import { useCreateTripBoard } from "@ssok/api";
import type { TripBoardCreateRequest } from "@ssok/api/schemas";
import { Button, cn, DateRangePicker, TextField } from "@ssok/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SymbolRightArrow from "@/domains/dashboard/assets/symbol_arrow_right.svg";
import useSession from "@/shared/hooks/use-session";
import { formatDate } from "@/shared/utils/date";
import type { BoardCreateFormData } from "../../types";

interface BoardCreateFormProps {
  className?: string;
}

export const BoardCreateForm = ({ className }: BoardCreateFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { accessToken } = useSession({ required: true });
  const createTripBoardMutation = useCreateTripBoard({
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const { handleSubmit, watch, control } = useForm<BoardCreateFormData>({
    defaultValues: {
      destination: "",
      dateRange: {
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 1)),
      },
    },
    mode: "onChange",
  });

  const [destination, dateRange] = watch(["destination", "dateRange"]);
  const isValid = !!destination && !!dateRange?.from && !!dateRange?.to;

  const onSubmit = async ({ destination, dateRange }: BoardCreateFormData) => {
    if (!isValid || isSubmitting || !dateRange.from || !dateRange.to) {
      return;
    }

    setIsSubmitting(true);

    try {
      const startDate = formatDate(dateRange.from, { format: "YYYY-MM-DD" });
      const endDate = formatDate(dateRange.to, { format: "YYYY-MM-DD" });

      const data: TripBoardCreateRequest = {
        destination,
        boardName: `${destination} 여행`,
        startDate: startDate as unknown as Date,
        endDate: endDate as unknown as Date,
      };

      const response = await createTripBoardMutation.mutateAsync({ data });

      if (response.data.result?.tripBoardId) {
        router.push(`/boards/${response.data.result.tripBoardId}`);
      } else {
        console.error(response.data);
        throw new Error(`보드 생성 API 요청 실패`);
      }
    } catch (error) {
      console.error(`보드 생성 실패: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex w-full flex-col", className)}
    >
      <div className="mb-[4.8rem] flex flex-col gap-[0.8rem]">
        <label
          htmlFor="destination"
          className="text-heading2-semi18 text-neutral-30"
        >
          어디로 떠나시나요?
        </label>
        <Controller
          name="destination"
          control={control}
          rules={{
            required: true,
            maxLength: 20,
            pattern: /^[가-힣a-zA-Z\s]+$/,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              placeholder="국가 혹은 도시를 입력해주세요."
              maxLength={20}
              className="w-full bg-white"
              hasError={!!error}
            />
          )}
        />
      </div>

      <div className="mb-[5.2rem] flex flex-col gap-[0.8rem]">
        <div className="text-heading2-semi18 text-neutral-30">
          언제 떠나시나요?
        </div>
        <Controller
          name="dateRange"
          control={control}
          rules={{
            validate: (value) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              if (
                !value.from ||
                !value.to ||
                value.from < today ||
                value.to < value.from
              ) {
                return false;
              }

              return true;
            },
          }}
          render={({ field }) => (
            <DateRangePicker
              value={field.value}
              onChange={field.onChange}
              placeholder={{ from: "시작일 선택", to: "종료일 선택" }}
              render={({ from, to }) => (
                <div className="flex items-center justify-between gap-[0.8rem]">
                  <div className="flex w-full min-w-0 max-w-[22rem] flex-1 flex-col gap-[0.4rem]">
                    <span className="text-body2-regular14 text-neutral-60">
                      시작일
                    </span>
                    {from}
                  </div>
                  <SymbolRightArrow className="mt-[3rem] h-[2.4rem] w-[2.4rem] shrink-0 text-neutral-60" />
                  <div className="flex w-full min-w-0 max-w-[22rem] flex-1 flex-col gap-[0.4rem]">
                    <span className="text-body2-regular14 text-neutral-60">
                      종료일
                    </span>
                    {to}
                  </div>
                </div>
              )}
              className="flex flex-col gap-[0.8rem]"
            />
          )}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={!isValid || isSubmitting}
        className="w-full justify-center"
      >
        보드 생성하기
      </Button>
    </form>
  );
};
