import IcCar from "@/assets/icons/ic_car.svg?react";
import IcKm from "@/assets/icons/ic_km.svg?react";
import IcWalker from "@/assets/icons/ic_walker.svg?react";
import type { Attraction } from ".";

/**
 * 주어진 명소(Attraction) 객체에서 우선순위에 따라 거리 또는 시간을 추출하여,
 * 표시할 값(value), 그리고 아이콘(icon)을 반환합니다. (값에는 단위가 포함되어 전달됩니다)
 *
 * 우선순위:
 * 1. 도보(byFoot) - time > distance
 * 2. 자동차(byCar) - time > distance
 * 3. 직접 명소 거리(distance)
 *
 * @param {Attraction} attraction - 명소 정보 객체
 * @returns {{ value: string | number, icon: JSX.Element }}
 *          value: 거리 또는 시간 값, 없으면 "-"
 *          icon: 거리/시간 타입에 따른 아이콘 컴포넌트
 */
export const getAttractionDistance = (attraction: Attraction) => {
  let value = " ";
  let icon = <IcKm width="12px" height="12px" />;

  if (
    attraction?.byFoot?.time !== null ||
    attraction?.byFoot?.distance !== null
  ) {
    value = attraction?.byFoot?.time ?? attraction?.byFoot?.distance ?? " ";
    icon = <IcWalker width="12px" height="12px" />;
  } else if (
    attraction?.byCar?.time !== null ||
    attraction?.byCar?.distance !== null
  ) {
    value = attraction?.byCar?.time ?? attraction?.byCar?.distance ?? " ";
    icon = <IcCar width="12px" height="12px" />;
  } else if (attraction?.distance) {
    value = attraction?.distance;
    icon = <IcKm width="12px" height="12px" />;
  }

  return { value, icon };
};
