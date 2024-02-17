// pages/api/youtubeStream.ts

import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Obtenha o channelId da query
  const { channelId } = req.query;

  if (!channelId || typeof channelId !== "string") {
    res.status(400).json({ error: "Channel ID is required" });
    return;
  }

  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--disable-web-security",
    ], // Configurações recomendadas para execução em ambientes de produção/CI
  });

  const page = await browser.newPage();

  try {
    await page.goto(`https://www.youtube.com/channel/${channelId}/streams`, {
      waitUntil: "networkidle2",
    });

    const latestStreamUrl = await page.evaluate(() => {
      const liveElement = document.querySelector('[overlay-style="LIVE"]');
      if (liveElement !== null) {
        // Verifica se liveElement não é null
        const closestAnchor = liveElement.closest('a[href^="/watch"]');
        if (closestAnchor !== null) {
          // Verifica se encontrou o elemento âncora
          return (
            "https://www.youtube.com/embed/" +
            closestAnchor.getAttribute("href")?.replace("/watch?v=", "")
          );
        }
      }
      return ""; // Retorna null se nenhum elemento corresponder
    });

    await browser.close();

    if (latestStreamUrl) {
      res.status(200).json({ latestStreamUrl });
    } else {
      res.status(404).json({ error: "No live streams found." });
    }
  } catch (error) {
    console.error("Failed to fetch stream:", error);
    await browser.close();
    res.status(500).json({ error: "Failed to process the request." });
  }
}
