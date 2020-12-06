import React, { useEffect } from 'react';
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
import {
  mapDialogStateToProps,
  mapDispatchToProps,
} from '../AddRecommendationDialog/redux/reducer-actions';
import { TemplateItems } from '../TemplateConfigurationModal/ListTemplateItems';

// TODO: fetch real assets
const assets = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
];
const assetItems = ['Asset 1', 'Asset 2', 'Asset 3', 'Asset 3', 'Asset 4'];
const granularityItems = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

function DetailsConfigurationModal(props) {
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
  } = props;

  useEffect(() => {
    if (template.name === TemplateItems[0].name) {
      setGranularity('Yearly');
    } else {
      setGranularity('Daily');
    }
  }, [template.name]);

  return (
    <animated.div id="details-configuration-modal" style={props.dialogStyle}>
      <div id="basic-information-container">
        <p>Basic information</p>
        <div id="element-container">
          <div id="text-container">
            <p id="text">Title: </p>
          </div>
          <Form.Control
            type="email"
            className="text-input-container"
            value={basicConfiguration.title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Wash Optimization P20"
          />
        </div>
        <div id="element-container">
          <div id="text-container">
            <p id="text">Asset: </p>
          </div>
          <MultiSelectAutocomplete
            contentLabel="Assets..."
            items={assets}
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
            defaultValue="start"
          >
            <FormControlLabel
              checked={
                basicConfiguration.preferredScenario == 'Return On Investment'
              }
              value="Return On Investment"
              control={<Radio color="primary" />}
              label="Return On Investment"
              labelPlacement="top"
              onClick={() => setPreferredScenario('Return On Investment')}
            />
            <FormControlLabel
              checked={basicConfiguration.preferredScenario == 'Net Saving'}
              value="Net Saving"
              control={<Radio color="primary" />}
              label="Net Saving"
              labelPlacement="top"
              onClick={() => setPreferredScenario('Net Saving')}
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
            disabled={template.name === TemplateItems[0].name}
            as="select"
            onChange={(event) => setGranularity(event.target.value)}
            value={basicConfiguration.granularity}
            className="text-input-granularity"
          >
            {granularityItems.map((element) => {
              return <option>{element}</option>;
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
                    value={index.toString()}
                    onClick={(event) => setRepeatDay(index)}
                  >
                    {element}
                  </Button>
                );
              })}
            </ButtonGroup>
          )}
          {(basicConfiguration.granularity === granularityItems[2] ||
            basicConfiguration.granularity === granularityItems[3]) && (
            <div id="date-container">
              <TextField
                id="date"
                type="date"
                size="small"
                defaultValue="2020-01-01"
                onChange={(event) => setRepeatDate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div id="space-right"></div>
            </div>
          )}
          {basicConfiguration.granularity !== granularityItems[3] && (
            <TextField
              id="time"
              size="small"
              type="time"
              defaultValue="06:30"
              onChange={(event) => setRepeatTime(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300,
              }}
            />
          )}
        </div>
      </div>
    </animated.div>
  );
}

export default connect(
  mapDialogStateToProps,
  mapDispatchToProps
)(DetailsConfigurationModal);
