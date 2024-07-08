// This is the only component that will be passed into Planner.jsx
// Do I need below for router to work on our Homepage?
import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { Container, Grid, Paper, TextField } from '@mui/material';

class Planner extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
    // Bind methods here
  }

  // GET Method to retrieve stored plans
  // getPlans(){

  // };

  // Mount previous method on page load
// componentDidMount() {
//   this.getPlans()
// };

  // POST Method to create new plans 
  // savePlans() {

  // };

  // Render required Planner Components
  render() {
    return (
      <Container className="planner_all" style={{ width: '800vh', height: '80vh', border: '2px solid black', borderRadius: '20px'}}>
        <Grid className="grid_all" container spacing={2}  alignItems="stretch">
          <Grid className="grid_search" item xs={6}>
            <Paper style={{ padding: 16, height: '100%' }}>
              <h1>Search Component Here</h1>
              <TextField variant='outlined' placeholder='Search Here' fullWidth />
            </Paper>
          </Grid>
          <Grid className="grid_plans" item xs={6}>
            <Paper style={{ padding: 16, height: '100%'  }}>
              <div>Saved Plans Component Here</div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Planner;
