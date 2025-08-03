import { Chip, IcCar, IcKm, IconTabs, IcWalker, TextField } from "@ssok/ui";
import { Fragment, type ReactNode } from "react";
import type { ViewState } from "@/domains/compare/types";

export interface TablePlacesContentsProps {
  contents: Array<{
    text: string;
    label: string;
    icon: ReactNode;
  }>;
  state?: ViewState;
}

const TablePlacesContents = ({ contents, state }: TablePlacesContentsProps) => {
  return (
    <section className="flex flex-col gap-[1.6rem] rounded-[1.2rem] bg-neutral-98 p-[1.6rem]">
      {contents.map((content) => (
        <Fragment key={content.text}>
          {state !== "edit" && (
            <div>
              <p className="mb-[0.4rem] text-body1-semi16 text-neutral-30">
                {content.text}
              </p>
              <Chip
                size="md"
                icon={content.icon}
                text={content.label}
                className="bg-neutral-95"
              />
            </div>
          )}
          {state === "edit" && (
            // TODO: max-w-[4rem]를 InputAutosize를 사용하여 자동으로 너비가 조정되도록 변경
            // TODO: value/onChange 등록
            <div key={content.text}>
              <TextField
                defaultValue={content.text}
                className="mb-[0.8rem] rounded-[0.8rem] bg-white text-body1-semi16 [&>input]:p-[0.8rem]"
              />
              <div className="flex">
                <IconTabs
                  value="car"
                  onChange={() => {}}
                  options={tabs}
                  className="mr-[0.4rem]"
                />
                <TextField
                  defaultValue={content.label}
                  className="max-w-[4rem] rounded-[0.8rem] bg-white text-body2-medi14 text-neutral-60 [&>input]:px-[0.8rem] [&>input]:py-[0.4rem]"
                />
              </div>
            </div>
          )}
        </Fragment>
      ))}
    </section>
  );
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

export default TablePlacesContents;
