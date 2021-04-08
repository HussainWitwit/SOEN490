import React, { useEffect, useState } from 'react';
import RecommendationEngineTable from '../../common/RecommendationEngineTable/RecommendationEngineTable';
import { connect } from 'react-redux';
import { mapDispatchManageRecommendationPageToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { mapStateToProps } from '../../redux/SharedReducer/reducer-actions';
import PageSubHeader from '../../common/PageSubHeader/PageSubHeader';
import { TableColumns as columns } from './TableConfig';
import { TableItemType, filterTableItems } from '../../utilities/ArrayManipulationUtilities';
import './ManageRecommendationPage.css';

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
    <div id="main-container">
      <div></div>
      <div>
        <br></br>
        <PageSubHeader
          pageTitle="Configured Recommendations"
          descriptionSubtitle="Browse, edit, and delete recommendation jobs"
          showCreateRecommendation={true}
          toggleDialog={toggleDialog}
          addRecommendationProps={props}
          updateSearch={updateSearch}
        />
      </div>
      <br></br>
      <RecommendationEngineTable
        data={recommendationList}
        columnValues={columns}
        onClickRow={openScheduleDrilldown}
        isClickable={true}
        dateColumnName={'createdOn'}
        dateSortingOrder={'desc'}
      />
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchManageRecommendationPageToProps)(ManageRecommendationPage);
