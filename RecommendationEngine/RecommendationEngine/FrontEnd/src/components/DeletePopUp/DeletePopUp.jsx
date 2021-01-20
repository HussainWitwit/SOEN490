import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import "./DeletePopUp.css"
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { mapDispatchDeletePopUpActions } from '../../redux/RightPanelReducer/reducer-actions';
import { connect } from 'react-redux';
import WarningTwoTone from '@material-ui/icons/WarningTwoTone';


export function DeletePopUp (props) {
    const { deleteConfiguredRecommendation, recommendationId, closeScheduleDrilldown } = props;

    const handleClose = () => {
        props.handleClickOpen();
    };

    const deleteRecommendationEvent = async () => {
        deleteConfiguredRecommendation(recommendationId)
    }

    return (
        <Dialog
            classes={{ paper: "dialog" }}
            open={props.open}
            onClose={handleClose}
            id="dialogPopUp"
        >
            <IconButton aria-label="close" id="closeButton" onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            
            <DialogTitle classes={{ root: 'alertMessage' }}><WarningTwoTone id="warning"></WarningTwoTone> Are you sure you want to DELETE {props.title}? All exisiting information about this Configured Recommendation will be lost and this action cannot be undone.</DialogTitle>
            <DialogActions>
                <div id="buttons">
                    <Button onClick={handleClose} id="cancelButton" variant="outlined">
                        Cancel
          </Button>
                    <Button onClick={() => {
                        handleClose();
                        deleteRecommendationEvent();
                        closeScheduleDrilldown();
                    }} id="deleteButton" variant="outlined">
                        Delete
          </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
}

export default connect(null, mapDispatchDeletePopUpActions)(DeletePopUp)