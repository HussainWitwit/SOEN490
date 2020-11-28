import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { EnhancedTableHead } from '../../components/RecommendationTableHeader/RecommendationTableHeader'
import Switch from '@material-ui/core/Switch';
import './ConfiguredRecommendationTable.css';
import 'date-fns';

const headCells = [
    { id: 'title', label: 'Title' },
    { id: 'type', label: 'Type' },
    { id: 'granularity', label: 'Granularity' },
    // { id: 'RecDateTime', label: 'Recurrence Datetime' },
    // { id: 'RecDayOfWeek', label: 'Day of week' },
    { id: 'createdOn', label: 'Created On' },
    // { id: 'createdBy', label: 'Created By' },
  ];

//TODO: This should be a generic component, ask Alain if help is needed.
export default function ConfiguredRecommendationTable(props) {
    
    const [dense, setDense] = React.useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);
    //TODO: Beware for data as props

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

  // handling the empty rows for the method that compresses the table rows
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

    return (
        <div id="root">
        <Paper id="paper">
          <Toolbar id="toolbar">
            <h6 className="toolBarTitle" variant="h6" id="tableTitle" component="div"> Configured Recommendations</h6>
            <FormControlLabel
              control={
                <Switch checked={dense} onChange={handleChangeDense} color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} />
              }
              label={<h6 id="controlLabel">Lite</h6>}
            />
          </Toolbar>
          <TableContainer>
            <Table
              id="table" aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'} aria-label="enhanced table"
            >
              <EnhancedTableHead order={order} orderBy={orderBy}
                onRequestSort={handleRequestSort}
                headers = {headCells}
                rowCount={props.data ? props.data.length : 1}
              />
              <TableBody id="table-body">
                {props.data && props.data.map((element, index) => {
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
                      <TableCell className="custom" id="tableBody">{element.createdOn}</TableCell>
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
          <TablePagination id="pagination" rowsPerPageOptions={[10, 25, 50, 100]} count={props.data.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
        </Paper>
      </div>
    );
}