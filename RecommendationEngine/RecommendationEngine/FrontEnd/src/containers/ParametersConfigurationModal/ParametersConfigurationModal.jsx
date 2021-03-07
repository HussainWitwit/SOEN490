import React, { useState, useEffect} from 'react'
import { animated } from 'react-spring';
import './ParametersConfigurationModal.css';
import  { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import './ParametersConfigurationModal.css';
import { mapParamDialogStateToProps, mapDispatchParametersPageToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { connect } from 'react-redux';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { LocalizationProvider , MobileDatePicker } from '@material-ui/pickers';
import { isCorrectType } from '../../utilities/GeneralUtilities';

export  function ParamTextField({paramObject, index, onChangeEvent}) {
  const [error, setError] = useState(false);
  let paramTypeAttributes = paramObject.parameterType.split('_');
  let numberType = paramTypeAttributes[1].toLowerCase();
  let isNegative = paramTypeAttributes[0] === 'NEGATIVE';
  let helperText =
      paramTypeAttributes ? 
      <div>
          {`The value must be a ${paramTypeAttributes[0].toLowerCase()} ${numberType} with a minimum value of ${paramTypeAttributes[2]}`}
      </div> : '';

    const validation = () => {
      setError(paramObject.parameterValue && (paramObject.parameterValue < paramTypeAttributes[2] || (isNegative && (paramObject.parameterValue < paramTypeAttributes[2] | paramObject.parameterValue >= 0)) || !isCorrectType(paramTypeAttributes[1], paramObject.parameterValue)));
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
          data-testID='parameter-value'
          defaultValue={paramObject.defaultValue}
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
                            <LocalizationProvider  dateAdapter={DateFnsUtils}>
                                <MobileDatePicker
                                    id="parameter-date-picker"
                                    data-testid='date'
                                    autoOk
                                    placeholder={cell.defaultValue}
                                    label="Date"
                                    value={cell.parameterValue}
                                    minDate = {cell.parameterName.includes('Start') ? new Date(1900,1,1) : cell.parameterName.includes('End') ? parameterList[index - 1].parameterValue: new Date(1900, 1, 1)}
                                    maxDate = {cell.parameterName.includes('Start') ? parameterList[index + 1].parameterValue : new Date(2100,1,1)}
                                    minDateMessage = {'The start date cannot overlap'}
                                    maxDateMessage = {'The end date cannot overlap'}
                                    onChange={(date) => setParamValue(date, index)}
                                    inputFormat = {"PPP"}
                                    renderInput={(props) => <TextField helperText = "" variant = "outlined" {...props}/>}
                                />
                            </LocalizationProvider >
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