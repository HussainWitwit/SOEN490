import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { EnhancedTableHead } from '../../components/RecommendationTableHeader/RecommendationTableHeader';
import { mapDispatchToProps } from '../../redux/RightPanelReducer/reducer-actions'
import { connect } from 'react-redux';
import './ConfiguredRecommendationTable.css';
import 'date-fns';

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Title"},
  { id: "type", numeric: false, disablePadding: false, label: "Type" },
  { id: "granularity", numeric: false, disablePadding: false, label: "Granularity" },
  { id: "createdOn", numeric: false, disablePadding: false, label: "Created On" },
];

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
  const rowElements = array.map((element, index) => [element, index])
  rowElements.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0){
     return order;
    }
    return a[1] - b[1];
  });
  return rowElements.map((element) => element[0]);
}

export function ConfiguredRecommendationTable(props) {
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

  return (
    <div id="root">
      <Paper id="paper">
        <Toolbar id="toolbar">
          <h6 className="toolBarTitle" variant="h6" id="tableTitle" component="div"> Configured Recommendations</h6>
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
              headCells={headCells}
              handleSortingChange={handleSortingChange}
            />
            <TableBody>
              {tableSort(props.data, getSortingComparison(order, orderBy))
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
                      props.openScheduleDrilldown(element.id)
                      setIsSelected(element.id)
                    }}
                  >
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        className="primaryKey"
                        id="tableBody"
                      >
                        {element.name}
                      </TableCell>
                      <TableCell align="custom" id="tableBody">{element.type}</TableCell>
                      <TableCell align="custom" id="tableBody">{element.granularity}</TableCell>
                      <TableCell align="custom" id="tableBody">{element.createdOn}</TableCell>
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          id="pagination"
          component="div"
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={props.data ? props.data.length : 1}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(ConfiguredRecommendationTable);