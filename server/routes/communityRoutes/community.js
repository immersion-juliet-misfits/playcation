const express = require('express');
const Community = express.Router();
const { communityPost, User } = require('../../db/index');

Community.use(express.json());

// express handles request; db models + sequelize handle querying
Community.get('/post', (req, res) => {
  communityPost.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error('Could not get posts', err)
    });
});

Community.post('/post', (req, res) => {
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
  const { id } = req.params;

  communityPost.destroy({where: { id }})
    .then(() => {
      res.status(200).send('Successfully deleted')
    })
    .catch((err) => {
      console.error('Failed deleting post');
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
  .catch((err) => {
    console.error('Failed to edit post', err)
  })
})


module.exports = Community;
