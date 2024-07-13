import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
// Test data to populate search box
import { sData } from '../../../server/db/plan_fData.js';

const Search = () => {
  // State & Axios requests
  // Request list of 10 options from API to show User
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const results = sData
      .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 10);
    setSearchResults(results);
  };

  // Request to API through the Route

  return (
    <Grid className='grid_search' item xs={6}>
      <Paper style={{ padding: 15, height: '100%' }}>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={8}>
              <TextField
                id='search'
                label='Search'
                variant='outlined'
                fullWidth
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
        <Grid item xs={12} style={{ marginTop: 10 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {searchResults.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Checkbox />
                      {result}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Paper>
    </Grid>
  );

  // ********
};

export default Search;
