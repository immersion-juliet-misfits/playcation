import React from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  // TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Only requiring a name & notes for now, may adjust later
const CreatePlanner = () => {
// Axios POST request to create a new plan


  return (
    <Accordion sx={{ backgroundColor: 'primary.main' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
        sx={{ color: 'white' }}
      >
        <h2 style={{ textAlign: 'center', width: '100%' }}>
          ----------------Make New Plans----------------
        </h2>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: 'white' }}>
        {/* Line 001 */}
        <FormControl sx={{ width: '100%' }}>
          <InputLabel>Plan Name</InputLabel>
          <Input id='user-plan-name' aria-describedby='my-helper-text'></Input>
          <FormHelperText>Give your Plan a catchy name!</FormHelperText>
        </FormControl>
        {/* Line 002 */}
        <FormControl sx={{ width: '100%' }}>
          <InputLabel>Plan Notes</InputLabel>
          <Input id='user-plan-notes' aria-describedby='my-helper-text'></Input>
          <FormHelperText>Keep tracks of little details here...</FormHelperText>
        </FormControl>
        {/* Lines End */}
      </AccordionDetails>
      <AccordionActions>
        {/* <Button sx={{ color: 'white', border: '1px solid white' }}>Reset</Button> */}
        <Button sx={{ color: 'white', border: '1px solid white' }}>
          Submit
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default CreatePlanner;
