import type { Meta } from "@storybook/react-vite";
import { Pin } from "./index";

const meta: Meta<typeof Pin> = {
  title: "Components/Pin",
  component: Pin,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const AllKinds = () => {
  return (
    <div className="flex flex-col items-center gap-6 bg-gray-50 p-8">
      <div>
        <h3 className="mb-2 font-semibold text-lg">Hilton Tokyo 1</h3>
        <Pin>Hilton Tokyo 1</Pin>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-lg">Hilton Tokyo 2 (hover)</h3>
        <Pin className="border-neutral-60 before:border-t-neutral-60 after:border-t-neutral-100">
          Hilton Tokyo 2
        </Pin>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-lg">Hilton Tokyo 3 (focus)</h3>
        <Pin className="border-primary-5 bg-primary-5 text-primary-100 before:border-t-primary-5 after:border-t-primary-5 hover:after:border-t-primary-5">
          Hilton Tokyo 3
        </Pin>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-lg">Example Texts</h3>
        <div className="flex gap-4">
          <Pin>Ssok 지수</Pin>
          <Pin>Ssok 경민</Pin>
          <Pin>Ssok 시언</Pin>
          <Pin>Ssok 수빈</Pin>
          <Pin>Ssok 고은</Pin>
          <Pin>Ssok 세환</Pin>
          <Pin>Ssok 성연</Pin>
        </div>
      </div>
    </div>
  );
};
