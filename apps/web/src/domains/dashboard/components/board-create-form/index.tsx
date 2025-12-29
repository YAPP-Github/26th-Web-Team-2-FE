"use client";

import { useCreateTripBoard } from "@ssok/api";
import type { TripBoardCreateRequest } from "@ssok/api/schemas";
import { Button, cn, LoadingIndicator } from "@ssok/ui";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useSession from "@/shared/hooks/use-session";
import { useAnalytics } from "@/shared/providers/modules/analytics-provider";
import { formatDate } from "@/shared/utils/date";
import type { BoardCreateFormData } from "../../types";
import BaseFormFields from "../base-form-field";

interface BoardCreateFormProps {
  className?: string;
}

const BoardCreateForm = ({ className }: BoardCreateFormProps) => {
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  const { accessToken } = useSession({ required: true });
  const createTripBoardMutation = useCreateTripBoard({
    request: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const { handleSubmit, watch, control } = useForm<BoardCreateFormData>({
    defaultValues: {
      destination: "",
      dateRange: {
        from: undefined,
        to: undefined,
      },
    },
    mode: "onChange",
  });

  const [destination, dateRange] = watch(["destination", "dateRange"]);
  const isValid = !!destination && !!dateRange?.from && !!dateRange?.to;

  const onSubmit = async ({ destination, dateRange }: BoardCreateFormData) => {
    if (
      !isValid ||
      !dateRange.from ||
      !dateRange.to ||
      createTripBoardMutation.isPending
    ) {
      return;
    }

    try {
      const startDate = formatDate(dateRange.from, { format: "YYYY-MM-DD" });
      const endDate = formatDate(dateRange.to, { format: "YYYY-MM-DD" });

      const boardName = `${destination} 여행`;
      const data: TripBoardCreateRequest = {
        destination,
        boardName,
        startDate: startDate as unknown as Date,
        endDate: endDate as unknown as Date,
      };

      const response = await createTripBoardMutation.mutateAsync({ data });

      if (response.data.result?.tripBoardId) {
        trackEvent("BOARD_CREATE", {
          board_id: response.data.result.tripBoardId,
          board_name: `${destination} 여행`,
        });
        router.push(`/boards/${response.data.result.tripBoardId}/lists`);
      } else {
        console.error(response.data);
        throw new Error(`보드 생성 API 요청 실패`);
      }
    } catch (error) {
      console.error(`보드 생성 실패: ${error}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex w-full flex-col", className)}
    >
      <BaseFormFields control={control} />
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={!isValid || createTripBoardMutation.isPending}
        className="w-full justify-center"
      >
        보드 생성하기
      </Button>
      <LoadingIndicator active={createTripBoardMutation.isPending} />
    </form>
  );
};

export default BoardCreateForm;
