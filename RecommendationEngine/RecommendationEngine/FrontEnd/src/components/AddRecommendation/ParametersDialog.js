import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { FilterList, Search } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl';
import 'date-fns';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ConfirmationDialog from "../AddRecommendation/ConfirmationDialog";
import "./ParametersDialog.css";


export const CssTextField = withStyles({

    root: {
        width: '360px',
        color: '252733',
        fontSize: 100,

        '& label.Mui-focused': {
            color: '#868282',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#252733',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#252733',
            },
            '&:hover fieldset': {
                borderColor: '#252733',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#252733',
            },
        },
    },

})(TextField);

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Segoe UI', "Tahoma", "Geneva", "Verdana", "sans-serif"
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

function ParametersDialog(props) {
    const [openFirst, setOpenFirst] = React.useState(false);
    const [openSecond, setOpenSecond] = React.useState(false);
    const [openThird, setOpenThird] = React.useState(props.openDialog);
    const [openFourth, setOpenFourth] = React.useState(false)
    const [back, setBack] = React.useState(false);

    //Add Recommendation Object Attributes (will be refactored later, its just for now  - C.S.B.)

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

    // Setting the perio attribute
    const [periodicity, setPeriodicity] = React.useState();
    const handlePeriodicity = (event) => {
        setPeriodicity(event.target.value);
    };

    // Setting Repetition attribute
    const [Repetition, setRepetition] = React.useState(null);
    const handleRepetition = (event) => {
        setRepetition(event.target.value);
    };

    // Setting the dayWeek attribute
    const [dayWeek, setDayWeek] = React.useState("");
    const handleDayWeek = (event) => {
        setDayWeek(event.target.value);
    };

    // Setting the occurence Date attribute
    const [dayMonth, setDayMonth] = React.useState("");
    const handleDayMonth = (event) => {
        setDayMonth(event.target.value);
    };

    // Setting the startDate attribute
    const [startDate, setStartDate] = React.useState("");
    const handleStartDate = (event) => {
        setStartDate(event.target.value);
    };

    // Setting the endDate attribute
    const [endDate, setEndDate] = React.useState("");
    const handleEndDate = (event) => {
        setStartDate(event.target.value);
    };

    // Setting the hourRepeated attribute  
    const [hourRepeated, setHourRepeated] = React.useState();
    const handleHourRepeated = (event) => {
        setHourRepeated(event.target.value);
    };

    // Setting the occurence Date attribute
    const [occurenceDate, setOccurenceDate] = React.useState("");
    const handleOccurenceDate = (event) => {
        setOccurenceDate(event.target.value);
    };


    // Seeting the Center Point attribute 
    const [centerPoint, setCenterPoint] = React.useState(null)
    const handleCenterPoint = (event) => {
        setCenterPoint(event.target.value);
    };

    // Seeing the Span attribute
    const [span, setSpan] = React.useState(null);
    const handleSpan = (event) => {
        setSpan(event.target.value);
    };


    // Setting the CreatedBy attribute
    const [createdBy, setCreatedBy] = React.useState("");
    const handleCreatedBy = (event) => {
        setCreatedBy(event.target.value);
    };

    // Setting the CreatedOn attribute
    const [createdOn, setCreatedOn] = React.useState("");
    const handleCreatedOn = (event) => {
        setCreatedOn(event);
    };



    // useEffect(() => {
    //     if(openDialog == "yo"){
    //         setOpenFirst2(true);
    //     }
    //   }, []);

    // const handleClickOpenFirst = () => {
    //     setOpenFirst(true);
    // }


    // const handleCloseFirst = () => {
    //     setOpenFirst(false);
    // }

    const handleClickOpenSecond = () => {
        setOpenSecond(true);
        setOpenFirst(false)
    }
    const handleClickOpenThird = () => {
        setOpenThird(true);
        setOpenSecond(false);
    }

    const handleClickOpenFourth = () => {
        setOpenFourth(true);
        setOpenThird(false);
    }

    const handleDone = () => {
        // console.log(title, asset, assetType, parameters, granularity, periodicity, Repetition, dayWeek, dayMonth, hourRepeated, centerPoint, span);
        postAddRecommendation();
        setOpenFirst(false);
        setOpenSecond(false);
        setOpenThird(false);
        setOpenFourth(false);
    }


    /**
     * Post Method
     */
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: title,
            type: 'Yearly Wash Optimization',
            recurrenceDayOfWeek: 3,
            createdOn: new Date().toJSON(),
            createdBy: 'BOSSSS',
            recurrenceDateTime: '2025-01-01T' + hourRepeated + ':00',
            granularity: periodicity,
            parameters: null
        })
    };
    const [postResponse, setPostResponse] = React.useState(null);
    //FIXME: Syntax Errror here
    const postAddRecommendation = () => {
        fetch('http://localhost:5000/ConfiguredRecommendation/add/', requestOptions)
            .then(response => response.json())
            .then(data => setPostResponse({ postResultId: data.id }));
    }

    const handleClose = (props) => {
        setOpenFirst(false);
        // setOpenSecond(false);
        // setOpenThird(false);
        // setOpenFourth(false);
    }

    const cancelConfirmation = () => {
        setOpenThird(true);
        setOpenFourth(false);
        setOpenFirst(false);
        setOpenSecond(false);
    }

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
            <div>
                <Grid id="grid-container1" container spacing={1} className="gridContainerStyle">
                    <Grid item>
                        {/* <Dialog open={props.openDialog} onClose={props.onCloseDialog} aria-labelledby="form-dialog-title">
                            <IconButton aria-label="close" id="closeButton" onClick={props.onCloseDialog}>
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle id="form-dialog-title" className="dialogTitle">Template Configuration</DialogTitle>
                            <div id="tempDialog">
                                <div className="templateConfigBox">

                                    <DialogContent className="dialogPaper">
                                        <div id="gridRoot">
                                            <Grid container spacing={4}>
                                                <Grid item sm container item xs={6} spacing={3}>
                                                    <FormRow />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </DialogContent>

                                </div>

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
                            </div>
                            <DialogActions>
                                <Button id="cancelBtn" onClick={props.onCloseDialog}>Cancel</Button>
                                <Button id="nextBtn" onClick={handleClickOpenSecond}>Next</Button>
                            </DialogActions>
                        </Dialog> */}

                        {/* <Dialog open={openSecond} onClose={props.onCloseDialog} aria-labelledby="form-dialog-title">
                            <IconButton aria-label="close" id="closeButton" onClick={props.onCloseDialog}>
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle id="form-dialog-title" className="dialogTitle">Date Configuration</DialogTitle>
                            <DialogContent className="recConfigPaper">

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="recLabel2">Occurence: </DialogContentText>
                                        <FormControl>
                                            <NativeSelect
                                                id="demo-customized-select-native"
                                                className="recBoxDate"
                                                value={periodicity}
                                                onChange={handlePeriodicity}
                                                input={<BootstrapInput />}
                                            >
                                                <option aria-label="None" value={""} >None</option>
                                                <option value={"Weekly"}>Weekly</option>
                                                <option value={"Bi-Weekly"}>Bi-Weekly</option>
                                                <option value={"Monthly"}>Monthly</option>
                                                <option value={"Yearly"}>Yearly</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </div>
                                </DialogContent>

                                {periodicity !== "" &&

                                    <DialogContent>
                                        <div className="onelinerAlign">
                                            <DialogContentText id="recLabel3">Repetition Time: </DialogContentText>
                                            <TextField
                                                id="outlined-number"
                                                className="recBoxNumber"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={handleRepetition}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </div>
                                    </DialogContent>
                                }

                                {periodicity != "" && periodicity !== "Yearly" && periodicity !== "Monthly" ?
                                    <DialogContent>
                                        <div className="onelinerAlign">
                                            <DialogContentText id="recLabel2">Day of the Week: </DialogContentText>
                                            <ButtonGroup aria-label="small outlined button group">
                                                <Button value="Monday" onClick={handleDayWeek}>M</Button>
                                                <Button value="Monday" onClick={handleDayWeek}>T</Button>
                                                <Button value="Monday" onClick={handleDayWeek}>W</Button>
                                                <Button value="Monday" onClick={handleDayWeek}>T</Button>
                                                <Button value="Monday" onClick={handleDayWeek}>F</Button>
                                                <Button value="Monday" onClick={handleDayWeek}>S</Button>
                                                <Button value="Monday" onClick={handleDayWeek}>S</Button>
                                            </ButtonGroup>
                                        </div>
                                    </DialogContent> : (periodicity != "" ? <DialogContent>
                                        <div className="onelinerAlign">
                                            <DialogContentText id="recLabel2">Day of the Month: </DialogContentText>
                                            <form className="timePickerContainer" noValidate>
                                                <TextField
                                                    id="date"
                                                    type="date"
                                                    size="small"
                                                    defaultValue="2017-05-24"
                                                    className="timePickerTextfield"
                                                    onChange={handleDayMonth}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </form>
                                        </div>
                                    </DialogContent> : "")}

                                {periodicity !== "" &&
                                    <DialogContent>
                                        <br></br>
                                        <div className="onelinerAlign">
                                            <DialogContentText id="timeLabel">Time: </DialogContentText>
                                            <form className="timePickerContainer" noValidate>
                                                <TextField
                                                    id="time"
                                                    size="small"
                                                    type="time"
                                                    defaultValue="07:30"
                                                    className="timePickerTextfield"
                                                    onChange={handleHourRepeated}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        step: 300,
                                                    }}
                                                />
                                            </form>
                                        </div>
                                    </DialogContent>
                                }

                            </DialogContent>
                            <DialogActions>
                                <Button id="cancelBtn" onClick={props.onCloseDialog}>Back</Button>
                                <Button id="nextBtn" onClick={handleClickOpenThird}>Next</Button>
                            </DialogActions>
                        </Dialog> */}


                        <Dialog open={openThird} onClose={props.onCloseDialog} aria-labelledby="form-dialog-title">
                            <IconButton aria-label="close" id="closeButton" onClick={props.onCloseDialog}>
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle id="form-dialog-title" className="dialogTitle">Recommendation Configuration</DialogTitle>
                            <DialogContent className="recConfigPaper">

                                <DialogContentText id="recLabel">Title of Recommendation</DialogContentText>
                                <CssTextField autoFocus margin="dense" id="name" type="text" placeholder="Wash Optimization P20" onChange={handleTitle}></CssTextField>

                                <DialogContent>
                                    <br></br>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="recLabel2">Asset: </DialogContentText>
                                        <FormControl>
                                            <NativeSelect
                                                id="demo-customized-select-native"
                                                className="recBoxDate"
                                                value={asset}
                                                onChange={handleAsset}
                                                input={<BootstrapInput />}
                                            >
                                                <option aria-label="None" value="" >None</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </div>
                                </DialogContent>


                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="recLabel2">Parameters: </DialogContentText>
                                        <FormControl>
                                            <NativeSelect
                                                id="demo-customized-select-native"
                                                className="recBoxDate"
                                                value={parameters}
                                                onChange={handleParameters}
                                                input={<BootstrapInput />}
                                            >
                                                <option aria-label="None" value="" >None</option>
                                                <option value={"centerPointSpan"}>Center Point and Span</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </div>
                                </DialogContent>

                                {parameters == "centerPointSpan" &&
                                    <DialogContent>
                                        <div className="onelinerAlign">
                                            <DialogContentText id="recLabel3">Center Point Increment: </DialogContentText>
                                            <TextField
                                                id="outlined-number"
                                                className="recBoxNumber"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={handleCenterPoint}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </div>
                                    </DialogContent>
                                }
                                {parameters == "centerPointSpan" &&
                                    <DialogContent>
                                        <div className="onelinerAlign">
                                            <DialogContentText id="recLabel3">Span Increment: </DialogContentText>
                                            <TextField
                                                id="outlined-number"
                                                className="recBoxNumber"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={handleSpan}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </div>
                                    </DialogContent>
                                }

                            </DialogContent>


                            <DialogActions>
                                <Button id="cancelBtn" onClick={props.onCloseDialog}>Back</Button>
                                <Button id="nextBtn" onClick={handleClickOpenFourth}>Create</Button>
                            </DialogActions>
                        </Dialog>

                         {openFourth ? <ConfirmationDialog openDialog={openFourth} onCloseDialog={props.onCloseDialog} /> : <div></div>}
{/* 
                        <Dialog open={openFourth} onClose={cancelConfirmation} aria-labelledby="form-dialog-title">

                            <IconButton aria-label="close" id="closeButton" onClick={cancelConfirmation}>
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle id="form-dialog-title" className="dialogTitle">Confirmation</DialogTitle>
                            <DialogContent id="confirmationDialog">
                                <DialogContent>

                                    <DialogContentText id="confirmationTitle">Configuration Details </DialogContentText>
                                    <br></br>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Template: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Yearly Wash Optmization</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Title: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(title === "" ? "Undefined" : title)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Asset: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(asset === "" ? "Feature Coming soon!" : asset)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Asset Type: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(assetType === "" ? "Solar" : assetType)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Granularity: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(granularity === "" ? "Yearly" : granularity)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Periodicity: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(periodicity === "" ? "Undefined" : periodicity)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Frequency of Repetition: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(Repetition === "" ? "Undefined" : Repetition + " time(s)")}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Day of the Week/Month: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(dayWeek === "" ? "Underfine" : (dayWeek != "" ? dayWeek : dayMonth))}</DialogContentText>
                                    </div>
                                </DialogContent>


                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Hours Repeated: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(hourRepeated === null ? "Undefined" : hourRepeated)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Start Date: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Feature Coming soon!</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">End Date: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Feature Coming soon!</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Occurence Date: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Feature Coming soon!</DialogContentText>
                                    </div>
                                </DialogContent>

                                <br></br>
                                <Divider className="confirmationDivider" />
                                <br></br>


                                <DialogContent>
                                    <DialogContentText id="confirmationTitle">Parameters Details</DialogContentText>
                                    <br></br>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Center Point: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(centerPoint === null ? "Undefined" : centerPoint)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Span: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">{(span === null ? "Undefined" : span)}</DialogContentText>
                                    </div>
                                </DialogContent>

                                <br></br>
                                <Divider className="confirmationDivider" />
                                <br></br>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Created By: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">Kenzo L. Witwit</DialogContentText>
                                    </div>
                                </DialogContent>

                                <DialogContent>
                                    <div className="onelinerAlign">
                                        <DialogContentText id="confirmationLabel">Created On: </DialogContentText>
                                        <DialogContentText id="confirmationLabelOutput">October 27, 2020, 3:17 PM</DialogContentText>
                                    </div>
                                </DialogContent>

                            </DialogContent>
                            <DialogActions>
                                <Button id="cancelBtn" onClick={cancelConfirmation}>Cancel</Button>
                                <Button id="nextBtn" onClick={handleDone}>Confirm</Button>
                            </DialogActions>
                        </Dialog> */}


                    </Grid>
                </Grid>
                <br></br>
            </div>
        </div>
    )
};

export default ParametersDialog;