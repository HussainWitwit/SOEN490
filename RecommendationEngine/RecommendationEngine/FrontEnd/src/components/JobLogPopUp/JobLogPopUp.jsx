import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable'
import { Grid, TableCell } from '@material-ui/core';

export const RowsToDisplay = (element) => (
    <React.Fragment key= {element.time}>
      <TableCell />
      <TableCell component="th" scope="row" padding="default" id="tableBody" style={{ width: ' 15% ' }}>{element.date}</TableCell>
      <TableCell id="tableBody">{element.time}</TableCell>
      <TableCell id="tableBody" style={{ width: ' 15% ', fontWeight: 'bold'}} style={ element.level === "Information" ? {color: 'blue'} : element.level === "Warning" ? {color: 'darkgoldenrod'} : element.level === "Error" ? {color: 'red'} : element.level === "Fatal" ? {color: 'darkred'}:'' }>{element.level}</TableCell>
      <TableCell id="tableBody" color="red" style={{ width: ' 60% ' }}>{element.description}</TableCell> 
    </React.Fragment>    
  );  

export default function JobLogPopUp(props) {
  const jobLogList = 
  [{date: '01/01/2021', time: "17:24:11", level: "Warning", description:"This is a description"}, 
  {date: '01/02/2021', time: "17:24:10", level: "Information", description:"This is a description"},
  {date: '01/10/2021', time: "20:24:10", level: "Error", description:"This is a description"},
  {date: '01/23/2021', time: "1:24:10", level: "Fatal", description:"This is a description"},
  /*{date: '01/01/2021', time: "17:24:10", level: "Debug", description:"This is a description"}, 
  {date: '01/02/2021', time: "17:24:10", level: "Debug", description:"This is a description"},
  {date: '01/10/2021', time: "20:24:10", level: "INFO", description:"This is a description"},
  {date: '01/01/2021', time: "17:24:10", level: "Debug", description:"This is a description"}, 
  {date: '01/02/2021', time: "17:24:10", level: "Debug", description:"This is a description"},
  {date: '01/10/2021', time: "20:24:10", level: "INFO", description:"This is a description"},
  {date: '01/01/2021', time: "17:24:10", level: "Debug", description:"This is a description"}, 
  {date: '01/02/2021', time: "17:24:10", level: "Debug", description:"This is a description"},
  {date: '01/10/2021', time: "20:24:10", level: "INFO", description:"This is a description"},
  {date: '01/01/2021', time: "17:24:10", level: "Debug", description:"This is a description"}, 
  {date: '01/02/2021', time: "17:24:10", level: "Debug", description:"This is a description"},
  {date: '01/10/2021', time: "20:24:10", level: "INFO", description:"This is a description"},
  {date: '01/01/2021', time: "17:24:10", level: "Debug", description:"This is a description"}, 
  {date: '01/02/2021', time: "17:24:10", level: "Debug", description:"This is a description"},
  {date: '01/10/2021', time: "20:24:10", level: "INFO", description:"This is a description"},
  {date: '01/01/2021', time: "17:24:10", level: "Debug", description:"This is a description"}, 
  {date: '01/02/2021', time: "17:24:10", level: "Debug", description:"This is a description"},
  {date: '01/10/2021', time: "20:24:10", level: "INFO", description:"This is a description"},
  {date: '01/01/2021', time: "17:24:10", level: "Debug", description:"This is a description"}, 
  {date: '01/02/2021', time: "17:24:10", level: "Debug", description:"This is a description"},
  {date: '01/10/2021', time: "20:24:10", level: "INFO", description:"This is a description"},
  {date: '01/01/2021', time: "17:24:10", level: "Debug", description:"This is a description"}, 
  {date: '01/02/2021', time: "17:24:10", level: "Debug", description:"This is a description"},
  {date: '01/10/2021', time: "20:24:10", level: "INFO", description:"This is a description"}];*/
];
  const [open, setOpen] = React.useState(false);

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
      <Button onClick={handleClickOpen()}>scroll=paper</Button>
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
                data={jobLogList}
                onClick={() => { }}
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
