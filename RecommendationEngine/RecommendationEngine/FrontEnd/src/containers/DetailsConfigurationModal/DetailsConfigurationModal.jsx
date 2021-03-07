import React, { useEffect, useState } from 'react';
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
import { mapDialogStateToProps, mapDispatchToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns'
import {
  LocalizationProvider ,
  TimePicker,
  MobileDateTimePicker
} from '@material-ui/pickers';
import MultiSelectTreeView from '../../components/MultiSelectTreeView/MultiSelectTreeView';
import MultiSelectAutocomplete from '../../components/MultiSelectAutocomplete/MultiSelectAutocomplete';
import ClockIcon from "@material-ui/icons/AccessTime";


const granularityItems = ['Weekly', 'Monthly', 'Yearly'];

export function DetailsConfigurationModal (props) {

  const { dialogsContent, setTitle, updateAsset, setPreferredScenario, setGranularity, setRepeatDay, setRepeatDate, setRepeatTime, apiAssets } = props;
  const { templateDetailsList, template, isEditing, basicConfiguration } = dialogsContent;


  const [isFirstTypingTitle, setIsFirstTypingTitle] = useState(true);

  useEffect(() => {
    if (template.name === templateDetailsList[0].templateName) {
      setGranularity('Yearly');
    }   
  }, [template.name])
  
  useEffect(() => {
    if(!isEditing) {
    let date = new Date();
    date.setSeconds(0);
    date.setMilliseconds(0);
    setRepeatDate(date);
    setRepeatTime(date);
    }
  }, [])

  return (
    <animated.div id="details-configuration-modal" style={props.dialogStyle}>
      <div id="basic-information-container">
        <p>Basic information</p>
        <div id="element-container">
          <div id="text-container">
            <p id="text">Title: </p>
          </div>
          <TextField
            error={basicConfiguration.title === '' && !isFirstTypingTitle}
            label={basicConfiguration.title === '' ? "Required." : ''}
            value={basicConfiguration.title}
            data-testid='title'
            className="title-input-field"
            placeholder="Your title here..."
            variant="outlined"
            onChange={(event) => { setIsFirstTypingTitle(false); setTitle(event.target.value); }}
          />
        </div>
        <div id="element-container">
          <div id="text-container">
            <p id="text">Asset: </p>
          </div>
          {isEditing && 
              <MultiSelectAutocomplete
              contentLabel="Assets..."
              id='multiple-select-asset-container'
              error={basicConfiguration.asset.length === 0}
              items={basicConfiguration.asset}
              defaultValue={basicConfiguration.asset}
              boxLabelName={'Selected Assets'}
              variant={'outlined'}
              isReadOnly={true}
              maxElement={3}
            />
          }
          {!isEditing && <MultiSelectTreeView
            value={basicConfiguration.asset ? basicConfiguration.asset : []}
            onChange={(event, value) => updateAsset(event)}
            placeholder='Assets ...'
            items={apiAssets}
          />}
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
            disabled={templateDetailsList.length > 0 && template.name === templateDetailsList[0].templateName}
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
          {basicConfiguration.granularity === granularityItems[0] && (
            <ButtonGroup
              id="day-of-week-container"
              aria-label="small outlined button group"
            >
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((element, index) => {
                return (
                  <Button
                    data-testid='day'
                    value={index.toString()}
                    onClick={(event) => setRepeatDay(index + 1)}
                    style={{ backgroundColor: index === basicConfiguration.repeatDay - 1 ? "#98AFC7" : "white" }}
                  >
                    {element}
                  </Button>
                );
              })}
            </ButtonGroup>
          )}
          <LocalizationProvider  dateAdapter={DateFnsUtils}>
            {(basicConfiguration.granularity === granularityItems[1] ||
              basicConfiguration.granularity === granularityItems[2]) && (
                <MobileDateTimePicker
                  id="recommendation-date-picker"
                  data-testid='date'
                  autoOk
                  ampm
                  disableCloseOnSelect = {true}
                  disableMaskedInput
                  openPickerIcon={<ClockIcon />}
                  label="Repeat on"
                  minDateTime={new Date()} //TODO: Should have a now option
                  disablePast
                  value={basicConfiguration.repeatDate}
                  onChange={(date) => setRepeatDate(date)}
                  inputFormat = {"PPp"}
                  renderInput={(props) => <TextField {...props} helperText={"The date must be in the future"}/>}
                />
              )}
            {basicConfiguration.granularity === granularityItems[0] &&
              <TimePicker
                label="Time"
                data-testid='time'
                id="recommendation-time-picker"
                value={basicConfiguration.repeatTime}
                onChange={date => setRepeatTime(date)}
                renderInput={(props) => <TextField variant = "outlined" {...props}/>}
              />
            }
          </LocalizationProvider >
        </div>
      </div>
    </animated.div>
  );
}

export default connect(
  mapDialogStateToProps,
  mapDispatchToProps
)(DetailsConfigurationModal);
