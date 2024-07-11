const express = require('express');
const Community = express.Router();
const { communityPost } = require('../../db/index');

Community.use(express.json());

// express handles request; db models + sequelize handle querying
Community.get('/post', (req, res) => {
  communityPost.findAll()
    .then((data) => {
      res.send(data);
    });
});

Community.post('/post', (req, res) => {
  console.log('Saved:', req.body);
  const { title, body, user_id, url } = req.body;
  communityPost.create({
    title,
    body,
    user_id,
    url
  })
    .then((created) => {
      res.send(created);
    })
    .catch((err) => {
      console.error(err);
    });
});
//   .then((tr) => {
//     res.send('good try', tr)
//   })
//   .catch((err) => {
//     console.error(err)
//   })

module.exports = Community;
