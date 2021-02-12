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
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import './RecommendationEngineTable.css';


// export function getSortingComparison (orderType, orderColumnTitle) {
//   return orderType === "desc" ? (firstObj, secondObj) => sortingComparison(firstObj, secondObj, orderColumnTitle) : (firstObj, secondObj) => -sortingComparison(firstObj, secondObj, orderColumnTitle);
// }

// export function sortingComparison (firstObj, secondObj, orderColumnTitle) {
//   if (secondObj[orderColumnTitle] < firstObj[orderColumnTitle]) {
//     return -1;
//   }
//   if (secondObj[orderColumnTitle] > firstObj[orderColumnTitle]) {
//     return 1;
//   }
//   return 0;
// }

// export function tableSort (array, comparator) {
//   if (array != null || array != undefined) {
//     const rowElements = array.map((element, index) => [element, index]);
//     rowElements.sort((firstObj, secondObj) => {
//       const order = comparator(firstObj[0], secondObj[0]);
//       if (order !== 0) {
//         return order;
//       } else {
//         return firstObj[1] - secondObj[1];
//       }
//     });
//     return rowElements.map((element) => element[0]);
//   }
// }

export default function RecommendationEngineTable(props) {

  // const { rowsValue, data, tableTitle, onClickRow, columnTitles, dense, isClickable, disablePaginator } = props;

  const { data, columnValues, dataGridSize, tableTitle, onClickRow } = props





  // const [orderType, setOrderType] = React.useState("asc");
  // const [orderColumnTitle, setOrderColumnTitle] = React.useState("");
  // const [page, setPage] = React.useState(0);
  // const [denseAttribute, setDenseAttribute] = React.useState(dense);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [isSelected, setIsSelected] = React.useState(null);

  // const handleChangeDense = (event) => {
  //   setDenseAttribute(event.target.checked);
  // };

  // const handleSortingChange = (event, property) => {
  //   const isAscending = orderColumnTitle === property && orderType === "asc";
  //   setOrderType(isAscending ? "desc" : "asc");
  //   setOrderColumnTitle(property);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  return (
    <div id="root">
      {/* <Paper id="paper">

        {(!tableTitle && denseAttribute) ? '' : <Toolbar id="toolbar">
          <h6 className="tool-bar-title" variant="h6" data-testid="tableTitle" component="div">{tableTitle}</h6>
          {props.dense ? '' : <FormControlLabel
            id="liteSwitch"
            control={
              <Switch checked={denseAttribute} onChange={handleChangeDense} color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} />
            }
            label={<h6 id="control-label">Lite</h6>}
          />}
        </Toolbar>}
        <TableContainer>
          <Table
            id="table"
            aria-labelledby="tableTitle"
            size={denseAttribute ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              id="handleSort"
              data-testid="tablehead-title"
              orderType={orderType}
              orderColumnTitle={orderColumnTitle}
              headCells={columnTitles}
              handleSortingChange={handleSortingChange}
            /> */}

      {/* <TableBody
              id={isClickable ? "table-body clickable" : "table-body"}
              data-testid="table-body-cypress">

              {data && data.length > 0 &&
                (disablePaginator ? tableSort(data, getSortingComparison(orderType, orderColumnTitle))
                  : tableSort(data, getSortingComparison(orderType, orderColumnTitle))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
                  .map((element) => {
                    return (
                      <TableRow
                        key={element.id}
                        id="table-body"
                        hover={isClickable}
                        selected={isClickable && isSelected === element.id}
                        onClick={() => {
                          onClickRow(element.id)
                          setIsSelected(element.id)
                        }}
                      >
                        {rowsValue(element)}
                      </TableRow>
                    )
                  })}
            </TableBody> */}


      {/* </Table>
        </TableContainer>
        {disablePaginator ? '' : <TablePagination
          id="pagination"
          component="div"
          rowsPerPageOptions={[10, 25, 50, 100]}
          count={data ? data.length : 1}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />}
      </Paper> */}

      <div style={dataGridSize}>
        <DataGrid
          columns={columnValues}
        //   columns={[
        //     {field: 'id', headerName: 'ID', width: 150, cellClassName: 'table-style'},
        //     {field: 'name', headerName: 'Title', flex: 0.25, type: 'string', cellClassName: 'table-style'},
        //     {field: 'type', headerName: 'Type', flex: 0.25, type: 'string', cellClassName: 'table-style'},
        //     {field: 'granularity', headerName: 'Granularity', type: 'string', flex: 0.25, cellClassName: 'table-style'},
        //     {field: 'createdOn', headerName: 'Created On', type: 'dateTime', flex: 0.25, cellClassName: 'table-style'},
        // ]}
          rows={data}
        //   rows={[
        //     {id: '1', name: 'time', type: 'Yearly Wash Optimization', granularity: 'Yearly', createdOn: '2021-01-15T16:36:55'},
        //     {id: '2', name: 'ywo6', type: 'Yearly Wash Optimization', granularity: 'Yearly', createdOn: '2021-01-15T16:41:05'}
        // ]}
          showToolbar
          components={{ Toolbar: GridToolbar }}
          onRowClick={onClickRow}
        >
        </DataGrid>
      </div>
    </div>
  );
}
/* istanbul ignore next */
RecommendationEngineTable.propTypes = {
  columnsValues: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  tableTitle: PropTypes.string.isRequired,
  onClickRow: PropTypes.func.isRequired,
  dataGridSize: PropTypes.func.isRequired,
  // columnTitles: PropTypes.array.isRequired,
};
