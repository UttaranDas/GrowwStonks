// api/topGainers/

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1;
  const apiKey = process.env.API_KEY;
  const limit = 20; // Number of items per page
  const offset = (page - 1) * limit;

  try {
    const apiResponse = await fetch(
      `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`
    );
    const apiData = await apiResponse.json();

    if (!apiData.top_gainers) {
      return new Response.json({ error: "Top Gainers data not found" });
    }

    const topGainers = apiData.top_gainers;

    // Implement pagination based on the offset and limit
    const paginatedTopGainers = topGainers.slice(offset, offset + limit);

    return new Response(JSON.stringify({ topGainers: paginatedTopGainers }));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return new Response.json({ error: "Internal Server Error" });
  }
}
