import { useCallback, useRef } from "react";

type Params = {
  isLoading: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
};

/**
 * 커스텀 훅: 무한 스크롤을 위한 IntersectionObserver를 설정합니다.
 *
 * 마지막 아이템 요소에 `ref`를 연결하면, 해당 요소가 viewport에 진입할 때 `fetchNextPage`가 호출됩니다.
 *
 * @param {Object} params - 훅에 전달할 인자 객체
 * @param {boolean} params.isLoading - 데이터가 로딩 중인지 여부
 * @param {boolean} [params.hasNextPage] - 다음 페이지가 존재하는지 여부
 * @param {() => void} params.fetchNextPage - 다음 페이지를 불러오는 함수
 *
 * @returns {(node: HTMLLIElement | null) => void} - 마지막 아이템에 할당할 ref 콜백
 *
 */
const useInfiniteScroll = ({
  isLoading,
  hasNextPage,
  fetchNextPage,
}: Params) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading || !hasNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, fetchNextPage],
  );

  return lastItemRef;
};

export default useInfiniteScroll;
