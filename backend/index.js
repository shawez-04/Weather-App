import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins (frontend can call this backend from anywhere)
app.use(cors());

// Route: GET /weather?city=CityName
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(500).json({ error: "Error fetching weather data" });
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
