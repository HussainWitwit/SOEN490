import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import 'date-fns';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import {
  setTitle,
  setAsset,
  setCenterPoint,
  setSpan,
} from '../ReduxActions/ParametersConfigurationActions';
import { setCombinedState } from '../ReduxActions/DateConfigurationActions';
import Radio from '@material-ui/core/Radio';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import './DateConfiguration.css';

export const CssTextField = withStyles({
  root: {
    width: '360px',
    color: '252733',
    fontSize: 100,

    '& label.Mui-focused': {
      color: '#868282',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#252733',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#252733',
      },
      '&:hover fieldset': {
        borderColor: '#252733',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#252733',
      },
    },
  },
})(TextField);

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
    fontFamily: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'].join(
      ','
    ),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const DateConfiguration = (props) => {
  const dispatch = useDispatch();

  // Setting the Title attribute
  const [titleOnChange, setTitleOnChange] = React.useState('');
  const handleTitle = (event) => {
    setTitleOnChange(event.target.value);
  };

  const [combinedState, setCombinedState] = React.useState('Hello');

  // Setting the Asset attribute
  const [assetOnChange, setAssetOnChange] = React.useState('');
  const handleAsset = (event) => {
    setAssetOnChange(event.target.value);
  };

  // Seeting the Preferred Scenario
  const [scenario, setScenario] = React.useState('');
  const handleScenario = (event) => {
    setScenario(event.target.value);
  };

  // Setting the perio attribute
  const [granularity, setGranularity] = React.useState();
  const handlePeriodicity = (event) => {
    setGranularity(event.target.value);
  };

  // Setting Repetition attribute
  const [Repetition, setRepetition] = React.useState(null);
  const handleRepetition = (event) => {
    setRepetition(event.target.value);
  };

  // Setting the dayWeek attribute
  const [dayWeek, setDayWeek] = React.useState('');
  const handleDayWeek = (event) => {
    setDayWeek(event.target.value);
  };

  // Setting the occurence Date attribute
  const [dayMonth, setDayMonth] = React.useState('');
  const handleDayMonth = (event) => {
    setDayMonth(event.target.value);
  };

  // Setting the startDate attribute
  const [startDate, setStartDate] = React.useState('');
  const handleStartDate = (event) => {
    setStartDate(event.target.value);
  };

  // Setting the endDate attribute
  const [endDate, setEndDate] = React.useState('');
  const handleEndDate = (event) => {
    setStartDate(event.target.value);
  };

  // Setting the hourRepeated attribute
  const [hourRepeated, setHourRepeated] = React.useState();
  const handleHourRepeated = (event) => {
    setHourRepeated(event.target.value);
  };

  // Setting the occurence Date attribute
  const [occurenceDate, setOccurenceDate] = React.useState('');
  const handleOccurenceDate = (event) => {
    setOccurenceDate(event.target.value);
  };

  return (
    <div>
      <IconButton aria-label="close" id="closeButton" onClick={props.dismiss}>
        <CloseIcon />
      </IconButton>
      <DialogTitle id="form-dialog-title" className="dialogTitle">
        Wash Optmization Configuration
      </DialogTitle>
      <DialogContent className="recConfigPaper">
        <List>
          <Form.Group controlId="formBasicEmail">
            <DialogContent>
              <div className="onelinerAlign">
                <DialogContentText id="recLabel2">Title: </DialogContentText>
                <Form.Control
                  type="email"
                  className="recBoxDate"
                  onChange={handleTitle}
                  placeholder="Wash Optimization P20"
                />
                <Form.Text className="text-muted"></Form.Text>
              </div>
            </DialogContent>
          </Form.Group>

          <DialogContent>
            <div className="onelinerAlign">
              <DialogContentText id="recLabel2">Asset: </DialogContentText>
              <FormControl>
                <NativeSelect
                  id="demo-customized-select-native"
                  className="recBoxDate"
                  value={assetOnChange}
                  onChange={handleAsset}
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="">
                    None
                  </option>
                </NativeSelect>
              </FormControl>
            </div>
          </DialogContent>

          <DialogContent>
            <br></br>
            <div className="onelinerAlign">
              <DialogContentText id="recLabel2">
                Preferred Scenario:{' '}
              </DialogContentText>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                >
                  <FormControlLabel
                    value="start"
                    control={<Radio color="primary" />}
                    label="Return on Investment"
                    onChange={handleScenario}
                    labelPlacement="start"
                    id="recLabel4"
                  />
                  <FormControlLabel
                    value="start"
                    control={<Radio color="primary" />}
                    label="Net Saving"
                    onChange={handleScenario}
                    labelPlacement="start"
                    id="recLabel4"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </DialogContent>

          <DialogContent>
            <div className="onelinerAlign">
              <DialogContentText id="recLabel2">
                Granularity:{' '}
              </DialogContentText>
              <FormControl>
                <NativeSelect
                  id="demo-customized-select-native"
                  className="recBoxDate"
                  value={granularity}
                  onChange={handlePeriodicity}
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value={''}>
                    None
                  </option>
                  <option value={'Weekly'}>Weekly</option>
                  <option value={'Bi-Weekly'}>Bi-Weekly</option>
                  <option value={'Monthly'}>Monthly</option>
                  <option value={'Yearly'}>Yearly</option>
                </NativeSelect>
              </FormControl>
            </div>
          </DialogContent>

          {granularity !== '' && (
            <DialogContent>
              <div className="onelinerAlign">
                <DialogContentText id="recLabel3">
                  Repetition Time:{' '}
                </DialogContentText>
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
          )}

          {granularity != '' &&
          granularity !== 'Yearly' &&
          granularity !== 'Monthly' ? (
            <DialogContent>
              <div className="onelinerAlign">
                <DialogContentText id="recLabel2">
                  Day of the Week:{' '}
                </DialogContentText>
                <ButtonGroup aria-label="small outlined button group">
                  <Button value="Monday" onClick={handleDayWeek}>
                    M
                  </Button>
                  <Button value="Monday" onClick={handleDayWeek}>
                    T
                  </Button>
                  <Button value="Monday" onClick={handleDayWeek}>
                    W
                  </Button>
                  <Button value="Monday" onClick={handleDayWeek}>
                    T
                  </Button>
                  <Button value="Monday" onClick={handleDayWeek}>
                    F
                  </Button>
                  <Button value="Monday" onClick={handleDayWeek}>
                    S
                  </Button>
                  <Button value="Monday" onClick={handleDayWeek}>
                    S
                  </Button>
                </ButtonGroup>
              </div>
            </DialogContent>
          ) : granularity != '' ? (
            <DialogContent>
              <div className="onelinerAlign">
                <DialogContentText id="recLabel2">
                  Day of the Month:{' '}
                </DialogContentText>
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
            </DialogContent>
          ) : (
            ''
          )}

          {granularity !== '' && (
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
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button id="cancelBtn" onClick={() => props.select(0)}>
          Back
        </Button>
        <Button
          id="nextBtn"
          onClick={() => {
            props.select(2);
            // dispatch(setCombinedState(
            // combinedState
            // ));
          }}
        >
          Next
        </Button>
      </DialogActions>
    </div>
  );
};

export default DateConfiguration;
