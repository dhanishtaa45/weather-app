const apiKey = "7659889039d5ebbe1f94a7849d9fee36"; // Replace with your OpenWeather API key

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const cityInput = document.getElementById("cityInput");
  const weatherResult = document.getElementById("weatherResult");

  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) {
      weatherResult.innerHTML = "<p>Please enter a city name.</p>";
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("City not found or API error");
        }
        return response.json();
      })
      .then(data => {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        weatherResult.innerHTML = `
          <h2>${data.name}</h2>
          <p><img src="${iconUrl}" alt="${description}"></p>
          <p>Temperature: ${temperature}°C</p>
          <p>Condition: ${description}</p>
        `;
      })
      .catch(error => {
        weatherResult.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
});
