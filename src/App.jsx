import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1eb6f22d45dd019e9933ba20c3458059&units=imperial`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      }).catch(error => {
        console.error("Error fetching weather data:", error);
      });

      setLocation('');
    }
  };

  return (
    <>
      <div className="app">
        <div className="search">
          <h2>Weather Searcher</h2>
          <input 
            type="text" 
            placeholder="Search City" 
            value={location} 
            onChange={(event) => setLocation(event.target.value)} 
            onKeyPress={searchLocation}
          />
        </div>
        
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              <h1>{data.main ? `${Math.round(data.main.temp)} °F` : "N/A"}</h1>
            </div>
            <div className="description">
              <p>{data.weather ? data.weather[0].description : "N/A"}</p>
            </div>
          </div>
          <div className="bottom">
            <div className="tempb">
              <p>{data.main ? `${Math.round(data.main.feels_like)} °F` : "N/A"}</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p>{data.main ? `${data.main.humidity}%` : "N/A"}</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p>{data.wind ? `${data.wind.speed} mph` : "N/A"}</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
