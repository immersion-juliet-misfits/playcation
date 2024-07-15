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
  const [newPlanNote, setNewPlanNote] = useState('');

  const handleUpdateNote = () => {
    axios
      .patch(`/api/planner/${selectedPlan.id}/updateNote`, {
        plan_notes: newPlanNote,
      })
      .then((response) => {
        selectedPlan.plan_notes = newPlanNote;
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
              <TableRow>
                <TableCell align='center' colSpan={2}>
                  {selectedPlan.hotel_id}
                </TableCell>
                <TableCell align='center' colSpan={2}>
                  {selectedPlan.trip_location}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center' colSpan={4}>
                  {selectedPlan.plan_notes}
                </TableCell>
              </TableRow>

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
