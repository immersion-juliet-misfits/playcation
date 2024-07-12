const express = require('express');
const Community = express.Router();
const { communityPost, User } = require('../../db/index');

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

Community.delete('/post/:id', (req, res) => {
  console.log(req.params)
  const { id } = req.params;

  communityPost.destroy({where: { id }})
    .then(() => {
      // console.log(user)
      res.status(200).send('Successfully deleted')
      // communityPost
    })
})

Community.patch('/post/:id', (req, res) => {
  const { id } = req.params;
  const { title, body, user_id, url } = req.body;

  communityPost.update({
    title,
    body,
  }, {where: { id }})
  .then(() => {
    res.status(201).send('Successfully updated')
  })
})
//   .then((tr) => {
//     res.send('good try', tr)
//   })
//   .catch((err) => {
//     console.error(err)
//   })

module.exports = Community;
