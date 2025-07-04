import { describe, expect, it } from "vitest";
import getQueryClient from "@/shared/configs/tanstack-query/get-query-client";

describe("getQueryClient", () => {
  it("should return the different instance", () => {
    // given, when
    const first = getQueryClient();
    const second = getQueryClient();

    // then
    expect(first).not.toBe(second);
    expect(first).toStrictEqual(second);
  });
});
