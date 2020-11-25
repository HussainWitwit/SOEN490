import React from 'react'
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import 'date-fns';
import Divider from '@material-ui/core/Divider';
import "./ConfirmationPage.css";
import { useSelector } from 'react-redux';

const Slide = styled.div`

`;

const ConfirmationPage = (props) => {

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
  const [periodicity, setPeriodicity] = React.useState("");
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
  const [hourRepeated, setHourRepeated] = React.useState(null);
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

  const recTitle = useSelector(state => state.title);
  const recAsset= useSelector(state => state.asset);
  const recCenterPoint = useSelector (state => state.centerPoint);
  const recSpan = useSelector (state => state.span);

  return (
    <Slide>  
      <IconButton aria-label="close" id="closeButton" onClick={props.dismiss}>
        <CloseIcon />
      </IconButton>
      <DialogTitle id="form-dialog-title" className="dialogTitle">Confirmation</DialogTitle>
      <DialogContent className="confirmationDialog">
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
            <DialogContentText id="confirmationLabelOutput">{(recTitle)}</DialogContentText>
          </div>
        </DialogContent>

        <DialogContent>
          <div className="onelinerAlign">
            <DialogContentText id="confirmationLabel">Asset: </DialogContentText>
            <DialogContentText id="confirmationLabelOutput">{(recAsset === "" ? "Feature Coming soon!" : recAsset)}</DialogContentText>
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
            <DialogContentText id="confirmationLabelOutput">{(dayWeek === "" ? "Undefined" : (dayWeek != "" ? dayWeek : dayMonth))}</DialogContentText>
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
            <DialogContentText id="confirmationLabelOutput">{(recCenterPoint === null ? "Undefined" : recCenterPoint)}</DialogContentText>
          </div>
        </DialogContent>

        <DialogContent>
          <div className="onelinerAlign">
            <DialogContentText id="confirmationLabel">Span: </DialogContentText>
            <DialogContentText id="confirmationLabelOutput">{(recSpan === null ? "Undefined" : recSpan)}</DialogContentText>
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
        <Button id="cancelBtn" onClick={() => props.select(2)}>Back</Button>
        <Button id="nextBtn" onClick={()=>{postAddRecommendation()}, props.dismiss}>Confirm</Button>
      </DialogActions>
    </Slide>
    
  )
};

export default ConfirmationPage