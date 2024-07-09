const { User } = require('../db');

module.exports = {
  // GET /api/user
  getUser: (req, res) => {
    const { id } = req.user;
    const userId = id;
    // find user 
    User.findByPk(userId)
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {// if no user
        res.sendStatus(500);
        console.error('Error: Can not GET /api/:userId : ', err);
      });
  },

  // POST /api/user
  // addUser: (req, res) => {
  //   const { newUser } = req.body;
  //   //find user
  //   User.findOne({username: newUser.username})
  //   .then((user) => {
  //     if (user) {
  //       throw 'user exists';
  //     }
  //     else {
  //       return User.create(newUser);
  //     }
  //   })
  //   .then(() => {
  //     res.sendStatus(201);
  //   })
  //   .catch((err) => {
  //     if (err === 'user exists') {
  //       res.sendStatus(400, 'User already exists');
  //     }
  //     else {
  //       res.sendStatus(500);
  //       console.error(err)
  //     }
  //   })
  // }
};
