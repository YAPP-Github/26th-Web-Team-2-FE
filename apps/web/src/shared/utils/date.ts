export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

/**
 * Date 객체를 받아서 오전/오후 정보, 24시간 형태의 시간을 반환하는 함수입니다.
 *
 * @param date
 * @returns 오전/오후 정보, 24시간 형태의 시간을 반환
 *   {
 *     meridiem: "오전" | "오후",  // 오전/오후 구분
 *     time: string               // HH:MM 형태의 24시간 시간
 *   }
 *
 * @example
 * formatTime(new Date("2023-12-25 09:30:00"))
 * // { meridiem: "오전", time: "09:30" }
 *
 * formatTime(new Date("2023-12-25 15:45:00"))
 * // { meridiem: "오후", time: "15:45" }
 *
 * formatTime(new Date("2023-12-25 12:00:00"))
 * // { meridiem: "오후", time: "12:00" }
 *
 * formatTime(new Date("2023-12-25 00:00:00"))
 * // { meridiem: "오전", time: "00:00" }
 */
export const formatTime = (
  date: Date,
): { meridiem: "오전" | "오후"; time: string } => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const meridiem = hours < 12 ? "오전" : "오후";
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const time = `${formattedHours}:${formattedMinutes}`;

  return { meridiem, time };
};
