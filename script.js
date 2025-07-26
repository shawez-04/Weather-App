const apiKey = "8098d36e1653d56f5f73288a8df3face";

const cityInput = document.getElementById("cityInput");
const resultDiv = document.getElementById("weatherResult");
const locationBtn = document.getElementById("locationBtn");
const clockDiv = document.getElementById("clock");

//  PART 1: GET WEATHER BY CITY NAME 

function getWeather() {
  const city = cityInput.value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  resultDiv.innerHTML = `<p>Loading...</p>`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json(); // Convert the response to JSON
    })
    .then(data => {
      // Display the weather data
      const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon"></p>
        <p style="font-size: 2em; margin-top: -20px;">${Math.round(data.main.temp)} °C</p>
        <p style="text-transform: capitalize;">${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      `;
      resultDiv.innerHTML = weatherHTML;
    })
    .catch(error => {
      // Display any errors
      resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}

//  PART 2: GET WEATHER BY USER'S LOCATION (New Feature) 

// This function runs when the "Use My Location" button is clicked
locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    // If the browser supports geolocation, ask for the user's position
    navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
  } else {
    resultDiv.innerHTML = "Geolocation is not supported by your browser.";
  }
});

// This function runs if we successfully get the user's location
function onLocationSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
  resultDiv.innerHTML = `<p>Loading...</p>`;
  
  // same fetch logic as before, just with a different URL
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon"></p>
        <p style="font-size: 2em; margin-top: -20px;">${Math.round(data.main.temp)} °C</p>
        <p style="text-transform: capitalize;">${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
      `;
      resultDiv.innerHTML = weatherHTML;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p style="color:red;">Could not fetch weather data.</p>`;
    });
}

// This function runs if there's an error getting the location
function onLocationError() {
  resultDiv.innerHTML = `<p style="color:red;">Unable to retrieve your location. Please allow location access.</p>`;
}


//  PART 3: LIVE CLOCK (New Feature)

function updateClock() {
  const now = new Date(); // Get the current date and time
  const formattedTime = now.toLocaleTimeString(); 
  clockDiv.innerHTML = `<p>${formattedTime}</p>`;
}

// Run the clock function immediately, then run it again every second
updateClock();
setInterval(updateClock, 1000);