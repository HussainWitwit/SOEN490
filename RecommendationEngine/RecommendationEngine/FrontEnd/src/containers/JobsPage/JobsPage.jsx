import React, {  useEffect, useState } from 'react';
import { Grid} from '@material-ui/core';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import SearchBar from '../../common/SearchBar';
import { GetRecommendationJobList } from '../../api/endpoints/JobsEndpoints';
import './JobsPage.css';
import JobLogPopUp from '../JobLogPopUp/JobLogPopUp';

export default function JobsPage () {

    const [jobList, setJobList] = useState([]);
    const [defaultJobList, setDefaultJobList] = useState([]);

  /* istanbul ignore next */
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

    /* istanbul ignore next */
    const getJobList = async () => {
        let response = await GetRecommendationJobList();
        setJobList(response);
        setDefaultJobList(response);
    }

    /* istanbul ignore next */
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
                    </Grid>
                </div>
            </div>
            <br></br>
            <RecommendationEngineTable
                data = {jobList}
                columnValues = {columns}
                dataGridSize = {dataGridSize}
                onClickRow = {() => { }}
            />
        </div>
    );
}
