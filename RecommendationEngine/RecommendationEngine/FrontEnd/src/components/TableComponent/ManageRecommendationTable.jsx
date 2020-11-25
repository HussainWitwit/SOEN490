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
import { getAllConfiguredRecommendations } from "../../api/get/ConfiguredRecommendationEndpoints";
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
   * This function handles compares row items - future methods
   * @param {*} a
   * @param {*} b
   * @param {*} orderBy
 
   */
function descendingComparator (a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


/**
* This function hanldles the comparison of items gets them - future methods
* @param {} order
* @param {*} orderBy 
*/

function getComparator (order, orderBy) {
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
function stableSort (array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'title', label: 'Title' },
    { id: 'type', label: 'Type' },
    { id: 'granularity', label: 'Granularity' },
    // { id: 'RecDateTime', label: 'Recurrence Datetime' },
    // { id: 'RecDayOfWeek', label: 'Day of week' },
    { id: 'createdOn', label: 'Created On' },
    // { id: 'createdBy', label: 'Created By' },
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
    const [data, setData] = React.useState([]);

    /**
     * Asynchronous function that fetches all the configured recommendations
     */
    const fetchData = async () => {
        let response = await getAllConfiguredRecommendations();
        setData(response);
    }

    useEffect(() => {
        fetchData();
    }, []);


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
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data ? data.length - page * rowsPerPage : 1);
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
                                rowCount={data ? data.length : 1}
                            />

                            <TableBody id="table-body">
                                {/* {stableSort(data, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                                {data && data.map((element, index) => {
                                    return (
                                        <TableRow
                                            key={element.name}
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
                                                {element.name}
                                            </TableCell>
                                            <TableCell className="custom" id="tableBody">{element.type}</TableCell>
                                            <TableCell className="custom" id="tableBody">{element.granularity}</TableCell>
                                            {/* <TableCell className="custom" id="tableBody">{element.RecurrenceDatetime}</TableCell> */}
                                            {/* <TableCell className="custom" id="tableBody">{element.RecurrenceDayOfWeek}</TableCell> */}
                                            <TableCell className="custom" id="tableBody">{element.createdOn}</TableCell>
                                            {/* <TableCell className="custom" id="tableBody">{element.CreatedBy}</TableCell> */}
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
                        count={data ? data.length : 1}
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