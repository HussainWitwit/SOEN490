
import React from 'react';
import JobLogPopUp from '../JobLogPopUp/JobLogPopUp';

const durationOption = {
    number: 'number',
    width: 200,
    valueFormatter: (param: any) => (param.value + ' seconds')
};

export const TableColumns = [

    { field: 'id', headerName: 'Job ID', width: 125, cellClassName: 'table-style', hide: true },
    { field: 'timestamp', headerName: 'Timestamp', type: 'date', flex: 0.2, cellClassName: 'table-style' },
    {
        field: 'status',
        headerName: 'Status',
        type: 'string',
        flex: 0.17,
        headerAlign: 'center',
        renderCell: (params: any) => (
            <div
                className={
                    params.getValue('status') === "Running" ? 'job-status-running' :
                        params.getValue('status') === "Failed" ? 'job-status-failed' : 'job-status-success'}
            >
                {params.getValue('status')}
            </div>
        )
    },
    { field: 'duration', headerName: 'Job Duration', type: 'number', ...durationOption, flex: 0.12, cellClassName: 'table-style' },
    { field: 'assetName', headerName: 'Asset', type: 'string', flex: 0.12, cellClassName: 'table-style' },
    {
        field: 'jobLog',
        headerName: 'Log',
        flex: 0.08,
        headerAlign: 'center',
        renderCell: (params: any) => (
            <JobLogPopUp
                className={"job-log-style"}
                jobId={params.getValue('id')}
                controlled={null}
            >
            </JobLogPopUp>
        )
    }
];