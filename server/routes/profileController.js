const { Profile } = require('../db');

module.exports = {
  // GET /api/profile
  getProfile: (req, res) => {
    const { id } = req.params;
    const profileId = id;
    // find user 
    Profile.findByPk(profileId)
      .then((profile) => {
        res.send(profile);
      })
      .catch((err) => {// if no user
        res.sendStatus(500);
        console.error('Error: Can not GET /api/:profileId : ', err);
      });
  },

  // POST /api/profile
  addProfile: (req, res) => {
    const { newProfile } = req.body;
    //find user
    Profile.findOne()
    .then(() => {
      
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
        res.sendStatus(500);
        console.error(err);
    })
  },
  // PUT /api/profile
  updateProfile: (req, res) => {
    Profile.findByPk()
    .then(() => {})
    .catch(err => {
      res.sendStatus(500);
      console.error(err);
    })
  },
  // DELETE /api/profile:profileId
  deleteProfile: (req, res) => {
    Profile.findByPk()
    .then(() => {})
    .catch(err => {
      res.sendStatus(500);
      console.error(err);
    })
  }
};
