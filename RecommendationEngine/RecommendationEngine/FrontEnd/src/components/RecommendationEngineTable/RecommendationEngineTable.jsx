import React from "react";
import Table from "@material-ui/core/Table";
import PropTypes from 'prop-types';
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { EnhancedTableHead } from '../../components/RecommendationTableHeader/RecommendationTableHeader';
import './RecommendationEngineTable.css';
import 'date-fns';

export default function RecommendationEngineTable (props) {

  const {rowsValue, data, openScheduleDrilldown, columnTitles } = props;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("createdOn");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isSelected, setIsSelected] = React.useState(null);

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleSortingChange = (event, property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function getSortingComparison(order, orderBy) {
    return order === "desc"? (a, b) => sortingComparison(a, b, orderBy) : (a, b) => -sortingComparison(a, b, orderBy);
  }
  
  function sortingComparison(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function tableSort(array, comparator) {
    if(array != null){
    const rowElements = array.map((element, index) => [element, index]);
    rowElements.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0){
       return order;
      }
      return a[1] - b[1];
    });
    return rowElements.map((element) => element[0]);
  }}

  return (
    <div id="root">
      <Paper id="paper">
        <Toolbar id="toolbar">
          <h6 className="toolBarTitle" variant="h6" data-testid="tableTitle" component="div">{props.TableTitle}</h6>
          <FormControlLabel
            id="liteSwitch"
            control={
              <Switch checked={dense} onChange={handleChangeDense} color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} />
            }
            label={<h6 id="controlLabel">Lite</h6>}
          />
        </Toolbar>

        <TableContainer>
          <Table
            id="table"
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              id="handleSort"
              order={order}
              orderBy={orderBy}
              headCells={columnTitles}
              handleSortingChange={handleSortingChange}
            />
            <TableBody>
              {data ? tableSort(data, getSortingComparison(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((element, index) => {

                  return (
                    <TableRow
                    hover
                    tabIndex={-1}
                    selected={isSelected === element.id}
                    key={element.id}
                    className="custom"
                    onClick={() => {
                      openScheduleDrilldown(element.id)
                      setIsSelected(element.id)
                    }}
                  >
                    {rowsValue(element)}
                  </TableRow>
                )
              }):null}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          id="pagination"
          component="div"
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
  );
}
  /* istanbul ignore next */
RecommendationEngineTable.propTypes = {
  rowsValue: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  TableTitle: PropTypes.string.isRequired,
  openScheduleDrilldown: PropTypes.func.isRequired,
  columnTitles: PropTypes.array.isRequired,
};
