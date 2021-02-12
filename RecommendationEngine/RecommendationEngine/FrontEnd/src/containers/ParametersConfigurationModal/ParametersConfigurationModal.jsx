import React from 'react'
import { animated } from 'react-spring';
import './ParametersConfigurationModal.css';
import  { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import './ParametersConfigurationModal.css';
import { mapParamDialogStateToProps, mapDispatchParametersPageToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export function ParametersConfigurationModal (props) {

    const { parameterList, setParamValue } = props;

    return (
        <animated.div id="confirmation-modal-container" style={props.dialogStyle}>
            <div id='parameter-modal-content'>
                <div id="table-container">
                    <Table stickyHeader aria-label="collapsible table">
                        <TableHead>
                            <TableRow className='table-header-row'>
                                {['Parameter name', 'Value'].map((cell, index) => (
                                    <TableCell key={index} id="table-header-cell">{cell}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {parameterList && parameterList.map((cell, index) => (
                                <TableRow key={index}>
                                    <TableCell id='parameter-name-table-cell'>{cell.displayText}</TableCell>
                                    <TableCell>
                                        {((cell.parameterType.includes('NUMBER')) && (<TextField
                                            InputProps={cell.parameterType.includes('POSITIVE') ? {
                                                inputProps: { min: 0 },
                                            } : { inputProps: { max: 0 }, }}
                                            data-testID='parameter-value'
                                            defaultValue={cell.defaultValue}
                                            value={cell.parameterValue}
                                            onChange={(e) => { setParamValue(e.target.value, index); }}
                                            className="value"
                                            type="number"
                                            placeholder={cell.defaultValue}
                                            variant="outlined">
                                        </TextField>))}
                                        {cell.parameterType === 'DATE' && (
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                id="parameter-date-picker"
                                                data-testid='date'
                                                autoOk
                                                inputVariant="outlined"
                                                clearable
                                                placeholder={cell.defaultValue}
                                                label="Date"
                                                value={cell.parameterValue ? cell.parameterValue : cell.defaultValue}
                                                onChange={(date) => setParamValue(date, index)}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </animated.div >
    );
}

export default connect(mapParamDialogStateToProps, mapDispatchParametersPageToProps)(ParametersConfigurationModal);