// Import react hooks
// Will need useEffect, and useState
 import React, { useEffect, useState } from 'react';

// Import WatchInfo 
import WatchInfo from "./WatchInfo.jsx";

// Will need to change the information depending on the city and state
// Create function to use for axios request handling 
// When user picks a location, the weather report should get information for what's going on in the area
const WatchOut = () => {
    const [report, setReport] = useState(null);

    const getWeather = () => {}

  return (
    <div className="watch-container">
      <div className="weather-information">
        <div className="weather-headers">
          <h1>Weather Report</h1>
        </div>
        <WatchInfo />
      </div>
    </div>
  );
};

export default WatchOut;
