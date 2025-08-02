"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  type DraggableAttributes,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as Accordion from "@radix-ui/react-accordion";
import { cn, DeleteIconButton, IcAddBox, IcCollapse, IcExpand } from "@ssok/ui";
import Image from "next/image";
import type { Accommodation } from "@/domains/compare/types";
import AddButton from "@/shared/components/add-button";

interface CompareAccommodationsProps {
  accommodations: Accommodation[];
  maxAccommodations?: number;
  onAddAccommodation?: () => void;
  onRemoveAccommodation?: (id: number) => void;
  onReorderAccommodations?: (accommodations: Accommodation[]) => void;
  className?: string;
}

const CompareAccommodations = ({
  accommodations = [],
  maxAccommodations = 6,
  onAddAccommodation,
  onRemoveAccommodation,
  onReorderAccommodations,
  className,
}: CompareAccommodationsProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = accommodations.findIndex(
        (item) => item.id === active.id,
      );
      const newIndex = accommodations.findIndex((item) => item.id === over.id);

      const reorderedAccommodations = arrayMove(
        accommodations,
        oldIndex,
        newIndex,
      );
      onReorderAccommodations?.(reorderedAccommodations);
    }
  };

  return (
    <Accordion.Root
      type="single"
      collapsible
      className={cn(
        "max-h-[46rem] rounded-[1.6rem] border border-neutral-90 bg-white transition-colors hover:bg-neutral-98",
        className,
      )}
    >
      <Accordion.Item value="accommodations">
        {/* Header - Accordion Trigger */}
        <Accordion.Trigger className="group flex w-full items-center justify-between p-[2.4rem] focus:outline-none">
          <div className="flex items-center text-body2-medi14 text-neutral-70">
            <span className="mr-[0.8rem] text-heading1-semi20 text-neutral-20">
              비교 중인 숙소
            </span>
            (
            <span className="text-neutral-variant-30">
              {accommodations.length}
            </span>
            /{maxAccommodations})
          </div>
          <ToggleIndicator />
        </Accordion.Trigger>

        {/* Content */}
        <Accordion.Content className="flex flex-1 flex-col gap-4 overflow-hidden px-6 pb-6 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          {/* Add Hotel Button */}
          <AddButton onClick={onAddAccommodation} className="shrink-0">
            <IcAddBox
              width="24"
              height="24"
              className="mr-[1rem] text-neutral-70"
            />
            <span className="text-body1-semi16 text-neutral-60">
              비교 호텔 추가하기
            </span>
          </AddButton>

          {/* Accommodations List */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={accommodations.map((a) => a.id || 0)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex max-h-[32rem] flex-1 flex-col gap-4 overflow-y-auto">
                {accommodations.map((accommodation) => (
                  <AccommodationItem
                    key={accommodation.id}
                    accommodation={accommodation}
                    onRemove={onRemoveAccommodation}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

interface AccommodationItemProps {
  accommodation: Accommodation;
  onRemove?: (id: number) => void;
}

const AccommodationItem = ({
  accommodation,
  onRemove,
}: AccommodationItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: accommodation.id || 0 });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("flex items-center", isDragging && "opacity-50")}
    >
      <DragHandle {...attributes} {...listeners} />

      {/* Hotel Image */}
      <div className="relative mr-[0.8rem] h-[4.8rem] w-[4.8rem] shrink-0 overflow-hidden rounded-2xl bg-neutral-90">
        <Image
          src={accommodation.images?.[0] || "/placeholder-hotel.jpg"}
          alt={accommodation.accommodationName || "Hotel Image"}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      {/* Hotel Info */}
      <div className="flex flex-1 flex-col justify-center gap-1">
        <h3 className="line-clamp-1 text-body1-semi16 text-neutral-30">
          {accommodation.accommodationName}
        </h3>
        <p className="line-clamp-1 text-body2-medi14 text-neutral-50">
          {accommodation.nearbyAttractions?.[0]?.name || "위치 정보 없음"}
        </p>
      </div>

      {/* Delete Button */}
      <DeleteIconButton
        onClick={() => accommodation.id && onRemove?.(accommodation.id)}
        className="shrink-0 rounded-[0.6rem] bg-neutral-95 p-[0.6rem] [&>svg]:h-[1.2rem] [&>svg]:w-[1.2rem]"
      />
    </div>
  );
};

const DragHandle = (props: SyntheticListenerMap | DraggableAttributes) => (
  <div
    className="flex w-[2.4rem] shrink-0 cursor-grab flex-col items-center gap-2 p-[0.8rem] active:cursor-grabbing"
    {...props}
  >
    {[0, 1, 2].map((index) => (
      <div key={index} className="flex gap-[0.2rem]">
        {[0, 1].map((dot) => (
          <div
            key={dot}
            className="h-[0.2rem] w-[0.2rem] rounded-full bg-neutral-80"
          />
        ))}
      </div>
    ))}
  </div>
);

const ToggleIndicator = () => (
  <div className="relative flex h-6 w-6 items-center justify-center">
    <IcExpand
      width="24"
      height="24"
      className="absolute text-neutral-40 transition-all duration-300 ease-in-out group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-0"
    />
    <IcCollapse
      width="24"
      height="24"
      className="absolute text-neutral-40 opacity-0 transition-all duration-300 ease-in-out group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-100"
    />
  </div>
);

export default CompareAccommodations;
