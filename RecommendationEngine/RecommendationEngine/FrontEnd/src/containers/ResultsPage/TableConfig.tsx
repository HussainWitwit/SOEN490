const currencyFormatter = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
});

const CADPrice = {
    type: 'number',
    width: 200,
    valueFormatter: (param: any) => currencyFormatter.format(Number(param.value)),
};

const percentageFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const PercentageOption = {
    number: 'number',
    width: 200,
    valueFormatter: (param: any) => (percentageFormatter.format(Number(param.value)) + '%')
};

export const TableColumns = [
    { field: 'id', headerName: 'Result ID', width: 150, cellClassName: 'table-style', hide: true },
    { field: 'resultOutputDate', headerName: 'Timestamp', type: 'dateTime', flex: 0.14, cellClassName: 'table-style' },
    { field: 'assetName', headerName: 'Asset', type: 'string', flex: 0.14, cellClassName: 'table-style' },
    { field: 'netSaving', headerName: 'Net Saving', ...CADPrice, flex: 0.14, cellClassName: 'table-positive-numbers' },
    { field: 'returnOnInvestment', headerName: 'Return On Investment', type: 'number', ...PercentageOption, flex: 0.14, cellClassName: 'table-positive-numbers' },
    { field: 'costOfAction', headerName: 'Cost of Action',...CADPrice, flex: 0.14, cellClassName: 'table-negative-numbers' },
    { field: 'costOfInaction', headerName: 'Cost of Inaction',...CADPrice, flex: 0.14, cellClassName: 'table-negative-numbers' }
]

