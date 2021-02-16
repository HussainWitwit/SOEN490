import React from "react";
import PropTypes from 'prop-types';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import './RecommendationEngineTable.css';

export default function RecommendationEngineTable(props) {

  const { data, columnValues, onClickRow } = props

  return (
    <div id="root">
      <div style={{height: 800, width: 1230}}>
        <DataGrid
          component="div"
          pageSize={25}
          density={'compact'}
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
