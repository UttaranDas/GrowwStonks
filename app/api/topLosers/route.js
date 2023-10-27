// api/toplosers

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

    // Check if 'top_losers' is present in the API response
    if (!apiData.top_losers) {
      return new Response.json({ error: "Top Losers data not found" });
    }

    // Extract the top_losers data
    const topLosers = apiData.top_losers;

    // Implement pagination based on the offset and limit
    const paginatedTopLosers = topLosers.slice(offset, offset + limit);
    return new Response(JSON.stringify({ topLosers: paginatedTopLosers }));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return new Response.json({ error: "Internal Server Error" });
  }
}
