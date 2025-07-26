import { Chip } from "@ssok/ui";
import type { ReactNode } from "react";

export interface TableAmenitiesContentsProps {
  contents: Array<{
    text: string;
    label: string;
    icon: ReactNode;
  }>;
}

const TableAmenitiesContents = ({ contents }: TableAmenitiesContentsProps) => {
  return (
    <section className="flex flex-col gap-[1.6rem] rounded-[1.2rem] bg-neutral-98 p-[1.6rem]">
      {contents.map((content) => (
        <div key={content.text} className="flex items-center gap-[0.8rem]">
          <span className="flex-shrink-0 text-neutral-60">{content.icon}</span>
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
      ))}
    </section>
  );
};

export default TableAmenitiesContents;
