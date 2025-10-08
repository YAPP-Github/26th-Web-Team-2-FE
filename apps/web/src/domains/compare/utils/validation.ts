/**
 * 숫자 값을 지정된 범위로 제한합니다.
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * 문자열 점수를 파싱하고 값의 범위를 제한합니다.
 */
export const parseScore = (score: string, min = 0, max = 10): string => {
  if (!score.trim()) {
    return "";
  }

  const num = Number.parseFloat(score);
  if (Number.isNaN(num)) {
    return "";
  }

  return String(clamp(num, min, max));
};
