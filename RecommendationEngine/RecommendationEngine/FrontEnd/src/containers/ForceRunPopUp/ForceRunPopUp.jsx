import React from 'react';
import { mapDispatchPopUpActions } from '../../redux/RightPanelReducer/reducer-actions';
import { connect } from 'react-redux';
import "./ForceRunPopUp.css"
import { DialogPopUp } from '../../common/DialogPopUp/DialogPopUp';

export function ForceRunPopUp (props) {
    
    const { recommendationId, updateScheduleDrilldown, open, handleForceRunPopUpOpen, title} = props;

    return (
        <DialogPopUp
        open={open}
        dialogTitle={'Force Run Configured Recommendation'}
        popUpType={'forceRun'}
        popUpTextLabel={'Force Run'}
        recommendationId={recommendationId}
        updateScheduleDrilldown={updateScheduleDrilldown}
        handleForceRunPopUpOpen={handleForceRunPopUpOpen}
        dialogDescription1={'Are you sure you want to force run'}
        recommendationTitle={title}
        successMessage={' has successfully been triggered!'}
        />
    );
}

export default connect(null, mapDispatchPopUpActions)(ForceRunPopUp)