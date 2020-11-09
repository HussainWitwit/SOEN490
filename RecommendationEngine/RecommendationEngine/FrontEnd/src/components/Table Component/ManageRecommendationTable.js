import React, { useEffect } from 'react';
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
import { withStyles } from '@material-ui/core/styles';
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
import 'date-fns';
import NativeSelect from '@material-ui/core/NativeSelect';
import './ManageRecommendationTable.css';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { getAllRecommendations } from "../../api/GET/TableEndpoints"

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

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Segoe UI', "Tahoma", "Geneva", "Verdana", "sans-serif"
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

/**
   * This function handles compares row items - future methods
   * @param {*} a
   * @param {*} b
   * @param {*} orderBy
 
   */
// export function descendingComparator (a, b, orderBy) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }

// Same thing here

/**
* This function hanldles the comparison of items gets them - future methods
* @param {} order
* @param {*} orderBy 
*/

// export function getComparator (order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }

// Same for this function it takes in an array and a comparator


/**
* This function can handle the sorting of the row items - future methods
* @param {} event 
* @param {*} index 
*/
// export function stableSort (array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) return order;
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }

const headCells = [
    { id: 'title', numeric: false, label: 'Title' },
    { id: 'frequency', numeric: false, label: 'Frequency' },
    { id: 'template', numeric: true, label: 'Template' },
    { id: 'createdOn', numeric: true, label: 'created On' },
];

/**
   * cMethod that will serve for the creation of the table header
   * @param {*} props
   */

export function EnhancedTableHead (props) {
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

function ManageRecommendationTable () {

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [openFirst, setOpenFirst] = React.useState(false);
    const [openSecond, setOpenSecond] = React.useState(false);
    const [openThird, setOpenThird] = React.useState(false);
    const [openFourth, setOpenFourth] = React.useState(false)
    const [back, setBack] = React.useState(false);

    //Add Recommendation Object Attributes (will be refactored later, its just for now  - C.S.B.)

    // Setting the Title attribute
    const [title, setTitle] = React.useState("");
    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    // Setting the Asset attribute
    const [asset, setAsset] = React.useState("");
    const handleAsset = (event) => {
        setAsset(event.target.value);
    }

    // Setting the Asset Type attribute
    const [assetType, setAssetType] = React.useState("");
    const handleAssetType = (event) => {
        setAssetType(event.target.value);
    };

    // Setting the Parameters attribute
    const [parameters, setParameters] = React.useState("");
    const handleParameters = (event) => {
        setParameters(event.target.value);
    };


    // Setting the Granularity attribute
    const [granularity, setGranularity] = React.useState("");
    const handleGranularity = (event) => {
        setGranularity(event.target.value);
    };

    // Setting the perio attribute
    const [periodicity, setPeriodicity] = React.useState();
    const handlePeriodicity = (event) => {
        setPeriodicity(event.target.value);
    };

    // Setting Repetition attribute
    const [Repetition, setRepetition] = React.useState(null);
    const handleRepetition = (event) => {
        setRepetition(event.target.value);
    };

    // Setting the dayWeek attribute
    const [dayWeek, setDayWeek] = React.useState("");
    const handleDayWeek = (event) => {
        setDayWeek(event.target.value);
    };

    // Setting the occurence Date attribute
    const [dayMonth, setDayMonth] = React.useState("");
    const handleDayMonth = (event) => {
        setDayMonth(event.target.value);
    };

    // Setting the startDate attribute
    const [startDate, setStartDate] = React.useState("");
    const handleStartDate = (event) => {
        setStartDate(event.target.value);
    };

    // Setting the endDate attribute
    const [endDate, setEndDate] = React.useState("");
    const handleEndDate = (event) => {
        setStartDate(event.target.value);
    };

    // Setting the hourRepeated attribute  
    const [hourRepeated, setHourRepeated] = React.useState();
    const handleHourRepeated = (event) => {
        setHourRepeated(event.target.value);
    };

    // Setting the occurence Date attribute
    const [occurenceDate, setOccurenceDate] = React.useState("");
    const handleOccurenceDate = (event) => {
        setOccurenceDate(event.target.value);
    };


    // Seeting the Center Point attribute 
    const [centerPoint, setCenterPoint] = React.useState(null)
    const handleCenterPoint = (event) => {
        setCenterPoint(event.target.value);
    };

    // Seeing the Span attribute
    const [span, setSpan] = React.useState(null);
    const handleSpan = (event) => {
        setSpan(event.target.value);
    };


    // Setting the CreatedBy attribute
    const [createdBy, setCreatedBy] = React.useState("");
    const handleCreatedBy = (event) => {
        setCreatedBy(event.target.value);
    };

    // Setting the CreatedOn attribute
    const [createdOn, setCreatedOn] = React.useState("");
    const handleCreatedOn = (event) => {
        setCreatedOn(event);
    };

    const [data, setData] = React.useState([]);

    // fetchData

    const fetchData = async () => {
        let response = await getAllRecommendations()
        setData(response);
    }

    useEffect(() => {
        fetchData();
    }, []);


    // function createData(title, frequency, template, createdOn) {
    //     return { title, frequency, template, createdOn };
    // }

    // const mockRowsMethod = (data) =>{

    //     const mockRows = [
    //         createData(data.title, data.frequency, data.template, data.createdOn)
    //     ];

    //     return mockRows

    // }


    //TODO:Set the hooks for the Title, Subtitle, Button Boolean, (Making of Table Generic) - C.S.B
    //TODO:Set hook array for the name of the columns of the table and the filter list (Making of Table Geeric) - C.S.B


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
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

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

    const cancelConfirmation = () => {
        setOpenThird(true);
        setOpenFourth(false);
        setOpenFirst(false);
        setOpenSecond(false);
    }

    function FormRow () {
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
                    <Grid id="grid1" item>

                        <h3 id="title">Manage Recommendations</h3>
                        <h6 id="subtitle">Add, edit, delete and browse the configured recommendation</h6>
                    </Grid >
                    <Grid item>
                        <Button id='recBtn' onClick={handleClickOpenFirst}>Create Recommendation</Button>

                        <Dialog open={openFirst} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <IconButton aria-label="close" id="closeButton" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle id="form-dialog-title" className="dialogTitle">Template Configuration</DialogTitle>
                            <div id="tempDialog">
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
                        </Dialog>

                        <Dialog open={openSecond} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <IconButton aria-label="close" id="closeButton" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle id="form-dialog-title" className="dialogTitle">Date Configuration</DialogTitle>
                            <DialogContent className="recConfigPaper">

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="recLabel2">Occurence: </DialogContentText>
                                        <FormControl>
                                            <NativeSelect
                                                id="demo-customized-select-native"
                                                className="recBoxDate"
                                                value={periodicity}
                                                onChange={handlePeriodicity}
                                                input={<BootstrapInput />}
                                            >
                                                <option aria-label="None" value={""} >None</option>
                                                <option value={"Weekly"}>Weekly</option>
                                                <option value={"Bi-Weekly"}>Bi-Weekly</option>
                                                <option value={"Monthly"}>Monthly</option>
                                                <option value={"Yearly"}>Yearly</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </div>
                                </DialogContent>

                                {periodicity !== "" &&

                                    <DialogContent>
                                        <div className="onelinerAlign">
                                            <DialogContentText id="recLabel3">Repetition Time: </DialogContentText>
                                            <TextField
                                                id="outlined-number"
                                                className="recBoxNumber"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={handleRepetition}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </div>
                                    </DialogContent>
                                }

                                {periodicity != "" && periodicity !== "Yearly" && periodicity !== "Monthly" ?
                                    <DialogContent>
                                        <div className="onelinerAlign">
                                            <DialogContentText id="recLabel2">Day of the Week: </DialogContentText>
                                            <ButtonGroup aria-label="small outlined button group">
                                                <Button value="Monday" onClick={handleDayWeek}>M</Button>
                                                <Button value="Monday" onClick={handleDayWeek}>T</Button>
                                                <Button value="Monday" onClick={handleDayWeek}>W</Button>
                                                <Button value="Monday" onClick={handleDayWeek}>T</Button>
                                                <Button value="Monday" onClick={handleDayWeek}>F</Button>
                                                <Button value="Monday" onClick={handleDayWeek}>S</Button>
                                                <Button value="Monday" onClick={handleDayWeek}>S</Button>
                                            </ButtonGroup>
                                        </div>
                                    </DialogContent> : (periodicity != "" ? <DialogContent>
                                        <div className="onelinerAlign">
                                            <DialogContentText id="recLabel2">Day of the Month: </DialogContentText>
                                            <form className="timePickerContainer" noValidate>
                                                <TextField
                                                    id="date"
                                                    type="date"
                                                    size="small"
                                                    defaultValue="2017-05-24"
                                                    className="timePickerTextfield"
                                                    onChange={handleDayMonth}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </form>
                                        </div>
                                    </DialogContent> : "")}

                                {periodicity !== "" &&
                                    <DialogContent>
                                        <br></br>
                                        <div className="onelinerAlign">
                                            <DialogContentText id="timeLabel">Time: </DialogContentText>
                                            <form className="timePickerContainer" noValidate>
                                                <TextField
                                                    id="time"
                                                    size="small"
                                                    type="time"
                                                    defaultValue="07:30"
                                                    className="timePickerTextfield"
                                                    onChange={handleHourRepeated}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        step: 300,
                                                    }}
                                                />
                                            </form>
                                        </div>
                                    </DialogContent>
                                }

                            </DialogContent>
                            <DialogActions>
                                <Button id="cancelBtn" onClick={handleClickOpenFirst}>Back</Button>
                                <Button id="nextBtn" onClick={handleClickOpenThird}>Next</Button>
                            </DialogActions>
                        </Dialog>


                        <Dialog open={openThird} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <IconButton aria-label="close" id="closeButton" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle id="form-dialog-title" className="dialogTitle">Recommendation Configuration</DialogTitle>
                            <DialogContent className="recConfigPaper">

                                <DialogContentText id="recLabel">Title of Recommendation</DialogContentText>
                                <CssTextField autoFocus margin="dense" id="name" type="text" placeholder="Wash Optimization P20" onChange={handleTitle}></CssTextField>

                                <DialogContent>
                                    <br></br>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="recLabel2">Asset: </DialogContentText>
                                        <FormControl>
                                            <NativeSelect
                                                id="demo-customized-select-native"
                                                className="recBoxDate"
                                                value={asset}
                                                onChange={handleAsset}
                                                input={<BootstrapInput />}
                                            >
                                                <option aria-label="None" value="" >None</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </div>
                                </DialogContent>


                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="recLabel2">Parameters: </DialogContentText>
                                        <FormControl>
                                            <NativeSelect
                                                id="demo-customized-select-native"
                                                className="recBoxDate"
                                                value={parameters}
                                                onChange={handleParameters}
                                                input={<BootstrapInput />}
                                            >
                                                <option aria-label="None" value="" >None</option>
                                                <option value={"centerPointSpan"}>Center Point and Span</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </div>
                                </DialogContent>

                                {parameters == "centerPointSpan" &&
                                    <DialogContent>
                                        <div className="onelinerAlign">
                                            <DialogContentText id="recLabel3">Center Point Increment: </DialogContentText>
                                            <TextField
                                                id="outlined-number"
                                                className="recBoxNumber"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={handleCenterPoint}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </div>
                                    </DialogContent>
                                }
                                {parameters == "centerPointSpan" &&
                                    <DialogContent>
                                        <div className="onelinerAlign">
                                            <DialogContentText id="recLabel3">Span Increment: </DialogContentText>
                                            <TextField
                                                id="outlined-number"
                                                className="recBoxNumber"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={handleSpan}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </div>
                                    </DialogContent>
                                }

                            </DialogContent>


                            <DialogActions>
                                <Button id="cancelBtn" onClick={handleClickOpenSecond}>Back</Button>
                                <Button id="nextBtn" onClick={handleClickOpenFourth}>Create</Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog open={openFourth} onClose={cancelConfirmation} aria-labelledby="form-dialog-title">

                            <IconButton aria-label="close" id="closeButton" onClick={cancelConfirmation}>
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
                                        <DialogContentText id="confirmationLabelOutput">{(title === "" ? "Undefined" : title)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Asset: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(asset === "" ? "Feature Coming soon!" : asset)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Asset Type: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(assetType === "" ? "Solar" : assetType)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Granularity: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(granularity === "" ? "Yearly" : granularity)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Periodicity: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(periodicity === "" ? "Undefined" : periodicity)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Frequency of Repetition: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(Repetition === "" ? "Undefined" : Repetition + " time(s)")}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Day of the Week/Month: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(dayWeek === "" ? "Underfine" : (dayWeek != "" ? dayWeek : dayMonth))}</DialogContentText>
                                    </div>
                                </DialogContent>


                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Hours Repeated: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(hourRepeated === null ? "Undefined" : hourRepeated)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Start Date: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Feature Coming soon!</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">End Date: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Feature Coming soon!</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Occurence Date: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Feature Coming soon!</DialogContentText>
                                    </div>
                                </DialogContent>

                                <br></br>
                                <Divider className="confirmationDivider" />
                                <br></br>


                                <DialogContent>
                                    <DialogContentText id="confirmationTitle">Parameters Details</DialogContentText>
                                    <br></br>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Center Point: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(centerPoint === null ? "Undefined" : centerPoint)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Span: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(span === null ? "Undefined" : span)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <br></br>
                                <Divider className="confirmationDivider" />
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
                                <Button id="cancelBtn" onClick={cancelConfirmation}>Cancel</Button>
                                <Button id="nextBtn" onClick={handleDone}>Confirm</Button>
                            </DialogActions>
                        </Dialog>


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
                                rowCount={data.length} might be uselfull for later
                            />

                            <TableBody id="table-body">
                                {/* {stableSort(data, getComparator(order, orderBy))*/
                                    // slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                   data.map((row) => { 
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
                                                {/* <TableCell className="custom" id="tableBody">{row.startDate}<br></br>{row.startTime}</TableCell>
                                                <TableCell className="custom" id="tableBody">{row.endDate}<br></br>{row.endTime}</TableCell> */}
                                                <TableCell className="custom" id="tableBody">{row.template}</TableCell>
                                                <TableCell className="custom" id="tableBody">{row.createdOn}</TableCell>
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
                        count={data.length}
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
