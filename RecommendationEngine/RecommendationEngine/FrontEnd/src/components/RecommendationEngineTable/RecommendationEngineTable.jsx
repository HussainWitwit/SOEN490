import React from "react";
import PropTypes from 'prop-types';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import './RecommendationEngineTable.css';

export default function RecommendationEngineTable(props) {

  const { data, columnValues, dataGridSize, onClickRow } = props

  return (
    <div id="root">
      <div style={dataGridSize}>
        <DataGrid
          columns={columnValues}
          rows={data}
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
};
