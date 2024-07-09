const express = require('express');
const Community = express.Router();

Community.use(express.json());

// express handles request; db models + sequelize handle querying
Community.get('/post', (req, res) => {
  res.send('good try');
});
//   .then((tr) => {
//     res.send('good try', tr)
//   })
//   .catch((err) => {
//     console.error(err)
//   })

module.exports = Community;
