// This is the only component that will be passed into Planner.jsx
// Do I need below for router to work on our Homepage?
import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { Container, Grid, Paper, TextField } from '@mui/material';
import PlannerSearch from './PlannerSearch.jsx';
import PlannerDisplay from './PlannerDisplays.jsx';

const Planner = () => {
  // React Hooks replace state, constructor, and super()
  // Don't have to bind methods

  // GET Method to retrieve stored plans
  // getPlans(){};

  // Mount previous method on page load - Does React Hooks use this?
  // componentDidMount() {
  //   this.getPlans()
  // };

  // POST Method to create new plans
  // savePlans() {};

  // Render required Planner Components
  // Unsure if I prefer the way it looks with or without the Container
  return (
    // <Container
    //   className='planner_all'
    //   style={{
    //     width: '100%',
    //     height: '95vh',
    //     border: '2px solid navy',
    //     borderRadius: '20px',
    //   }}
    // >
      <Grid className='grid_all' container spacing={1} alignItems='stretch'>
        <PlannerSearch />
        <PlannerDisplay />
      </Grid>
    // </Container>
  );
};

export default Planner;
