import React from 'react'
import { animated } from 'react-spring';
import './ParametersConfigurationModal.css';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

// TODO: make the table 1D as it will be tackled by another user story. The table should be static for now
function ParametersConfigurationModal (props) {

    const headerCells = ['Parameter name', 'Default value', 'Add Interval'];
    const internalHeaderCells = ['Start Date', 'End  date', 'Value'];

    const Row = (props) => {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        return (
            <React.Fragment>
                <TableRow className="">
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        {row.name}
                    </TableCell>
                    <TableCell align="left">
                        <TextField className="default-value" type="number" variant="outlined" defaultValue={row.default}></TextField>
                    </TableCell>
                    <TableCell>
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <div>
                                <h6>Interval Value</h6>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            {internalHeaderCells.map((cell) => (
                                                <TableCell>{cell}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        minDa
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        label="start date"
                                                        format="MM/dd/yyyy"
                                                        inputVariant="outlined"
                                                    // value={selectedDate}
                                                    // onChange={handleDateChange}                                                
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </TableCell>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <TableCell>
                                                    <KeyboardDatePicker
                                                        minDa
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        label="start date"
                                                        format="MM/dd/yyyy"
                                                        inputVariant="outlined"
                                                    // value={selectedDate}
                                                    // onChange={handleDateChange}
                                                    />
                                                </TableCell>
                                            </MuiPickersUtilsProvider>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            <div>
                            </div>
                        </Collapse>

                    </TableCell>

                </TableRow>
            </React.Fragment>);
    }

    const MainTable = () => {
        // TODO: these values should be pulled from the  database
        const rows = [
            { name: 'Centerpoint increment', default: 122 },
            { name: 'Span increment', default: 5 },
            { name: 'Accelerator', default: 555 },
            { name: 'Soiling season buffer', default: 37.8 }
        ];
        return (
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
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
    return (
        <animated.div id="confirmation-modal-container" style={props.dialogStyle}>
            <div id='paramater-modal-content'>
                {/* <div>Parameters Configuration</div> */}
                {/* <div id="sub-title">Feature in development</div> */}
                <MainTable />
            </div>
        </animated.div>
    );
}

export default ParametersConfigurationModal;
