import React, { useEffect, useState } from 'react';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import PageSubHeader from '../../components/PageSubHeader/PageSubHeader';
import { GetRecommendationJobList } from '../../api/endpoints/JobsEndpoints';
import './JobsPage.css';
import { mapDispatchDrillDownToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { mapStateToProps as mapAssetFilterStateToProps } from '../../redux/AssetFilterReducer/reducer-actions';
import { connect } from 'react-redux';
import { TableColumns as columns } from './TableConfig';

function JobsPage(props) {

    const [jobList, setJobList] = useState([]);
    const [defaultJobList, setDefaultJobList] = useState([]);

    //Code duplication, however: this cannot be inside the TableConfig.jsx as the reducer action is passed at compile time and we want the function to be passed at runtime.
    const RecommendationLinkColumn = [{
        field: 'configuredRecommendationTitle', headerName: 'Recommendation', type: 'string', width: 270, cellClassName: 'table-style', renderCell: (params) => (
            <a className='configured-recommendation' onClick={() => props.openScheduleDrilldown(params.getValue('configuredRecommendationId'))}>
                {params.getValue('configuredRecommendationTitle')}
            </a>)
    }];

    const getJobList = async () => {
        let response = await GetRecommendationJobList(props.selectedAsset);
        //Necessary for datagrid date columns A.J.U.U
        let responseWtihDateObjects = response.map((element) => { console.log(element.timestamp)
            return {
                ...element,
                timestamp: new Date(element.timestamp)
        }});
        setJobList(responseWtihDateObjects);
        setDefaultJobList(responseWtihDateObjects);
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
                pageTitle="Recommendation Jobs"
                descriptionSubtitle="Browse, edit, and delete recommendation jobs"
                showCreateRecommendation={false}
                updateSearch={updateSearch}
                />
            </div>
            <br></br>
            <RecommendationEngineTable
                data={jobList}
                columnValues={[...columns, ...RecommendationLinkColumn]}
                isClickable={false}
                onClickRow={() => { }}
<<<<<<< HEAD
                dateColumnName={'timestamp'}
                dateSortingOrder={'desc'}
=======
                loading = {isLoading}
>>>>>>> development
            />
        </div>
    );
}

export default connect(mapAssetFilterStateToProps, mapDispatchDrillDownToProps)(JobsPage);