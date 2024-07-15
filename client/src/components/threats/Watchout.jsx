// Import react hooks
// Will need useEffect, and useState
import React, { useEffect, useState } from 'react';

// Import WatchInfo 
import WatchInfo from "./WatchInfo.jsx";
// Import axios
import axios from 'axios';

const WatchOut = () => {
 
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(false); // To prevent duplicate requests
    const [weatherData, setWeatherData] = useState(null);
    const [lists, setLists] = useState([]);
    const apiKey = process.env.WEATHER_API_KEY;

  useEffect(() => {
    const fetchData = () => {
      if (city && country) {
        setLoading(true);
        const apiUrl = `http://api.weatherbit.io/v2.0/alerts?&city=${city}&country=${country}&key=${apiKey}`;
        axios.get(apiUrl)
          .then((response) => {
            console.log('RESPONSE', response)
            setWeatherData(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Failed to fetch data:', error);
            setLoading(false);
          });
      }
    };

    fetchData();
  }, [city, country, apiKey]);

    const searchSubmit = (event) => {
      event.preventDefault();

      // When user doesn't fill out one of the forms
      // If city or country is falsey
      if (!city || !country) {
        // Hard return
        alert('Please enter both city and country');
        return;
      }

        // Prepare data to send in the POST request
    const postData = {
      city_name: city,
      country_code: country,
    };

    // Send POST request to backend
    axios.post('/weather-data', postData)
      .then(response => {
        console.log('Weather data saved:', response.data);
       })
      .catch(error => {
        console.error('Failed to save weather data:', error);
       });
    };

     const saveWeatherData = () => {
       
    };

    const createLists = () => {
      axios.get('/create-lists')
        .then(response => {
          console.log('Lists created:', response);
          // Update state or handle the data as required
           setLists(response.data);
        })
        .catch(error => {
          console.error('Failed to create lists:', error);
          alert('Failed to create lists');
        });
    };

  return (
    <div className="watch-container">
      <div className="weather-information">
        <div className="weather-headers">
          <h1>Weather Report</h1>
          <form onSubmit={searchSubmit}>
            <label htmlFor="cityInput">City: </label>
            <input type="text" id="cityInput" placeholder="Search for city" value={city} onChange={(e) => setCity(e.target.value)}/>
            <label htmlFor="countryInput"> Country: </label>
            <input type="text" id="countryInput" placeholder="Search for country" value={country} onChange={(e) => setCountry(e.target.value)}/>
            <button type="submit" disabled={loading}>
              {loading ? 'loading...' : 'Submit'}
            </button>
          </form>
          <button onClick={saveWeatherData} disabled={!weatherData}>
            Save Weather Report
          </button>
          <button onClick={createLists}>
            Create Lists
          </button>
        </div>
         {console.log(weatherData)}
        <br></br>{weatherData ? <WatchInfo weatherData={weatherData}/> : 'Please wait...'}
         
      </div>
    </div>
  );
};

export default WatchOut;
