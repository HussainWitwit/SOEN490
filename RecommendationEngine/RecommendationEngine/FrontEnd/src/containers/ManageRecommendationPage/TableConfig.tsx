export const TableColumns = [
    {field: 'id', headerName: 'ID', width: 150, cellClassName: 'table-style', hide: true},
    {field: 'name', headerName: 'Title', flex:0.25, type: 'string', cellClassName: 'table-style'},
    {field: 'type', headerName: 'Type', flex: 0.25, type: 'string', cellClassName: 'table-style'},
    {field: 'granularity', headerName: 'Granularity', type: 'string', flex: 0.25, cellClassName: 'table-style'},
    {field: 'createdOn', headerName: 'Created On', type: 'date', flex: 0.25, cellClassName: 'table-style'},
]