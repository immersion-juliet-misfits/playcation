import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DisplaySelect = ({ selectedPlan, handleSelectChange, data }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id='select-label'>Select Plan</InputLabel>
      <Select
        name='selectPlan'
        labelId='select-label'
        id='select-box'
        value={selectedPlan ? selectedPlan.plan_name : ''}
        label='Select Plan'
        onChange={handleSelectChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 600,
            },
          },
        }}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {data.map((plan) => (
          <MenuItem key={plan.id} value={plan.plan_name}>
            {plan.plan_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DisplaySelect;
