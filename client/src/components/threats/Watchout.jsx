// Import react hooks
// Will need useEffect, and useState
 import React, { useEffect, useState } from 'react';

// Import WatchInfo 
import WatchInfo from "./WatchInfo.jsx";
// Import axios
import axios from 'axios';
// Import dotenv
import dotenv from 'dotenv';
dotenv.config();

// Will need to change the information depending on the city and state
// Create function to use for axios request handling 
// When user picks a location, the weather report should get information for what's going on in the area
// When enter key is pressed, and input is submitted, the 
const WatchOut = () => {
    const [report, setReport] = useState(null);
    const [lock, setLock] = useState(null);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false); // To prevent duplicate requests
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = process.env.WEATHER_API_KEY;
    
    const getWeather = () => {}
    
    const searchSubmit = (event) => {
      event.preventDefault();

      // When user doesn't fill out one of the forms
      // If city or country is falsey
      if (!city || !country) {
        // Hard return
        alert('Please enter both city and country');
        return;
      }
       
      // If loading is truthy
      if (loading) {
        // Hard return
        return;
      }
      setLoading(true);

      // Use api key
      console.log(apiKey);
      // Use api url
      const apiUrl = `http://api.weatherbit.io/v2.0/alerts?&city=${city}&country=${country}&key=${apikey}`

      // Use an axios GET request
      axios.get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to GET data:', err);
        setLoading(false);
      });
    };

  return (
    <div className="watch-container">
      <div className="weather-information">
        <div className="weather-headers">
          <h1>Weather Report</h1>
          {/* <button onClick={searchSubmit}>Search Locations</button> */}
          <form onSubmit={searchSubmit}>
            <label htmlFor="cityInput">City: </label>
            <input type="text" id="cityInput" placeholder="Search for city" value={city} onChange={(e) => setCity(e.target.value)}/>
            <label htmlFor="countryInput"> Country: </label>
            <input type="text" id="countryInput" placeholder="Search for country" value={country} onChange={(e) => setCountry(e.target.value)}/>
            <button type="submit" disabled={loading}>
              {loading ? 'loading...' : 'Submit'}
            </button>
          </form>
        </div>
        <WatchInfo weatherData={weatherData}/>
      </div>
    </div>
  );
};

export default WatchOut;
