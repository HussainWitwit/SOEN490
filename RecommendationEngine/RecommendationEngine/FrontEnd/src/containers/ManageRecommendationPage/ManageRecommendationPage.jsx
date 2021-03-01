import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Grid} from '@material-ui/core';
import RecommendationEngineTable from '../../components/RecommendationEngineTable/RecommendationEngineTable';
import AddRecommendationDialog from '../../containers/AddRecommendationDialog/AddRecommendationDialog';
import { connect } from 'react-redux';
import { mapDispatchManageRecommendationPageToProps } from '../../redux/ManageRecommendationReducer/reducer-actions';
import { mapStateToProps } from '../../redux/SharedReducer/reducer-actions';
import SearchBar from '../../common/SearchBar';
import './ManageRecommendationPage.css';

export function ManageRecommendationPage (props) {

  const { toggleDialog, configuredRecommendationList, openScheduleDrilldown } = props;
  const [recommendationList, setRecommendationList] = useState(configuredRecommendationList);
  const [defaultConfiguredRecList, setDefaultConfiguredRecList] = useState(configuredRecommendationList);
  const [loading, setLoading] = useState(false);

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
    })
    setRecommendationList(filtered);
  }

  useEffect(() => {
    setLoading(true);
    setRecommendationList(configuredRecommendationList)
    setDefaultConfiguredRecList(configuredRecommendationList)
    setLoading(false);
  }, [configuredRecommendationList])

  return (
    <div id="main-container">
      <div></div>
      <div>
        <br></br>
        <Grid id="grid-container1" container spacing={1} className="gridContainerStyle">
          <Grid id="grid1" item>
            <h3 id="title">Manage Recommendations</h3>
            <h6 id="subtitle">
              Add, edit, delete and browse the configured recommendation
            </h6>
          </Grid>
          <Grid item>
            <div>
              <Button id="rec-btn" onClick={toggleDialog}>
                Create Recommendation
              </Button>
              <AddRecommendationDialog {...props} />
            </div>
          </Grid>
        </Grid>
        <br></br>
      </div>
      <div>
        <div>
          <Grid id="grid-container2" container spacing={1} className="gridContainerStyle">
            <Grid item id="data-testid" >
              <SearchBar
                placeholder="Search for a recommendation..."
                onSearchUpdate={updateSearch}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <br></br>
      <RecommendationEngineTable
        loading={loading}
        data={recommendationList}
        columnValues={columns}
        onClickRow={openScheduleDrilldown}
        isClickable={true}
      />
    </div >
  );
}

export default connect(mapStateToProps, mapDispatchManageRecommendationPageToProps)(ManageRecommendationPage);
