import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

const TableSelect = ({ selectedPlan, isChangePlansClicked, getPlans }) => {
  // State for Plan Notes Patch
  const [newPlanNote, setNewPlanNote] = useState('');

  // Function To Handle Note Patch
  const handleUpdateNote = () => {
    axios
      .patch(`/api/planner/${selectedPlan.id}/updateNote`, {
        plan_notes: newPlanNote,
      })
      .then((response) => {
        // Update selectedPlan with the new note
        selectedPlan.plan_notes = newPlanNote;
        // invoke getPlans to refresh view
        getPlans();
      })
      .catch((error) => {
        console.error('Error updating plan note:', error);
      });
  };

  return (
    selectedPlan && (
      <Paper
        style={{
          maxHeight: '700px',
          overflowY: 'auto',
          padding: 15,
          paddingRight: 30,
          marginTop: 20,
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            marginBottom: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            padding: 5,
            width: 'auto',
            display: 'block',
          }}
        >
          <Table sx={{ tableLayout: 'fixed' }}>
            {/* Display plan_name*/}
            <TableHead>
              <TableRow>
                <TableCell align='center' colSpan={4}>
                  <h1
                    style={{
                      fontWeight: 'bold',
                      lineHeight: '1',
                      marginTop: 0,
                    }}
                  >
                    {selectedPlan.plan_name}
                  </h1>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Display hotel_id & trip_location*/}
              <TableRow>
                <TableCell
                  align='center'
                  colSpan={2}
                  // style={{ fontSize: '1.5rem' }}
                >
                  {selectedPlan.hotel_id}
                </TableCell>
                <TableCell
                  align='center'
                  colSpan={2}
                  // style={{ fontSize: '1.5rem' }}
                >
                  {selectedPlan.trip_location}
                </TableCell>
              </TableRow>
              {/* Display plan_notes*/}
              <TableRow>
                <TableCell
                  align='center'
                  colSpan={4}
                  // style={{ fontSize: '1.5rem' }}
                >
                  {selectedPlan.plan_notes}
                </TableCell>
              </TableRow>

              {/* TextField beneath plan_notes for Patch*/}
              <TableRow>
                <TableCell align='center' colSpan={4}>
                  <TextField
                    label='Update Plan Notes'
                    value={newPlanNote}
                    onChange={(e) => setNewPlanNote(e.target.value)}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              {/* Button to Submit Patch of plan_notes*/}
              <TableRow>
                <TableCell align='center' colSpan={4}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleUpdateNote}
                  >
                    Update Notes
                  </Button>
                </TableCell>
              </TableRow>
              {/* Activities Section Header*/}
              <TableRow>
                <TableCell align='center' colSpan={4}>
                  <Box
                    component='section'
                    sx={{
                      p: 2,
                      backgroundColor: '#1976d2',
                      borderRadius: '5px',
                      color: '#ffffff',
                      textAlign: 'center',
                    }}
                  >
                    ACTIVITIES
                  </Box>
                </TableCell>
              </TableRow>
              {/* Mapped Activities*/}
              {selectedPlan.activities.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={4} style={{ position: 'relative' }}>
                    <div style={{ textAlign: 'center' }}>{activity}</div>
                    {isChangePlansClicked && (
                      <div
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                        }}
                      >
                        <Checkbox />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    )
  );
};

export default TableSelect;
