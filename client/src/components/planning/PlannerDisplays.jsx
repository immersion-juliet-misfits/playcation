/* 
This page is for displaying pulled saved plans from the DB

Methods:
POST request to create a new Plan
PATCH request to change Plan name
DELETE request to delete an existing Plan
*/

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Paper } from '@mui/material';
// Import fake data to test functionality
import { pData } from '../../../../server/db/plan_fData.js';
// Import display components
import DisplaySelect from './displaySelect.jsx';
import ButtonSelect from './buttonSelect.jsx';
import TableSelect from './tableSelect.jsx';
import CreatePlanner from './createPlanner.jsx'

const PlannerDisplays = () => {
  // State Group Start *****
  // Data retrieved from DB
  const [data, setData] = useState([]);
  // Has user selected a Plan
  const [selectedPlan, setSelectedPlan] = useState(null);
  // Has user selected a Plan
  const [isChangePlansClicked, setIsChangePlansClicked] = useState(false);
  // User wants to Edit a Plan - remove activities
  const [isDelActivityClicked, setIsDelActivityClicked] = useState(false);
  // State Group End *****

  // Create these Axios calls
  // Need to Create plan / POST to DB
  // Need to show plan / GET from DB
  // Add items to Plan / PATCH
  // Remove items from plan / DELETE

  // Detect selections in Select Box
  const handleSelectChange = (event) => {
    const planName = event.target.value;
    const selectedPlanData = data.find((plan) => plan.plan_name === planName);
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
    // Axios DELETE will be triggered here
  };

  useEffect(() => {
    // Simulating an API call with the fake data
    setData(pData);
  }, []);

  return (
    <Grid className='grid_plans' item xs={6}>
      <Paper style={{ padding: 10, height: '100%' }}>
        {/* Create New Plan Button */}
        {/* <Box display='flex' justifyContent='center' alignItems='center'> */}
          <CreatePlanner />
        {/* </Box> */}
        <h1 style={{ textAlign: 'center', flex: 1 }}>Playcation Plans</h1>

        {/* Plan Select Dropdown */}
        <DisplaySelect
          selectedPlan={selectedPlan}
          handleSelectChange={handleSelectChange}
          data={data}
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
