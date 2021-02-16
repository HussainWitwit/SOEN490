import React from 'react';
import "./DeletePopUp.css"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { mapDispatchPopUpActions } from '../../redux/RightPanelReducer/reducer-actions';
import { connect } from 'react-redux';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';


export function DeletePopUp (props) {
    const { deleteConfiguredRecommendation, recommendationId, closeScheduleDrilldown } = props;

    const handleClose = () => {
        props.handleDeletePopUpOpen();
    };

    const deleteRecommendationEvent = async () => {
        deleteConfiguredRecommendation(recommendationId)
    }

    return (
        <Dialog
            classes={{ paper: "dialog" }}
            open={props.open}
            onClose={handleClose}
        >
            <IconButton aria-label="close" id="close-button" onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            <div id="delete-warning"><div id="warning"><WarningRoundedIcon id="warning-rounded-icon"></WarningRoundedIcon></div>
                <div id="warning-message">
                    <DialogTitle classes={{ root: 'alertMessage' }}><b>Delete Configured Recommendation</b></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete <b>{props.title}</b>? This configured recommendation and any of its related jobs, results or actions will be deleted. This process cannot be undone.
                </DialogContentText>
                    </DialogContent>
                </div>
            </div>
            <DialogActions>
                <div id="buttons">
                    <Button onClick={handleClose} id="cancel-button" variant="outlined">
                        Cancel
          </Button>
                    <Button onClick={() => {
                        handleClose();
                        deleteRecommendationEvent();
                        closeScheduleDrilldown();
                    }} id="delete-button" variant="outlined">
                        Delete
          </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
}

export default connect(null, mapDispatchPopUpActions)(DeletePopUp)