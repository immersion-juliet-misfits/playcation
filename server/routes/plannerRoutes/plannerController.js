// https://expressjs.com/en/4x/api.html#router
// https://expressjs.com/en/guide/routing.html#express-router
const express = require('express');
// Create new Router instance
const Plan = express.Router();
// import access to the DB
const { planner } = require('../../db/index');

Plan.use(express.json());

// GET: Retrieve all planners
Plan.get('/get', (req, res) => {
  planner.findAll()
  .then((plans) => {
    res.send(plans);
  });
});


// POST: Create a new planner
Plan.post('/post', (req, res) => {
// planner.create()
})


// DELETE: Remove an existing planner
Plan.delete('/delete:id', (req, res) => {
  // planner.destroy()
  })


// PATCH: Add activity
Plan.patch('/patch', (req, res) => {
  // planner.
  })


// PATCH: Remove activity
Plan.patch('/patch', (req, res) => {
  // planner.
  })



module.exports = Plan;