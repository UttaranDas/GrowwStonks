// pages/api/top-losers.js

export async function GET(req, res) {
  const apiKey = process.env.API_KEY;
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol") || "IBM";

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
    );
    const apiData = await response.json();
    return new Response(
      JSON.stringify({ globalQuote: apiData["Global Quote"] })
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return new Response.json({ error: "Internal Server Error" });
    res.status(500).json({ error: "Internal Server Error" });
  }
}
