import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ManageRecommendationDrawer.css';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
// import {getConfiguredRecommendationById} from '../../api/get/ConfiguredRecommendationEndpoints'


ManageRecommendationDrawer.propType = {
  isDrawerOpen: PropTypes.bool.isRequired,
  isInternalClosed: PropTypes.bool.isRequired,
  isDrawerPinned: PropTypes.bool.isRequired
}


//Extracting props instead of calling props everytime. Might be less readable. However, dev experience is amazing. A.J.U.U
export default function ManageRecommendationDrawer({ isDrawerOpen, isInternalClosed, isDrawerPinned, selectedScheduleId }) {

  const [isOpen, setIsOpen] = useState(isDrawerOpen === undefined ? false : isDrawerOpen);
  const [isPinClicked, setIsPinClicked] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const lastFiveStatus = [null, { status: 'Running', id: 40404040, date: "05-02-2020" }, { status: 'Success', id: 40404040, date: "05-02-2020" }, { status: 'Failure', id: 40404040, date: "05-02-2020" }, { status: 'Success', id: 40404040, date: "05-02-2020" }]
  const values = [122, 122, 122, 122]
  const parameters = ["Param1", "Param1", "Param1", "Param1"]
  const assets = ["Asset1", "Asset1", "Asset1", "Asset1", "Asset1", "Asset1", "Asset1"]

  // Switch between "Success", "Failure" and "Running" to see the different status ui.
  const lastExecutionStatus = "Running"

  const tooltipContent = 'id'
  // const [data, setData] = useState([]);

  // const fetchData = async () => {
  //   let response = await getConfiguredRecommendationById(selectedScheduleId);
  //   setData(response);
  // }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    isInternalClosed(open);
    setIsOpen(open);
  };

  const pinDrawerEvent = () => {
    setIsPinClicked(!isPinClicked);
    isDrawerPinned(!isPinClicked)
  }

  const editRecommendation = () => {
    console.log("Edit a recommendation")
  }


  useEffect(() => {
    // fetchData();
    setIsOpen(isDrawerOpen);
  }, [isDrawerOpen])

  return (
    <div>
      <div className='drawer-content'>
        <Grid container>
          <Grid item xs={12}>
            <p className='drawer-title'>Title</p>
            <p className='drawer-subtitle'>Description</p>
            <div className='drawer-description'>This is the description</div>
          </Grid>
          <Grid item xs={12}>
            <div className='assets'>
              <p className='value-title'>Assets</p>
              {assets.map((value) => {
                return <div className='asset-values'>{value}, </div>
              })}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='inputs'>
              <p className='value-title'>Parameters</p>
              {parameters.map((value) => {
                return <div className='values'>{value}</div>
              })}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='outputs'>
              <p className='value-title'>Value</p>
              {values.map((value) => {
                return <div className='values'>{value}</div>
              })}
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='assets'>
              <p className='value-title'>Schedule</p>
              <p className='values'>Yearly, every Monday 3pm</p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <p className='value-title'>Last Five Executions</p>
            <div className='last-five-status'>
              {lastFiveStatus.map((value) => {
                return value == null ? 
                <Tooltip title="No status available"><div className="Empty"></div></Tooltip>
                : <Tooltip title={<span><p>Id: {value.id}</p><p>Status: {value.status}</p><p>Date: {value.date}</p></span>}><div className={value.status}></div></Tooltip>
              })}
            </div>
          </Grid>
          <Grid item xs={12}>
            <p className='value-title'>Last Execution Status</p>
            <div className={'execution-status-' + lastExecutionStatus}>
              <Chip label={lastExecutionStatus.toUpperCase()} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='created-edited-by'>
              <p className='edited-by'>Last edited by: </p>
              <p className='created-edited-by-name'>Alain</p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='edit-recommendation-button'>
              <Button variant="outlined">Edit a Recommendation</Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='force-run-button'>
              <Button variant="outlined">Force run</Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='delete-button'>
              <Button variant="outlined">Delete</Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
