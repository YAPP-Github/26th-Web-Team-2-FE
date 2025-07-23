import { describe, expect, it } from "vitest";
import { calculateCenter } from "@/shared/utils/map-utils";

describe("calculateCenter", () => {
  // 여러 좌표가 있을 때 평균 좌표를 반환
  it("should return average of multiple coordinates", () => {
    const locations = [
      { id: 1, latitude: 10, longitude: 10 },
      { id: 2, latitude: 20, longitude: 20 },
      { id: 3, latitude: 30, longitude: 30 },
    ];

    const center = calculateCenter(locations);

    expect(center.lat).toBeCloseTo(20);
    expect(center.lng).toBeCloseTo(20);
  });

  // 좌표가 하나만 있을 때는 그 좌표 자체를 반환
  it("should return the coordinate itself when only one exists", () => {
    const locations = [{ id: 1, latitude: 37.5, longitude: 126.9 }];

    const center = calculateCenter(locations);

    expect(center.lat).toBeCloseTo(37.5);
    expect(center.lng).toBeCloseTo(126.9);
  });

  // 빈 배열일 때는 서울 시청 좌표를 기본값으로 반환
  it("should return default location for empty location array", () => {
    const locations: { id: number; latitude: number; longitude: number }[] = [];

    const center = calculateCenter(locations);

    expect(center.lat).toBeCloseTo(37.5665);
    expect(center.lng).toBeCloseTo(126.978);
  });
});
