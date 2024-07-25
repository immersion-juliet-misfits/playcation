import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CreatePlanner = ({ addPlan }) => {
  const [planName, setPlanName] = useState('');
  const [planNotes, setPlanNotes] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = () => {
    addPlan({ planName, planNotes });
    setPlanName('');
    setPlanNotes('');
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
      </AccordionDetails>
      <AccordionActions>
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
