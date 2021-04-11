import React from 'react';
import { mapDispatchPopUpActions } from '../../redux/RightPanelReducer/reducer-actions';
import { connect } from 'react-redux';
import "./ForceRunPopUp.css"
import { DialogPopUp } from '../../common/DialogPopUp/DialogPopUp';
import { ForceRunConfiguredRecommendation } from '../../api/endpoints/ConfiguredRecommendationEndpoints';
import PropTypes from 'prop-types';

export function ForceRunPopUp (props) {

    const { recommendationId, updateScheduleDrilldown, open, handleForceRunPopUpOpen, title } = props;

    const handleForceRunAction = () => {
        handleForceRunPopUpOpen();
        updateScheduleDrilldown('forceRun');
        ForceRunConfiguredRecommendation(recommendationId);
    }

    return (
        <DialogPopUp
        open={open}
        dialogTitle={'Force Run Configured Recommendation'}
        popUpType={'forceRun'}
        popUpTextLabel={'Force Run'}
        dialogDescription1={'Are you sure you want to force run'}
        dialogDescription2={'?'}
        successMessage={' has successfully been triggered!'}
        recommendationTitle={title}
        handleAction={handleForceRunAction}
        handleClose={handleForceRunPopUpOpen}
        />
    );
}

export default connect(null, mapDispatchPopUpActions)(ForceRunPopUp);

/* istanbul ignore next */
ForceRunPopUp.propTypes = {
  recommendationId: PropTypes.string.isRequired,
  updateScheduleDrilldown: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  handleForceRunPopUpOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};