import React from 'react'
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl';
import 'date-fns';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import "./DateConfiguration.css";

const Slide = styled.div`

`;

const BootstrapInput = withStyles((theme) => ({
  root: {
      'label + &': {
          marginTop: theme.spacing(3),
      },
  },
  input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
          'Segoe UI', "Tahoma", "Geneva", "Verdana", "sans-serif"
      ].join(','),
      '&:focus': {
          borderRadius: 4,
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
  },
}))(InputBase);

const DateConfiguration = (props) => {

  // Setting the perio attribute
  const [periodicity, setPeriodicity] = React.useState();
  const handlePeriodicity = (event) => {
    setPeriodicity(event.target.value);
  };

  // Setting Repetition attribute
  const [Repetition, setRepetition] = React.useState(null);
  const handleRepetition = (event) => {
    setRepetition(event.target.value);
  };

  // Setting the dayWeek attribute
  const [dayWeek, setDayWeek] = React.useState("");
  const handleDayWeek = (event) => {
    setDayWeek(event.target.value);
  };

  // Setting the occurence Date attribute
  const [dayMonth, setDayMonth] = React.useState("");
  const handleDayMonth = (event) => {
    setDayMonth(event.target.value);
  };

  // Setting the startDate attribute
  const [startDate, setStartDate] = React.useState("");
  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  };

  // Setting the endDate attribute
  const [endDate, setEndDate] = React.useState("");
  const handleEndDate = (event) => {
    setStartDate(event.target.value);
  };

  // Setting the hourRepeated attribute  
  const [hourRepeated, setHourRepeated] = React.useState();
  const handleHourRepeated = (event) => {
    setHourRepeated(event.target.value);
  };

  // Setting the occurence Date attribute
  const [occurenceDate, setOccurenceDate] = React.useState("");
  const handleOccurenceDate = (event) => {
    setOccurenceDate(event.target.value);
  };

  return (
    <Slide>
      {/* <h1>Date Configuration</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa.
      </p>
      <button onClick={props.dismiss}>Cancel</button>
      <button onClick={() => props.select(0)}>Back</button>
      <button onClick={() => props.select(2)}>Next</button> */}

      <IconButton aria-label="close" id="closeButton" onClick={props.dismiss}>
        <CloseIcon />
      </IconButton>
      <DialogTitle id="form-dialog-title" className="dialogTitle">Date Configuration</DialogTitle>
      <DialogContent className="recConfigPaper">

        <DialogContent>
          <div className="onelinerAlign">
            <DialogContentText id="recLabel2">Occurence: </DialogContentText>
            <FormControl>
              <NativeSelect
                id="demo-customized-select-native"
                className="recBoxDate"
                value={periodicity}
                onChange={handlePeriodicity}
                input={<BootstrapInput />}
              >
                <option aria-label="None" value={""} >None</option>
                <option value={"Weekly"}>Weekly</option>
                <option value={"Bi-Weekly"}>Bi-Weekly</option>
                <option value={"Monthly"}>Monthly</option>
                <option value={"Yearly"}>Yearly</option>
              </NativeSelect>
            </FormControl>
          </div>
        </DialogContent>

        {periodicity !== "" &&

          <DialogContent>
            <div className="onelinerAlign">
              <DialogContentText id="recLabel3">Repetition Time: </DialogContentText>
              <TextField
                id="outlined-number"
                className="recBoxNumber"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleRepetition}
                variant="outlined"
                size="small"
              />
            </div>
          </DialogContent>
        }

        {periodicity != "" && periodicity !== "Yearly" && periodicity !== "Monthly" ?
          <DialogContent>
            <div className="onelinerAlign">
              <DialogContentText id="recLabel2">Day of the Week: </DialogContentText>
              <ButtonGroup aria-label="small outlined button group">
                <Button value="Monday" onClick={handleDayWeek}>M</Button>
                <Button value="Monday" onClick={handleDayWeek}>T</Button>
                <Button value="Monday" onClick={handleDayWeek}>W</Button>
                <Button value="Monday" onClick={handleDayWeek}>T</Button>
                <Button value="Monday" onClick={handleDayWeek}>F</Button>
                <Button value="Monday" onClick={handleDayWeek}>S</Button>
                <Button value="Monday" onClick={handleDayWeek}>S</Button>
              </ButtonGroup>
            </div>
          </DialogContent> : (periodicity != "" ? <DialogContent>
            <div className="onelinerAlign">
              <DialogContentText id="recLabel2">Day of the Month: </DialogContentText>
              <form className="timePickerContainer" noValidate>
                <TextField
                  id="date"
                  type="date"
                  size="small"
                  defaultValue="2017-05-24"
                  className="timePickerTextfield"
                  onChange={handleDayMonth}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </div>
          </DialogContent> : "")}

        {periodicity !== "" &&
          <DialogContent>
            <br></br>
            <div className="onelinerAlign">
              <DialogContentText id="timeLabel">Time: </DialogContentText>
              <form className="timePickerContainer" noValidate>
                <TextField
                  id="time"
                  size="small"
                  type="time"
                  defaultValue="07:30"
                  className="timePickerTextfield"
                  onChange={handleHourRepeated}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300,
                  }}
                />
              </form>
            </div>
          </DialogContent>
        }
      </DialogContent>
      <DialogActions>
        <Button id="cancelBtn" onClick={() => props.select(0)}>Back</Button>
        <Button id="nextBtn" onClick={() => props.select(2)}>Next</Button>
      </DialogActions>
    </Slide>

  );
}

export default DateConfiguration
