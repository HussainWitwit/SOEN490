import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import SearchBar from '../../common/SearchBar';
import PageSubHeader from '../../components/PageSubHeader/PageSubHeader';
import { GetRecommendationJobList } from '../../api/endpoints/JobsEndpoints';
import './JobsPage.css';
import { mapDispatchDrillDownToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { mapStateToProps as mapAssetFilterStateToProps } from '../../redux/AssetFilterReducer/reducer-actions';
import { connect } from 'react-redux';
import JobLogPopUp from '../JobLogPopUp/JobLogPopUp';

function JobsPage(props) {

    const { openScheduleDrilldown } = props;
    const [jobList, setJobList] = useState([]);
    const [defaultJobList, setDefaultJobList] = useState([]);
    const [isLoading, setisLoading] = useState(true);

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
                    controlled={null}
                >
                </JobLogPopUp>
            )
        }
    ];

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
        const getJobList = async () => {
            let response = await GetRecommendationJobList(props.selectedAsset);
            setJobList(response);
            setDefaultJobList(response);
            setisLoading(false);
        }
        getJobList();
    }, [props.selectedAsset])


    return (
        <div id="main-container">
            <div></div>
            <div>
                <br></br>
                <PageSubHeader
                pageTitle="Recommendation Job"
                descriptionSubtitle="Browse, edit, and delete recommendation jobs"
                showCreateRecommendation={false}
                updateSearch={updateSearch}
                />
            </div>
            <br></br>
            <RecommendationEngineTable
                data={jobList}
                columnValues={columns}
                isClickable={false}
                onClickRow={() => { }}
                loading = {isLoading}
            />
        </div>
    );
}

export default connect(mapAssetFilterStateToProps, mapDispatchDrillDownToProps)(JobsPage);