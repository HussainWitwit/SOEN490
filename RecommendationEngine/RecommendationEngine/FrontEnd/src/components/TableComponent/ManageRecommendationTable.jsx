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
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import './ManageRecommendationTable.css';

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
                        <Button id='recBtn'>Create Recommendation</Button>
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
                                                <TableCell  className="custom">
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