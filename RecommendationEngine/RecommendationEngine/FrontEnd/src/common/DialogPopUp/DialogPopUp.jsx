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
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import "./DialogPopUp.css"
import PropTypes from 'prop-types';

export function DialogPopUp (props) {

    const {
        open,
        popUpType,
        popUpTextLabel,
        handleAction,
        handleClose,
        dialogTitle,
        dialogDescription1,
        dialogDescription2,
        successMessage,
        recommendationTitle,
    } = props;

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
                        <b>{dialogTitle}</b>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {dialogDescription1}<b> {recommendationTitle}</b>{dialogDescription2}
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
                        handleAction();
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

/* istanbul ignore next */
DialogPopUp.propTypes = {
    open: PropTypes.func.isRequired,
    popUpType: PropTypes.string.isRequired,
    popUpTextLabel: PropTypes.string.isRequired,
    recommendationId: PropTypes.string.isRequired,
    updateScheduleDrilldown: PropTypes.func.isRequired,
    handleForceRunPopUpOpen: PropTypes.func.isRequired,
    recommendationTitle: PropTypes.string.isRequired,
    deleteConfiguredRecommendation: PropTypes.func.isRequired,
    closeScheduleDrilldown: PropTypes.func.isRequired,
    handleDeletePopUpOpen: PropTypes.func.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    dialogDescription1: PropTypes.string.isRequired,
    dialogDescription2: PropTypes.string.isRequired,
    successMessage: PropTypes.string.isRequired,
};