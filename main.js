window.onload = () => {
  const input = document.querySelector("#input");
  const button = document.querySelector("#button");
  const result = document.querySelector("#result");
  const apiKey = "da79119f59d1111d4d8d918f5dcfdf8e";

  button.addEventListener("click", fetchCity);

  function fetchCity() {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&appid=${apiKey}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let lat = data[0].lat;
        let lon = data[0].lon;
        return fetchWeather(lat, lon);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }

  function fetchWeather(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        result.innerHTML = `<p class="h1 fw-bold">${data.name}<p>
							<img src='https://openweathermap.org/img/wn/${data.weather[0].icon}.png' />
							<p class="h2">${data.weather[0].main}, ${data.weather[0].description}</p>
							<p class="h1">${Math.round(data.main.temp - 273.15)} ℃<p>`;
      })
      .catch(function (error) {
        console.warn(error);
      });
  }
};
