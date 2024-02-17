"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { YoutubeIcon } from "../shared/icons";

async function fetchYoutubeApiLiveVideoUrl(channelId: string) {
  try {
    const res = await fetch(`/api/youtubeLive?channelId=${channelId}`);
    const data = await res.json();
    if (res.ok) {
      return String(data.liveVideoUrl); // URL da live
    } else {
      console.error(data.error);
      return "";
    }
  } catch (error) {
    console.error("Erro ao buscar URL da live:", error);
    return "";
  }
}

async function fetchWebScraperLiveVideoUrl(channelId: string): Promise<string> {
  try {
    const response = await fetch(`/api/youtubeStream?channelId=${channelId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.latestStreamUrl) {
      return data.latestStreamUrl;
    } else {
      console.error("No live streams found.");
      return "";
    }
  } catch (error) {
    console.error("Failed to fetch live stream URL:", error);
    return "";
  }
}

export default function YoutubePlayer({ channelId }: { channelId: string }) {
  const [videoSrc, setVideoSrc] = useState("");
  const [videoLoadding, setVideoLoadding] = useState(true);

  useEffect(() => {
    setVideoSrc("");
    (async () => {
      setVideoLoadding(true);

      const src = await fetchWebScraperLiveVideoUrl(channelId);

      setVideoSrc(src);
      setVideoLoadding(Boolean(src));
    })();
  }, [channelId]);

  return (
    <>
      {videoSrc ? (
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            src={videoSrc + "?autoplay=1&mute=1"}
            title="YouTube video player"
            frameBorder={0}
            allow="autoplay"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      ) : (
        <div className="w-full min-h-max flex flex-col justify-center items-center p-0 sm:px-16">
          <div className=" text-white text-4xl flex flex-col flex-1 justify-center items-center gap-2 py-12 px-4 bg-slate-800 w-full max-h-full rounded-lg">
            <YoutubeIcon className="w-20 h-20 py-1 rounded-lg animate-pulse text-[#CE1312]" />
            <div className="font-bold text-lg sm:text-4xl animate-pulse text-center">
              {videoLoadding
                ? "Carregando..."
                : "Parece que não há nenhuma transmissão ativa no momento."}
            </div>
            <Link
              className="text-xs sm:text-lg break-words max-w-full px-4 text-center text-green-400"
              href={`https://www.youtube.com/channel/${channelId}/streams`}
            >
              {`youtube.com/channel/${channelId}`}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
