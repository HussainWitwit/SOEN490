import React, {  useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import { Grid, TableCell } from '@material-ui/core';
import { GetJobLogList } from '../../api/endpoints/JobsEndpoints';

export const RowsToDisplay = (element) => (
  <React.Fragment key={element.time}>
    <TableCell />
    <TableCell
      component="th"
      scope="row"
      padding="default"
      id="tableBody"
      style={{ width: ' 15% ' }}
    >
      {element.date}
    </TableCell>
    <TableCell id="tableBody">{element.time}</TableCell>
    <TableCell
      id="tableBody"
      style={{ width: ' 15% ', fontWeight: 'bold' }}
      style={
        element.level === 'Information'
          ? { color: 'blue' }
          : element.level === 'Warning'
          ? { color: 'darkgoldenrod' }
          : element.level === 'Error'
          ? { color: 'red' }
          : element.level === 'Fatal'
          ? { color: 'darkred' }
          : ''
      }
    >
      {element.level}
    </TableCell>
    <TableCell id="tableBody" color="red" style={{ width: ' 60% ' }}>
      {element.description}
    </TableCell>
  </React.Fragment>
);

export default function JobLogPopUp(props) {
  const [jobLogs, setJobLogs] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(async () => {
    let response = await GetJobLogList(184);
    setJobLogs(response);
  }, []);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const headCells = [
    { id: 'date', label: 'Date' },
    { id: 'time', label: 'Time' },
    { id: 'level', label: 'Level' },
    { id: 'description', label: 'Description' },
  ];

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        fullWidth={true}
        maxWidth="lg"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Job Logs Details</DialogTitle>
        <DialogContent dividers={true}>
          <RecommendationEngineTable
            rowsValue={RowsToDisplay}
            data={jobLogs}
            onClick={() => {}}
            columnTitles={headCells}
            dense={true}
            disablePaginator={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
