export const TableColumns = [
    {field: 'id', headerName: 'ID', width: 150, cellClassName: 'table-style', hide: true},
    {field: 'createdOn', headerName: 'Created On', type: 'dateTime', flex: 0.20, cellClassName: 'table-style'},
    {field: 'name', headerName: 'Title', flex:0.20, type: 'string', cellClassName: 'table-style'},
    {field: 'type', headerName: 'Type', flex: 0.20, type: 'string', cellClassName: 'table-style'},
    {field: 'granularity', headerName: 'Granularity', type: 'string', flex: 0.20, cellClassName: 'table-style'},
    {field: 'recurrenceDatetime', headerName: 'Next Job Execution', type: 'dateTime', flex: 0.20, cellClassName: 'table-style'},

]