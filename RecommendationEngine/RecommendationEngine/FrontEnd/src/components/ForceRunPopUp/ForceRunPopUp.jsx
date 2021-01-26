import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import "./ForceRunPopUp.css"

export function ForceRunPopUp(props) {
    const { closeScheduleDrilldown } = props;

    const handleClose = () => {
        props.handleForceRunPopUpOpen();
    };

    //const deleteRecommendationEvent = async () => {
    //    deleteConfiguredRecommendation(recommendationId)
    //}

    return (
        <Dialog
            classes={{ paper: "dialog" }}
            open={props.open}
            onClose={handleClose}
        >
            <IconButton aria-label="close" id="closeButton2" onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            <div id="deleteWarning2">
                <div id="warningMessage2">
                    <DialogTitle classes={{ root: 'alertMessage' }}><b>Force Run Configured Recommendation</b></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to Force Run <b>{props.title}</b>?
                </DialogContentText>
                    </DialogContent>
                </div>
            </div>
            <DialogActions>
                <div id="buttons2">
                    <Button onClick={handleClose} id="cancelButton2" variant="outlined">
                        Cancel
          </Button>
                    <Button onClick={() => {
                        handleClose();
                        //deleteRecommendationEvent();
                        closeScheduleDrilldown();
                    }} id="deleteButton2" variant="outlined">
                        Force Run
          </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
}

export default ForceRunPopUp