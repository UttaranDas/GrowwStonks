// https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo

// pages/api/tickerSearch.js

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
    const keywords = searchParams.get("keywords") || "IBM";
    const apiKey = process.env.API_KEY || 'demo';
  
    try {
    //   const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apiKey}}`);
      const apiResponse = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo`);
      const apiData = await apiResponse.json();
      const name = apiData.bestMatches[0]["2. name"];
        // console.log(name);
      return new Response(JSON.stringify({ name: name }));
      // res.status(200).json({ "name": name });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return new Response.json({ error: "Internal Server Error" });
      // res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  