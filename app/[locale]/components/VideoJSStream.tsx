"use client";
import React, { useEffect, useRef, FunctionComponent } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

interface VideoJSProps {
  src: string; // URL do stream ao vivo .m3u8
}

const VideoJSStream: FunctionComponent<VideoJSProps> = ({ src }) => {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let player: Player;
    if (videoRef.current) {
      const videoElement = document.createElement("video");
      videoElement.className = "video-js";
      videoElement.dataset.setup = '{"liveui": true}';
      videoRef.current.appendChild(videoElement);

      player = videojs(videoElement, {
        controls: true,
        autoplay: true,
        fluid: true,
        liveui: true,
        sources: [
          { src, type: "application/x-mpegURL", withCredentials: true },
        ],
      });

      // Função para lidar quando o player estiver pronto
      player.ready(() => {
        console.log("Player is ready for live streaming");
      });
    }

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [src]);

  return <div ref={videoRef} />;
};

export default VideoJSStream;
