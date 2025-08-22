import { Chip, IcCar, IcKm, IconTabs, IcWalker, TextField } from "@ssok/ui";
import { useMemo } from "react";
import {
  Controller,
  type SetValueConfig,
  useFormContext,
  useWatch,
} from "react-hook-form";
import type {
  ComparisonFormData,
  ComparisonPlace,
  ViewState,
} from "@/domains/compare/types";

export interface NearbyPlacesCellProps {
  places: Array<ComparisonPlace>;
  state: ViewState;
  name:
    | `accommodationRequestList.${number}.nearbyAttractions`
    | `accommodationRequestList.${number}.nearbyTransportation`;
}

const NearbyPlacesCell = ({ places, state, name }: NearbyPlacesCellProps) => {
  return (
    <section className="flex flex-col gap-[1.6rem] rounded-[1.2rem] bg-neutral-98 p-[1.6rem]">
      {places.map((_, index) => (
        <NearbyPlace key={index} state={state} name={`${name}.${index}`} />
      ))}
    </section>
  );
};

const NearbyPlace = ({
  state,
  name,
}: {
  state: ViewState;
  name:
    | `accommodationRequestList.${number}.nearbyAttractions.${number}`
    | `accommodationRequestList.${number}.nearbyTransportation.${number}`;
}) => {
  const { control, setValue } = useFormContext<ComparisonFormData>();
  const place = useWatch({ control, name });
  const { icon, label, type } = usePlaceChip({ place });

  const timeName = useMemo(() => {
    if (type === "car") {
      return `${name}.byCar.time` as const;
    } else if (type === "walk") {
      return `${name}.byFoot.time` as const;
    } else {
      return `${name}.byCar.distance` as const;
    }
  }, [type, name]);

  const handleChangeTab = (type: string) => {
    const options = {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    } satisfies SetValueConfig;
    if (type === "car") {
      setValue(`${name}.byCar`, { time: label }, options);
      setValue(`${name}.byFoot`, {}, options);
    } else if (type === "walk") {
      setValue(`${name}.byCar`, {}, options);
      setValue(`${name}.byFoot`, { time: label }, options);
    } else {
      setValue(`${name}.byCar`, { distance: label }, options);
      setValue(`${name}.byFoot`, {}, options);
    }
  };

  return (
    <>
      {state !== "edit" && (
        <div>
          <p className="mb-[0.4rem] text-body1-semi16 text-neutral-30">
            {place.name}
          </p>
          <Chip size="md" icon={icon} text={label} className="bg-neutral-95" />
        </div>
      )}
      {state === "edit" && (
        <div>
          <Controller
            control={control}
            name={`${name}.name`}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ""}
                className="mb-[0.8rem] rounded-[0.8rem] bg-white text-body1-semi16 [&>input]:p-[0.8rem]"
                placeholder="장소명을 입력하세요"
              />
            )}
          />
          <div className="flex items-end gap-[0.4rem]">
            <IconTabs
              value={type}
              onChange={handleChangeTab}
              options={tabs}
              className="mb-0"
            />
            <Controller
              key={timeName}
              control={control}
              name={timeName}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ""}
                  className="max-w-[rem] rounded-[0.8rem] bg-white text-body2-medi14 [&>input]:px-[0.8rem] [&>input]:py-[0.4rem]"
                  placeholder="5분"
                />
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};

const usePlaceChip = ({ place }: { place: ComparisonPlace }) => {
  return useMemo(() => {
    if (place.byFoot?.time) {
      return { type: "walk", icon: <IcWalker />, label: place.byFoot.time };
    }
    if (place.byCar?.time) {
      return { type: "car", icon: <IcCar />, label: place.byCar.time };
    }
    return { type: "km", icon: <IcKm />, label: place.byCar?.distance || "0" };
  }, [place]);
};

const tabs = [
  {
    value: "car",
    icon: <IcCar />,
  },
  {
    value: "walk",
    icon: <IcWalker />,
  },
  {
    value: "km",
    icon: <IcKm />,
  },
];

export default NearbyPlacesCell;
