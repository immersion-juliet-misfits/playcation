import React, { useState, useEffect } from 'react';
// import axios from 'axios';
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

const Search = ({ addAct, planId }) => {
  // State & Event Handlers
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const handleSearch = (e) => {
    e.preventDefault();
    const results = sData
      .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 20);
    // .slice(0, 10); // Enable when I only want 10 results displayed
    setSearchResults(results);
    setSearchClicked(true);
    setCheckedItems({});
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    // Will add selected item to selected Plan
    // addAct();
        // Gather selected items
        const selectedItems = searchResults.filter((_, index) => checkedItems[index]);
        // Pass selected items to addAct
        addAct(planId, selectedItems);
  };

  // Request to API through the Route

  return (
    <Grid className='grid_search' item xs={6}>
      <Paper
        style={{
          padding: 15,
          height: '100%',
        }}
      >
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
        <Button
          variant='contained'
          color='primary'
          type='submit'
          fullWidth
          style={{ marginTop: '10px' }}
          onClick={handleAddActivity}
          disabled={!searchClicked}
        >
          Add Activity(s)
        </Button>
        <Grid
          item
          xs={12}
          style={{ marginTop: 10, maxHeight: '820px', overflowY: 'auto' }}
        >
          <TableContainer
            component={Paper}
            sx={{ width: 'auto', display: 'block' }}
          >
            <Table>
              <TableBody>
                {searchResults.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Checkbox
                        checked={!!checkedItems[index]}
                        onChange={(e) =>
                          setCheckedItems({
                            ...checkedItems,
                            [index]: e.target.checked,
                          })
                        }
                      />
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
