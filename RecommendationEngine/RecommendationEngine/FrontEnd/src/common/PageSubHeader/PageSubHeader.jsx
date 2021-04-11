import React from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddRecommendationDialog from '../../containers/AddRecommendationDialog/AddRecommendationDialog';
import SearchBar from '../SearchBar';
import PropTypes from 'prop-types';
import './PageSubHeader.css';

export default function PageSubHeader (props) {

  const { pageTitle, descriptionSubtitle, showCreateRecommendation, addRecommendationProps, toggleDialog, updateSearch } = props;

  return (
    <Grid id="grid-container1" container spacing={1} className="gridContainerStyle">
      <Grid id="grid1" item>
        <h3 id="title">{pageTitle}</h3>
        <h6 id="subtitle">
          {descriptionSubtitle}
        </h6>
      </Grid>
      {showCreateRecommendation &&
        <Grid item>
          <div>
            <Button id="rec-btn" onClick={toggleDialog}>
              Create Recommendation
                    </Button>
          </div>
        </Grid>
      }
      <AddRecommendationDialog {...addRecommendationProps} />
      <div>
        <br></br>
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
    </Grid>
  )
}

/* istanbul ignore next */
PageSubHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  descriptionSubtitle: PropTypes.string.isRequired,
  showCreateRecommendation: PropTypes.func.isRequired,
  addRecommendationProps: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  updateSearch: PropTypes.func.isRequired
};