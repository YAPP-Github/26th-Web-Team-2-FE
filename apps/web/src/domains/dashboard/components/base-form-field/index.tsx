"use client";

import { DateRangePicker, TextField } from "@ssok/ui";
import { type Control, Controller } from "react-hook-form";
import SymbolRightArrow from "@/domains/dashboard/assets/symbol_arrow_right.svg";
import type { BoardCreateFormData } from "../../types";

interface BoardFormFieldsProps {
  control: Control<BoardCreateFormData>;
}

const BaseFormFields = ({ control }: BoardFormFieldsProps) => {
  return (
    <>
      {/* 목적지 입력 */}
      <div className="mb-[4.8rem] flex flex-col gap-[0.8rem]">
        <label
          htmlFor="destination"
          className="text-heading2-semi18 text-neutral-30"
        >
          어디로 떠나시나요?
        </label>
        <Controller
          name="destination"
          control={control}
          rules={{
            required: true,
            maxLength: 20,
            pattern: /^[가-힣a-zA-Z\s]+$/,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              placeholder="국가 혹은 도시를 입력해주세요."
              maxLength={20}
              className="w-full bg-white"
              hasError={!!error}
            />
          )}
        />
      </div>

      {/* 여행 날짜 입력 */}
      <div className="mb-[5.2rem] flex flex-col gap-[0.8rem]">
        <div className="text-heading2-semi18 text-neutral-30">
          언제 떠나시나요?
        </div>
        <Controller
          name="dateRange"
          control={control}
          rules={{
            validate: (value) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              if (
                !value.from ||
                !value.to ||
                value.from < today ||
                value.to < value.from
              ) {
                return false;
              }

              return true;
            },
          }}
          render={({ field }) => (
            <DateRangePicker
              value={field.value}
              onChange={field.onChange}
              placeholder={{ from: "시작일 선택", to: "종료일 선택" }}
              render={({ from, to }) => (
                <div className="flex items-center justify-between gap-[0.8rem]">
                  <div className="flex w-full min-w-0 max-w-[22rem] flex-1 flex-col gap-[0.4rem]">
                    <span className="text-body2-regular14 text-neutral-60">
                      시작일
                    </span>
                    {from}
                  </div>
                  <SymbolRightArrow className="mt-[3rem] h-[2.4rem] w-[2.4rem] shrink-0 text-neutral-60" />
                  <div className="flex w-full min-w-0 max-w-[22rem] flex-1 flex-col gap-[0.4rem]">
                    <span className="text-body2-regular14 text-neutral-60">
                      종료일
                    </span>
                    {to}
                  </div>
                </div>
              )}
              className="flex flex-col gap-[0.8rem]"
            />
          )}
        />
      </div>
    </>
  );
};

export default BaseFormFields;
