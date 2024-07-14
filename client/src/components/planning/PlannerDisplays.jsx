/* 
This displays everything on the right in Planner.jsx
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper } from '@mui/material';
// Import fake data to test functionality
// import { pData } from '../../../../server/db/plan_fData.js';
// console.log('Fake Data Verified', fData);
// Import display components
import DisplaySelect from './displaySelect.jsx';
import ButtonSelect from './buttonSelect.jsx';
import TableSelect from './tableSelect.jsx';
import CreatePlanner from './createPlanner.jsx';

const PlannerDisplays = ({ profile }) => {
  console.log('Profile Check: ', profile);
  // State Group Start *****
  // Data retrieved from DB
  // const [data, setData] = useState([]); // Fake Data - Temp
  const [plans, setPlans] = useState([]); // Real Data - Eventual
  // Has user selected a Plan
  const [selectedPlan, setSelectedPlan] = useState(null);
  // Has user selected a Plan
  const [isChangePlansClicked, setIsChangePlansClicked] = useState(false);
  // User wants to Edit a Plan - remove activities
  const [isDelActivityClicked, setIsDelActivityClicked] = useState(false);
  // State Group End *****

  // Axios Calls to Express Start *****
  // Create Plan / POST
  const addPlan = ({ planName, planNotes }) => {
    axios
      .post('/api/planner', {
        // user_id,
        // plan_name, // Required
        // plan_notes, // Optional
        // ^ Works with Test Data
        user_id: profile.id,
        plan_name: planName, // Required
        plan_notes: planNotes, // Optional
      })
      .then((plan) => {
        // Stretch: make it auto select this plan so it is displayed as soon as the User creates it
        console.log('New Plan Created', plan);
        // invoke getPlans so that Select box will include new plan
        getPlans();
        // Auto select the new plan
        // setTimeOut to prevent MUI error
        setTimeout(() => {
          setSelectedPlan(plan.data);
        }, 100);
      })
      .catch((err) => {
        console.error('Failed To Create New Plan: ', err);
      });
  };

  // Retrieve all Plans / GET
  const getPlans = () => {
    axios
      .get(`/api/planner/${profile.id}`)
      .then((plans) => {
        setPlans(plans.data); // This was working as just plans, but will try it with plans.data for now
        console.log('Plans Retrieved', plans);
        // console.log('Plans.Data Retrieved', plans.data);
      })
      .catch((err) => {
        console.error('Failed To Retrieve Plans From Server: ', err);
      });
  };

  // Add items to Plan Activities / PATCH
  const addAct = (planId, newAct) => {
    // Need to add a button in Search to connect to this
    axios
      .patch(`/api/planner/${planId}/addAct`, {
        activity: newAct,
      })
      .then((added) => {
        console.log('Activity Added', added.data);
        // Refresh list by invoking getPlans
      })
      .catch((err) => {
        console.error('Failed To Add Activity to Plan: ', err);
      });
  };

  // Remove items from Plan Activities / PATCH
  const delAct = (planId, oldAct) => {
    axios
      .patch(`/api/planner/${planId}/delAct`, {
        activity: oldAct,
      })
      .then((deleted) => {
        console.log('Activity Removed', deleted.data);
        // Refresh list by invoking getPlans
      })
      .catch((err) => {
        console.error('Failed To Remove Activity from Plan: ', err);
      });
  };

  // Delete Plan / DELETE
  const delPlan = () => {
    // Verify a Plan has been selected
    if (!selectedPlan) {
      console.error('Must Select A Plan to Delete');
      return;
    }
    // Need to add something to make User Verify that they want to Delete the selected plan
    // Another checkbox somewhere off to the side? The current button may be too close to the others

    axios
      .delete(`/api/planner/${selectedPlan.id}`)
      .then((deleted) => {
        console.log('Plan Removed', deleted.data);
        // Refresh list by invoking getPlans
        getPlans();
      })
      .catch((err) => {
        console.error('Failed To Remove Plan From Server: ', err);
      });
  };
  // Axios Calls to Express End *****

  // Detect User Selection in Select Box
  const handleSelectChange = (event) => {
    const planName = event.target.value;
    // const selectedPlanData = data.find((plan) => plan.plan_name === planName); // Worked with Test data, with 1 change I can't recall if I made
    const selectedPlanData = plans.find((plan) => plan.plan_name === planName);
    setSelectedPlan(selectedPlanData);
    setIsChangePlansClicked(false);
    setIsDelActivityClicked(false);
  };
  // Detect User wants to Edit/Change Plan
  const handleChangePlansClick = () => {
    setIsChangePlansClicked(true);
    setIsDelActivityClicked(false);
  };
  // Detect user wants to remove activities
  const handleDelActivityClick = () => {
    setIsDelActivityClicked(true);
    setIsChangePlansClicked(false);
    delPlan();
  };

  // Add All Retrieved Plan Data to State
  useEffect(() => {
    // setData(pData); // Fake data
    getPlans(); // Real Data
  }, [profile.id]);

  return (
    <Grid className='grid_plans' item xs={6}>
      <Paper
        style={{
          padding: 10,
          height: '100%',
        }}
      >
        {/* Create New Plan Button */}
        <CreatePlanner addPlan={addPlan} />
        <h1 style={{ textAlign: 'center', flex: 1 }}>Playcation Plans</h1>

        {/* Plan Select Dropdown */}
        <DisplaySelect
          selectedPlan={selectedPlan}
          handleSelectChange={handleSelectChange}
          data={plans}
        />
        {/* Plan Buttons */}
        <ButtonSelect
          selectedPlan={selectedPlan}
          isChangePlansClicked={isChangePlansClicked}
          handleChangePlansClick={handleChangePlansClick}
          handleDelActivityClick={handleDelActivityClick}
        />
        {/* Plan Rendering */}
        {selectedPlan && (
          <TableSelect
            selectedPlan={selectedPlan}
            isChangePlansClicked={isChangePlansClicked}
          />
        )}
      </Paper>
    </Grid>
  );

  // ************
};

export default PlannerDisplays;
