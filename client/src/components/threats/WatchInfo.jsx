// Import react
import React, { useEffect, useState } from 'react';

const weatherObj = [{
    "country_code":"US",
    "lon":-84.19161,
    "timezone":"America\/New_York",
    "lat":39.75895,
    "alerts":[
       {
          "regions":[
             "Madison",
             " Franklin",
             " Scioto",
             " Hardin",
             " Logan",
             " Licking",
             " Montgomery",
             " Clermont",
             " Fayette",
             " Brown",
             " Mercer",
             " Wayne",
             " Adams",
             " Union",
             " Warren",
             " Highland",
             " Lewis",
             " Ross",
             " Robertson",
             " Clark",
             " Fayette",
             " Preble",
             " Shelby",
             " Clinton",
             " Franklin",
             " Pike",
             " Miami",
             " Delaware",
             " Bracken",
             " Greene",
             " Auglaize",
             " Hocking",
             " Fairfield",
             " Butler",
             " Champaign",
             " Pickaway",
             " Darke",
             " Mason",
             " Union"
          ],
          "ends_utc":"2020-10-17T13:00:00",
          "effective_local":"2020-10-16T14:17:00",
          "onset_utc":"2020-10-17T06:00:00",
          "expires_local":"2020-10-16T22:30:00",
          "expires_utc":"2020-10-17T02:30:00",
          "ends_local":"2020-10-17T09:00:00",
          "uri":"https:\/\/api.weather.gov\/alerts\/NWS-IDP-PROD-4486346-3727122",
          "onset_local":"2020-10-17T02:00:00",
          "effective_utc":"2020-10-16T18:17:00",
          "severity":"Watch",
          "title":"Freeze Warning issued October 16 at 2:17PM EDT until October 17 at 9:00AM EDT by NWS Wilmington OH",
          "description":"* WHAT...Sub-freezing temperatures as low as 30 expected.\n\n* WHERE...Portions of East Central and Southeast Indiana,\nNortheast and Northern Kentucky and Central, South Central,\nSouthwest and West Central Ohio.\n\n* WHEN...From 2 AM to 9 AM EDT Saturday.\n\n* IMPACTS...Frost and freeze conditions will kill crops, other\nsensitive vegetation and possibly damage unprotected outdoor\nplumbing."
       }
    ],
    "city_name":"Dayton",
    "state_code":"OH"
 }
]
const data = weatherObj[0];
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

