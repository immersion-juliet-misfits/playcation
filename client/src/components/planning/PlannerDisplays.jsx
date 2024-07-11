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
  Grid,
  Paper,
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

  // Create test data/array to populate fields then refactor to pull from Search
  // Activity items will populate in a Plan list

  // Create these Axios calls after getting test data to work
  // Need to Create plan / POST to DB
  // Need to show plan / GET from DB
  // Add items to Plan / PATCH
  // Remove items from plan / DELETE

  // return (
  //   <Grid className='grid_plans' item xs={6} style={{ midWidth: '200px' }}>
  //     <Paper style={{ padding: 16, height: '100%' }}>
  //       <div>
  //         <h1>Saved Plans Component Here</h1>
  //       </div>
  //     </Paper>
  //   </Grid>
  // );

  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulating an API call with the fake data
    setData(fData);
  }, []);

  return (
    <Grid className='grid_plans' item xs={5}>
      <Paper style={{ padding: 15, height: '100%' }}>
        <h1 style={{ textAlign: 'center' }}>Playcation Plans</h1>
        <Paper
          style={{
            maxHeight: '500px',
            overflowY: 'auto',
            padding: 15,
            paddingRight: 30, // Add extra padding to the right to account for scrollbar
          }}
        >
          {data.map((plan) => (
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
              key={plan.id}
            >
              <Table sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow>
                    <TableCell align='center' colSpan={3}>
                      <h3 style={{ fontWeight: 'bold' }}>{plan.plan_name}</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align='center'>{plan.hotel_id}</TableCell>
                    <TableCell align='center'>{plan.trip_location}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center' colSpan={2}>
                      {plan.plan_notes}
                    </TableCell>
                  </TableRow>
                  {plan.activities.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell align='center' colSpan={3}>
                        {activity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ))}
        </Paper>
      </Paper>
    </Grid>
  );
};

export default PlannerDisplays;
