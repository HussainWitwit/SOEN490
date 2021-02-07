import React from 'react'
import { animated } from 'react-spring';
import './ParametersConfigurationModal.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import './ParametersConfigurationModal.css';
import { mapParamDialogStateToProps, mapDispatchParametersPageToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { connect } from 'react-redux';

export function ParametersConfigurationModal (props) {

    const headerCells = ['Parameter name', 'Value'];
    const { parameterList, setParamValue } = props;

    return (
        <animated.div id="confirmation-modal-container" style={props.dialogStyle}>
            <div id='parameter-modal-content'>
                <div id="table-container">
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow className='table-header-row'>
                                {headerCells.map((cell, index) => (
                                    <TableCell key={index} classeName="table-header-cell">{cell}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {parameterList && parameterList.map((cell, index) => (
                                <TableRow key={index}>
                                    <TableCell>{cell.parameterName}</TableCell>
                                    <TableCell>
                                        <TextField data-testID='parameter-value' defaultValue={cell.defaultValue} value={cell.parameterValue} onChange={(e) => { setParamValue(e.target.value, index); }} className="value" type="number" variant="outlined"></TextField>
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