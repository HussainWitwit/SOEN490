import React from 'react';
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
import { ForceRunConfiguredRecommendation } from '../../api/endpoints/ConfiguredRecommendationEndpoints'
import "./ForceRunPopUp.css"
import { toast } from 'react-toastify';

export function ForceRunPopUp (props) {
    const { recommendationId, updateScheduleDrilldown } = props;

    const handleClose = () => {
        props.handleForceRunPopUpOpen();
    };

    return (
        <Dialog
            classes={{ paper: "dialog" }}
            open={props.open}
            onClose={handleClose}
        >
            <IconButton aria-label="close" id="force-run-close-button" onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            <div id="force-run-delete-warning">
                <div id="force-run-warning-message">
                    <DialogTitle classes={{ root: 'alertMessage' }}><b>Force Run Configured Recommendation</b></DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to force run <b>{props.title}</b>?
                </DialogContentText>
                    </DialogContent>
                </div>
            </div>
            <DialogActions>
                <div id="force-run-buttons">
                    <Button onClick={handleClose} id="force-run-cancel-button" variant="outlined">
                        Cancel
          </Button>
                    <Button onClick={() => {
                        handleClose();
                        updateScheduleDrilldown('forceRun');
                        ForceRunConfiguredRecommendation(recommendationId);
                        toast.success(props.title + ' has successfully been triggered!', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }} id="force-run-button" variant="outlined">
                        Force Run
          </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
}

export default connect(null, mapDispatchPopUpActions)(ForceRunPopUp)