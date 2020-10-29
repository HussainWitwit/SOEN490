import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FilterList } from '@material-ui/icons';
import './ManageRecommendationTable.css';
import { useStyles, StyledTableCell } from '../Table Component/TableTheme';


function TablePaginationActions(props) {
    const style = useStyles()
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={style.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

function createData(name, frequency, startDate, endDate, template, algo) {
    return { name, frequency, startDate, endDate, template, algo };
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

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function ManageRecommendationTable() {
    const style = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <div>
                <h3 id="title">Manage Recommendation</h3>
                <h6 id="subtitle">Add, edit, delete and browse the configured recommendation</h6>
                <br></br>
            </div>
            <div>
                <form className={style.rootSearchBar} noValidate autoComplete="off">
                    <TextField id="filled-search" label="Search field" type="search" variant="filled" />
                    <Button variant="contained" color="primary" className={style.filterBtn} endIcon={<FilterList />}>Add Filter</Button>
                </form>
            </div>
            <div>
                <div>

                </div>
                <div>
                    <Button className={style.recBtn}>+ Recommendation</Button>
                </div>
            </div>
            <div id="table">
                <TableContainer component={Paper}>
                    <Table className={style.table} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell align="center">Frequency</StyledTableCell>
                                <StyledTableCell align="center">Start Date</StyledTableCell>
                                <StyledTableCell align="center">End Date</StyledTableCell>
                                <StyledTableCell align="center">Template</StyledTableCell>
                                <StyledTableCell align="center">Algorithm</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <TableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell style={{ width: 160 }} align="center">
                                        {row.frequency}
                                    </StyledTableCell>
                                    <StyledTableCell style={{ width: 160 }} align="center">
                                        {row.startDate}
                                    </StyledTableCell>
                                    <StyledTableCell style={{ width: 160 }} align="center">
                                        {row.endDate}
                                    </StyledTableCell>
                                    <StyledTableCell style={{ width: 160 }} align="center">
                                        {row.template}
                                    </StyledTableCell>
                                    <StyledTableCell style={{ width: 160 }} align="center">
                                        {row.algo}
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                    classes={{
                                        toolbar: style.toolbar,
                                    }

                                    }
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>

            </div>
        </div>

    );
}
export default ManageRecommendationTable;