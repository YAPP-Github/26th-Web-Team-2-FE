import { useRef, useState } from "react";

/**
 * useDragAndDrop
 *
 * 드래그 앤 드롭 상태를 안정적으로 관리하는 커스텀 훅
 *
 * - `isDragging` 상태를 통해 현재 드래그 중인지 여부를 알 수 있습니다.
 * - 내부 요소를 오가며 발생하는 불필요한 onDragLeave 이벤트를 방지하기 위해
 *   dragCounter를 사용해 실제 드래그 종료 시점을 정확히 판단합니다.
 * - 드래그 이벤트 핸들러(onDragEnter, onDragOver, onDragLeave)를 제공합니다.
 * - 드롭 시 텍스트 내에서 URL을 추출하고, `onUrlDrop` 콜백이 존재하면 해당 URL을 전달합니다.
 *
 *
 * @param {function} [onUrlDrop] - 드롭된 텍스트에서 URL을 추출한 뒤 호출되는 콜백 함수
 *
 * @returns {{
 *   isDragging: boolean; // 현재 드래그 상태 여부
 *   onDragEnter: (e: React.DragEvent<HTMLElement>) => void; // 드래그 요소가 영역에 진입했을 때
 *   onDragOver: (e: React.DragEvent<HTMLElement>) => void;  // 드래그 요소가 영역 위에 있는 동안
 *   onDragLeave: (e: React.DragEvent<HTMLElement>) => void; // 드래그 요소가 영역에서 나갔을 때
 *   onDrop: (e: React.DragEvent<HTMLElement>) => void;      // 드래그 요소가 드롭됐을 때
 * }}
 */
const useDragAndDrop = (onUrlDrop?: (url: string) => void) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const onDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    dragCounter.current++;
    if (dragCounter.current === 1) {
      setIsDragging(true);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragging(false);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);

    const data = e.dataTransfer.getData("text");
    const urlMatch = data.match(/https?:\/\/[^\s]+/);

    if (urlMatch && onUrlDrop) {
      onUrlDrop(urlMatch[0]);
    }
  };

  return {
    isDragging,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
  };
};

export default useDragAndDrop;
