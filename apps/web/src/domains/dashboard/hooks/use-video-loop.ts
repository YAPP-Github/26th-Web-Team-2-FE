import { type RefObject, useEffect } from "react";

const useVideoLoop = (refs: RefObject<HTMLVideoElement | null>[]) => {
  useEffect(() => {
    let index = -1;

    const change = () => {
      const videos = refs
        .map((ref) => ref.current)
        .filter(Boolean) as HTMLVideoElement[];

      const current = videos[index];
      index = (index + 1) % videos.length;
      const next = videos[index];

      if (current) {
        current.style.opacity = "0";
      }

      next.currentTime = 0;
      next.play();
      next.style.opacity = "1";
    };

    change();
    refs.forEach((ref) => ref.current?.addEventListener("ended", change));

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          ref.current.style.opacity = "1";
          ref.current.removeEventListener("ended", change);
        }
      });
    };
  }, [refs]);
};

export default useVideoLoop;
