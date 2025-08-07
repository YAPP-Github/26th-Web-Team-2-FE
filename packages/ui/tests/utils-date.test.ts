import { describe, expect, it, vi } from "vitest";
import { formatTime, getCurrentTimeRounded } from "@/utils/date";

describe("formatTime", () => {
  it("should parse time correctly", () => {
    // given, when, then
    expect(formatTime("09:30")).toEqual({
      meridiem: "오전",
      time: "09:30",
      hours: 9,
      minutes: 30,
    });

    // given, when, then
    expect(formatTime("15:45")).toEqual({
      meridiem: "오후",
      time: "15:45",
      hours: 15,
      minutes: 45,
    });
  });

  it("should handle boundary times", () => {
    // given, when, then
    expect(formatTime("00:00").meridiem).toBe("오전");
    expect(formatTime("11:59").meridiem).toBe("오전");
    expect(formatTime("12:00").meridiem).toBe("오후");
    expect(formatTime("23:59").meridiem).toBe("오후");
  });

  it("should throw error for invalid formats", () => {
    // given
    const invalidTimes = ["25:00", "-1:00", "abc", "12", "12:60", ""];

    // when, then
    invalidTimes.forEach((time) => {
      expect(() => formatTime(time)).toThrow("Invalid time format");
    });
  });
});

describe("getCurrentTimeRounded", () => {
  it("should round to nearest 5-minute interval", () => {
    // given
    const testCases = [
      { time: "14:02", expected: "14:00" },
      { time: "14:03", expected: "14:05" },
      { time: "14:32", expected: "14:30" },
      { time: "14:33", expected: "14:35" },
      { time: "14:58", expected: "15:00" },
      { time: "23:58", expected: "00:00" },
      { time: "09:03", expected: "09:05" },
    ];

    // when, then
    testCases.forEach(({ time, expected }) => {
      const [hours, minutes] = time.split(":").map(Number);
      const mockDate = new Date(2023, 11, 25, hours, minutes);
      vi.spyOn(global, "Date").mockImplementation(() => mockDate);

      expect(getCurrentTimeRounded()).toBe(expected);

      vi.restoreAllMocks();
    });
  });
});
