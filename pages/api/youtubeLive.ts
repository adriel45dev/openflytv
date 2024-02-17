// pages/api/youtubeLive.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { channelId } = req.query; // ID do canal como query parameter
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY; // Substitua pela sua chave de API
  const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${apiKey}`;

  try {
    const response = await axios.get(youtubeApiUrl);
    const liveVideo = response.data.items[0]; // Assume que o primeiro item é a live atual

    if (liveVideo) {
      const liveVideoId = liveVideo.id.videoId;
      const liveVideoUrl = `https://www.youtube.com/embed/${liveVideoId}`;
      res.status(200).json({ liveVideoUrl });
    } else {
      res.status(404).json({ error: "Live não encontrada para este canal" });
    }
  } catch (error) {
    console.error("Erro ao buscar live no YouTube:", error);
    res.status(500).json({ error: "Erro ao buscar live no YouTube" });
  }
}
