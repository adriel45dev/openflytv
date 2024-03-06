"use client";
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HLSPlayerProps {
  src: string; // URL do seu stream .m3u8
  autoPlay?: boolean; // Adiciona propriedade autoPlay opcional
  muted?: boolean; // Adiciona propriedade muted opcional
}

const HLSPlayer: React.FC<HLSPlayerProps> = ({
  src,
  autoPlay = true,
  muted = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    let hls: Hls | null = null;

    if (video) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          if (autoPlay) {
            video.play().catch((e) => {
              console.error("Auto-play was prevented:", e);
            });
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.addEventListener("loadedmetadata", () => {
          if (autoPlay) {
            video.play().catch((e) => {
              console.error("Auto-play was prevented:", e);
            });
          }
        });
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay={autoPlay}
      muted={muted}
      style={{ width: "100%" }}
    />
  );
};

export default HLSPlayer;
