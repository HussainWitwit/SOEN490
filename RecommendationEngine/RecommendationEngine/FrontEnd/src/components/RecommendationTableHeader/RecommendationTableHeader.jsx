import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import './RecommendationTableHeader.css';


export function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead id="table-head" className="custom">
        <TableRow id="table-row">
          <TableCell id="table-cell" className="custom"></TableCell>
          {props.headers.map((headCell) => (
            <TableCell
              className="custom"
              key={headCell.id}
              // align={headCell.numeric ? 'left' : 'center'}
              sortDirection={orderBy === headCell.id ? order : false}
              id="tableHeader"
            >
              <TableSortLabel
                id="sort-label"
                className="custom"
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span id="visuallyHidden">
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
    onRequestSort: PropTypes.func,
    order: PropTypes.oneOf(['asc', 'desc']),
    orderBy: PropTypes.string,
  };