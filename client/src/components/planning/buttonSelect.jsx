import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const ButtonSelect = ({
  selectedPlan,
  isChangePlansClicked,
  handleChangePlansClick,
  handleDelActivityClick,
  delPlan,
}) => {
  return (
    <Box display='flex' justifyContent='center' mt={2}>
      <ButtonGroup
        variant='contained'
        aria-label='Basic button group'
        sx={{ gap: 2 }}
      >
        <Button
          id='change-plan'
          variant='contained'
          disabled={!selectedPlan}
          onClick={handleChangePlansClick}
        >
          Change Plans
        </Button>
        <Button
          id='delete-activity'
          variant='contained'
          disabled={!isChangePlansClicked}
          onClick={handleDelActivityClick}
        >
          Remove Activities
        </Button>
        <Button
          id='delete-plan'
          variant='contained'
          disabled={!selectedPlan || isChangePlansClicked}
          style={{ marginLeft: 50 }}
          onClick={delPlan}
        >
          Delete Plan
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default ButtonSelect;
