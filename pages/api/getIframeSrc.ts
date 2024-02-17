// pages/api/getIframeSrc.ts

import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verifica se o método é GET
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ message: "URL é obrigatória e deve ser uma string" });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    const iframeSrc = await page.evaluate(() => {
      const iframe = document.querySelector(
        "iframe.dailymotion-player"
      ) as HTMLIFrameElement;
      return iframe ? iframe.src : null;
    });

    await browser.close();

    if (iframeSrc) {
      return res.status(200).json({ src: iframeSrc });
    } else {
      return res
        .status(404)
        .json({ message: "Iframe do Dailymotion não encontrado" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao processar a página" });
  }
}
