import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

/**
 * @param timeString - "HH:MM" (24시간 형태의 시간)
 * @returns { meridiem: "오전" | "오후", time: string, hours: number, minutes: number }
 * @example
 * formatTime("14:00") // { meridiem: "오후", time: "14:00", hours: 14, minutes: 0 }
 * formatTime("11:00") // { meridiem: "오전", time: "11:00", hours: 11, minutes: 0 }
 * formatTime("00:00") // { meridiem: "오전", time: "00:00", hours: 0, minutes: 0 }
 */
export const formatTime = (
  time: string,
): {
  meridiem: "오전" | "오후";
  time: string;
  hours: number;
  minutes: number;
} | null => {
  const parsed = dayjs(time.slice(-5).replace(" ", "0"), "HH:mm");
  if (!parsed.isValid()) {
    return null;
  }

  return {
    meridiem: parsed.format("A") === "AM" ? "오전" : "오후",
    time: parsed.format("HH:mm"),
    hours: parsed.hour(),
    minutes: parsed.minute(),
  };
};

/**
 * 현재 시간을 5분 단위로 반올림하여 HH:MM 형식으로 반환합니다.
 * @returns 5분 단위로 반올림된 현재 시간을 나타내는 "HH:MM" 형태의 문자열
 * @example
 * getCurrentTimeRounded() // "14:35" (현재 시간이 14:33인 경우)
 * getCurrentTimeRounded() // "14:30" (현재 시간이 14:32인 경우)
 */
export const getCurrentTimeRounded = (): string => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // 5분 단위로 반올림
  const roundedMinutes = Math.round(minutes / 5) * 5;

  // 60분이 되면 다음 시간으로 넘어감
  const [finalHours, finalMinutes] =
    roundedMinutes >= 60 ? [(hours + 1) % 24, 0] : [hours, roundedMinutes];

  const hoursStr = String(finalHours).padStart(2, "0");
  const minutesStr = String(finalMinutes).padStart(2, "0");

  return `${hoursStr}:${minutesStr}`;
};

/**
 * @param date - Date 객체
 * @returns "YYYY. MM. DD(요일)" 문자열
 * @example
 * formatDate(new Date('2025-06-01')) // "2025. 06. 01(일)"
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  return `${year}. ${month}. ${day}(${dayOfWeek})`;
};

/**
 * @param from - 시작일
 * @param to - 종료일 (없으면 from과 동일 처리)
 * @returns "M월 D일 (N일)" 또는 "M월 D일 → M월 D일 (N일)" 형식
 */
export const formatDateRangeForButton = (from: Date, to?: Date): string => {
  const toDate = to ?? from;
  const dayCount =
    Math.ceil((toDate.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const formatPart = (d: Date) => `${d.getMonth() + 1}월 ${d.getDate()}일`;

  if (dayCount <= 1) {
    return `${formatPart(from)} (1일)`;
  }
  return `${formatPart(from)} → ${formatPart(toDate)} (${dayCount}일)`;
};
