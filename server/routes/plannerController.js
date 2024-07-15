const { planner } = require('../db');

module.exports = {
  getPlans: (req, res) => {
    const { id } = req.params;
    const { sortBy = 'createdAt', order = 'DESC' } = req.query;
    planner
      .findAll({
        where: { user_id: id },
        order: [[sortBy, order]],
      })
      .then((plans) => {
        res.send(plans);
      })
      .catch((err) => {
        console.error('Failed to Retrieve Plans', err);
      });
  },

  addPlan: (req, res) => {
    const { user_id, plan_name, plan_notes } = req.body;
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

  delPlan: (req, res) => {
    const { id } = req.params;
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

  addAct: (req, res) => {
    const { id } = req.params;
    const { activity } = req.body;
    planner
      .findByPk(id)
      .then((plan) => {
        if (!plan) {
          res.sendStatus(404);
          return null;
        }
        if (!Array.isArray(activity)) {
          res.status(400).send('Activities should be provided as an array');
          return null;
        }

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

  delAct: (req, res) => {
    const { id } = req.params;
    const { activity } = req.body;

    planner
      .findByPk(id)
      .then((plan) => {
        if (!plan) {
          return res.sendStatus(404);
        }
        if (!plan.activities.includes(activity)) {
          return res.status(400).send('Activity Not Found');
        }
        const index = plan.activities.indexOf(activity);
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
  updateNote: (req, res) => {
    const { id } = req.params;
    const { plan_notes } = req.body;

    planner
      .findByPk(id)
      .then((plan) => {
        if (!plan) {
          res.sendStatus(404);
          return null;
        }

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
