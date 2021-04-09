import React from 'react';
import "./DeletePopUp.css"
import { mapDispatchPopUpActions } from '../../redux/RightPanelReducer/reducer-actions';
import { connect } from 'react-redux';
import { DialogPopUp } from '../DialogPopUp/DialogPopUp';

export function DeletePopUp(props) {
    const { deleteConfiguredRecommendation, recommendationId, closeScheduleDrilldown, open, handleDeletePopUpOpen, title } = props;

    return (
        <DialogPopUp
            open={open}
            dialogTitle={'Delete Configured Recommendation'}
            popUpType={'delete'}
            popUpTextLabel={'Delete'}
            recommendationId={recommendationId}
            deleteConfiguredRecommendation={deleteConfiguredRecommendation}
            closeScheduleDrilldown={closeScheduleDrilldown}
            handleDeletePopUpOpen={handleDeletePopUpOpen}
            dialogDescription1={'Are you sure you want to delete'}
            dialogDescription2={'? This configured recommendation and any of its related jobs, results or actions will be deleted. This process cannot be undone.'}
            recommendationTitle={title}
            successMessage={' has successfully been deleted!'}
        />
    );
}

export default connect(null, mapDispatchPopUpActions)(DeletePopUp)