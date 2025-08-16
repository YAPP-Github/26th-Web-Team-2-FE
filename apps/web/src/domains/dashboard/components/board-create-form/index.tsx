"use client";

import { useCreateTripBoard } from "@ssok/api";
import type { TripBoardCreateRequest } from "@ssok/api/schemas";
import { Button, cn } from "@ssok/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSession from "@/shared/hooks/use-session";
import { formatDate } from "@/shared/utils/date";
import type { BoardCreateFormData } from "../../types";
import BaseFormFields from "../base-form-field";

interface BoardCreateFormProps {
  className?: string;
}

const BoardCreateForm = ({ className }: BoardCreateFormProps) => {
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
        router.push(`/boards/${response.data.result.tripBoardId}/lists`);
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
      <BaseFormFields control={control} />
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

export default BoardCreateForm;
