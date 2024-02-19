"use client";
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoJSProps {
  src: string; // URL do stream ao vivo .m3u8
}

const VideoJSStream: React.FC<VideoJSProps> = ({ src }) => {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = document.createElement("video");
    videoElement.className = "video-js vjs-big-play-centered";
    videoRef.current.appendChild(videoElement);

    const player = videojs(videoElement, {
      controls: true,
      autoplay: true,
      fluid: true,
      liveui: true,
      sources: [{ src, type: "application/x-mpegURL" }],
    });

    player.ready(() => console.log("Player is ready for live streaming"));

    return () => player.dispose();
  }, [src]);

  return <div ref={videoRef}></div>;
};

export default VideoJSStream;
