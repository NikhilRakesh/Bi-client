"use client";
import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function HLSVideoPlayer({
  src,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
}: {
  src: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        return () => hls.destroy();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      }
    }
  }, [src]);

  return (
    <video
      src={src}
      ref={videoRef}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline
      className="w-full h-full object-cover pointer-events-none"
    />
  );
}
