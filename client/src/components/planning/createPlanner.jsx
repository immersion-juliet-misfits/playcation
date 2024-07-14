import React, { useState } from 'react';
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
const CreatePlanner = ({ addPlan }) => {
  // State for text fields
  const [planName, setPlanName] = useState('');
  const [planNotes, setPlanNotes] = useState('');
  // State for Accordion open/close
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = () => {
    addPlan({ planName, planNotes });
    // Reset fields after submitting
    setPlanName('');
    setPlanNotes('');
    // Close Accordion after submission
    setExpanded(false);
  };

  return (
    <Accordion
      sx={{ backgroundColor: 'primary.main' }}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
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
          <Input
            id='user-plan-name'
            aria-describedby='my-helper-text'
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          ></Input>
          <FormHelperText>Give your Plan a catchy name!</FormHelperText>
        </FormControl>
        {/* Line 002 */}
        <FormControl sx={{ width: '100%' }}>
          <InputLabel>Plan Notes</InputLabel>
          <Input
            id='user-plan-notes'
            aria-describedby='my-helper-text'
            value={planNotes}
            onChange={(e) => setPlanNotes(e.target.value)}
          ></Input>
          <FormHelperText>Keep tracks of little details here...</FormHelperText>
        </FormControl>
        {/* Lines End */}
      </AccordionDetails>
      <AccordionActions>
        {/* <Button sx={{ color: 'white', border: '1px solid white' }}>Reset</Button> */}
        <Button
          sx={{ color: 'white', border: '1px solid white' }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default CreatePlanner;
