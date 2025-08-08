type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

const storage = {
  /**
   * 로컬스토리지에 데이터를 저장합니다.
   * 객체는 JSON 문자열로 변환되어 저장됩니다.
   *
   * @param {string} key - 저장할 키
   * @param {any} value - 저장할 값 (객체, 배열, 기본 타입 가능)
   */
  set: <T extends JsonValue>(key: string, value: T) => {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error("localStorage 저장 오류", error);
    }
  },

  /**
   * 로컬스토리지에서 데이터를 가져옵니다.
   * 저장된 JSON 문자열을 파싱하여 원래 값으로 복원합니다.
   *
   * @template T
   * @param {string} key - 조회할 키
   * @returns {T | null} - 저장된 값 또는 값이 없을 경우 null
   */
  get: <T extends JsonValue = JsonValue>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error("localStorage 가져오기 오류:", error);
      return null;
    }
  },

  /**
   * 로컬스토리지에서 특정 키에 해당하는 데이터를 삭제합니다.
   *
   * @param {string} key - 삭제할 키
   */
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("localStorage 제거 오류:", error);
    }
  },

  /**
   * 로컬스토리지에 저장된 모든 데이터를 삭제합니다.
   */
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("localStorage 초기화 오류:", error);
    }
  },
};

export default storage;
