const { request, response } = require("express");
const { Profile, User } = require("../db");

module.exports = {
  // GET /api/profile/:id
  getProfile: (request, response) => {
    const { id } = request.params;
    const profileId = id;

    // find user
    Profile.findOne({ where: { user_id: id } })
      .then((profile) => {
        console.log('p.dv', profile.dataValues)
        response.status(200).send(profile.dataValues);
      })
      .catch((err) => {
        // if no user
        response.sendStatus(500);
        console.error("Error: Can not load profile: ", err);
      });
  },

  // POST /api/profile
  addProfile: (request, response) => {
    const newProfile = request.body;

    //find user
    Profile.create({
      firstName: newProfile.firstName,
      lastName: newProfile.lastName,
      bio: newProfile.bio,
      user_id: newProfile.user_id,
    })
      .then((data) => {
        response.status(201).send(data);
      })
      .catch((err) => {
        response.sendStatus(500);
        console.error("Can not create profile: ", err);
      });
  },
  // PUT /api/profile/:id
  updateProfile: (request, response) => {
    const { id } = request.params;
    const { firstName, lastName, bio } = request.body;

    Profile.update(
      {
        firstName,
        lastName,
        bio,
      },
      { where: { id } }
    )
      .then(() => {
        response.status(201).send("Successfully updated");
      })
      .catch((err) => {
        response.sendStatus(500);
        console.error("Can not update profile: ", err);
      });
  },
  // DELETE /api/profile:profileId
  deleteProfile: (request, response) => {
    const { id } = request.params;

    Profile.destroy({ where: { id } })
      .then(() => {
        response.status(200).send("Profile deleted");
      })
      .catch((err) => {
        response.sendStatus(500);
        console.error("Can not delete profile: ", err);
      });
  },
};
