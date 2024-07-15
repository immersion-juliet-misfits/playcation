// This is the only component that will be passed into Planner.jsx
// Do I need below for router to work on our Homepage?
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid } from '@mui/material';
// import PlannerSearch from './PlannerSearch.jsx';
import PlannerDisplays from './PlannerDisplays.jsx';
import Search from '../Search.jsx';

const Planner = ({ user }) => {
  // Need the planID for Search.jsx
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  // Moved Plans state and function here so both PlannerDisplays & Search have access to it
  const [plans, setPlans] = useState([]); // Real Data - Eventual

  // Retrieve all Plans / GET
  const getPlans = () => {
    axios
      .get(`/api/planner/${user.id}`)
      .then((plans) => {
        setPlans(plans.data); // This was working as just plans, but will try it with plans.data for now
      })
      .catch((err) => {
        console.error('Failed To Retrieve Plans From Server: ', err);
      });
  };

  useEffect(() => {
    getPlans();
  }, [user.id]);

  

  // Moved PATCH requests here to pass down to Search
  // Add items to Plan Activities / PATCH
  const addAct = (planId, newActs) => {
    // Need to add a button in Search to connect to this
    axios
      .patch(`/api/planner/${planId}/addAct`, {
        activity: newActs,
      })
      .then((added) => {
        // Refresh list by invoking getPlans
        getPlans()
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
        // Refresh list by invoking getPlans
      })
      .catch((err) => {
        console.error('Failed To Remove Activity from Plan: ', err);
      });
  };

  // Needed to get selected plan id from PlannerDisplays to Search
  const handlePlanSelect = (planId) => {
    setSelectedPlanId(planId);
  };

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
        style={{ width: '100%', height: '95%', overflowY: 'hidden' }}
      >
        <Search
          addAct={addAct}
          delAct={delAct}
          planId={selectedPlanId}
          getPlans={getPlans}
          plans={plans}
        />
        <PlannerDisplays
          profile={user}
          onPlanSelect={handlePlanSelect}
          getPlans={getPlans}
          plans={plans}
        />
      </Grid>
    </Container>
  );
  // ****************
};

export default Planner;
