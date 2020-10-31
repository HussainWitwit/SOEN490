import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
// import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
// import FirstPageIcon from '@material-ui/icons/FirstPage';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import LastPageIcon from '@material-ui/icons/LastPage';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FilterList, Search } from '@material-ui/icons';
import './ManageRecommendationTable.css';
import { useStyles, classesdTableCell } from '../Table Component/TableTheme';
import Grid from '@material-ui/core/Grid';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';


function createData(title, frequency, startDate, endDate, template, algorithm) {
    return { title, frequency, startDate, endDate, template, algorithm };
}

const rows = [
    createData('W33ID', 'Bi-Weekly', 'May 26, 2020', 'June 23, 2021', 'Wash Optimization', 'WO Algorithm'),
    createData('W33ID', 'Bi-Weekly', 'May 26, 2020', 'June 23, 2021', 'Wash Optimization', 'WO Algorithm'),
    createData('W33ID', 'Bi-Weekly', 'May 26, 2020', 'June 23, 2021', 'Wash Optimization', 'WO Algorithm'),
    createData('W33ID', 'Bi-Weekly', 'May 26, 2020', 'June 23, 2021', 'Wash Optimization', 'WO Algorithm'),
    createData('W33ID', 'Bi-Weekly', 'May 26, 2020', 'June 23, 2021', 'Wash Optimization', 'WO Algorithm'),
    createData('W33ID', 'Bi-Weekly', 'May 26, 2020', 'June 23, 2021', 'Wash Optimization', 'WO Algorithm'),
    createData('W33ID', 'Bi-Weekly', 'May 26, 2020', 'June 23, 2021', 'Wash Optimization', 'WO Algorithm'),
    createData('W33ID', 'Bi-Weekly', 'May 26, 2020', 'June 23, 2021', 'Wash Optimization', 'WO Algorithm'),
    createData('W33ID', 'Bi-Weekly', 'May 26, 2020', 'June 23, 2021', 'Wash Optimization', 'WO Algorithm'),
    createData('W33ID', 'Bi-Weekly', 'May 26, 2020', 'June 23, 2021', 'Wash Optimization', 'WO Algorithm'),
    createData('W33ID', 'Bi-Weekly', 'May 26, 2020', 'June 23, 2021', 'Wash Optimization', 'WO Algorithm'),
    createData('W33ID', 'Bi-Weekly', 'May 26, 2020', 'June 23, 2021', 'Wash Optimization', 'WO Algorithm'),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

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
    { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
    { id: 'frequency', numeric: true, disablePadding: false, label: 'Frequency' },
    { id: 'startDate', numeric: true, disablePadding: false, label: 'Start Date' },
    { id: 'endDate', numeric: true, disablePadding: false, label: 'End Date' },
    { id: 'template', numeric: true, disablePadding: false, label: 'Template' },
    { id: 'algorithm', numeric: true, disablePadding: false, label: 'Algorithm' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead align="center">
            <TableRow>
                <TableCell align="center" padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all assets' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        align="center"
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'center'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        className={classes.tableHeader}
                    >
                        <TableSortLabel
                            align="center"
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
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
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const classes = useStyles();
    const { numSelected } = props;

    const [dense, setDense] = React.useState(false);

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    return (
        <Toolbar
            className={clsx(classes.toolbarRoot, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.toolbarTitle} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                    <h6 className={classes.toolbarTitle} variant="h6" id="tableTitle" component="div">
                        Configured Recommendations
                    </h6>
                )}
                
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label={
                    <h6 className={classes.controlLabel}>Condense</h6>
                }
            />

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

function ManageRecommendationTable() {

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


    return (
        <div>
            <div>
                <br></br>
                <h3 id="title">Manage Recommendations</h3>
                <h6 id="subtitle">Add, edit, delete and browse the configured recommendation</h6>
                <br></br>
            </div>
            <div>
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <Search />
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="Search" color="grey" />
                            <Button size="small" className={classes.filterBtn} endIcon={<FilterList />}>Add Filter</Button>

                            <Button className={classes.recBtn}>Create Recommendation</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <br></br>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.name)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.name}
                                                selected={isItemSelected}
                                                align="center"
                                            >
                                                <TableCell padding="checkbox" align="center">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="none" className={classes.tableBody}>
                                                    {row.title}
                                                </TableCell>
                                                <TableCell align="center" className={classes.tableBody}>{row.frequency}</TableCell>
                                                <TableCell align="center" className={classes.tableBody}>{row.startDate}</TableCell>
                                                <TableCell align="center" className={classes.tableBody}>{row.endDate}</TableCell>
                                                <TableCell align="center" className={classes.tableBody}>{row.template}</TableCell>
                                                <TableCell align="center" className={classes.tableBody}>{row.algorithm}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow align="center" classes={{ height: (dense ? 33 : 53) * emptyRows }}>
                                        <TableCell align="center" colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
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