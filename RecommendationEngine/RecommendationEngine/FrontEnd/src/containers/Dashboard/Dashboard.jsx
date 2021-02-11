import React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import JobLogPopUp from '../JobLogPopUp/JobLogPopUp';
import './Dashboard.css';

// const riceFilterModel = {
//     items: [{ columnField: 'commodity', operatorValue: 'contains', value: 'rice' }],
// };

const currencyFormatter = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  });
  
  const CADPrice = {
    type: 'number',
    width: 200,
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
  };



//   const positiveNumbers = {
//       cellClassName = "table-positive-numbers"
//   }

function Dashboard() {

    return (
        <div>
            <div>
                Dashboard!
           </div>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    columns={[
                        {field: 'id', headerName: 'Result ID', width: 150, cellClassName: 'table-style'},
                        {field: 'netSaving', headerName: 'Net Saving', type: 'number',...CADPrice, flex: 0.25, cellClassName: 'table-positive-numbers'},
                        {field: 'returnOnInvestment', headerName: 'Return On Investment', type: 'number', flex: 0.25, cellClassName: 'table-positive-numbers'},
                        {field: 'costOfAction', headerName: 'Cost of Action', type: 'number',...CADPrice, flex: 0.25, cellClassName: 'table-negative-numbers'},
                        {field: 'costOfInaction', headerName: 'Cost of Inaction', type: 'number', ...CADPrice, flex: 0.25, cellClassName: 'table-negative-numbers'}
                    ]}

                    rows={[
                        {id: 177, netSaving: '1746.11', returnOnInvestment: '3,372.52'+'%', costOfAction: '53.36', costOfInaction: '4832.48'},
                        {id: 184, netSaving: '19118.88', returnOnInvestment: '35,932.13'+'%', costOfAction: '53.36', costOfInaction: '40436.44'}
                    ]}

                    // onCellClick={}
                    // onCellHover={}
                    // onRowClick={}
                    // onRowSelected={}
                    // filterModel={riceFilterModel}
                    showToolbar
                    components={{
                        Toolbar: GridToolbar, 
                    }}
                />
            </div>


        </div>


    )
}

export default Dashboard;