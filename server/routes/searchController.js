// Search Controller logic
const axios = require('axios');
// This will pull my API key
require('dotenv').config();
// API Key
const gpmKey = process.env.GOOGLE_PLACES_API_KEY;

module.exports = {
  // Functions for Search results
  // Call to API to get 10 results to present User
  getSearch: (req, res) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/js?key=${gpmKey}&libraries=places`
      )
      .then((data) => {
        console.log('Verify Data: ', data);
        res.status(200).send(data);
      })
      .catch((err) => {
        console.error('Data Check Failed: ', err);
      });
  },
};
