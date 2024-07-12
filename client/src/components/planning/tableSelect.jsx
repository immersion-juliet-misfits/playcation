import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Checkbox,
} from '@mui/material';



const TableSelect = ({ selectedPlan, isChangePlansClicked }) => {
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
              <TableRow>
                <TableCell
                  align='center'
                  colSpan={4}
                  // style={{ fontSize: '1.5rem' }}
                >
                  {selectedPlan.plan_notes}
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
