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
} => {
  const error = "Invalid time format. Expected HH:MM format with hours 0-23";
  if (!time) {
    throw new Error(error);
  }

  const parts = time.split(":");
  if (parts.length !== 2) {
    throw new Error(error);
  }

  const [hoursStr, minutesStr] = parts;
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (Number.isNaN(hours) || hours < 0 || hours > 23) {
    throw new Error(error);
  }
  if (Number.isNaN(minutes) || minutes < 0 || minutes > 59) {
    throw new Error(error);
  }

  const meridiem = hours < 12 ? "오전" : "오후";
  return { meridiem, time, hours, minutes };
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
