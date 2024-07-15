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
    const { id } = req.params;
    const { activity } = req.body;
    planner
      .findByPk(id)
      .then((plan) => {
        // Verify there is a plan
        if (!plan) {
          res.sendStatus(404);
          return null;
        }
        // New logic to accept array of options
        if (!Array.isArray(activity)) {
          res.status(400).send('Activities should be provided as an array');
          return null;
        }

        // Attempt to replace the old array with a new array
        plan.activities = activity;
        return plan.save();
      })
      .then((updatedPlan) => {
        if (updatedPlan) {
          res.status(200).send(updatedPlan);
        }
      })
      .catch((err) => {
        res.sendStatus(500);
        console.error('Failed to Add Activity To Plan', err);
      });
  },

  // PATCH: Remove activity
  delAct: (req, res) => {
    const { id } = req.params;
    const { activity } = req.body;

    planner
      .findByPk(id)
      .then((plan) => {
        // Verify there is a plan
        if (!plan) {
          return res.sendStatus(404);
        }
        // Verify activity is in the array
        if (!plan.activities.includes(activity)) {
          return res.status(400).send('Activity Not Found');
        }
        // retrieve index of activity to be removed
        const index = plan.activities.indexOf(activity);
        // Remove activity
        plan.activities.splice(index, 1);
        return plan.update({ activities: plan.activities });
      })
      .then((updatedPlan) => {
        res.status(200).send(updatedPlan); 
      })
      .catch((err) => {
        res.sendStatus(500);
        console.error('Failed to Remove Activity From Plan', err);
      });
  },
  // Adding plan_note patch instead
  updateNote: (req, res) => {
    const { id } = req.params;
    const { plan_notes } = req.body;

    planner
      .findByPk(id)
      .then((plan) => {
        // Verify there is a plan
        if (!plan) {
          res.sendStatus(404);
          return null;
        }

        // Update the plan notes
        plan.plan_notes = plan_notes;

        return plan.save();
      })
      .then((updatedPlan) => {
        if (updatedPlan) {
          res.status(200).send(updatedPlan);
        }
      })
      .catch((err) => {
        res.sendStatus(500);
        console.error('Failed To Update Plan Notes', err);
      });
  },
};
