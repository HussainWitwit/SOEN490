import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { toast } from 'react-toastify';
import { ForceRunConfiguredRecommendation } from '../../api/endpoints/ConfiguredRecommendationEndpoints'
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import "./DialogPopUp.css"

export function DialogPopUp(props) {

    const { open, popUpType, popUpTextLabel, recommendationId, updateScheduleDrilldown, handleForceRunPopUpOpen, title, deleteConfiguredRecommendation, closeScheduleDrilldown, handleDeletePopUpOpen } = props;

    const handleClose = () => {
        if (popUpType == "delete") {
            handleDeletePopUpOpen();
        } else {
            handleForceRunPopUpOpen();
        }
    };

    return (
        <Dialog
            classes={{ paper: "dialog" }}
            open={open}
            onClose={handleClose}
        >
            <IconButton aria-label="close" id="force-run-close-button" onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            <div id="force-run-delete-warning">
                {popUpType == "delete" &&
                    <div id="warning">
                        <WarningRoundedIcon id="warning-rounded-icon"></WarningRoundedIcon>
                    </div>
                }
                <div id="force-run-warning-message">
                    <DialogTitle classes={{ root: 'alertMessage' }}>
                        {popUpType == "forceRun" &&
                            <b>Force Run Configured Recommendation</b>
                        }
                        {popUpType == "delete" &&
                            <b>Delete Configured Recommendation</b>
                        }
                    </DialogTitle>
                    <DialogContent>
                        {popUpType == "forceRun" &&
                            <DialogContentText>
                                Are you sure you want to force run <b>{title}</b>?
                        </DialogContentText>
                        }
                        {popUpType == "delete" &&
                            <DialogContentText>
                                Are you sure you want to delete <b>{title}</b>? This configured recommendation and any of its related jobs, results or actions will be deleted. This process cannot be undone.
                        </DialogContentText>
                        }
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
                        {
                            popUpType == "forceRun" &&
                            updateScheduleDrilldown(popUpType)
                            ForceRunConfiguredRecommendation(recommendationId)
                        }
                        {
                            popUpType == "delete" &&
                            deleteConfiguredRecommendation(recommendationId)
                            // closeScheduleDrilldown();
                        }

                        toast.success(popUpType == "forceRun" ? title + ' has successfully been triggered!' : title + ' has successfully been deleted!', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }} id="force-run-button" variant="outlined">
                        {popUpTextLabel}
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    )

}