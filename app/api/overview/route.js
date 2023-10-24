// api/mostActivelyTraded

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol") || 1;

  try {
    const apiResponse = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.API_KEY}`
      // `https://www.alphavantage.co/query?function=OVERVIEW&symbol=TESCO&apikey=demo`
    );
    const apiData = await apiResponse.json();

    return new Response(JSON.stringify({ overview: apiData }));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return new Response.json({ error: "Internal Server Error" });
  }
}
