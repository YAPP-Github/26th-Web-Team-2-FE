import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import Calendar from ".";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const _Wrapper = () => {
      const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
        undefined,
      );

      const onDateSelect = (date: DateRange | undefined) => {
        setSelectedDate(date);
      };

      const _onApplyDate = () => {
        if (!selectedDate) {
          alert("날짜를 선택해주세요.");
          return;
        }
        alert(`선택된 날짜는: ${JSON.stringify(selectedDate)}`);
      };

      return (
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          onApplyDate={_onApplyDate}
        />
      );
    };

    return <_Wrapper />;
  },
};
