import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { mapDispatchManageRecommendationPageToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { mapStateToProps } from '../../redux/SharedReducer/reducer-actions';
import { RecommendationsPageTemplate } from '../../common/RecommendationsPageTemplate/RecommendationsPageTemplate';
import { TableColumns as columns } from './TableConfig';
import { TableItemType, filterTableItems } from '../../utilities/ArrayManipulationUtilities';
import './ManageRecommendationPage.css';
import PropTypes from 'prop-types';

export function ManageRecommendationPage (props) {

  const { toggleDialog, configuredRecommendationList, openScheduleDrilldown } = props;
  const [recommendationList, setRecommendationList] = useState(configuredRecommendationList);
  const [defaultConfiguredRecList, setDefaultConfiguredRecList] = useState(configuredRecommendationList);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const updateSearch = (input) => {
    setRecommendationList(filterTableItems(TableItemType.ConfiguredRecommendation, defaultConfiguredRecList, input));
  }

  useEffect(() => {
    let responseWtihDateObjects = configuredRecommendationList.map((element) => {
      return {
        ...element,
        createdOn: new Date(element.createdOn),
        recurrenceDatetime: currentYear <= new Date(element.recurrenceDatetime).getFullYear() ?
          new Date(element.recurrenceDatetime) : new Date(new Date(element.recurrenceDatetime).setFullYear(currentYear))
      }
    });
    setRecommendationList(responseWtihDateObjects);
    setDefaultConfiguredRecList(responseWtihDateObjects);
  }, [configuredRecommendationList])

  return (
    <RecommendationsPageTemplate
      pageTitle={"Configured Recommendations"}
      subtTitleDescription={"Browse, edit, and delete recommendation jobs"}
      showCreateRecommendationButton={true}
      onOpenRecommendationDialog={toggleDialog}
      addRecommendationProps={props}
      onSearch={updateSearch}
      tableData={recommendationList}
      tableColumns={columns}
      onTableClickRow={openScheduleDrilldown}
      isRowClickable={true}
      dateColumnName={'createdOn'}
      dateSortingOrder={'desc'}
    />
  );
}

export default connect(mapStateToProps, mapDispatchManageRecommendationPageToProps)(ManageRecommendationPage);

/* istanbul ignore next */
ManageRecommendationPage.propTypes = {
  configuredRecommendationList: PropTypes.array.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  openScheduleDrilldown: PropTypes.func.isRequired,
};