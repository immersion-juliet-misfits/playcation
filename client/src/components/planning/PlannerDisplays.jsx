import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper } from '@mui/material';
import DisplaySelect from './displaySelect.jsx';
import ButtonSelect from './buttonSelect.jsx';
import TableSelect from './tableSelect.jsx';
import CreatePlanner from './createPlanner.jsx';

const PlannerDisplays = ({ profile, onPlanSelect, getPlans, plans }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isChangePlansClicked, setIsChangePlansClicked] = useState(false);
  const [isDelActivityClicked, setIsDelActivityClicked] = useState(false);

  const addPlan = ({ planName, planNotes }) => {
    axios
      .post('/api/planner', {
        user_id: profile.id,
        plan_name: planName,
        plan_notes: planNotes,
      })
      .then((plan) => {
        getPlans();
        setTimeout(() => {
          setSelectedPlan(plan.data);
          onPlanSelect(plan.data.id);
        }, 100);
      })
      .catch((err) => {
        console.error('Failed To Create New Plan: ', err);
      });
  };

  const delPlan = () => {
    if (!selectedPlan) {
      console.error('Must Select A Plan to Delete');
      return;
    }

    axios
      .delete(`/api/planner/${selectedPlan.id}`)
      .then((deleted) => {
        getPlans();
        setSelectedPlan(null);
        onPlanSelect(null);
      })
      .catch((err) => {
        console.error('Failed To Remove Plan From Server: ', err);
      });
  };

  const handleSelectChange = (event) => {
    const planName = event.target.value;
    const selectedPlanData = plans.find((plan) => plan.plan_name === planName);
    setSelectedPlan(selectedPlanData);
    setIsChangePlansClicked(false);
    setIsDelActivityClicked(false);
    onPlanSelect(selectedPlanData.id);
  };
  const handleChangePlansClick = () => {
    setIsChangePlansClicked(true);
    setIsDelActivityClicked(false);
  };
  const handleDelActivityClick = () => {
    setIsDelActivityClicked(true);
    setIsChangePlansClicked(false);
    delPlan();
  };

  useEffect(() => {
    getPlans();
  }, [profile.id]);

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
        <CreatePlanner addPlan={addPlan} />
        <h1 style={{ textAlign: 'center', flex: 1 }}>Playcation Plans</h1>

        <DisplaySelect
          selectedPlan={selectedPlan}
          handleSelectChange={handleSelectChange}
          data={plans}
        />
        <ButtonSelect
          selectedPlan={selectedPlan}
          isChangePlansClicked={isChangePlansClicked}
          handleChangePlansClick={handleChangePlansClick}
          handleDelActivityClick={handleDelActivityClick}
          delPlan={delPlan}
        />
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
};

export default PlannerDisplays;
