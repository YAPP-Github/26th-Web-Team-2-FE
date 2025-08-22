import { useUpdateAccommodationMemo } from "@ssok/api";
import { useToast } from "@ssok/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useUpdateMemo = (
  accessToken: string | null,
  selectedPerson: number | null,
  selectedFilter: string | null,
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [openedToggle, setOpenedToggle] = useState<number | null>(null);

  const onToggle = (id: number | null, _createdBy: number | null) => {
    setOpenedToggle((prev) => (prev === id ? null : id));
  };

  const onClose = () => {
    setOpenedToggle(null);
  };

  const { mutate: updateMemo, isPaused: isUpdateMemoPending } =
    useUpdateAccommodationMemo({
      request: { headers: { Authorization: `Bearer ${accessToken}` } },
    });

  const saveMemo = (accommodationId: number, data: { memo: string }) => {
    updateMemo(
      { accommodationId, data },
      {
        onSuccess: () => {
          toast.success("메모가 저장되었습니다!");
          queryClient.invalidateQueries({
            queryKey: [
              "accommodations",
              openedToggle,
              selectedPerson === 0 ? undefined : selectedPerson,
              10,
              selectedFilter,
            ],
          });
        },
        onError: (err) => {
          console.error("메모 저장 실패:", err);
        },
      },
    );
  };

  return { saveMemo, openedToggle, onToggle, onClose, isUpdateMemoPending };
};

export default useUpdateMemo;
