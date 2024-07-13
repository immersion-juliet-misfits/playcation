// import access to the DB
const { planner } = require('../db');

module.exports = {
  // GET: Retrieve all planners
  getPlans: (req, res) => {
    const { id } = req.params;
    const { sortBy = 'createdAt', order = 'DESC' } = req.query;
    planner
      .findAll({
        where: { user_id: id }, // To only retrieve current Users plans
        order: [[sortBy, order]], // So newest plan appears at top of the Select bar
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
    // Required to enforce plan_name requirement
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
    const { id } = req.params; // plan id
    planner
      .destroy({
        where: {
          id: id,
        },
      })
      .then((destroyed) => {
        if (!destroyed) {
          console.error('Plan Not Found');
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }
      })
      .catch((err) => {
        res.sendStatus(500);
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
