document.querySelector("#searchIcon").addEventListener("click", async () => {
  const inputValue = document.querySelector("input").value.trim(); // Get and trim input value
  const apiKey = "2BMTTMMRPH3GUDVK5FQZSBJ5H"; // Your Visual Crossing Weather API key
  let url;

  if (isCoordinates(inputValue)) {
    const [lat, lon] = inputValue.split(",").map((coord) => coord.trim());
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${apiKey}&contentType=json`;
  } else if (isCityStateCountry(inputValue)) {
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
      inputValue
    )}?unitGroup=metric&key=${apiKey}&contentType=json`;
  } else {
    alert("Invalid input format, enter something");
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
    let desc = document.querySelector(".desc");

    // console.log(`Fetching data from URL: ${url}`); // Log URL for debugging
    const response = await fetch(url);

    if (!response.ok) {
      // Check if the response is OK (status code 200-299)
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data); // handle the weather data

    if (!data || !data.days || data.days.length === 0) {
      throw new Error("No weather data available for the provided location.");
    }

    // Update elements with weather data
    htemp.innerHTML = "Max: " + data.days[0].tempmax + "°C";
    feel.innerHTML = "Feel Like: " + data.days[0].feelslike + "°C";
    ltemp.innerHTML = "Min: " + data.days[0].tempmin + "°C";
    humid.innerHTML = "Humidity: " + data.days[0].humidity + "%";
    windSpeed.innerHTML = "Wind Speed: " + data.days[0].windspeed + " km/h";
    desc.innerHTML = "Description: " + data.days[0].description;
    // place.innerHTML = "Location: " + data.resolvedAddress;
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

setInterval(() => {
  changes();
}, 1000);

let changes = () => {
  let rain = document.querySelector(".rain");
  let rainElement = document.querySelector(".waves");
  let oriWidth = document.querySelector("body").clientWidth;
  let oriHeight = document.querySelector("body").clientHeight;

  // Update the width and height of the .waves element
  rainElement.style.width = oriWidth + "px";
  rainElement.style.height = oriHeight + "px";
  rain.style.width = oriWidth + "px";
  rain.style.height = oriHeight + "px";
};
