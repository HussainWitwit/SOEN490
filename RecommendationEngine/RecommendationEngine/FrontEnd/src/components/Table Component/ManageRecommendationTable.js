import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { FilterList, Search } from '@material-ui/icons';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import './ManageRecommendationTable.css';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export const CssTextField = withStyles({

    root: {
        width: '360px',
        color: '252733',
        fontSize: 100,

        '& label.Mui-focused': {
            color: '#868282',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#252733',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#252733',
            },
            '&:hover fieldset': {
                borderColor: '#252733',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#252733',
            },
        },
    },

})(TextField);

/**
  * creation of the Data Object
  * @param {*} title
  * @param {*} frequency
  * @param {*} startDate
  * @param {*} startTime
  * @param {*} endDate
  * @param {*} endTime
  * @param {*} template
  * @param {*} qlgorithm 
  */
function createData(title, frequency, startDate, startTime, endDate, endTime, template, algorithm) {
    return { title, frequency, startDate, startTime, endDate, endTime, template, algorithm };
}

const mockRows = [
    createData('W33ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W34ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W35ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W36ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W37ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W38ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W39ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W40ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W41ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W42ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W43ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W44ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W45ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W46ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W47ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W48ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W49ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W50ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W51ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W52ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W53ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W54ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W55ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W56ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W57ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W58ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W59ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W60ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W61ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W62ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W63ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W64ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W65ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W66ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W67ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W68ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W69ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W70ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W71ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W72ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W73ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W74ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W75ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W76ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W77ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W78ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W79ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
    createData('W80ID', 'Bi-Weekly', 'May 26, 2020', '7:30 PM', 'June 23, 2021', '7:30 PM', 'Wash Optimization', 'WO Algorithm'),
];

/**
   * This function handles compares row items - future methods
   * @param {*} a
   * @param {*} b
   * @param {*} orderBy
 
   */
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

// Same thing here

/**
* This function hanldles the comparison of items gets them - future methods
* @param {} order
* @param {*} orderBy 
*/

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Same for this function it takes in an array and a comparator


/**
* This function can handle the sorting of the row items - future methods
* @param {} event 
* @param {*} index 
*/
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'title', numeric: false, label: 'Title' },
    { id: 'frequency', numeric: false, label: 'Frequency' },
    { id: 'startDate', numeric: true, label: 'Start Date' },
    { id: 'endDate', numeric: true, label: 'End Date' },
    { id: 'template', numeric: true, label: 'Template' },
    { id: 'algorithm', numeric: true, label: 'Algorithm' },
];

/**
   * cMethod that will serve for the creation of the table header
   * @param {*} props
 
   */

export function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead id="table-head" className="custom">
            <TableRow id="table-row">
                <TableCell id="table-cell" className="custom"></TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        className="custom"
                        key={headCell.id}
                        // align={headCell.numeric ? 'left' : 'center'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        id="tableHeader"
                    >
                        <TableSortLabel
                            id="sort-label"
                            className="custom"
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span id="visuallyHidden">
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func,
    order: PropTypes.oneOf(['asc', 'desc']),
    orderBy: PropTypes.string,
};

function ManageRecommendationTable() {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [openFirst, setOpenFirst] = React.useState(false);
    const [openSecond, setOpenSecond] = React.useState(false);
    const [openThird, setOpenThird] = React.useState(false);
    const [openFourth, setOpenFourth] = React.useState(false)
    const [back, setBack] = React.useState(false);
    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));



    //TODO:Set the hooks for the Title, Subtitle, Button Boolean, 
    //TODO:Set hook array for the name of the columns of the table and the filter list 


    /**
       * set the items to be comprssed function
       * @param {*} event
   
       */

    // this method is used for the compressed table rows button (lite)
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    /**
 * This function handles the sorting and sets them
 * @param {} event 
 * @param {*} index 
 */
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    /**
 * This function handles the changing of paginations (pages)
 * @param {} event 
 * @param {*} newPage
 */
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    /**
 * This function handles population of row on each ne
 * @param {*} event  
 */
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // handling the empty rows for the method that compresses the table rows
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, mockRows.length - page * rowsPerPage);

    const handleClickOpenFirst = () => {
        setOpenFirst(true);
    }

    const handleCloseFirst = () => {
        setOpenFirst(false);
    }

    const handleClickOpenSecond = () => {
        setOpenSecond(true);
        setOpenFirst(false)
    }
    const handleClickOpenThird = () => {
        setOpenThird(true);
        setOpenSecond(false);
    }

    const handleClickOpenFourth = () => {
        setOpenFourth(true);
        setOpenThird(false);
    }

    const handleDone = () => {
        setOpenFirst(false);
        setOpenSecond(false);
        setOpenThird(false);
        setOpenFourth(false);
    }

    const handleClose = () => {
        setOpenFirst(false);
        setOpenSecond(false);
        setOpenThird(false);
        setOpenFourth(false);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={4} id="gridItem">
                    <button className="gridTransparent">
                        <Paper id="paperTheme">
                            <Typography id="gridBoxTitle">
                                Wash Optmization
                        </Typography></Paper>
                    </button>
                    <button className="gridTransparent">
                        <Paper id="paperTheme">
                            <Typography id="gridBoxTitle">
                                Fuse Replacement
                        </Typography></Paper>
                    </button>
                    <button className="gridTransparent">
                        <Paper id="paperTheme">
                            <Typography id="gridBoxTitle">
                                ETC
                        </Typography>
                        </Paper>
                    </button>
                </Grid>
                <Grid item xs={4}>
                    <button className="gridTransparent">
                        <Paper id="paperTheme">
                            <Typography id="gridBoxTitle">
                                Gearbox Replacement
                        </Typography></Paper>
                    </button>
                    <button className="gridTransparent">
                        <Paper id="paperTheme">
                            <Typography id="gridBoxTitle">
                                Panel Angle
                        </Typography></Paper>
                    </button>
                    <button className="gridTransparent">
                        <Paper id="paperTheme">
                            <Typography id="gridBoxTitle">
                                Other
                        </Typography></Paper>
                    </button>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div id="main-container">
            <div>
                <br></br>
                <Grid id="grid-container1" container spacing={1} className="gridContainerStyle">
                    {/* <Grid id="grid1" item alignItems="flex-start"> */}
                    <Grid id="grid1" item>

                        <h3 id="title">Manage Recommendations</h3>
                        <h6 id="subtitle">Add, edit, delete and browse the configured recommendation</h6>
                    </Grid >
                    <Grid item>
                        <Button id='recBtn' onClick={handleClickOpenFirst}>Create Recommendation</Button>

                        {/* <Dialog open={openFirst} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <IconButton aria-label="close" id="closeButton" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle id="form-dialog-title" className="dialogTitle">Template Configuration</DialogTitle>


                            <div className="templateConfig">

                                <div className="templateConfigBox">

                                    <DialogContent className="dialogPaper">
                                        <div id="gridRoot">
                                            <Grid container spacing={4}>
                                                <Grid item sm container item xs={6} spacing={3}>
                                                    <FormRow />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </DialogContent>

                                </div>

                                <DialogContent className="templateConfigBox">

                                    <DialogContentText id="templateLabel">Description </DialogContentText>
                                    <DialogContentText id="templateLabelOutput">This recommendation is used to suggest the optimal time to wash you solar panels.</DialogContentText>

                                    <div className="onelinerAlign">
                                        <DialogContentText id="templateLabel">Inputs </DialogContentText>
                                        <DialogContentText id="templateLabel">Assets</DialogContentText>
                                    </div>

                                    <div className="onelinerAlign2">
                                        <DialogContentText id="templateLabel2">
                                            <ul className="listAlign">
                                                <li>Input 1</li>
                                                <li>Input 2</li>
                                                <li>Input 3</li>
                                            </ul>
                                        </DialogContentText>
                                        <DialogContentText id="templateLabel2">
                                            <ul className="listAlign">
                                                <li style={{ alignSelf: 'left' }}>Solar Panels</li>

                                            </ul>
                                        </DialogContentText>
                                    </div>

                                    <DialogContentText id="templateLabel">Algorithm Used </DialogContentText>
                                    <DialogContentText id="templateLabelOutput">WO Algorithm</DialogContentText>

                                </DialogContent>
                            </div>
                            <DialogActions>
                                <Button id="cancelBtn" onClick={handleCloseFirst}>Cancel</Button>
                                <Button id="nextBtn" onClick={handleClickOpenSecond}>Next</Button>
                            </DialogActions>
                        </Dialog> */}

                        {/* <Dialog open={openFirst} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <IconButton aria-label="close" id="closeButton" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle id="form-dialog-title" className="dialogTitle">Wash Optmization Configuration</DialogTitle>
                            <DialogContent className="dialogPaper">

                                <DialogContentText id="recLabel">Title of Recommendation *</DialogContentText>
                                <CssTextField autoFocus margin="dense" id="name" type="text" placeholder="" ></CssTextField>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date picker inline"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>



                            </DialogContent>
                            <DialogActions>
                                <Button id="cancelBtn" onClick={handleClickOpenFirst}>Back</Button>
                                <Button id="nextBtn" onClick={handleClickOpenThird}>Next</Button>
                            </DialogActions>
                        </Dialog> */}

                        <Dialog open={openFirst} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <IconButton aria-label="close" id="closeButton" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle id="form-dialog-title" className="dialogTitle">Recommendation Configuration</DialogTitle>
                            <DialogContent className="recConfigPaper">

                                <DialogContentText id="recLabel">Title of Recommendation</DialogContentText>
                                <CssTextField autoFocus margin="dense" id="name" type="text" placeholder="Wash Optimization P20" style={{fontSize: '10px'}}></CssTextField>

                                <DialogContent>
                                    <br></br>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="recLabel2">Asset: </DialogContentText>
                                            <TextField
                                                id="outlined-select-currency-native"
                                                className="recBox"
                                                select
                                                label=""
                                                onChange={handleChange}
                                                SelectProps={{
                                                    native: true,
                                                }}

                                                variant="outlined"
                                                size="small"
                                            ></TextField>
                                    </div>
                                </DialogContent>


                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="recLabel2">Parameter: </DialogContentText>
                                        <TextField
                                            id="outlined-select-currency-native"
                                            className="recBox"
                                            select
                                            label=""
                                            onChange={handleChange}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            variant="outlined"
                                            size="small"
                                        ></TextField>
                                    </div>
                                </DialogContent>


                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="recLabel3">Center Point Increment: </DialogContentText>
                                        <TextField
                                            id="outlined-number"
                                            className="recBox"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            size="small"
                                        />
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="recLabel3">Span Increment: </DialogContentText>
                                        <TextField
                                            id="outlined-number"
                                            className="recBox"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            size="small"
                                        />
                                    </div>
                                </DialogContent>


                            </DialogContent>



                            <DialogActions>
                                <Button id="cancelBtn" onClick={handleClickOpenSecond}>Back</Button>
                                <Button id="nextBtn" onClick={handleClickOpenFourth}>Next</Button>
                            </DialogActions>
                        </Dialog>

                        {/* <Dialog open={openFirst} onClose={handleClose} aria-labelledby="form-dialog-title">

                            <IconButton aria-label="close" id="closeButton" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle id="form-dialog-title" className="dialogTitle">Confirmation</DialogTitle>
                            <DialogContent id="confirmationDialog">
                                <DialogContent>

                                <DialogContentText id="confirmationTitle">Configuration Details </DialogContentText>
                                <br></br>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Template: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Yearly Wash Optmization</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Title: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Wash Optimization P20</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Asset: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">001-kahuku</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Asset Type: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Solar</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Granularity: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Yearly</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Periodicity: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Monthly</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Frequency of Repition: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">1</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Day of the Week: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Wednesday</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Start Date: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">October 27, 2025, 3:17 PM</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">End Date: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">October 27, 2025, 3:17 PM</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Hours Repeated: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">October 27, 2025, 3:17 PM</DialogContentText>
                                    </div>
                                </DialogContent>


                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Occurence Data Time: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">October 27, 2025, 3:17 PM</DialogContentText>
                                    </div>
                                </DialogContent>

                                <br></br>
                                <Divider className="confirmationDivider"/>
                                <br></br>

                             
                                <DialogContent>
                                <DialogContentText id="confirmationTitle">Parameters Details</DialogContentText>
                                <br></br>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Center Point: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">20250101</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Span: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">4</DialogContentText>
                                    </div>
                                </DialogContent>

                                <br></br>
                                <Divider className="confirmationDivider"/>
                                <br></br>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Created By: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Kenzo L. Witwit</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Created On: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">October 27, 2020, 3:17 PM</DialogContentText>
                                    </div>
                                </DialogContent>


                            </DialogContent>
                            <DialogActions>
                                <Button id="cancelBtn" onClick={handleClickOpenSecond}>Back</Button>
                                <Button id="nextBtn" onClick={handleDone}>Finish</Button>
                            </DialogActions>
                        </Dialog> */}


                    </Grid>
                </Grid>
                <br></br>
            </div>
            <div>
                <div>
                    <Grid id="grid-container2" container spacing={1} className="gridContainerStyle">
                        <Grid item id="grid2">
                            <Search id="search" />
                        </Grid>
                        <Grid item>
                            <CssTextField
                                // className={CssTextField} // also declared in the .css file
                                id="custom-css-standard-input"
                                label="Search"
                                inputProps={{
                                    style: {
                                        fontSize: 15, fontFamily: [
                                            'Segoe UI',
                                            ' Tahoma',
                                            '"Geneva"',
                                            'Verdana',
                                            '"sans-serif"',
                                        ].join(','),
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontSize: 15, fontFamily: [
                                            'Segoe UI',
                                            ' Tahoma',
                                            '"Geneva"',
                                            'Verdana',
                                            '"sans-serif"',
                                        ].join(','),
                                    }
                                }}>
                            </CssTextField>
                        </Grid>
                        <Grid item>
                            <Button size="small" id="filterBtn" endIcon={<FilterList />}>Add Filter</Button>
                        </Grid>

                    </Grid>
                </div>
            </div>
            <br></br>
            <div id="root">
                <Paper id="paper">
                    <Toolbar id="toolbar">
                        <h6 className="toolBarTitle" variant="h6" id="tableTitle" component="div">
                            Configured Recommendations
                                </h6>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={dense}
                                    onChange={handleChangeDense}
                                    color="default"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                />}
                            label={
                                <h6 id="controlLabel">Lite</h6>
                            }
                        />
                    </Toolbar>
                    <TableContainer>
                        <Table
                            id="table"
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={mockRows.length} might be uselfull for later
                            />

                            <TableBody id="table-body">
                                {stableSort(mockRows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow
                                                key={row.title}
                                                className="custom"
                                            >
                                                <TableCell className="custom">
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="default"
                                                    className="primaryKey"
                                                    id="tableBody">
                                                    {row.title}
                                                </TableCell>
                                                <TableCell className="custom" id="tableBody">{row.frequency}</TableCell>
                                                <TableCell className="custom" id="tableBody">{row.startDate}<br></br>{row.startTime}</TableCell>
                                                <TableCell className="custom" id="tableBody">{row.endDate}<br></br>{row.endTime}</TableCell>
                                                <TableCell className="custom" id="tableBody">{row.template}</TableCell>
                                                <TableCell className="custom" id="tableBody">{row.algorithm}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow className="center" classes={{ height: (dense ? 33 : 53) * emptyRows }}>
                                        <TableCell className="center" />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        id="pagination"
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={mockRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>

    );
}

export default ManageRecommendationTable;
