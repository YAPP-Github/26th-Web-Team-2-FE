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
});
