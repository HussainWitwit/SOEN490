import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { FilterList } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ConfiguredRecommendationTable from '../../components/ConfiguredRecommendationTable/ConfiguredRecommendationTable';
import AddRecommendationDialog from '../../containers/AddRecommendationDialog/AddRecommendationDialog';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../redux/AddRecDialogReducer/reducer-actions';
import { mapStateToProps } from '../../redux/ApiReducer/reducer-actions';
import SearchBar from '../../common/SearchBar';
import './ManageRecommendationPage.css';


export const CssTextField = withStyles({
  root: {
    width: '360px',
    color: '252733',
    fontSize: 100,

    '& label.Mui-focused': {
      color: '#868282',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#252733',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#252733',
      },
      '&:hover fieldset': {
        borderColor: '#252733',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#252733',
      },
    },
  },
})(TextField);


export function ManageRecommendationPage(props) {

  const { toggleDialog, configuredRecommendationList } = props;
  const [recommendationList, setRecommendationList] = useState(configuredRecommendationList);
  const [defaultConfiguredRecList, setDefaultConfiguredRecList] = useState(configuredRecommendationList);

  /* istanbul ignore next */
  const updateSearch = async (input) => {
    const filtered = defaultConfiguredRecList.filter(recommendation => {
      return recommendation.name.toLowerCase().includes(input.toLowerCase())
    })
    setRecommendationList(filtered);
 }

  useEffect(() => {
    setRecommendationList(configuredRecommendationList)
    setDefaultConfiguredRecList(configuredRecommendationList)
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
              <Button id="recBtn" onClick={toggleDialog}>
                Create Recommendation
              </Button>
              <AddRecommendationDialog {...props}/>
            </div>
          </Grid>
        </Grid>
        <br></br>
      </div>
      <div>
        <div>
          <Grid id="grid-container2" container spacing={1} className="gridContainerStyle">
            <Grid item id = "data-testid" >
              <SearchBar
                placeholder = "Search for a recommendation..."
                onChangeFun = {updateSearch}
              />
            </Grid>
            <Grid item>
              <Button size="small" id="filterBtn" endIcon={<FilterList />}>
                Add Filter
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
      <br></br>
      <ConfiguredRecommendationTable data = {recommendationList} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRecommendationPage);
