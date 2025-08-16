"use client";

import { cn } from "@ssok/ui";
import { useMemo, useRef } from "react";

import useVideoLoop from "../../hooks/use-video-loop";

interface DashboardVideoBackgroundProps {
  className?: string;
}

const DashboardVideoBackground = ({
  className,
}: DashboardVideoBackgroundProps) => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const videos = useMemo(
    () => [
      { src: "/static/dashboard/dashboard-new-1.webm", ref: video1Ref },
      { src: "/static/dashboard/dashboard-new-2.webm", ref: video2Ref },
    ],
    [],
  );

  useVideoLoop(useMemo(() => [video1Ref, video2Ref], []));

  return (
    <div className={cn("relative overflow-hidden bg-neutral-80", className)}>
      {videos.map(({ src, ref }) => (
        <video
          key={src}
          ref={ref}
          muted
          preload="auto"
          controls={false}
          disablePictureInPicture
          playsInline
          className="absolute top-0 left-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000 ease-in-out"
        >
          <source src={src} type="video/webm" />
        </video>
      ))}
    </div>
  );
};

export default DashboardVideoBackground;
