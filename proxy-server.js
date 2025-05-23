const express = require("express");
const fetch = require("node-fetch"); // Make sure you're using node-fetch@2
const cors = require("cors"); // Add this

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

app.use("/", async (req, res) => {
  const targetUrl = "https://www.swiggy.com" + req.originalUrl;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType);

    const data = await response.text(); // use .text() to handle HTML/JSON
    res.send(data);
  } catch (err) {
    console.error("Error fetching from Swiggy:", err);
    res.status(500).send("Proxy Error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Swiggy proxy server running on http://localhost:${PORT}`);
});
