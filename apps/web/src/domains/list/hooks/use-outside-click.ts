import { useEffect } from "react";

/**
 * 특정 DOM 요소 외부를 (ex. 드롭다운, 모달) 클릭했을 때 콜백 함수를 실행하는 커스텀 훅입니다
 *
 * @template T - HTMLElement 또는 그 하위 요소
 * @param {React.RefObject<T>} ref - 외부 클릭을 감지하고 싶은 DOM 요소의 ref
 * @param {() => void} callback - 외부 클릭 시 실행될 콜백 함수
 * @param {boolean} [enabled=true] - 훅 활성화 여부 (기본값: true)
 *
 * @example
 * const ref = useRef(null);
 * useOutsideClick(ref, () => setOpen(false), isOpen);
 */
const useOutsideClick = <T extends HTMLElement | null>(
  ref: React.RefObject<T>,
  callback: () => void,
  enabled: boolean = true,
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback, enabled]);
};

export default useOutsideClick;
