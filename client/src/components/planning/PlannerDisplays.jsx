/* 
This displays everything on the right in Planner.jsx
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper } from '@mui/material';
// Import display components
import DisplaySelect from './displaySelect.jsx';
import ButtonSelect from './buttonSelect.jsx';
import TableSelect from './tableSelect.jsx';
import CreatePlanner from './createPlanner.jsx';

const PlannerDisplays = ({ profile, onPlanSelect, getPlans, plans }) => {
  // State Group Start *****
  // Data retrieved from DB
  // const [data, setData] = useState([]); // Fake Data - Temp
  // const [plans, setPlans] = useState([]); // Real Data - Eventual
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
        user_id: profile.id,
        plan_name: planName, // Required
        plan_notes: planNotes, // Optional
      })
      .then((plan) => {
        // invoke getPlans so that Select box will include new plan
        getPlans();
        // Auto select the new plan - setTimeOut to prevent MUI error
        setTimeout(() => {
          setSelectedPlan(plan.data);
          onPlanSelect(plan.data.id);
        }, 100);
      })
      .catch((err) => {
        console.error('Failed To Create New Plan: ', err);
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
        // Refresh list by invoking getPlans
        getPlans();
        // Deselect/Reset after deletion
        setSelectedPlan(null);
        onPlanSelect(null);
      })
      .catch((err) => {
        console.error('Failed To Remove Plan From Server: ', err);
      });
  };
  // Axios Calls to Express End *****

  // Detect User Selection in Select Box
  const handleSelectChange = (event) => {
    const planName = event.target.value;
    const selectedPlanData = plans.find((plan) => plan.plan_name === planName);
    setSelectedPlan(selectedPlanData);
    setIsChangePlansClicked(false);
    setIsDelActivityClicked(false);
    onPlanSelect(selectedPlanData.id);
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

  // This Second useEffect is for triggering a re-render when plan get added from Search interaction
  useEffect(() => {
    if (selectedPlan) {
      const updatedPlan = plans.find((plan) => plan.id === selectedPlan.id);
      setSelectedPlan(updatedPlan);
    }
  }, [plans]);

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
          delPlan={delPlan}
        />
        {/* Plan Rendering */}
        {selectedPlan && (
          <TableSelect
            selectedPlan={selectedPlan}
            isChangePlansClicked={isChangePlansClicked}
            getPlans={getPlans}
          />
        )}
      </Paper>
    </Grid>
  );

  // ************
};

export default PlannerDisplays;
