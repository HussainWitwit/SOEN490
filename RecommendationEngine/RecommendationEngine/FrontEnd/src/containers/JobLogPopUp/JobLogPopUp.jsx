import React, { useState, useEffect, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TableCell } from '@material-ui/core';
import { GetJobLogList } from '../../api/endpoints/JobsEndpoints';
import Assignment from '@material-ui/icons/Assignment';
import {dateFormat, timeFormat} from '../../utilities/DateTimeUtilities';
import BasicTable from '../../components/BasicTable/BasicTable';
import './JobLogPopUp.css'

export const RowsToDisplay = (element) => (
  <Fragment key={element.id}>
    <TableCell />
    <TableCell component="th" scope="row" padding="default" classes={{root:'col-date'}}>{dateFormat(element.time)}</TableCell>
    <TableCell classes={{root:'col-time'}}>{timeFormat(element.time)}</TableCell>
    <TableCell
      classes={{ root:
      element.level === 'Information'? 'job-log-status-information': 
      element.level === 'Warning'? 'job-log-status-warning':
      element.level === 'Error'? 'job-log-status-error': 'job-log-status-fatal'}}>
      {element.level}
      </TableCell>
    <TableCell classes={{root: 'col-time'}}> {element.description}</TableCell>
  </Fragment>
);

export default function JobLogPopUp(props) {
  const [jobLogs, setJobLogs] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchLogsList  = async () => {
    let response = await GetJobLogList(props.jobId);
    setJobLogs(response);
  }

  const handleClickOpen  = () => {
    fetchLogsList();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if(props.handleOpenLogPopup) {
      props.handleOpenLogPopup()
    }
  };

  useEffect(() => {
    if (props.controlled) {
      handleClickOpen()
    } 
  }, [props.controlled])

  const headCells = [
    { id: 'date', label: 'Date' },
    { id: 'time', label: 'Time' },
    { id: 'level', label: 'Level' },
    { id: 'description', label: 'Description' },
  ];
  
  return (
    <div>
      {!props.controlled && 
        <Button onClick={handleClickOpen}><Assignment /></Button>
      }
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
          <BasicTable
            rowsValue={RowsToDisplay}
            data={jobLogs}
            onClickRow={() => {}}
            columnTitles={headCells}
            dense={true}
            disablePaginator={true}
            tableTitle = ''
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}