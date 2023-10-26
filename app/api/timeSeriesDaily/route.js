export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  // const symbol = searchParams.get("symbol") || "IBM";
  const symbol = "IBM";
  const apiKey = process.env.API_KEY || "demo";
  console.log("symbol", symbol, "apiKey", apiKey);
  try {
    const apiResponse = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${apiKey}`
    );
    const data = await apiResponse.json();
    return new Response(JSON.stringify({ data: data }));
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return new Response.json({ error: error.message });
  }
}
