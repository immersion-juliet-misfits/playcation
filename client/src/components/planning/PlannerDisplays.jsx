/* 
This page is for displaying pulled saved plans from the DB

Methods:
POST request to create a new Plan
PATCH request to change Plan name
DELETE request to delete an existing Plan
*/

// import { Link } from 'react-router-dom';
import React from 'react';
// import axios from 'axios';
import { Grid, Paper, TextField } from '@mui/material';


const PlannerDisplays = () => {
  // React Hooks replace state, constructor, super(), & bind

  return (
        <Grid className='grid_plans' item xs={6} style={{ midWidth: '200px' }}>
          <Paper style={{ padding: 16, height: '100%' }}>
            <div><h1>Saved Plans Component Here</h1></div>
          </Paper>
        </Grid>
  );
};

export default PlannerDisplays;