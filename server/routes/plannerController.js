// https://expressjs.com/en/4x/api.html#router
// https://expressjs.com/en/guide/routing.html#express-router
// const express = require('express');
// Create new Router instance
// const Plan = express.Router();
// import access to the DB
// const { planner } = require('../../db/index');
const { planner } = require('../db');

module.exports = {
  // GET: Retrieve all planners
  getPlans: (req, res) => {
    planner
      .findAll()
      .then((plans) => {
        res.send(plans);
      })
      .catch((err) => {
        console.error('Failed to Retrieve Plans', err);
      });
  },

  // POST: Create a new planner
  addPlan: (req, res) => {
    // destructure data
    const {
      user_id,
      hotel_id,
      trip_location,
      plan_name,
      plan_notes,
      activities,
    } = req.params;
    planner
      .create({
        user_id,
        hotel_id: hotel_id || undefined,
        trip_location: trip_location || '',
        plan_name,
        plan_notes: plan_notes || '',
        activities: activities || [],
      })
      .then((data) => {
        res.status(data).send(data);
      })
      .catch((err) => {
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
