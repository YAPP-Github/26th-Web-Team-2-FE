import { describe, expect, it } from "vitest";
import { cn } from "../src/utils";

describe("cn", () => {
  it("should merge classes", () => {
    // given
    const classNames = ["text-red-500", "bg-blue-200"];

    // when
    const className = cn(classNames);

    // then
    expect(className).toBe("text-red-500 bg-blue-200");
  });

  it("should remove duplicate classes", () => {
    // given
    const classNames = ["text-red-500", "bg-blue-200", "text-red-500"];

    // when
    const className = cn(classNames);

    // then
    expect(className).toBe("bg-blue-200 text-red-500");
  });

  it("should remove conflicting classes", () => {
    // given
    const classNames = ["px-2", "py-2", "px-4"];

    // when
    const className = cn(classNames);

    // then
    expect(className).toBe("py-2 px-4");
  });
});
