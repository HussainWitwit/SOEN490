import React, { useEffect, useState } from 'react';
import { RecommendationsPageTemplate } from '../../common/RecommendationsPageTemplate/RecommendationsPageTemplate';
import { GetRecommendationJobList } from '../../api/endpoints/JobsEndpoints';
import { mapDispatchDrillDownToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { mapStateToProps as mapAssetFilterStateToProps } from '../../redux/AssetFilterReducer/reducer-actions';
import { connect } from 'react-redux';
import { TableColumns as columns } from './TableConfig';
import { TableItemType, filterTableItems } from '../../utilities/ArrayManipulationUtilities';
import './JobsPage.css';
import PropTypes from 'prop-types';

function JobsPage (props) {

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
      }
    });
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
    <RecommendationsPageTemplate
      pageTitle={"Recommendation Jobs"}
      subtTitleDescription={"Browse, edit, and delete recommendation jobs"}
      showCreateRecommendationButton={false}
      onSearch={updateSearch}
      tableData={jobList}
      tableColumns={[...columns, ...RecommendationLinkColumn]}
      onTableClickRow={() => { }}
      isRowClickable={false}
      dateColumnName={'timestamp'}
      dateSortingOrder={'desc'}
      loading={isLoading}
    />
  );
}

export default connect(mapAssetFilterStateToProps, mapDispatchDrillDownToProps)(JobsPage);

/* istanbul ignore next */
JobsPage.propTypes = {
  openScheduleDrilldown: PropTypes.func.isRequired,
  selectedAsset: PropTypes.string.isRequired
};