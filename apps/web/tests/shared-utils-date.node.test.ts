import { describe, expect, it } from "vitest";
import { formatDate, formatTime } from "@/shared/utils/date";

describe("formatDate", () => {
  it("should format date with double digit month and day", () => {
    // given
    const date = new Date("2025-12-22");

    // when
    const result = formatDate(date);

    // then
    expect(result).toBe("2025.12.22");
  });

  it("should pad single digit month and day with zero", () => {
    // given
    const date = new Date("2025-01-05");

    // when
    const result = formatDate(date);

    // then
    expect(result).toBe("2025.01.05");
  });
});

describe("formatTime", () => {
  it("should return 오전 for morning hours (0-11)", () => {
    // given
    const morningDate = new Date("2023-12-25 09:30:00");

    // when
    const result = formatTime(morningDate);

    // then
    expect(result.meridiem).toBe("오전");
    expect(result.time).toBe("09:30");
  });

  it("should return 오후 for afternoon hours (12-23)", () => {
    // given
    const afternoonDate = new Date("2023-12-25 15:45:00");

    // when
    const result = formatTime(afternoonDate);

    // then
    expect(result.meridiem).toBe("오후");
    expect(result.time).toBe("15:45");
  });

  it("should handle midnight (00:00) as 오전", () => {
    // given
    const midnightDate = new Date("2023-12-25 00:00:00");

    // when
    const result = formatTime(midnightDate);

    // then
    expect(result.meridiem).toBe("오전");
    expect(result.time).toBe("00:00");
  });

  it("should handle noon (12:00) as 오후", () => {
    // given
    const noonDate = new Date("2023-12-25 12:00:00");

    // when
    const result = formatTime(noonDate);

    // then
    expect(result.meridiem).toBe("오후");
    expect(result.time).toBe("12:00");
  });

  it("should pad single digit hours and minutes with zero", () => {
    // given
    const earlyMorningDate = new Date("2023-12-25 01:05:00");

    // when
    const result = formatTime(earlyMorningDate);

    // then
    expect(result.meridiem).toBe("오전");
    expect(result.time).toBe("01:05");
  });

  it("should handle late evening (23:59) as 오후", () => {
    // given
    const lateEveningDate = new Date("2023-12-25 23:59:00");

    // when
    const result = formatTime(lateEveningDate);

    // then
    expect(result.meridiem).toBe("오후");
    expect(result.time).toBe("23:59");
  });
});
