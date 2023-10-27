// api/mostActivelyTraded

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1;
  const apiKey = process.env.API_KEY;
  const limit = 20; // Number of items per page
  const offset = (page - 1) * limit;
  
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`
    );
    const apiData = await response.json();

    // Check if 'top_losers' is present in the API response
    if (!apiData.most_actively_traded) {
      return new Response.json({ error: "Most actively traded not found" });
      res.status(404).json({ error: "Most actively traded data not found" });
      return;
    }

    // Extract the most_actively_traded data
    const mostActivelyTraded = apiData.most_actively_traded;

    // Implement pagination based on the offset and limit
    const paginatedMostActivelyTraded = mostActivelyTraded.slice(
      offset,
      offset + limit
    );

    return new Response(
      JSON.stringify({ mostActivelyTraded: paginatedMostActivelyTraded })
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return new Response.json({ error: "Internal Server Error" });
  }
}
