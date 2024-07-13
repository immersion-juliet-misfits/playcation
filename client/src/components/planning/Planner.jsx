// This is the only component that will be passed into Planner.jsx
// Do I need below for router to work on our Homepage?
import React from 'react';
import { Container, Grid } from '@mui/material';
// import PlannerSearch from './PlannerSearch.jsx';
import PlannerDisplay from './PlannerDisplays.jsx';
import Search from '../Search.jsx';

const Planner = () => {
  // Render required Planner Components
  // May remove Container during final styling phase
  return (
    <Container
      className='planner_all'
      style={{
        width: '100%',
        height: '900px',
        border: '2px solid navy',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        className='grid_all'
        container
        spacing={1}
        alignItems='stretch'
        justifyContent='center'
        style={{ width: '100%', height: '95%', overflowY: 'hidden'  }}
      >
        <Search />
        <PlannerDisplay />
      </Grid>
    </Container>
  );
  // ****************
};

export default Planner;
