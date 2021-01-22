import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { FilterList } from '@material-ui/icons';
import { Grid, TableCell } from '@material-ui/core';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import SearchBar from '../../common/SearchBar';
import { getRecommendationJobList } from '../../api/endpoints/JobsEndpoints';
import './JobsPage.css';

/* istanbul ignore next */
export const RowsToDisplay = (element) => (
    <React.Fragment>
        <TableCell />
        <TableCell component="th" scope="row" padding="default" className="primaryKey" id="tableBody">{element.id}</TableCell>
        <TableCell style={{ width: ' 20% ', paddingRight: '80px' }} id="table-body-status"><div id='job-status'
            style={element.status === 'Running' ? { color: '#FFCE31', border: '2px solid #FFCE31' } : element.status === 'Failed' ? { color: 'red', border: '2px solid red' } : { color: '#4AC71F', border: '2px solid #4AC71F' }}>
            {element.status}</div></TableCell>
        <TableCell id="tableBody" style={{ width: ' 30% ' }}>{element.timestamp}</TableCell>
        <TableCell id="tableBody">{element.duration} seconds</TableCell>
        <TableCell id="tableBody"><p>{element.configuredRecommendationId}</p></TableCell>
        <TableCell />
    </React.Fragment>
);

export default function JobsPage () {

    const [recommendationJobList, setRecommendationJobList] = useState();
    const [jobList, setJobList] = useState(recommendationJobList);
    const [defaultJobList, setDefaultJobList] = useState(recommendationJobList);

    /* istanbul ignore next */
    const headCells = [
        { id: 'jobId', label: 'Job ID' },
        { id: 'status', label: 'Status' },
        { id: 'timestamp', label: 'Timestamp' },
        { id: 'jobDuration', label: 'Job Duration' },
        { id: 'configuredRecommendation', label: 'Configured Recommendation' },
    ];

    /* istanbul ignore next */
    const getJobList = async () => {
        let response = await getRecommendationJobList();
        setRecommendationJobList(response);
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
                TableTitle={"Recommendation Jobs"}
                onClick={() => { }}
                columnTitles={headCells}
            />
        </div>
    );
}
