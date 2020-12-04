import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { Form } from 'react-bootstrap';
import './DetailsConfigurationModal.css'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';


const assetItems = ['Asset 1', 'Asset 2', 'Asset 3','Asset 3','Asset 4'];
const TYPE_ASSET = 'Asset';
const granularityItems = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
const TYPE_GRANULARITY = 'Granularity';

const contentInitialValues = {
    title: '',
    asset: assetItems[0],
    ron: '',
    granularity: granularityItems[0],
    repeatDay: '',
    repeatDate: '',
    repeatTime: ''
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// TODO: fetch real assets
const assets = [
 { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
];

function DetailsConfigurationModal(props) {
    const [screenContentSelection, setScreenContentSelection] = useState(contentInitialValues);
    
    // const handleDropDownSelect = (event, type) => {
    //     event.preventDefault();
    //     if(type == TYPE_ASSET) {
    //         setScreenContentSelection({asset: event.target.value});
    //     }
    //     else if(type == TYPE_GRANULARITY){
    //         setScreenContentSelection({granularity: event.target.value});
    //     }
    // }

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
              onChange={(event) =>
                setScreenContentSelection({
                  ...screenContentSelection,
                  title: event.target.value,
                })
              }
              placeholder="Wash Optimization P20"
            />
          </div>
          <div id="element-container">
            <div id="text-container">
              <p id="text">Asset: </p>
            </div>
            <Autocomplete
              id="multiple-select-asset-container"
              limitTags={2}
              multiple
              defaultValue={[assets[0]]}
              options={assets}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              onChange={(event, value) => {
                setScreenContentSelection({
                  ...screenContentSelection,
                  asset: value,
                });
              }}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </React.Fragment>
              )}
              style={{ width: '100%' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Assets..."
                />
              )}
            />
          </div>
          <div id="scenario-container">
            <p id="text-3">Prefered Scenario: </p>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="start"
            >
              <FormControlLabel
                value="Return On Investment"
                control={<Radio color="primary" />}
                label="Return On Investment"
                labelPlacement="top"
                onClick={() =>
                  setScreenContentSelection({
                    ...screenContentSelection,
                    ron: 'Return On Investment',
                  })
                }
              />
              <FormControlLabel
                value="Net Saving"
                control={<Radio color="primary" />}
                label="Net Saving"
                labelPlacement="top"
                onClick={() =>
                  setScreenContentSelection({
                    ...screenContentSelection,
                    ron: 'Net Saving',
                  })
                }
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
              as="select"
              onChange={(event) =>
                setScreenContentSelection({
                  ...screenContentSelection,
                  granularity: event.target.value,
                })
              }
              value={screenContentSelection.granularity}
              className="text-input-granularity"
            >
              {granularityItems.map((element) => {
                return <option>{element}</option>;
              })}
            </Form.Control>
          </div>
          <div id="repeat-container">
            <p id="text">Repeat on: </p>
            {screenContentSelection.granularity == granularityItems[1] && (
              <ButtonGroup
                id="day-of-week-container"
                aria-label="small outlined button group"
              >
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((element, index) => {
                  return (
                    <Button
                      value={index.toString()}
                      onClick={(event) =>
                        setScreenContentSelection({
                          ...screenContentSelection,
                          repeatDay: index,
                        })
                      }
                    >
                      {element}
                    </Button>
                  );
                })}
              </ButtonGroup>
            )}
            {(screenContentSelection.granularity == granularityItems[2] ||
              screenContentSelection.granularity == granularityItems[3]) && (
              <div id="date-container">
                <TextField
                  id="date"
                  type="date"
                  size="small"
                  defaultValue="2020-01-01"
                  onChange={(event) =>
                    setScreenContentSelection({
                      ...screenContentSelection,
                      repeatDate: event.target.value,
                    })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <div id="space-right"></div>
              </div>
            )}
            {screenContentSelection.granularity != granularityItems[3] && (
              <TextField
                id="time"
                size="small"
                type="time"
                defaultValue="06:30"
                onChange={(event) =>
                  setScreenContentSelection({
                    ...screenContentSelection,
                    repeatTime: event.target.value,
                  })
                }
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

export default DetailsConfigurationModal;
