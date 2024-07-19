// Initialize the map
var map = L.map("map").setView([0, 0], 2); // Set the initial view of the map

// Add OpenWeatherMap layer

L.tileLayer(
  "http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=ea9ede7b95a7aa13798ef438854700f4",
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
  }
).addTo(map);

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
    let temp = document.querySelector(".temp");
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
    temp.innerHTML = data.main.temp;
    humid.innerHTML = data.main.humidity;
    windSpeed.innerHTML = data.wind.speed + "km/hr";
    data.name === ""
      ? (place.innerHTML = "Not known")
      : (place.innerHTML = data.name);
    // place.innerHTML = data.name;
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
// document.querySelector(".card").addEventListener("keydown", async () => {
//   const inputValue = document.querySelector("input").value.trim(); // Get and trim input value
//   const apiKey = "ea9ede7b95a7aa13798ef438854700f4"; // your OpenWeatherMap API key
//   let url;

//   if (isCoordinates(inputValue)) {
//     const [lat, lon] = inputValue.split(",").map((coord) => coord.trim());
//     url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
//   } else if (isCityStateCountry(inputValue)) {
//     url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
//       inputValue
//     )}&appid=${apiKey}&units=metric`;
//   } else {
//     alert("Invalid input format , enter something");
//     return; // Exit if input format is invalid
//   }

//   if (!url) {
//     // Check if URL is still empty
//     alert("URL is empty. Cannot make request.");
//     return;
//   }

//   try {
//     let temp = document.querySelector(".temp");
//     let humid = document.querySelector(".humidity");
//     let windSpeed = document.querySelector(".wind");
//     let place = document.querySelector(".place");
//     console.log(`Fetching data from URL: ${url}`); // Log URL for debugging
//     const response = await fetch(url);
//     if (!response.ok) {
//       // Check if the response is OK (status code 200-299)
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data); // handle the weather data
//     temp.innerHTML = data.main.temp;
//     humid.innerHTML = data.main.humidity;
//     windSpeed.innerHTML = data.wind.speed + "km/hr";
//     place.innerHTML = data.name;
//   } catch (error) {
//     console.error("Error fetching the weather data:", error);
//   }
// });
