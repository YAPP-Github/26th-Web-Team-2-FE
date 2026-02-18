import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Button from "@/components/button";
import Calendar from "@/components/calendar";
import {
  DateRangePickerMobile,
  type DateRangeValue,
} from "@/components/date-range-picker";
import TextField from "@/components/text-field";
import { formatDateRangeForButton } from "@/utils/date";
import BottomSheet from ".";

const meta: Meta<typeof BottomSheet> = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    active: {
      control: "boolean",
      description: "바텀시트 표시 여부",
    },
    showBackdrop: {
      control: "boolean",
      description: "배경 어둡게 표시 여부",
    },
    closeOnBackdropClick: {
      control: "boolean",
      description: "배경 터치 시 닫기 여부",
    },
    onClose: {
      action: "closed",
      description: "바텀시트 닫을 때 호출되는 콜백",
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center p-[2.4rem]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [active, setActive] = useState(false);

    return (
      <>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => setActive(true)}
        >
          바텀시트 열기
        </Button>
        <BottomSheet
          {...args}
          active={active}
          onClose={() => {
            setActive(false);
            args.onClose?.();
          }}
        >
          <BottomSheet.Header title="바텀시트" />
          <BottomSheet.Body>
            <p className="text-body1-regular16 text-neutral-30">
              Header에는 제목과 닫기 버튼을 배치할 수 있습니다.
            </p>
            <p className="text-body1-regular16 text-neutral-30">
              Body 영역에는 폼 필드나 설명 텍스트 등 다양한 콘텐츠를 넣을 수
              있습니다.
            </p>
          </BottomSheet.Body>
          <BottomSheet.Footer>
            <Button
              variant="primary"
              size="lg"
              className="flex w-full items-center"
            >
              확인
            </Button>
          </BottomSheet.Footer>
        </BottomSheet>
      </>
    );
  },
  args: {
    showBackdrop: true,
    closeOnBackdropClick: true,
  },
};

export const 여행보드생성_모바일: Story = {
  render: (args) => {
    const [active, setActive] = useState(false);
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [dateRange, setDateRange] = useState<DateRangeValue>({});
    const [destination, setDestination] = useState("");

    return (
      <>
        <Button variant="primary" size="lg" onClick={() => setActive(true)}>
          새 여행 만들기
        </Button>

        {/* 여행 보드 생성 바텀시트 */}
        <BottomSheet
          {...args}
          active={active}
          onClose={() => {
            setActive(false);
            args.onClose?.();
          }}
        >
          <BottomSheet.Header title="새 여행 만들기" />
          <BottomSheet.Body>
            <div className="flex flex-col gap-[2.4rem]">
              <div className="flex flex-col gap-[0.8rem]">
                <label
                  htmlFor="destination"
                  className="text-body1-semi16 text-neutral-20"
                >
                  어디로 떠나시나요?
                </label>
                <TextField
                  id="destination"
                  placeholder="국가 혹은 도시를 입력해주세요."
                  maxLength={20}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-[0.8rem]">
                <label
                  htmlFor="date-range-trigger"
                  className="text-body1-semi16 text-neutral-20"
                >
                  언제 떠나시나요?
                </label>
                <DateRangePickerMobile
                  triggerId="date-range-trigger"
                  open={datePickerOpen}
                  onOpenChange={setDatePickerOpen}
                  value={dateRange}
                  onChange={setDateRange}
                  placeholder={{ from: "출발일 선택", to: "도착일 선택" }}
                  render={({ trigger }) => trigger}
                />
              </div>
            </div>
          </BottomSheet.Body>
          <BottomSheet.Footer>
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setActive(false)}
            >
              보드 생성하기
            </Button>
          </BottomSheet.Footer>
        </BottomSheet>

        {/* Date Picker 바텀시트 (날짜 버튼 터치 시 위 시트 위에 표시) */}
        <BottomSheet
          active={active && datePickerOpen}
          onClose={() => setDatePickerOpen(false)}
          showBackdrop={true}
          closeOnBackdropClick={true}
          containerClassName="z-[101]"
        >
          <BottomSheet.Body className="pt-[2.4rem]">
            <DateRangePickerMobile
              open={datePickerOpen}
              onOpenChange={setDatePickerOpen}
              value={dateRange}
              onChange={setDateRange}
              placeholder={{ from: "출발일 선택", to: "도착일 선택" }}
              render={({ calendarProps }) => (
                <Calendar
                  {...calendarProps}
                  applyButtonLabel={(range) =>
                    range?.from
                      ? formatDateRangeForButton(range.from, range.to)
                      : "날짜 선택"
                  }
                />
              )}
            />
          </BottomSheet.Body>
        </BottomSheet>
      </>
    );
  },
  args: {
    showBackdrop: true,
    closeOnBackdropClick: true,
  },
};
