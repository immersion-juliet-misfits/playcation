// https://expressjs.com/en/4x/api.html#router
// https://expressjs.com/en/guide/routing.html#express-router
// const express = require('express');
// Create new Router instance
// const Plan = express.Router();
// import access to the DB
// const { planner } = require('../../db/index.js');
const { planner } = require('../db');

module.exports = {
  // GET: Retrieve all planners
  getPlans: (req, res) => {
    const { id } = req.params; // Integrate this so only the current Users Plans are retrieved
    const { sortBy = 'createdAt', order = 'DESC' } = req.query; // So the newest plan is shown at the top of the Select bar
    planner
      .findAll({
        where: { user_id: id },
        order: [[ sortBy, order ]]
      })
      .then((plans) => {
        res.send(plans);
      })
      .catch((err) => {
        console.error('Failed to Retrieve Plans', err);
      });
  },

  // POST: Create a new planner
  addPlan: (req, res) => {
    // destructure data that will be passed into Model.create()
    const { user_id, plan_name, plan_notes } = req.body;
    console.log('POST Body Check: ', req.body);
// Had to add this here to to enforce plan_name requirement
    if (!plan_name) {
      return res.status(400).send('Plan name is required');
    }

    planner
      .create({
        user_id,
        hotel_id: null,
        trip_location: '',
        plan_name,
        plan_notes: plan_notes || '',
        activities: [],
      })
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.error('Failed to Create New Plan', err);
      });
  },

  // DELETE: Remove an existing planner
  delPlan: (req, res) => {
    const { id } = req.params;
    planner
      .destroy({
        where: {
          id: id,
        },
      })
      .then((data) => {
        if (!data) {
          console.error('Plan Not Found');
          res.sendStatus(404);
        } else {
          res.status(201).send(data);
        }
      })
      .catch((err) => {
        console.error('Failed to Delete Plan', err);
      });
  },

  // PATCH: Add activity
  addAct: (req, res) => {
    // planner.().then().catch();
  },

  // PATCH: Remove activity
  delAct: (req, res) => {
    // planner.().then().catch();
  },
};
