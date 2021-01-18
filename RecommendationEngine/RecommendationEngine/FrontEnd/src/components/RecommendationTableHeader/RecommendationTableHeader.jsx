import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import './RecommendationTableHeader.css';
export function EnhancedTableHead(props) {

  const { order, orderBy, headCells, handleSortingChange } = props;

  const sortingHandler = (property) => (event) => { handleSortingChange(event, property) };

  return (
    <TableHead id="table-head" className="custom">
      <TableRow id="table-row">
        <TableCell></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            id="tableHeader"  
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={true}
              classes={{ active: 'sortLabel' }}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={sortingHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span id="visuallyHidden">
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
   headCell: PropTypes.object.isRequired,
   onRequestSort: PropTypes.func.isRequired,
   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
   orderBy: PropTypes.string.isRequired,
 };