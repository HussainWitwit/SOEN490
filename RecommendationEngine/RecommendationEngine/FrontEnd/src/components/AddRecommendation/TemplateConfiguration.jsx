import React from 'react'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import "./TemplateConfiguration.css";

const TemplateConfiguration = (props) => {

    // Will serve on future implementations 

    // Setting the Title attribute
    const [title, setTitle] = React.useState("");
    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    // Setting the Asset attribute
    const [asset, setAsset] = React.useState("");
    const handleAsset = (event) => {
        setAsset(event.target.value);
    }

    // Setting the Asset Type attribute
    const [assetType, setAssetType] = React.useState("");
    const handleAssetType = (event) => {
        setAssetType(event.target.value);
    };

    // Setting the Parameters attribute
    const [parameters, setParameters] = React.useState("");
    const handleParameters = (event) => {
        setParameters(event.target.value);
    };


    // Setting the Granularity attribute
    const [granularity, setGranularity] = React.useState("");
    const handleGranularity = (event) => {
        setGranularity(event.target.value);
    };

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={4} id="gridItem">
                    <button className="gridTransparent">
                        <Paper id="paperTheme">
                            <Typography id="gridBoxTitle">
                                Wash Optmization
                        </Typography></Paper>
                    </button>
                    <button className="gridTransparent">
                        <Paper id="paperTheme">
                            <Typography id="gridBoxTitle">
                                Fuse Replacement
                        </Typography></Paper>
                    </button>
                    <button className="gridTransparent">
                        <Paper id="paperTheme">
                            <Typography id="gridBoxTitle">
                                ETC
                        </Typography>
                        </Paper>
                    </button>
                </Grid>
                <Grid item xs={4}>
                    <button className="gridTransparent">
                        <Paper id="paperTheme">
                            <Typography id="gridBoxTitle">
                                Gearbox Replacement
                        </Typography></Paper>
                    </button>
                    <button className="gridTransparent">
                        <Paper id="paperTheme">
                            <Typography id="gridBoxTitle">
                                Panel Angle
                        </Typography></Paper>
                    </button>
                    <button className="gridTransparent">
                        <Paper id="paperTheme">
                            <Typography id="gridBoxTitle">
                                Other
                        </Typography></Paper>
                    </button>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div>
            <IconButton aria-label="close" id="closeButton" onClick={props.dismiss}>
                <CloseIcon />
            </IconButton>
            <DialogTitle id="form-dialog-title" className="dialogTitle">Template Configuration</DialogTitle>
            <DialogContent className="tempDialog">
                <DialogContent className="templateConfigBox">

                    <DialogContent className="dialogPaper">
                        <div id="gridRoot">
                            <Grid container spacing={4}>
                                <Grid item sm container item xs={6} spacing={3}>
                                    <FormRow />
                                </Grid>
                            </Grid>
                        </div>
                    </DialogContent>

                </DialogContent>

                <DialogContent className="templateConfigBox">

                    <DialogContentText id="templateLabel">Description </DialogContentText>
                    <DialogContentText id="templateLabelOutput">This recommendation is used to suggest the optimal time to wash you solar panels.</DialogContentText>

                    <div className="onelinerAlign">
                        <DialogContentText id="templateLabel">Inputs </DialogContentText>
                        <DialogContentText id="templateLabel">Assets</DialogContentText>
                    </div>

                    <div className="onelinerAlign2">
                        <DialogContentText id="templateLabel2">
                            <ul className="listAlign">
                                <li>Input 1</li>
                                <li>Input 2</li>
                                <li>Input 3</li>
                            </ul>
                        </DialogContentText>
                        <DialogContentText id="templateLabel2">
                            <ul className="listAlign">
                                <li style={{ alignSelf: 'left' }}>Solar Panels</li>

                            </ul>
                        </DialogContentText>
                    </div>

                    <DialogContentText id="templateLabel">Algorithm Used </DialogContentText>
                    <DialogContentText id="templateLabelOutput">WO Algorithm</DialogContentText>

                </DialogContent>
            </DialogContent>
            <DialogActions>
                <Button id="cancelBtn" onClick={props.dismiss}>Cancel</Button>
                <Button id="nextBtn" onClick={() => props.select(1)}>Next</Button>
            </DialogActions>
        </div>
    )
}

export default TemplateConfiguration
