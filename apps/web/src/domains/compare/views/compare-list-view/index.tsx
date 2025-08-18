"use client";

import { cn, Tile } from "@ssok/ui";
import ComparePageHeader from "../../components/compare-page-header";

const CompareListView = () => {
  return (
    <section className="flex h-screen w-full flex-col bg-neutral-98 p-[2.4rem] [&+div]:w-0">
      <ComparePageHeader
        title={"비교표"}
        creator={`알 수 없음님`}
        createdAt={new Date()}
        count={0}
        className="mb-[1.6rem] shrink-0"
      />
      <div
        className={cn(
          "relative h-full w-full max-w-full overflow-scroll rounded-[1.6rem] border border-neutral-90 bg-white",
        )}
      >
        <h1 className="p-[2.4rem] text-heading1-semi20 text-neutral-10">
          생성된 표
        </h1>
        <ul className="grid grid-cols-2 gap-[1.6rem] p-[2.4rem]">
          <Tile
            data={{
              tableName: "비교할 표 제목",
              accommodationCount: 2,
              accommodationNames: ["호텔 이름 어쩌구", "호텔 이름 어쩌구"],
              lastModifiedAt: "24.03.23",
            }}
            onDeleteClick={() => {}}
            onEditClick={() => {}}
            onShareClick={() => {}}
          />
          <Tile
            data={{
              tableName: "비교할 표 제목",
              accommodationCount: 2,
              accommodationNames: ["호텔 이름 어쩌구", "호텔 이름 어쩌구"],
              lastModifiedAt: "24.03.23",
            }}
            onDeleteClick={() => {}}
            onEditClick={() => {}}
            onShareClick={() => {}}
          />
        </ul>
      </div>
    </section>
  );
};

export default CompareListView;
