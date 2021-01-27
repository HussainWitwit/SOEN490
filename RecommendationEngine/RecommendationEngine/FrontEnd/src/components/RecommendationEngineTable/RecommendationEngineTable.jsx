import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { EnhancedTableHead } from '../RecommendationTableHeader/RecommendationTableHeader'
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import './RecommendationEngineTable.css';
import 'date-fns';

export default function RecommendationEngineTable (props) {

  const [dense, setDense] = React.useState(props.dense);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [isSelected, setIsSelected] = React.useState(null);

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


  return (
    <div id="root">
      <Paper id="paper">
        
        {(!props.tableTittle && props.dense)? '': <Toolbar id="toolbar">
          <h6 className="toolBarTitle" variant="h6" data-testid="tableTitle" component="div">{props.TableTitle}</h6>
          {props.dense?'':<FormControlLabel
            id="liteSwitch"
            control={
              <Switch checked={dense} onChange={handleChangeDense} color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} />
            }
            label={<h6 id="controlLabel">Lite</h6>}
          />}
        </Toolbar>}
        <TableContainer>
          <Table
            id="table" aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'} aria-label="enhanced table"
          >
            <EnhancedTableHead id="handleSort" order={order} orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headers={props.columnTitles}
              rowCount={props.data ? props.data.length : 1}
            />
            <TableBody class={props.isClickable?"tableBody clickable":"tableBody"} data-testid="table-body-cypress">
              {props.data && props.data.length>0 && (props.disablePaginator? props.data : props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)).map((element) => {
                return (
                  <TableRow
                    key={element.id}
                    className="custom"
                    hover = {props.isClickable}
                    selected={props.isClickable && isSelected === element.id}
                    onClick={() => {
                      props.onClick(element.id)
                      setIsSelected(element.id)
                    }}
                  >
                    {props.rowsValue(element)}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {props.disablePaginator?'':<TablePagination
          id="pagination"
          component="div"
          rowsPerPageOptions={[10, 25, 50, 100]}
          count={props.data ? props.data.length : 1}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />}
      </Paper>
    </div>
  );
}
  /* istanbul ignore next */
RecommendationEngineTable.propTypes = {
  rowsValue: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  TableTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  columnTitles: PropTypes.array.isRequired
};
