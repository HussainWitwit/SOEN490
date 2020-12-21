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
import { mapDialogStateToProps, mapDispatchMergedToProps } from '../../redux/AddRecDialogReducer/reducer-actions';
import { connect } from 'react-redux';

export function ParametersConfigurationModal (props) {

    const headerCells = ['Parameter name', 'Value'];
    const { parameterConfiguration, setCenterPointIncrement, setSpanIncrement, setAccelerator, setSoilingSeasonBuffer } = props;

    const rows = [
        { parameterDisplayName: 'Centerpoint increment', parameterValue: parameterConfiguration.centerPointIncrement, setParamValue: (value) => setCenterPointIncrement(value) },
        { parameterDisplayName: 'Span increment', parameterValue: parameterConfiguration.spanIncrement, setParamValue: (value) => setSpanIncrement(value) },
        { parameterDisplayName: 'Accelerator', parameterValue: parameterConfiguration.accelerator, setParamValue: (value) => setAccelerator(value) },
        { parameterDisplayName: 'Soiling season buffer', parameterValue: parameterConfiguration.soilingSeasonBuffer, setParamValue: (value) => setSoilingSeasonBuffer(value) }];

    return (
        <animated.div id="confirmation-modal-container" style={props.dialogStyle}>
            <div id='paramater-modal-content'>
                <div id="table-container">
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow className='table-header-row'>
                                {headerCells.map((cell) => (
                                    <TableCell classeName="table-header-cell">{cell}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((cell) => (
                                <TableRow>
                                    <TableCell>{cell.parameterDisplayName}</TableCell>
                                    <TableCell>
                                        <TextField data-testID='parameter-value' value={cell.parameterValue} onChange={(e) => cell.setParamValue(e.target.value)} className="value" type="number" variant="outlined"></TextField>
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

export default connect(mapDialogStateToProps, mapDispatchMergedToProps)(ParametersConfigurationModal)