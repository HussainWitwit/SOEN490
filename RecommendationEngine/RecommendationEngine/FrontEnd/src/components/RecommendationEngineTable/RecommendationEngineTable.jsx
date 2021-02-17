import React, {useState}  from "react";
import PropTypes from 'prop-types';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import './RecommendationEngineTable.css';

export default function RecommendationEngineTable(props) {

  const { data, columnValues, onClickRow, isClickable } = props

  const [rowId, setRowId] = useState(0);

  // const getRowId = row => setRowId(row.id);

  return (
    <div id="root">
      <div className={isClickable? 'table-style clickable ' : "table-style"}>
        <DataGrid
          pageSize={25}
          scrollbarSize={40}
          density={'compact'}
          columns={columnValues}
          rows={data}
          showToolbar
          components={{ Toolbar: GridToolbar }}
          onRowHover={isClickable}
          onRowClick={()=>{onClickRow(97)}}
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
};
