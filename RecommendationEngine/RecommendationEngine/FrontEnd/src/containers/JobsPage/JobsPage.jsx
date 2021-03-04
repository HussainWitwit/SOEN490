import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import SearchBar from '../../common/SearchBar';
import { GetRecommendationJobList } from '../../api/endpoints/JobsEndpoints';
import './JobsPage.css';
import JobLogPopUp from '../JobLogPopUp/JobLogPopUp';
import { mapDispatchDrillDownToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { connect } from 'react-redux';

function JobsPage (props) {

    const { openScheduleDrilldown } = props;
    const [jobList, setJobList] = useState([]);
    const [defaultJobList, setDefaultJobList] = useState([]);
    const [loading, setLoading] = useState(false);

    const startLoadingSpinner = () => {
        setLoading(true);
      }
    
      const stopLoadingSpinner = () => {
        setLoading(false);
      }

    const durationOption = {
        number: 'number',
        width: 200,
        valueFormatter: ({ value }) => (value + ' seconds')
    };

    const columns = [

        { field: 'id', headerName: 'Job ID', width: 125, cellClassName: 'table-style', hide: true },
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
        {
            field: 'configuredRecommendationTitle', headerName: 'Recommendation', type: 'string', width: 270, cellClassName: 'table-style', renderCell: (params) => (
                <a className='configured-recommendation' onClick={() => openScheduleDrilldown(params.getValue('configuredRecommendationId'))}>
                    {params.getValue('configuredRecommendationTitle')}
                </a>)
        },
        { field: 'duration', headerName: 'Job Duration', type: 'number', ...durationOption, flex: 0.12, cellClassName: 'table-style' },
        { field: 'assetName', headerName: 'Asset', type: 'string', flex: 0.12, cellClassName: 'table-style' },
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
        startLoadingSpinner();
        let response = await GetRecommendationJobList();
        setJobList(response);
        setDefaultJobList(response);
        stopLoadingSpinner();
    }

    const updateSearch = async (input) => {
        const filtered = defaultJobList.filter(job => {
            return job.configuredRecommendationTitle.toLowerCase().includes(input.toLowerCase())
                || job.assetName.toLowerCase().includes(input.toLowerCase())
                || job.status.toLowerCase().includes(input.toLowerCase())
                || job.timestamp.includes(input.toLowerCase())
                || (job.duration.toString() + " seconds").includes(input)
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
                loading={loading}
                data={jobList}
                columnValues={columns}
                isClickable={false}
                onClickRow={() => { }}
            />
        </div>
    );
}

export default connect(null, mapDispatchDrillDownToProps)(JobsPage);

