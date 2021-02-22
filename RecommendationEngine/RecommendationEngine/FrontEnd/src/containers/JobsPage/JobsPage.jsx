import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import SearchBar from '../../common/SearchBar';
import { GetRecommendationJobList } from '../../api/endpoints/JobsEndpoints';
import './JobsPage.css';
import JobLogPopUp from '../JobLogPopUp/JobLogPopUp';
import { mapDispatchDrillDownToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { connect } from 'react-redux';

function JobsPage(props) {

    const { openScheduleDrilldown } = props;
    const [jobList, setJobList] = useState([]);
    const [defaultJobList, setDefaultJobList] = useState([]);

    const durationOption = {
        number: 'number',
        width: 200,
        valueFormatter: ({ value }) => (value + ' seconds')
    };

    const columns = [
        
        { field: 'id', headerName: 'Job ID', width: 125, cellClassName: 'table-style' },
        { field: 'timestamp', headerName: 'Timestamp', type: 'date', flex: 0.2, cellClassName: 'table-style' },
        {
            field: 'status',
            headerName: 'Status',
            type: 'string',
            flex: 0.17,
            headerAlign: 'center',
            renderCell: (params) => (
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
        { field: 'configuredRecommendationTitle', headerName: 'Recommendation', type: 'string', width: 270, cellClassName: 'table-style', renderCell: (params) => (
        <a onClick={() => openScheduleDrilldown(params.getValue('configuredRecommendationId'))}>
            {params.getValue('configuredRecommendationTitle')}
        </a>)},
        { field: 'assetName', headerName: 'Asset', type: 'string', flex: 0.12, cellClassName: 'table-style'},
        {
            field: 'jobLog',
            headerName: 'Log',
            flex: 0.08,
            headerAlign: 'center',
            renderCell: (params) => (
                <JobLogPopUp
                    className={"job-log-style"}
                    jobId={params.getValue('id')}
                >
                </JobLogPopUp>
            )
        }
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
                    </Grid>
                </div>
            </div>
            <br></br>
            <RecommendationEngineTable
                data={jobList}
                columnValues={columns}
                isClickable={false}
                onClickRow={() => { }}
            />
        </div>
    );
}

export default connect(null, mapDispatchDrillDownToProps)(JobsPage);

