import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import "./DeletePopUp.css"
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { mapDispatchDeletePopUpActions } from '../../redux/RightPanelReducer/reducer-actions';
import { connect } from 'react-redux';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';;


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
        <div className="deleteWarning"><div className="warning"><WarningRoundedIcon id="WarningRoundedIcon"></WarningRoundedIcon></div>
        <div className="warningMessage">
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