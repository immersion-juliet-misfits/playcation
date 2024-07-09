// Import react
// Remember to use react hooks when revising
const WatchInfo = () => {
    return (
        <div className="weather-details">
          {console.log("TESTING", data)}
          <div className="city-name">City Name: {data.city_name}</div>
          <div className="country-code">Country Code: {data.country_code}</div>
          <div className="state-code">State Code: {data.state_code}</div>
          <div className="coordinates">
            Coordinates
            <div className="latitude/longitude">
              Lat: {data.lat} | Lon: {data.lon}
            </div>
          </div>
          <div className="timezone">Timezone: {data.timezone}</div>
          <div className="weather-report">
            <div className="title">
              <h2>Situation Breakdown</h2>
            </div>
            <div className="breakdown-details">
              <p>{data.alerts[0].title}</p>
              <p>{data.alerts[0].description}</p>
            </div>
            Severity level: {data.alerts[0].severity}
          </div>
          <div className="regions">
            Regions in this area:
            <div>{data.alerts[0].regions}</div>
            </div>
        </div>
    );
}

export default WatchInfo;

