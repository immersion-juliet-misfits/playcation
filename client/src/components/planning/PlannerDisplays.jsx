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
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
// Import fake data to test list functionality
import fData from '../../../../server/db/plan_fData.js';
// console.log('Fake Data Verified', fData);

const PlannerDisplays = () => {
  // React Hooks replace state, constructor, super(), & bind
  // State Group Start *****
  const [data, setData] = useState([]); // Data retrieved from DB
  const [selectedPlan, setSelectedPlan] = useState(null); // State for Planner select box
  const [isChangePlansClicked, setIsChangePlansClicked] = useState(false);
  // State Group End *****

  // Create these Axios calls after getting test data to work
  // Need to Create plan / POST to DB
  // Need to show plan / GET from DB
  // Add items to Plan / PATCH
  // Remove items from plan / DELETE

  // Handle changes in Select Box
  const handleSelectChange = (event) => {
    const planName = event.target.value;
    const selectedPlanData = data.find((plan) => plan.plan_name === planName);
    setSelectedPlan(selectedPlanData);
    setIsChangePlansClicked(false);
  };

  const handleChangePlansClick = () => {
    setIsChangePlansClicked(true);
  };

  useEffect(() => {
    // Simulating an API call with the fake data
    setData(fData);
  }, []);

  return (
    <Grid className='grid_plans' item xs={6}>
      <Paper style={{ padding: 10, height: '100%' }}>
        <h1 style={{ textAlign: 'center' }}>Playcation Plans</h1>

        {/* Select Box Start*/}
        <FormControl fullWidth>
          <InputLabel id='select-label'>Select Plan</InputLabel>
          <Select
            labelId='select-label'
            id='select-box'
            value={selectedPlan ? selectedPlan.plan_name : ''}
            label='Select Plan'
            onChange={handleSelectChange}
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
        {/* Select Box End*/}

        {/* Plan Buttons Start*/}
        <Box display='flex' justifyContent='center' mt={2}>
          <ButtonGroup
            variant='contained'
            aria-label='Basic button group'
            sx={{ gap: 2 }}
          >
            <Button
              id='change-plan'
              variant='contained'
              disabled={!selectedPlan}
              // style={{ marginTop: 5 }}
              onClick={handleChangePlansClick}
            >
              Change Plans
            </Button>
            <Button
              id='edit-plan'
              variant='contained'
              disabled={!isChangePlansClicked}
              // style={{ marginTop: 5 }}
            >
              Remove Activities
            </Button>
            <Button
              id='delete-plan'
              variant='contained'
              disabled={!selectedPlan || isChangePlansClicked}
              style={{ marginLeft: 50 }}
            >
              Delete Plan
            </Button>
          </ButtonGroup>
        </Box>
        {/* Plan Buttons Start*/}

        {/* Plan Render Start*/}
        {selectedPlan && (
          <Paper
            style={{
              maxHeight: '700px',
              overflowY: 'auto',
              padding: 15,
              paddingRight: 30,
              marginTop: 20,
            }}
          >
            <TableContainer
              component={Paper}
              sx={{
                marginBottom: 10,
                border: '1px solid #ccc',
                borderRadius: 5,
                padding: 5,
                width: 'auto',
                display: 'block',
              }}
            >
              <Table sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow>
                    <TableCell align='center' colSpan={4}>
                      <h1
                        style={{
                          fontWeight: 'bold',
                          lineHeight: '1',
                          marginTop: 0,
                        }}
                      >
                        {selectedPlan.plan_name}
                      </h1>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      align='center'
                      colSpan={2}
                      // style={{ fontSize: '1.5rem' }}
                    >
                      {selectedPlan.hotel_id}
                    </TableCell>
                    <TableCell
                      align='center'
                      colSpan={2}
                      // style={{ fontSize: '1.5rem' }}
                    >
                      {selectedPlan.trip_location}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align='center'
                      colSpan={4}
                      // style={{ fontSize: '1.5rem' }}
                    >
                      {selectedPlan.plan_notes}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center' colSpan={4}>
                      <Box
                        component='section'
                        sx={{
                          p: 2,
                          backgroundColor: '#1976d2',
                          borderRadius: '5px',
                          color: '#ffffff',
                          textAlign: 'center',
                        }}
                      >
                        ACTIVITIES
                      </Box>
                    </TableCell>
                  </TableRow>
                  {selectedPlan.activities.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={4} style={{ position: 'relative' }}>
                        <div style={{ textAlign: 'center' }}>{activity}</div>
                        {isChangePlansClicked && (
                          <div
                            style={{
                              position: 'absolute',
                              right: 0,
                              top: '50%',
                              transform: 'translateY(-50%)',
                            }}
                          >
                            <Checkbox />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
        {/* Plan Render Start*/}
      </Paper>
    </Grid>
  );

  // ************
};

export default PlannerDisplays;
