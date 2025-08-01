import { Chip, TextField } from "@ssok/ui";
import type { ReactNode } from "react";
import type { ViewState } from "@/domains/compare/types";

export interface TableAmenitiesContentsProps {
  contents: Array<{
    text: string;
    label: string;
    icon: ReactNode;
  }>;
  state?: ViewState;
}

const TableAmenitiesContents = ({
  contents,
  state,
}: TableAmenitiesContentsProps) => {
  return (
    <section className="flex flex-col gap-[1.6rem] rounded-[1.2rem] bg-neutral-98 p-[1.6rem]">
      {contents.map((content) => (
        <>
          {state !== "edit" && (
            <div key={content.text} className="flex items-center gap-[0.8rem]">
              <span className="flex-shrink-0 text-neutral-60">
                {content.icon}
              </span>
              <p className="flex-shrink-0 text-body1-semi16 text-neutral-30">
                {content.text}
              </p>
              {content.label && (
                <Chip
                  size="md"
                  text={content.label}
                  className="min-w-0 max-w-full flex-shrink-1 bg-neutral-95 [&>span:last-child]:truncate"
                />
              )}
            </div>
          )}
          {state === "edit" && (
            // TODO: value/onChange 등록
            <div key={content.text} className="">
              <div className="mb-[0.4rem] flex items-center gap-[0.8rem]">
                <span className="flex-shrink-0 text-neutral-60">
                  {content.icon}
                </span>
                <p className="flex-shrink-0 text-body1-semi16 text-neutral-30">
                  {content.text}
                </p>
              </div>
              <TextField
                defaultValue={content.label}
                placeholder="필요한 정보를 기입해보세요. (최대 45자)"
                className="mb-[0.8rem] rounded-[0.8rem] bg-white text-body2-medi14 [&>input]:p-[0.8rem]"
              />
            </div>
          )}
        </>
      ))}
    </section>
  );
};

export default TableAmenitiesContents;
