import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, TextField, Button } from '@mui/material';

const Search = () => {
  // State & Axios requests
  // Request list of 10 options from API to show User
  const [searchResults, setSearchResults] = useState([]);
  // Other request
  // Request to API through the Route

  return (
    <Grid className='grid_search' item xs={6}>
      <Paper style={{ padding: 15, height: '100%' }}>
        <form>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={8}>
              <TextField
                id='search'
                label='Search'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                fullWidth
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );

  // /////
};

export default Search;
