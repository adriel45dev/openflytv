// pages/api/captureStream.js
import puppeteer from "puppeteer";

export default async (req, res) => {
  if (req.method === "GET") {
    const { url } = req.query; // Recebendo a URL da string de consulta

    if (!url) {
      res.status(400).json({ error: "URL query parameter is required" });
      return;
    }

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    let m3u8Url = "";
    page.on("response", async (response) => {
      const responseUrl = response.url();
      if (responseUrl.includes(".m3u8")) {
        m3u8Url = responseUrl;
        await browser.close();
        res.status(200).json({ m3u8Url });
        return;
      }
    });

    setTimeout(async () => {
      if (!m3u8Url) {
        await browser.close();
        res.status(404).json({ error: "Stream URL not found" });
      }
    }, 30000); // Ajuste conforme necessário
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
