import React, { useEffect, useState } from 'react';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import { connect } from 'react-redux';
import { mapDispatchManageRecommendationPageToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { mapStateToProps } from '../../redux/SharedReducer/reducer-actions';
import PageSubHeader from '../../components/PageSubHeader/PageSubHeader';
import './ManageRecommendationPage.css';

export function ManageRecommendationPage (props) {

  const { toggleDialog, configuredRecommendationList, openScheduleDrilldown } = props;
  const [recommendationList, setRecommendationList] = useState(configuredRecommendationList);
  const [defaultConfiguredRecList, setDefaultConfiguredRecList] = useState(configuredRecommendationList);

  const columns = [
    {field: 'id', headerName: 'ID', width: 150, cellClassName: 'table-style', hide: false},
    {field: 'name', headerName: 'Title', flex:0.25, type: 'string', cellClassName: 'table-style'},
    {field: 'type', headerName: 'Type', flex: 0.25, type: 'string', cellClassName: 'table-style'},
    {field: 'granularity', headerName: 'Granularity', type: 'string', flex: 0.25, cellClassName: 'table-style'},
    {field: 'createdOn', headerName: 'Created On', type: 'date', flex: 0.25, cellClassName: 'table-style'},
]
   
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
    setRecommendationList(configuredRecommendationList);
    setDefaultConfiguredRecList(configuredRecommendationList);
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
      />
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchManageRecommendationPageToProps)(ManageRecommendationPage);
