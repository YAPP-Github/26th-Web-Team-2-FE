/**
 * 여러 위치들의 중심 좌표를 계산하는 함수입니다.
 *
 * @param locations - 각각의 위치를 나타내는 객체 배열입니다.
 *   - id: 고유한 위치 식별자
 *   - latitude: 위도 (y좌표)
 *   - longitude: 경도 (x좌표)
 *
 * @returns lat와 lng를 포함한 객체로,
 *   주어진 위치들의 평균 위도와 평균 경도를 중심 좌표로 반환합니다.
 *   {
 *     lat: number,  // 평균 위도
 *     lng: number   // 평균 경도
 *   }
 *
 * @description
 * 이 함수는 locations가 비어있을 경우, 기본값으로 서울 시청의 좌표를 반환합니다.
 *
 */
export const calculateCenter = (
  locations: { id: number; latitude: number; longitude: number }[],
) => {
  if (locations.length === 0) {
    return { lat: 37.5665, lng: 126.978 };
  }

  const lat =
    locations.reduce((acc, loc) => acc + loc.latitude, 0) / locations.length;
  const lng =
    locations.reduce((acc, loc) => acc + loc.longitude, 0) / locations.length;
  return { lat, lng };
};
