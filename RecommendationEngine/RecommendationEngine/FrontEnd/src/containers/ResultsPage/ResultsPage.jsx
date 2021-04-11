import React, { useEffect, useState } from 'react';
import { GetRecommendationResultList } from '../../api/endpoints/ResultsEndpoints';
import { mapDispatchToProps } from '../../redux/RightPanelReducer/reducer-actions';
import { mapStateToProps as mapAssetFilterStateToProps } from '../../redux/AssetFilterReducer/reducer-actions';
import { RecommendationsPageTemplate } from '../../common/RecommendationsPageTemplate/RecommendationsPageTemplate';
import { connect } from 'react-redux';
import { TableItemType, filterTableItems } from '../../utilities/ArrayManipulationUtilities';
import { TableColumns as columns } from './TableConfig';
import './ResultsPage.css'
import PropTypes from 'prop-types';

export function ResultsPage (props) {
  const { openResultDrilldown, openScheduleDrilldown } = props;

  const [resultList, setResultList] = useState([]);
  const [defaultResultList, setDefaultResultList] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const RecommendationLinkColumn = [{
    field: 'configuredRecommendationTitle', headerName: 'Recommendation', type: 'string', width: 200, cellClassName: 'table-style', renderCell: (params) => (
      <a className='configured-recommendation' onClick={() => openScheduleDrilldown(params.getValue('configuredRecommendationId'))}>
        {params.getValue('configuredRecommendationTitle')}
      </a>)
  }];

  const getResultList = async () => {
    let response = await GetRecommendationResultList(props.selectedAsset);
    let responseWtihDateObjects = response.map((element) => {
      return {
        ...element,
        resultOutputDate: new Date(element.resultOutputDate)
      }
    });
    setDefaultResultList(responseWtihDateObjects);
    setResultList(responseWtihDateObjects);
    setisLoading(false);
  }

  const updateSearch = (input) => {
    setResultList(filterTableItems(TableItemType.Results, defaultResultList, input));
  }

  useEffect(() => {
    getResultList();
  }, [props.selectedAsset])

  return (
    <RecommendationsPageTemplate
      pageTitle={"Results"}
      subtTitleDescription={"See the results generated by recommendation jobs"}
      showCreateRecommendationButton={false}
      onSearch={updateSearch}
      tableData={resultList}
      tableColumns={[...columns, ...RecommendationLinkColumn]}
      onTableClickRow={openResultDrilldown}
      isRowClickable={true}
      dateColumnName={'resultOutputDate'}
      dateSortingOrder={'desc'}
      loading={isLoading}
    />
  );
}

export default connect(mapAssetFilterStateToProps, mapDispatchToProps)(ResultsPage);

/* istanbul ignore next */
ResultsPage.propTypes = {
  openResultDrilldown: PropTypes.func.isRequired,
  openScheduleDrilldown: PropTypes.func.isRequired,
  setParamValue: PropTypes.func.isRequired,
};