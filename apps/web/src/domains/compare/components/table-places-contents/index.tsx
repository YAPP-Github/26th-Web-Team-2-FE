import { Chip } from "@ssok/ui";
import type { ReactNode } from "react";

export interface TablePlacesContentsProps {
  contents: Array<{
    text: string;
    label: string;
    icon: ReactNode;
  }>;
}

const TablePlacesContents = ({ contents }: TablePlacesContentsProps) => {
  return (
    <section className="flex flex-col gap-[1.6rem] rounded-[1.2rem] bg-neutral-98 p-[1.6rem]">
      {contents.map((content) => (
        <div key={content.text}>
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
      ))}
    </section>
  );
};

export default TablePlacesContents;
