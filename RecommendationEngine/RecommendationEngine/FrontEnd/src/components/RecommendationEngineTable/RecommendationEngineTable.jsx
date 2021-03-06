import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import './RecommendationEngineTable.css';

export default function RecommendationEngineTable(props) {

  const { data, columnValues, onClickRow, isClickable, loading } = props
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      setIsLoading(data.length ? false : true)
  }, [data])

  return (
    <div id="root">
      <div className={isClickable? 'table-style clickable ' : "table-style"}>
        <DataGrid
          autoHeight={true}
          pageSize={10}
          rowsPerPageOptions={[10,25,50,100]}
          scrollbarSize={40}
          density={'compact'}
          columns={columnValues}
          rows={data}
          loading={isLoading}
          showToolbar
          components={{ Toolbar: GridToolbar }}
          onRowClick={({row}) => onClickRow(row.id)}
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