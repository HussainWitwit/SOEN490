import React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import JobLogPopUp from '../JobLogPopUp/JobLogPopUp';
import './Dashboard.css';

// const riceFilterModel = {
//     items: [{ columnField: 'commodity', operatorValue: 'contains', value: 'rice' }],
// };

//   const positiveNumbers = {
//       cellClassName = "table-positive-numbers"
//   }

function Dashboard() {

    return (
        <div>
            <div>
                Dashboard!
          </div>

            {/* <div style={{ height: 400, width: '100%' }}>
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
            </div> */}

            {/* <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    columns={[
                        {field: 'id', headerName: 'Job ID', width: 150, cellClassName: 'table-style'},

                        {field: 'status',
                         headerName: 'Status', 
                         type: 'string',
                         flex: 0.20,
                         headerAlign: 'center',
                         renderCell: (params) => (
                           <div 
                           className={
                               params.getValue('status') === "Running"? 'job-status-running' :
                               params.getValue('status') === "Failed"? 'job-status-failed' : 'job-status-success'}
                            >
                               {params.getValue('status')}
                           </div>
                         )},

                        {field: 'timestamp', headerName: 'Timestamp', type: 'dateTime', flex: 0.20, cellClassName: 'table-style'},
                        {field: 'duration', headerName: 'Job Duration', flex: 0.20, cellClassName: 'table-style'},
                        {field: 'configuredRecommendationTitle', headerName: 'Configured Recommendation', type: 'string', flex: 0.20, cellClassName: 'table-style'},
                        {field: 'jobLog',
                         headerName: 'Job Log',
                         flex: 0.20,
                         headerAlign: 'center',
                         renderCell: (params) => (
                        <JobLogPopUp 
                        className={"job-log-style"}
                        jobId={params.getValue('id')}
                        >
                        </JobLogPopUp>
                         )}
                    ]}

                    rows={[
                        {id: 176, status: 'Failed', timestamp: '2021-01-15T12:15:25', duration: '2'+" seconds", configuredRecommendationTitle: 'algoDemo'},
                        {id: 177, status: 'Success', timestamp: '2021-01-15T12:23:26', duration: '10'+" seconds", configuredRecommendationTitle: 'finalTestYWO'},
                        {id: 178, status: 'Running', timestamp: '2021-01-15T12:23:39', duration: '17'+" seconds", configuredRecommendationTitle: 'finaTest'}
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
            </div> */}

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    columns={[
                        {field: 'id', headerName: 'ID', width: 150, cellClassName: 'table-style'},
                        {field: 'name', headerName: 'Title', flex: 0.25, type: 'string', cellClassName: 'table-style'},
                        {field: 'type', headerName: 'Type', flex: 0.25, type: 'string', cellClassName: 'table-style'},
                        {field: 'granularity', headerName: 'Granularity', type: 'string', flex: 0.25, cellClassName: 'table-style'},
                        {field: 'createdOn', headerName: 'Created On', type: 'dateTime', flex: 0.25, cellClassName: 'table-style'},
                    ]}

                    rows={[
                        {id: '1', name: 'time', type: 'Yearly Wash Optimization', granularity: 'Yearly', createdOn: '2021-01-15T16:36:55'},
                        {id: '2', name: 'ywo6', type: 'Yearly Wash Optimization', granularity: 'Yearly', createdOn: '2021-01-15T16:41:05'}
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