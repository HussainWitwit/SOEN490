import React from 'react';
import { animated } from 'react-spring';
import { Form } from 'react-bootstrap';
import './DetailsConfigurationModal.css';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import MultiSelectAutocomplete from '../../components/MultiSelectAutocomplete/MultiSelectAutocomplete';
import { mapDialogStateToProps, mapDispatchToProps } from '../../redux/AddRecDialogReducer/reducer-actions';
import { TemplateItems } from '../TemplateConfigurationModal/ListTemplateItems';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const granularityItems = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

export function DetailsConfigurationModal (props) {
  const {
    basicConfiguration,
    template,
    setTitle,
    updateAsset,
    setPreferredScenario,
    setGranularity,
    setRepeatDay,
    setRepeatDate,
    setRepeatTime,
    apiAssets
  } = props;


  return (
    <animated.div id="details-configuration-modal" style={props.dialogStyle}>
      <div id="basic-information-container">
        <p>Basic information</p>
        <div id="element-container">
          <div id="text-container">
            <p id="text">Title: </p>
          </div>
          <TextField
              error = {basicConfiguration.title === ''} 
              label = {basicConfiguration.title === '' ? "Required.": ''}
              value = {basicConfiguration.title}
              data-testid='title'
              className="title-input-field"
              placeholder = "Your title here..."
              variant="outlined"
              onChange={(event) => setTitle(event.target.value)}
    
          />
        </div>
        <div id="element-container">
          <div id="text-container">
            <p id="text">Asset: </p>
          </div>
          <MultiSelectAutocomplete
            contentLabel="Assets..."
            recommendationType = {template.name}
            items={apiAssets}
            value={basicConfiguration.asset}
            onChange={(event, value) => updateAsset(value)}
            maxElement={1}
            variant={'outlined'}
            isReadOnly={false}
          />
        </div>
        <div id="scenario-container">
          <p id="text-3">Preferred Scenario: </p>
          <RadioGroup
            row
            aria-label="position"
            name="position"
          >
            <FormControlLabel
              checked={
                basicConfiguration.preferredScenario === 'ROI'
              }
              data-testid="option-ron"
              value="Return On Investment"
              control={<Radio color="primary" />}
              label="Return On Investment"
              labelPlacement="top"
              onClick={() => setPreferredScenario('ROI')}
            />
            <FormControlLabel
              checked={basicConfiguration.preferredScenario === 'netSaving'}
              data-testid="option-net"
              value="Net Saving"
              control={<Radio color="primary" />}
              label="Net Saving"
              labelPlacement="top"
              onClick={() => setPreferredScenario('netSaving')}
            />
          </RadioGroup>
        </div>
      </div>
      <div id="basic-information-container">
        <p>Recurrence</p>
        <div id="granularity-input-container">
          <div id="text-container">
            <p id="text">Granularity: </p>
          </div>
          <Form.Control
            data-testid="granularity"
            disabled={template.name === TemplateItems[0].name}
            as="select"
            onChange={(event) => setGranularity(event.target.value)}
            value={basicConfiguration.granularity}
            className="text-input-granularity"
          >
            {granularityItems.map((element) => {
              return <option data-testid="granularity-option">{element}</option>;
            })}
          </Form.Control>
        </div>
        <div id="repeat-container">
          <p id="text">Repeat on: </p>
          {basicConfiguration.granularity === granularityItems[1] && (
            <ButtonGroup
              id="day-of-week-container"
              aria-label="small outlined button group"
            >
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((element, index) => {
                return (
                  <Button
                    data-testid='day'
                    value={index.toString()}
                    onClick={(event) => setRepeatDay(index+1)}
                    style = {{backgroundColor: index === basicConfiguration.repeatDay - 1 ? "#98AFC7": "white"}}
                  >
                    {element}
                  </Button>
                );
              })}
            </ButtonGroup>
          )}
           <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {(basicConfiguration.granularity === granularityItems[2] ||
              basicConfiguration.granularity === granularityItems[3]) && (
                <div id = "recommendation-date-picker">
                <KeyboardDatePicker
                  id="date-picker"
                  autoOk                  
                  views = {basicConfiguration.granularity === "Yearly" ? ["year"] : ["year", "month", "date"]}
                  inputVariant="outlined"
                  label="Date"
                  minDate = {new Date()}
                  format={basicConfiguration.granularity === "Yearly" ? "yyyy" : "dd/MM/yyyy"}
                  value={basicConfiguration.repeatDate}
                  onChange={(date) => setRepeatDate(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                /> 
                </div>
              )}
            {basicConfiguration.granularity !== granularityItems[3] && (
             <KeyboardTimePicker
                label="Time"
                id = "recommendation-time-picker"
                inputVariant="outlined"
                value={basicConfiguration.repeatTime}
                onChange={date => setRepeatTime(date)}
              />
            )}
          </MuiPickersUtilsProvider>
        </div>
      </div>
    </animated.div>
  );
}

export default connect(
  mapDialogStateToProps,
  mapDispatchToProps
)(DetailsConfigurationModal);
