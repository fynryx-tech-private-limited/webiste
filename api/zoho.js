export default async function handler(req, res) {
  // Hardcoded Zoho CSV Export URL
  const targetUrl = "https://sheet.zohopublic.in/sheet/publishedsheet/e258f7166c76213f8fc943c18273a64d26ee8c8fa3188856df1ef584bc1dd1bb?type=grid&download=csv";

  try {
    const fetchRes = await fetch(targetUrl);
    if (!fetchRes.ok) {
      return res.status(fetchRes.status).send(`Failed to fetch from Zoho: ${fetchRes.statusText}`);
    }
    
    const data = await fetchRes.text();
    
    // Allow CORS if needed
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/csv");
    res.status(200).send(data);
  } catch (error) {
    console.error("Vercel Proxy Error:", error);
    res.status(500).send("Internal Server Error while fetching from Zoho");
  }
}
