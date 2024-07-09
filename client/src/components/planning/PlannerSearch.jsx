/* 
https://mui.com/material-ui/react-autocomplete/#google-maps-place
Studying this to understand what each line does & to see what I do & don't need for this component.
There is also information on how to add Checkboxes. 
This will be a good way to select items to add to a "Plan".

Needed Methods: 
GP Search
POST request to DB 
*/
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Autocomplete, Box, debounce, Grid, Paper, TextField, Typography } from '@mui/material';
// debounce may need to be imported separately, I want to test this method first
import LocationOnIcon from '@mui/icons-material';
// Import Map API after setting up basic code


 // Create script of executable code to invoke once page loads 
// const loadMapScript = (src, position, id) => {
//   if (position) {  const mapScript = document.createElement('script');
//   mapScript.async = true;
//   mapScript.id = id;
//   mapScript.src = src;
//   position.appendChild(mapScript);}
// }

// Create a variable reference to the Google Maps autocomplete external service object
// This will be reassigned later.  Do not use state because it will cause an unwanted re-render.
const autoSvc = { current: null}


// Create method that invokes loadMapScript after setting default state values
const PlannerSearch = () => { // "export default GoogleMaps" in guide
const [value, setValue] = useState(null); // tracks value that user selects
const [ inputValue , setInputValue ] = useState(''); // tracks "current" user input
const [ options , setOptions ] = useState([]); // tracks "current" autocomplete suggestions
const loaded = useRef(false); // Tracks if 'loadMapScript' has been loaded

// Verify that the window exists & that loadMapScript has not been loaded
if (typeof window !== 'undefined' && !loaded.current) {
  // Verifies if an element with the id doesn't exist yet
  if (!document.querySelector('#map-search')) {
    // Invokes loadMapScript to load the Google Maps API
    // loadMapScript(
    //   `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
    //   document.querySelector('head'),
    //   'map-search',
    // );
  }
// Change loadMapScript status to true
loaded.current = true;
}

// fetch & useMemo function

// useEffect function with fetch

// Must add MUI Autocomplete 
  return (
        <Grid className='grid_search' item xs={6} style={{ midWidth: '200px' }}>
          <Paper style={{ padding: 16, height: '100%' }}>
            <h1>Search Component Here</h1>
            <TextField variant='outlined' placeholder='Search Here' fullWidth />
          </Paper>
        </Grid>
  );
};

export default PlannerSearch;



