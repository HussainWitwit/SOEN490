import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import "./DeletePopUp.css"
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { mapDispatchToProps, mapRightPanelStateToProps } from '../../redux/RightPanelReducer/reducer-actions';
import { connect } from 'react-redux';

//TODO: need to auto-refresh the page after i delete --> need to put in API reducer to automatically refresh
//pass function as a props, to make it generic
export function DeletePopUp(props) {
    const {deleteConfiguredRecommendation}=props;
    const {recommendationId}=props;
    const {closeScheduleDrilldown}=props;
    const handleClose = () => {
        props.handleClickOpen();//maybe put this in line 19
    };
const deleteRecommendationEvent = async () => {
    deleteConfiguredRecommendation (recommendationId)
}
    return (
        <Dialog
            classes={{ paper: "dialog" }}
            open={props.open}
            onClose={handleClose}
        >
            <IconButton aria-label="close" id="closeButton" onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            <DialogTitle id="alert-message" >Are you sure you want to DELETE {props.title}?</DialogTitle>
            <DialogActions>
                <div id="buttons">
                    <Button onClick={handleClose} id="cancel-button" variant="outlined">
                        Cancel
          </Button>
          {/* onclick need to handle handleClose with deleteRecEvent */}
                    <Button onClick={() => {
                        handleClose()
                        deleteRecommendationEvent()
                        closeScheduleDrilldown()
                        }} id="delete-button" variant="outlined">
                        Delete
          </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
}

export default connect(mapRightPanelStateToProps,mapDispatchToProps)(DeletePopUp)