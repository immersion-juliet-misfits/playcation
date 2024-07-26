const axios = require('axios');
require('dotenv').config();
const gpmKey = process.env.GOOGLE_PLACES_API_KEY;

module.exports = {
  getSearch: (req, res) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/js?key=${gpmKey}&libraries=places`
      )
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.error('Data Check Failed: ', err);
      });
  },
};
