// https://expressjs.com/en/4x/api.html#router
// https://expressjs.com/en/guide/routing.html#express-router
const express = require('express');
// Create new Router instance
const Plan = express.Router();
// import access to the DB
const { planner } = require('../../db/index');

Plan.use(express.json());

// POST: Create a new planner
Plan.post('/post', (req, res) => {
// planner.
})

// GET: Retrieve all planners
Plan.get('/get', (req, res) => {
  planner.findAll()
  .then((plans) => {
    res.send(plans);
  });
});

// GET: Retrieve one planner

// DELETE: Remove an existing planner

// PATCH: Add activity

// PATCH: Remove activity



module.exports = Plan;