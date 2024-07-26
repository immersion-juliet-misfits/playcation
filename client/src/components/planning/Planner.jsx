import React, { lazy, Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid } from '@mui/material';
import PlannerDisplays from './PlannerDisplays.jsx';
import Search from '../Search.jsx';

const Planner = ({ user }) => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const [plans, setPlans] = useState([]);

  const getPlans = () => {
    axios
      .get(`/api/planner/${user.id}`)
      .then((plans) => {
        setPlans(plans.data);
      })
      .catch((err) => {
        console.error('Failed To Retrieve Plans From Server: ', err);
      });
  };

  useEffect(() => {
    getPlans();
  }, [user.id]);

  const addAct = (planId, newActs) => {
    axios
      .patch(`/api/planner/${planId}/addAct`, {
        activity: newActs,
      })
      .then((added) => {
        getPlans();
      })
      .catch((err) => {
        console.error('Failed To Add Activity to Plan: ', err);
      });
  };

  const delAct = (planId, oldAct) => {
    axios
      .patch(`/api/planner/${planId}/delAct`, {
        activity: oldAct,
      })
      .then((deleted) => {})
      .catch((err) => {
        console.error('Failed To Remove Activity from Plan: ', err);
      });
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlanId(planId);
  };

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
};

export default Planner;
