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

    const {
        open,
        popUpType,
        popUpTextLabel,
        recommendationId,
        updateScheduleDrilldown,
        handleForceRunPopUpOpen,
        recommendationTitle,
        deleteConfiguredRecommendation,
        closeScheduleDrilldown,
        handleDeletePopUpOpen,
        dialogTitle,
        dialogDescription1,
        dialogDescription2,
        successMessage
    } = props;

    const handleForceRunAction = () => {
        handleForceRunPopUpOpen();
        updateScheduleDrilldown(popUpType);
        ForceRunConfiguredRecommendation(recommendationId);
    }

    const handleDeleteAction = () => {
        handleDeletePopUpOpen();
        deleteConfiguredRecommendation(recommendationId);
        closeScheduleDrilldown();
    }

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
            <IconButton aria-label="close" id="close-button" onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            <div id="delete-warning">
                {popUpType == "delete" &&
                    <div id="warning">
                        <WarningRoundedIcon id="warning-rounded-icon"></WarningRoundedIcon>
                    </div>
                }
                <div id="warning-message">
                    <DialogTitle classes={{ root: 'alertMessage' }}>
                        {popUpType == "forceRun" &&
                            <b>{dialogTitle}</b>
                        }
                        {popUpType == "delete" &&
                            <b>{dialogTitle}</b>
                        }
                    </DialogTitle>
                    <DialogContent>
                        {popUpType == "forceRun" &&
                            <DialogContentText>
                                {dialogDescription1} <b>{recommendationTitle}</b>?
                        </DialogContentText>
                        }
                        {popUpType == "delete" &&
                            <DialogContentText>
                                {dialogDescription1} <b>{recommendationTitle}</b>{dialogDescription2}
                        </DialogContentText>
                        }
                    </DialogContent>
                </div>
            </div>
            <DialogActions>
                <div id="buttons">
                    <Button onClick={handleClose} id="cancel-button" variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        (popUpType == "forceRun" ? handleForceRunAction() : handleDeleteAction())
                        toast.success(recommendationTitle + successMessage, {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }} id={popUpType == "delete" ? "delete-button" : "force-run-button"} variant="outlined">
                        {popUpTextLabel}
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    )

}