/* 
This Page will:
GET Search results from API - from Server

Methods: 
POST request to DB 

*/

import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { Grid, Paper, TextField } from '@mui/material';


const PlannerSearch = () => {
  // React Hooks replace state, constructor, super(), & bind

  return (
        <Grid className='grid_search' item xs={6} style={{ midWidth: '200px' }}>
          <Paper style={{ padding: 16, height: '100%' }}>
            <h1>Search Component Here</h1>
            <TextField variant='outlined' placeholder='Search Here' fullWidth />
          </Paper>
        </Grid>
  );
};

export default PlannerSearch;
