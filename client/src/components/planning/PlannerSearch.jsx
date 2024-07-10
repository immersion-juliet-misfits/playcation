/* 
Change so I can push to GH

https://mui.com/material-ui/react-autocomplete/#google-maps-place
Reference information on adding Checkboxes in order to select items to add to a "Plan".

Needed Methods: 
GP Search
POST request to DB 
*/

// import { Link } from 'react-router-dom';
import React, { useEffect, useMemo, useRef, useState } from 'react';
// import axios from 'axios';
import {
  Autocomplete,
  Box,
  debounce,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
// debounce may need to be imported separately, I want to test this method first
import LocationOnIcon from '@mui/icons-material/LocationOn';
// Import Map API after setting up basic code
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Create script of executable code to invoke once page loads
const loadMapScript = (src, position, id) => {
  if (position) {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.id = id;
    mapScript.src = src;
    position.appendChild(mapScript);
  }
};

// Create a variable reference to the Google Maps autocomplete external service object
// This will be reassigned later.  Do not use state because it will cause an unwanted re-render.
const autoSvc = { current: null };

// Create method that invokes loadMapScript after setting default state values
const PlannerSearch = () => {
  // export default GoogleMaps in guide
  const [value, setValue] = useState(null); // Hook tracks value that user selects
  const [inputValue, setInputValue] = useState(''); // Hook tracks "current" user input
  const [options, setOptions] = useState([]); // Hook tracks "current" autocomplete suggestions
  const loaded = useRef(false); // Hook tracks if 'loadMapScript' has been loaded

  // Hook for retrieving the Key
  useEffect(() => {
    // Verify that the window exists & that loadMapScript has not been loaded
    if (typeof window !== 'undefined' && !loaded.current) {
      // Verifies if an element with the id doesn't exist yet
      if (!document.querySelector('#map-search')) {
        // Invokes loadMapScript to load the Google Maps API
        loadMapScript(
          `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
          document.querySelector('head'),
          'map-search',
        );
      }
      // Change loadMapScript status to true
      loaded.current = true;
    }
  }, [GOOGLE_MAPS_API_KEY])

  // define fetch function with useMemo hook to retrieve Place predictions based on "current" input
  // Add debounce to avoid const request firing
  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        autoSvc.current.getPlacePredictions(request, callback);
      }, 500),
    []
  );

  // Implement useEffect hook with previously defined fetch function
  useEffect(() => {
    // Default active to true
    let active = true;

    // Check if service has been initialized.
    if (!autoSvc.current && window.google) {
      // If not, initialize it
      autoSvc.current = new window.google.maps.places.AutocompleteService();
    }
    // Verify that service has been initialized after previous block has been run
    if (!autoSvc.current) {
      // If not, exit the the block to prevent code from continuing without initialization
      return undefined;
    }

    // Check if state inputValue is an empty string
    if (inputValue === '') {
      // Reassign state options based on if value is defined
      setOptions(value ? [value] : []);
      // Exits block to prevent autocomplete suggestions from being fetched when input is empty
      return undefined;
    }

    // Invoke fetch of autocomplete suggestions only when service has been initialized & when input isn't empty
    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOpts = [];

        if (value) {
          newOpts = [value];
        }

        if (results) {
          newOpts = [...newOpts, ...results];
        }

        setOptions(newOpts);
      }
    });

    // Finish useEffect hook by resetting active to false
    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  // Integrate with Doc code after verifying it works:
  return (
    // Render MUI Autocomplete
    <Autocomplete
      autoComplete
      filterSelectedOptions
      includeInputInList
      id='playcation-map-search'
      noOptionsText='No Locations Found...'
      filterOptions={(x) => x}
      options={options}
      sx={{ width: 200 }}
      value={value}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : options.description
      }
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label='Search For Locations' fullWidth />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];
        return (
          <li key={key} {...optionProps}>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid
                item
                sx={{ display: 'flex', width: 44 }}
                xs={6}
                className='grid_search'
                style={{ midWidth: '200px' }}
              >
                <LocationOnIcon />
              </Grid>
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component='span'
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant='body2' color='text.secondary'>
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default PlannerSearch;

// return (
//   <Grid className='grid_search' item xs={6} style={{ midWidth: '200px' }}>
//     <Paper style={{ padding: 16, height: '100%' }}>
//       <h1>Search Component Here</h1>
//       <TextField variant='outlined' placeholder='Search Here' fullWidth />
//     </Paper>
//   </Grid>
// );
