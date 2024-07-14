import React from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';

const ButtonSelect = ({
  selectedPlan,
  isChangePlansClicked,
  handleChangePlansClick,
  handleDelActivityClick,
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
        >
          Delete Plan
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default ButtonSelect;
