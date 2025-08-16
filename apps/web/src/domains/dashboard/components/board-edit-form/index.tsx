"use client";

import { useUpdateTripBoard } from "@ssok/api";
import type { TripBoardUpdateRequest } from "@ssok/api/schemas";
import { Button, cn, TextField } from "@ssok/ui";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import useSession from "@/shared/hooks/use-session";
import { formatDate } from "@/shared/utils/date";
import type { BoardEditFormData } from "../../types";
import BaseFormFields from "../base-form-field";

interface BoardEditFormProps {
  className?: string;
  tripBoardId: number;
  data: TripBoardUpdateRequest;
}

const BoardEditForm = ({
  className,
  tripBoardId,
  data,
}: BoardEditFormProps) => {
  const router = useRouter();

  const { accessToken } = useSession({ required: true });
  const { mutateAsync, isPending } = useUpdateTripBoard({
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const { handleSubmit, watch, control } = useForm<BoardEditFormData>({
    defaultValues: {
      boardName: data.boardName,
      destination: data.destination,
      dateRange: {
        from: new Date(data.startDate),
        to: new Date(data.endDate),
      },
    },
    mode: "onChange",
  });

  const [destination, dateRange, boardName] = watch([
    "destination",
    "dateRange",
    "boardName",
  ]);
  const isValid =
    !!destination && !!dateRange?.from && !!dateRange?.to && !!boardName;

  const onSubmit = async ({
    destination,
    dateRange,
    boardName,
  }: BoardEditFormData) => {
    if (!isValid || !dateRange.from || !dateRange.to || !boardName) {
      return;
    }

    try {
      const startDate = formatDate(dateRange.from, { format: "YYYY-MM-DD" });
      const endDate = formatDate(dateRange.to, { format: "YYYY-MM-DD" });

      const data: TripBoardUpdateRequest = {
        destination,
        boardName: boardName.trim() === "" ? `${destination} 여행` : boardName,
        startDate: startDate as unknown as Date,
        endDate: endDate as unknown as Date,
      };

      const response = await mutateAsync({
        tripBoardId,
        data,
      });

      if (response.data.result?.tripBoardId) {
        router.push(`/boards/${response.data.result.tripBoardId}/lists`);
      } else {
        console.error(response.data);
        throw new Error(`보드 수정 API 요청 실패`);
      }
    } catch (error) {
      console.error(`보드 수정 실패: ${error}`);
    } finally {
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex w-full flex-col", className)}
    >
      {/* 여행 이름 입력 */}
      <div className="mb-[4.8rem] flex flex-col gap-[0.8rem]">
        <label
          htmlFor="destination"
          className="text-heading2-semi18 text-neutral-30"
        >
          이 여행을 어떻게 부를까요?
        </label>
        <Controller
          name="boardName"
          control={control}
          rules={{
            required: true,
            maxLength: 20,
            pattern: /^[가-힣a-zA-Z\s]+$/,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              placeholder="입력하지 않으면 자동으로 생성돼요 (ex. 일본 여행)"
              maxLength={20}
              className="w-full bg-white"
              hasError={!!error}
            />
          )}
        />
      </div>
      <BaseFormFields control={control} />
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={!isValid || isPending}
        className="w-full justify-center"
      >
        수정하기
      </Button>
    </form>
  );
};

export default BoardEditForm;
