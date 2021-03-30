import React, { useEffect, useState } from 'react';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import PageSubHeader from '../../components/PageSubHeader/PageSubHeader';
import { GetRecommendationJobList } from '../../api/endpoints/JobsEndpoints';
import './JobsPage.css';
import { mapDispatchDrillDownToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { mapStateToProps as mapAssetFilterStateToProps } from '../../redux/AssetFilterReducer/reducer-actions';
import { connect } from 'react-redux';
import { TableColumns as columns } from './TableConfig';
import { TableItemType,  filterTableItems } from '../../utilities/ArrayManipulationUtilities';

function JobsPage(props) {

    const { openScheduleDrilldown } = props;
    const [jobList, setJobList] = useState([]);
    const [defaultJobList, setDefaultJobList] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const RecommendationLinkColumn = [{
        field: 'configuredRecommendationTitle', headerName: 'Recommendation', type: 'string', width: 270, cellClassName: 'table-style', renderCell: (params) => (
            <a className='configured-recommendation' onClick={() => openScheduleDrilldown(params.getValue('configuredRecommendationId'))}>
                {params.getValue('configuredRecommendationTitle')}
            </a>)
    }];

    const getJobList = async () => {
        let response = await GetRecommendationJobList(props.selectedAsset);
        let responseWtihDateObjects = response.map((element) => {
            return {
                ...element,
                timestamp: new Date(element.timestamp)
        }});
        setJobList(responseWtihDateObjects);
        setDefaultJobList(responseWtihDateObjects);
        setisLoading(false);
    }

    const updateSearch = (input) => {
        setJobList(filterTableItems(TableItemType.Jobs, defaultJobList, input));
    }

    useEffect(() => {
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
                dateColumnName={'timestamp'}
                dateSortingOrder={'desc'}
                loading = {isLoading}
            />
        </div>
    );
}

export default connect(mapAssetFilterStateToProps, mapDispatchDrillDownToProps)(JobsPage);