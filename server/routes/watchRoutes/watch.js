// All request handling will be done here for routes 
// Use require method for express
const express = require('express');
// Using express Router method
const weatherRoute = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.WEATHER_API_KEY;

// Require the weather model from the database
const { weather } = require('../../db/index');
const axios = require('axios');

// Adding middleware
weatherRoute.use(express.json());
 

// weatherRoute.get('/watchout/get/report', (req, res) => {
//     // Use req.query
//     console.log('TESTING GET', req);
//     const { city, country } = req.query;
//     // Use axios GET request for api
//     const apiUrl = `http://api.weatherbit.io/v2.0/alerts?&city=${city}&country=${country}&key=${apiKey}`;
//     // First argument is the api, second is the object
//     axios.get(apiUrl)
//     .then((response) => {
//         console.log('TESTING RESPONSE', response);
//         res.json(response.data);
//     })
//     .catch((error) => {
//         console.log('Failed to get weather report:', error);
//         res.sendStatus(500);
//     })
// })

 
weatherRoute.post(`/watchout/api/saveWeatherData`, (req, res) => {
    const { weatherData } = req.body;
  
    if (!weatherData) {
      return res.status(400).json({ error: 'Weather data is required' });
    }
  
    // Assuming `weatherData` is an object received from the client
    weather.create({ weather_list: weatherData })
      .then(savedWeather => {
        res.status(201).json(savedWeather);
      })
      .catch(error => {
        console.error('Failed to save weather data:', error);
        res.sendStatus(500);
      });
  });
// weatherRoute.patch('/update/report', () => {

// })

// weatherRoute.delete('/remove/report', () => {

// })

// Export the router
module.exports = weatherRoute;
