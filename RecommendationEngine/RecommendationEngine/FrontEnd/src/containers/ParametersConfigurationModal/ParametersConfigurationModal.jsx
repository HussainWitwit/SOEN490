import React, { useState, useEffect} from 'react'
import { animated } from 'react-spring';
import './ParametersConfigurationModal.css';
import  { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import './ParametersConfigurationModal.css';
import { mapParamDialogStateToProps, mapDispatchParametersPageToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider , KeyboardDateTimePicker } from '@material-ui/pickers';
import { singleParameterInvalid } from '../../utilities/ValidationUtilities';

export  function ParamTextField({paramObject, index, onChangeEvent}) {
  const [error, setError] = useState(false);
  let paramTypeAttributes = paramObject.parameterType.split('_');
  let isNegative = paramTypeAttributes[0] === 'NEGATIVE';
  let numberType = paramTypeAttributes[1].toLowerCase();
  let helperText =
    paramTypeAttributes ? 
    <div>
        {`The value must be a ${numberType} ${isNegative ? "smaller" : "larger"} than ${paramTypeAttributes[2]}`}
    </div> : '';

    const validation = () => {
      setError(singleParameterInvalid(paramObject));
    }

    useEffect(() => {
      validation();
    }, [paramObject.parameterValue])

  return(
      <TextField
          InputProps={{ 
              inputProps: { 
                  min: paramTypeAttributes[2],
                  max: isNegative ? 0 : null
              }
          }}
          data-testid='parameter-value'
          value={paramObject.parameterValue}
          onChange={(e) => { onChangeEvent(e.target.value, index); }}
          className="value"
          type="number"
          placeholder={paramObject.defaultValue}
          variant="outlined"
          error = {error}
          helperText = {helperText}
      />
  );
}

export function ParametersConfigurationModal (props) {

    const { parameterList, setParamValue } = props;

    return (
      <animated.div id="confirmation-modal-container" style={props.dialogStyle}>
        <div id="parameter-modal-content">
          <div id="table-container">
            <Table stickyHeader aria-label="collapsible table">
              <TableHead>
                <TableRow className="table-header-row">
                  {['Parameter name', 'Value'].map((cell, index) => (
                    <TableCell key={index} id="table-header-cell">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {parameterList &&
                  parameterList.map((cell, index) => (
                    <TableRow id="parameter-row" key={index}>
                      <TableCell id="parameter-name-table-cell">
                        {cell.displayText}
                      </TableCell>
                      <TableCell>
                        {(cell.parameterType.includes('INT') ||
                          cell.parameterType.includes('FLOAT')) && <ParamTextField paramObject = {cell} index={index} onChangeEvent ={setParamValue}/>}
                        {cell.parameterType === 'DATE' && (
                            <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                                <KeyboardDateTimePicker
                                    id={"date-picker-id" + index}
                                    className="parameter-date-picker"
                                    data-testid='date'
                                    autoOk
                                    placeholder={cell.defaultValue}
                                    label="Date"
                                    inputVariant="outlined"
                                    value={cell.parameterValue}
                                    minDate = {cell.parameterName.includes('Start') ? new Date(2020,1,1) : cell.parameterName.includes('End') ? parameterList[index - 1].parameterValue: new Date(2020, 1, 1)}
                                    maxDate = {cell.parameterName.includes('Start') ? parameterList[index + 1].parameterValue : new Date(2020,11,31)}
                                    minDateMessage = {'The start date cannot overlap'}
                                    maxDateMessage = {'The end date cannot overlap'}
                                    onChange={(date) => setParamValue(date, index)}
                                    inputformat = {"PPP"}
                                    KeyboardButtonProps={{
                                      'aria-label': 'change date',
                                  }}
                                />
                            </MuiPickersUtilsProvider >
                            )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </animated.div>
    );
}

export default connect(mapParamDialogStateToProps, mapDispatchParametersPageToProps)(ParametersConfigurationModal);