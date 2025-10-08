import { describe, expect, it } from "vitest";
import { clamp, parseScore } from "@/domains/compare/utils/validation";

describe("clamp", () => {
  it("범위 내 값은 그대로 반환", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it("최소값보다 작으면 최소값 반환", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(-100, 0, 10)).toBe(0);
  });

  it("최대값보다 크면 최대값 반환", () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(100, 0, 10)).toBe(10);
  });
});

describe("parseScore", () => {
  it("유효한 점수는 문자열로 반환", () => {
    expect(parseScore("5")).toBe("5");
    expect(parseScore("7.5")).toBe("7.5");
    expect(parseScore("0")).toBe("0");
    expect(parseScore("10")).toBe("10");
  });

  it("범위를 벗어난 값은 클램핑", () => {
    expect(parseScore("-5")).toBe("0");
    expect(parseScore("15")).toBe("10");
    expect(parseScore("100")).toBe("10");
  });

  it("빈 문자열은 빈 문자열 반환", () => {
    expect(parseScore("")).toBe("");
    expect(parseScore("   ")).toBe("");
  });

  it("숫자가 아닌 값은 빈 문자열 반환", () => {
    expect(parseScore("abc")).toBe("");
    expect(parseScore(".!@#")).toBe("");
  });

  it("커스텀 min/max 범위 적용", () => {
    expect(parseScore("5", 1, 5)).toBe("5");
    expect(parseScore("0", 1, 5)).toBe("1");
    expect(parseScore("10", 1, 5)).toBe("5");
  });

  it("소수점 값 처리", () => {
    expect(parseScore("9.5")).toBe("9.5");
    expect(parseScore("0.1")).toBe("0.1");
    expect(parseScore("10.5")).toBe("10");
  });
});
