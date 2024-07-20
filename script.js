document.querySelector("#searchIcon").addEventListener("click", async () => {
  const inputValue = document.querySelector("input").value.trim(); // Get and trim input value
  const apiKey = "ea9ede7b95a7aa13798ef438854700f4"; // your OpenWeatherMap API key
  let url;

  if (isCoordinates(inputValue)) {
    const [lat, lon] = inputValue.split(",").map((coord) => coord.trim());
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  } else if (isCityStateCountry(inputValue)) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      inputValue
    )}&appid=${apiKey}&units=metric`;
  } else {
    alert("Invalid input format , enter something");
    return; // Exit if input format is invalid
  }

  if (!url) {
    // Check if URL is still empty
    alert("URL is empty. Cannot make request.");
    inputValue = "";
    return;
  }

  try {
    let htemp = document.querySelector(".hightemp");
    let feel = document.querySelector(".feel");
    let ltemp = document.querySelector(".lowtemp");
    let humid = document.querySelector(".humidity");
    let windSpeed = document.querySelector(".wind");
    let place = document.querySelector(".place");
    console.log(`Fetching data from URL: ${url}`); // Log URL for debugging
    const response = await fetch(url);
    if (!response.ok) {
      // Check if the response is OK (status code 200-299)
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data); // handle the weather data
    htemp.innerHTML = data.main;
    humid.innerHTML = data.main.humidity;
    windSpeed.innerHTML = data.wind.speed;
    htemp.innerHTML = "Max: " + data.main.temp_max;
    feel.innerHTML = "Feel Like: " + data.main.feels_like;
    ltemp.innerHTML = "Min: " + data.main.temp_min;
  } catch (error) {
    console.error("Error fetching the weather data:", error);
    alert(
      "Not Found, try some other keyword for that location, otherwise use lat,long"
    );
  }
});

// Helper functions
function isCoordinates(value) {
  const regex = /^(-?\d+\.\d+),\s*(-?\d+\.\d+)$/;
  const match = value.match(regex);
  if (match) {
    const lat = parseFloat(match[1]);
    const lon = parseFloat(match[2]);
    return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
  }
  return false;
}

function isCityStateCountry(value) {
  const regex = /^[a-zA-Z\s\-]+$/; // Allows letters, spaces, and hyphens
  return regex.test(value);
}
