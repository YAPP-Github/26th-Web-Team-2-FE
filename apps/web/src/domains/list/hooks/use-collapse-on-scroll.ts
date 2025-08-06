import { type RefObject, useEffect } from "react";

/**
 * useCollapseOnScroll
 *
 * 특정 DOM 요소에서 스크롤 이벤트가 발생하면 입력창을 닫는 콜백 함수를 실행하는 커스텀 훅입니다.
 *
 * 이 훅은 `isInputExpanded`가 `true`이고, 로컬 스토리지의 `onboardingStep` 값이 `"finish"`인 경우에만 동작합니다.
 * 스크롤 이벤트가 발생하면 50ms 내에 입력창 닫기 함수(`handleClose`)가 실행됩니다.
 *
 * @template T - DOM 요소의 타입 (`HTMLElement`의 서브타입)
 *
 * @param {RefObject<T>} ref - 스크롤 이벤트를 감지할 DOM 요소의 ref
 * @param {boolean} isInputExpanded - 입력창이 확장되어 있는지 여부
 * @param {() => void} handleClose - 입력창을 닫기 위한 콜백 함수
 *
 * @example
 * const listRef = useRef<HTMLUListElement>(null);
 * useCollapseOnScroll(listRef, isInputExpanded, handleCloseInputExpansion);
 */
const useCollapseOnScroll = <T extends HTMLElement | null>(
  ref: RefObject<T>,
  isInputExpanded: boolean,
  handleClose: () => void,
) => {
  useEffect(() => {
    if (localStorage.getItem("onboardingStep") !== "finish" && !isInputExpanded)
      return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (timer) clearTimeout(timer);
      if (isInputExpanded) {
        timer = setTimeout(() => {
          handleClose();
        }, 50);
      }
    };

    if (!ref || !ref.current) return;

    const listElement = ref.current;
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", handleScroll);
      }
      if (timer) clearTimeout(timer);
    };
  }, [isInputExpanded, handleClose, ref]);
};

export default useCollapseOnScroll;
