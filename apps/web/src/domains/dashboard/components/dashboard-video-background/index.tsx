"use client";

import { useEffect, useRef, useState } from "react";

interface DashboardVideoBackgroundProps {
  className?: string;
}

const DashboardVideoBackground = ({
  className,
}: DashboardVideoBackgroundProps) => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [_currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const videos = [video1Ref.current, video2Ref.current];
    let currentIndex = 0;

    const switchVideo = () => {
      const current = videos[currentIndex];
      const next = videos[(currentIndex + 1) % 2];

      if (current && next) {
        // 현재 비디오 페이드아웃
        current.style.opacity = "0";

        // 다음 비디오 재생 시작
        next.currentTime = 0;
        next.play();
        next.style.opacity = "1";

        setCurrentVideo((currentIndex + 1) % 2);
        currentIndex = (currentIndex + 1) % 2;
      }
    };

    // 첫 번째 비디오 시작
    if (videos[0]) {
      videos[0].play();
      videos[0].style.opacity = "1";
    }

    // 비디오 끝날 때 이벤트 리스너 추가
    videos.forEach((video, index) => {
      if (video) {
        video.addEventListener("ended", switchVideo);
        video.addEventListener("loadedmetadata", () => {
          if (index === 1) {
            video.style.opacity = "0";
          }
        });
      }
    });

    return () => {
      videos.forEach((video) => {
        if (video) {
          video.removeEventListener("ended", switchVideo);
        }
      });
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={video1Ref}
        className="absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-1000"
        muted
        playsInline
        preload="auto"
      >
        <source src="/dashboard/dashboard-new-1.mp4" type="video/mp4" />
      </video>
      <video
        ref={video2Ref}
        className="absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-1000"
        muted
        playsInline
        preload="auto"
      >
        <source src="/dashboard/dashboard-new-2.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default DashboardVideoBackground;
