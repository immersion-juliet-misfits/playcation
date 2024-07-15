const axios = require('axios')
const express = require('express');
const weatherRoute = express.Router()
//const {User, reviews} = require('../db/index');
const { weather } = require('../../db/index');

weatherRoute.use(express.json());

weatherRoute.get('/object', (req, res) => {
  console.log('GET TEST');
  res.send({});
});



// Define a route for handling the GET request
weatherRoute.get('/create-lists', (req, res) => {
  // Query to fetch all data from weather table
  weather.findAll()
  .then(weatherData => {
    // Extract city name and country code from weather_list property
    // Use Map method
    //console.log('TESTING', weatherData);
    
    const lists = weatherData.map(item => ({
      cityName: item.weather_list.city_name,
      countryCode: item.weather_list.country_code
    }));
    
    console.log('LISTS HERE', lists);
    
  
    return lists;
    // Respond with the lists as JSON
  })
  .then((lists) => {
     res.status(200).send(lists);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  });
});

// POST endpoint to receive weather data and save to database
weatherRoute.post('/weather-data', (req, res) => {
  const { city_name, country_code } = req.body;
  
  const apiKey = process.env.WEATHER_API_KEY; 
  const apiUrl = `http://api.weatherbit.io/v2.0/alerts?city=${city_name}&country=${country_code}&key=${apiKey}`;
  
  // Make GET request to Weather API
  axios.get(apiUrl)
  .then(apiResponse => {
      // Handle API response
      const weatherData = apiResponse.data;
      console.log(weatherData)
      //res.json({ message: 'Weather data saved successfully', data: weatherData });
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    });
});

  weatherRoute.delete('/delete-null-weather', (req, res) => {
    weather.destroy({
      where: {
        weather_list: null
      }
    })
    .then(deletedCount => {
      res.json({ deletedCount });
    })
    .catch(error => {
      console.error('Error deleting records:', error);
      res.status(500).json({ error: 'Error deleting records' });
    });
  });
  
module.exports = weatherRoute;