const apiKey = "8098d36e1653d56f5f73288a8df3face";
function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temp: ${data.main.temp} °C</p>
        <p>🌤️ ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      `;
      resultDiv.innerHTML = weatherHTML;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}