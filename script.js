// Function to get Weather Data using the provided API key
async function getWeatherData() {
    const location = document.getElementById('location').value;
    if (!location) {
      alert('Please enter a location.');
      return;
    }
  
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=6eccc8c5be794866a7c10114240310&q=${location}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const weatherData = await response.json();
  
      // Display the weather data in HTML
      document.getElementById('weather-result').innerHTML = `
        <h2>Weather for ${weatherData.location.name}, ${weatherData.location.country}</h2>
        <p>Temperature: ${weatherData.current.temp_c}°C</p>
        <p>Condition: ${weatherData.current.condition.text}</p>
        <img src="${weatherData.current.condition.icon}" alt="${weatherData.current.condition.text}">
        <p>Feels Like: ${weatherData.current.feelslike_c}°C</p>
        <p>Humidity: ${weatherData.current.humidity}%</p>
        <p>Wind Speed: ${weatherData.current.wind_kph} kph</p>
      `;
    } catch (error) {
      document.getElementById('weather-result').innerText = `Error: ${error.message}`;
    }
  }
  
  // Event listener for "Enter" key press in the location input field
  document.getElementById('location').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      getWeatherData();
    }
  });

  