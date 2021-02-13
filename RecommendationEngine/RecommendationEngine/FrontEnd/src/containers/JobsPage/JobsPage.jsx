import React, {  useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { FilterList } from '@material-ui/icons';
import { Grid, TableCell } from '@material-ui/core';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import SearchBar from '../../common/SearchBar';
import { GetRecommendationJobList } from '../../api/endpoints/JobsEndpoints';
import './JobsPage.css';
import JobLogPopUp from '../JobLogPopUp/JobLogPopUp';
import { useHistory } from "react-router-dom";


const StatusComponent = (status) => (
    <div id='job-status'
    style={status === 'Running' ? { color: '#FFCE31', border: '2px solid #FFCE31' } : status === 'Failed' ? { color: 'red', border: '2px solid red' } : { color: '#4AC71F', border: '2px solid #4AC71F' }}>
    {status}</div>
);

export default function JobsPage () {
    
    const [jobList, setJobList] = useState([]);
    const [defaultJobList, setDefaultJobList] = useState([]);

    let history = useHistory();
    
    const RowsToDisplay = (element) => (
        <React.Fragment>
            <TableCell />
            <TableCell id="table-body">{element.id}</TableCell>
            <TableCell id="table-body-status">{StatusComponent(element.status)}</TableCell>
            <TableCell id="table-body">{element.timestamp}</TableCell>
            <TableCell id="table-body">{element.duration} seconds</TableCell>
            <TableCell id="table-body"><p onClick={() => {history.push(`/recommendations-manage/${element.configuredRecommendationId}`)}}>{element.configuredRecommendationTitle}</p></TableCell>
            <TableCell ><JobLogPopUp jobId={element.id} /></TableCell>
        </React.Fragment>
    );

    const headCells = [
        { id: 'id', label: 'Job ID' },
        { id: 'status', label: 'Status' },
        { id: 'timestamp', label: 'Timestamp' },
        { id: 'duration', label: 'Job Duration' },
        { id: 'configuredRecommendationTitle', label: 'Configured Recommendation' },
        {id: '', label: ''}
    ];

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
        getJobList();
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
                rowsValue={RowsToDisplay}
                data={jobList}
                tableTitle={"Recommendation Jobs"}
                onClickRow={()=>{}}
                columnTitles={headCells}
            />
        </div>
    );
}
