import React, { useEffect, useState } from 'react';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import { connect } from 'react-redux';
import { mapDispatchManageRecommendationPageToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { mapStateToProps } from '../../redux/SharedReducer/reducer-actions';
import PageSubHeader from '../../components/PageSubHeader/PageSubHeader';
<<<<<<< HEAD
import { TableColumns as columns } from './TableConfig';
=======
import { TableItemType,  filterTableItems } from '../../utilities/ArrayManipulationUtilities';
>>>>>>> development
import './ManageRecommendationPage.css';

export function ManageRecommendationPage (props) {

  const { toggleDialog, configuredRecommendationList, openScheduleDrilldown } = props;
  const [recommendationList, setRecommendationList] = useState(configuredRecommendationList);
  const [defaultConfiguredRecList, setDefaultConfiguredRecList] = useState(configuredRecommendationList);

  const updateSearch = async (input) => {
    const filtered = defaultConfiguredRecList.filter(recommendation => {
      return recommendation.name.toLowerCase().includes(input.toLowerCase())
        || recommendation.id.toString().includes(input.toLowerCase())
        || recommendation.createdOn.toString().includes(input.toLowerCase())
        || recommendation.granularity.toLowerCase().includes(input.toLowerCase())
        || recommendation.type.toLowerCase().includes(input.toLowerCase())
    })
    setRecommendationList(filtered);
  }

  useEffect(() => {
    //Necessary for datagrid date columns A.J.U.U
    let responseWtihDateObjects = configuredRecommendationList.map((element) => { 
      return {
          ...element,
          createdOn: new Date(element.createdOn)
  }});
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
        dateSortingOrder={'asc'}

      />
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchManageRecommendationPageToProps)(ManageRecommendationPage);
