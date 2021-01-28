import React from 'react';
import "./ConfirmationPopUp.css"
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
import {ForceRunConfiguredRecommendation} from '../../api/endpoints/ConfiguredRecommendationEndpoints';


export function ConfirmationPopUp(props) {
    const { type, deleteConfiguredRecommendation, updateScheduleDrilldown, recommendationId, closeScheduleDrilldown } = props;

    const handleClose = () => {
        if (type == "Force Run") {
            props.handleForceRunPopUpOpen();
        } else {
            props.handleDeletePopUpOpen();
        }
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
            {console.log(type)}
            <IconButton aria-label="close" id="closeButton" onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            <div id="deleteWarning">
                {type == "Delete" &&
                    <div id="warning"><WarningRoundedIcon id="WarningRoundedIcon"></WarningRoundedIcon></div>}
                <div id="warningMessage">
                    <DialogTitle classes={{ root: 'alertMessage' }}><b>{type} Configured Recommendation</b></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to {type} <b>{props.title}</b>? {type == "Delete" && "This configured recommendation and any of its related jobs, results or actions will be deleted. This process cannot be undone."}
                        </DialogContentText>
                    </DialogContent>
                </div>
            </div>
            <DialogActions>
                <div id="buttons">
                    <Button onClick={handleClose} id="cancelButton" variant="outlined">
                        Cancel
          </Button>
                    {type == "Delete" ?
                        <Button onClick={() => {
                            handleClose();
                            deleteRecommendationEvent();
                            closeScheduleDrilldown();
                        }} id="deleteButton" variant="outlined">
                            Delete
                        </Button>
                        : <Button onClick={() => {
                            handleClose();
                            updateScheduleDrilldown('forceRun');
                            ForceRunConfiguredRecommendation(recommendationId);
                        }} id="forceRunButton" variant="outlined">
                            Force Run
              </Button>
                    }
                </div>
            </DialogActions>
        </Dialog>
    );
}

export default connect(null, mapDispatchPopUpActions)(ConfirmationPopUp)