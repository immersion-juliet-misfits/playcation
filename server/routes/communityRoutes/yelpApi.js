const express = require('express');
const axios = require('axios');
const Yelp = express.Router()

Yelp.get('/search', (req, res) => {
    const { location } = req.query
    console.log(location, process.env.YELP_KEY)
    axios.get(`https://api.yelp.com/v3/businesses/search`, {
        headers: {
          Authorization: `Bearer ${process.env.YELP_KEY}`
        },
        params: {
          location,
          locale: 'en_US',
          sort_by: 'best_match',
          limit: 2
        }
      })
      .then(({data}) => {
        res.send(data)
      })
      .catch((err) => {
        console.error('Could not find results from search', err)
      })
})

module.exports = Yelp;
