import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import './BasicTableHeader.css';

export function EnhancedTableHead(props) {
  const { orderType, orderColumnTitle, headCells, handleSortingChange } = props;

  const sortingHandler = (property) => (event) => { handleSortingChange(event, property) };

  return (
    <TableHead id="table-head" className="custom">
      <TableRow id="table-row">
        <TableCell></TableCell>
        {headCells? headCells.map((headCell) => (
          <TableCell
          className= {headCell.id === "status" ? "custom-status-header": "custom" }
          key={headCell.id}
          sortDirection={orderColumnTitle === headCell.id ? orderType : false}
          >
            {headCell.label?<TableSortLabel
              id="table-header"
              active={orderColumnTitle === headCell.id}
              direction={orderColumnTitle === headCell.id ? orderType : "asc"}
              onClick={sortingHandler(headCell.id)}
            >
              {headCell.label}
              {orderColumnTitle === headCell.id ? (
                <span id="visually-hidden">
                  {orderType === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>:''}
          </TableCell>
        )):null}
      </TableRow>
    </TableHead>
  );
}
 /* istanbul ignore next */
   EnhancedTableHead.propTypes = {
   handleSortingChange: PropTypes.func.isRequired,
   orderType: PropTypes.oneOf(["asc", "desc"]).isRequired,
   orderColumnTitle: PropTypes.string.isRequired,
 };
