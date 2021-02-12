import React, {  useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { FilterList } from '@material-ui/icons';
import { Grid, TableCell } from '@material-ui/core';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import SearchBar from '../../common/SearchBar';
import { GetRecommendationJobList } from '../../api/endpoints/JobsEndpoints';
import './JobsPage.css';
import JobLogPopUp from '../JobLogPopUp/JobLogPopUp';

// const RowsToDisplay = (element) => (
//     <React.Fragment>
//         <TableCell />
//         <TableCell id="table-body">{element.id}</TableCell>
//         <TableCell id="table-body-status">{StatusComponent(element.status)}</TableCell>
//         <TableCell id="table-body">{element.timestamp}</TableCell>
//         <TableCell id="table-body">{element.duration} seconds</TableCell>
//         <TableCell id="table-body"><p>{element.configuredRecommendationTitle}</p></TableCell>
//         <TableCell ><JobLogPopUp jobId={element.id} /></TableCell>
//     </React.Fragment>
// );

// const StatusComponent = (status) => (
//     <div id='job-status'
//         style={status === 'Running' ? { color: '#FFCE31', border: '2px solid #FFCE31' } : status === 'Failed' ? { color: 'red', border: '2px solid red' } : { color: '#4AC71F', border: '2px solid #4AC71F' }}>
//     {status}</div>
// );

export default function JobsPage () {

    const [jobList, setJobList] = useState([]);
    const [defaultJobList, setDefaultJobList] = useState([]);

    // const headCells = [
    //     { id: 'id', label: 'Job ID' },
    //     { id: 'status', label: 'Status' },
    //     { id: 'timestamp', label: 'Timestamp' },
    //     { id: 'duration', label: 'Job Duration' },
    //     { id: 'configuredRecommendationTitle', label: 'Configured Recommendation' },
    //     {id: '', label: ''}
    // ];

    const columns = [
    
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
    ];

    const dataGridSize = { height: 400, width: '100%' };


    const getJobList = async () => {
        let response = await GetRecommendationJobList();
        setJobList(response);
        setDefaultJobList(response);
    }

    const updateSearch = async (input) => {
        const filtered = defaultJobList.filter(job => {
            return job.id.toString().includes(input.toString())
        })
        setJobList(filtered);
    }

    useEffect(() => {
        getJobList([]);
    }, [])

    return (
        <div id="main-container">
            <div></div>
            <div>
                <br></br>
                <Grid id="grid-container1" container spacing={1} className="gridContainerStyle">
                    <Grid id="grid1" item>
                        <h3 id="title">Recommendation Jobs</h3>
                        <h6 id="subtitle">Browse, edit and delete recommendation jobs</h6>
                    </Grid>
                </Grid>
                <br></br>
            </div>
            <div>
                <div>
                    <Grid id="grid-container2" container spacing={1} className="gridContainerStyle">
                        <Grid item id="data-testid" >
                            <SearchBar
                                placeholder="Search for a job..."
                                onSearchUpdate={updateSearch}
                            />
                        </Grid>
                        <Grid item>
                            <Button size="small" id="filterBtn" endIcon={<FilterList />}>
                                Add Filter
              </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <br></br>
            <RecommendationEngineTable
                // rowsValue={RowsToDisplay}
                // data={jobList}
                // tableTitle={"Recommendation Jobs"}
                // onClickRow={() => { }}
                // columnTitles={headCells}
                data = {jobList}
                columnValues = {columns}
                dataGridSize = {dataGridSize}
                tableTitle = {"Recommendation Jobs"}
                onClickRow = {() => { }}
            />
        </div>
    );
}
