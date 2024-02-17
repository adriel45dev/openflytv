import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { channelId } = req.query;

  if (!channelId || typeof channelId !== "string") {
    return res.status(400).json({ error: "Channel ID is required" });
  }

  const url = `https://www.youtube.com/channel/${channelId}/streams`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    // Encontrar a marcação "style":"LIVE" e extrair o "addedVideoId"
    const liveIndicatorPos = html.indexOf('"style":"LIVE"');
    if (liveIndicatorPos === -1) {
      return res.status(404).json({ error: "No live streams found." });
    }

    const liveIdPos = html.indexOf('"addedVideoId":', liveIndicatorPos);
    const startIdPos = liveIdPos + '"addedVideoId":"'.length;
    const endIdPos = html.indexOf('"', startIdPos);
    const liveId = html.substring(startIdPos, endIdPos);

    if (liveId) {
      res
        .status(200)
        .json({ latestStreamUrl: `https://www.youtube.com/embed/${liveId}` });
    } else {
      res.status(404).json({ error: "Live stream ID not found." });
    }
  } catch (error) {
    console.error("Failed to fetch the page:", error);
    res.status(500).json({ error: "Failed to process the request." });
  }
}
