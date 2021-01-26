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


export function getSortingComparison(orderType, orderColumnTitle){
  return orderType === "desc"? (firstObj, secondObj) => sortingComparison(firstObj, secondObj, orderColumnTitle) : (firstObj, secondObj) => -sortingComparison(firstObj, secondObj, orderColumnTitle);
}


export function sortingComparison (firstObj, secondObj, orderColumnTitle){
  if (secondObj[orderColumnTitle] < firstObj[orderColumnTitle]) {
    return -1;
  }
  if (secondObj[orderColumnTitle] > firstObj[orderColumnTitle]) {
    return 1;
  }
  return 0;
}


export function tableSort (array, comparator){
  if(array != null || array != undefined){
  const rowElements = array.map((element, index) => [element, index]);
  rowElements.sort((firstObj, secondObj) => {
    const order = comparator(firstObj[0], secondObj[0]);
    if (order !== 0){
     return order;
    }else{
    return firstObj[1] - secondObj[1];
    }
  });
  return rowElements.map((element) => element[0]);
}}

export default function RecommendationEngineTable (props) {

  const {rowsValue, data, TableTitle, onClickRow, columnTitles } = props;

  const [orderType, setOrderType] = React.useState("asc");
  const [orderColumnTitle, setOrderColumnTitle] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isSelected, setIsSelected] = React.useState(null);

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleSortingChange = (event, property) => {
    const isAscending = orderColumnTitle === property && orderType === "asc";
    setOrderType(isAscending ? "desc" : "asc");
    setOrderColumnTitle(property);
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
        <Toolbar id="toolbar">
          <h6 className="toolBarTitle" variant="h6" data-testid="tableTitle" component="div">{TableTitle}</h6>
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
              data-testid="tablehead-title"
              order={orderType}
              orderColumnTitle={orderColumnTitle}
              headCells={columnTitles}
              handleSortingChange={handleSortingChange}
            />
            <TableBody>
              {data ? tableSort(data, getSortingComparison(orderType, orderColumnTitle))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((element, index) => {
                  return (
                    <TableRow
                    hover
                    id="tableRow"
                    data= "table-row"
                    tabIndex={-1}
                    selected={isSelected === element.id}
                    key={element.id}
                    className="custom"
                    onClick={() => {
                      onClickRow(element.id)
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
  onClickRow: PropTypes.func.isRequired,
  columnTitles: PropTypes.array.isRequired,
};
