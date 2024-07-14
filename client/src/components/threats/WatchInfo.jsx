// Import react
import React, { useEffect, useState } from 'react';

// Remember to use react hooks when revising
const WatchInfo = (props) => {
  const { weatherData } = props;
    return (
        <div className="weather-details">
          <div className="city-name">City Name: {weatherData.city_name}</div>
          <div className="country-code">Country Code: {weatherData.country_code}</div>
          <div className="state-code">State Code: {weatherData.state_code}</div>
          <div className="coordinates">
            Coordinates
            <div className="latitude/longitude">
              Lat: {weatherData.lat} | Lon: {weatherData.lon}
            </div>
          </div>
          <div className="timezone">Timezone: {weatherData.timezone}</div>
          <div className="weather-report">
            <div className="title">
              <h2>Situation Breakdown</h2>
            </div>
            <div className="breakdown-details">
              <p>{weatherData.alerts.length === 1 ? weatherData.alerts[0].title : 'No title to report!'}</p>
              <p>{weatherData.alerts.length === 1 ? weatherData.alerts[0].description : 'Nothing to describe!'}</p>
            </div>
            <p>Severity level: {weatherData.alerts.length === 1 ? weatherData.alerts[0].severity : 'No severity levels!'}</p>
          </div>
          <div className="regions">
            Regions in this area:
            <div>{weatherData.alerts.length === 1 ? weatherData.alerts[0].regions : 'No regions to report!'}</div>
            </div>
        </div>
    );
}

export default WatchInfo;

